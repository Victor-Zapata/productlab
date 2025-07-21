import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import path from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prisma = new PrismaClient();

// Cache en memoria para snippets de ley
const lawCache: Record<string, string> = {};

async function getLawSnippet(province: string): Promise<string> {
  // 1) Quitar tildes
  const noDiacritics = province
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  // 2) snake_case
  const key = noDiacritics.toLowerCase().replace(/\s+/g, '_');
  // 3) Leer fichero
  const filePath = path.resolve(__dirname, 'legal', `${key}.txt`);
  try {
    return await readFile(filePath, 'utf8');
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      throw new Error(`Ley de tránsito para “${province}” no encontrada.`);
    }
    throw err;
  }
}

app.post('/api/openai', async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  try {
    const { question, province } = req.body;
    if (!question || !province) {
      return res.status(400).json({ error: 'Faltan pregunta o provincia' });
    }

    // 1) Ley pertinente
    const lawText = await getLawSnippet(province);

    // 2) Prompt del sistema
    const systemPrompt = `
Eres un asesor experto en leyes de tránsito de Argentina.
A continuación tienes extractos de la normativa de la provincia de ${province}:
${lawText}

Cuando respondas, sé preciso, cita artículo si aplica y responde sólo con la información pertinente.
    `.trim();

    // 3) Llamada a ChatGPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Usuario pregunta: "${question}"` },
      ],
    });
    const answer = completion.choices?.[0]?.message?.content ?? '';

    // 4) Llamada a DALL·E
    const imageResponse = await openai.images.generate({
      prompt: `Ilustración para: ${answer}`,
      n: 1,
      size: '512x512',
    });
    const imageUrl = imageResponse.data?.[0]?.url ?? '';

    // 5) Devolver
    return res.status(200).json({ answer, imageUrl });
  } catch (err: any) {
    console.error('❌ Error en /api/openai:', err);
    // Si es fallo de DNS / conexión:
    if (err.cause?.code === 'ENOTFOUND') {
      return res
        .status(502)
        .json({
          error:
            'No se puede conectar a api.openai.com. ¿Tienes conexión o proxy?',
        });
    }
    return res
      .status(500)
      .json({ error: err.message || 'Error interno de IA' });
  }
});

// ——— Rutas de preguntas ———————————————————————————————

// Crear pregunta + IA
app.post('/api/questions', async (req, res) => {
  const { question, province, answer, imageUrl } = req.body;
  if (!question || !province || !answer) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  const saved = await prisma.question.create({
    data: { question, province, answer, imageUrl },
  });
  res.status(201).json(saved);
});

// Listar preguntas
app.get('/api/questions', async (_req, res) => {
  const qs = await prisma.question.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(qs);
});

// Healthcheck
app.get('/', (_req, res) => res.send('🟢 OK'));

const PORT = process.env.PORT ? +process.env.PORT : 4000;
app.listen(PORT, () => console.log(`🚀 API en :${PORT}`));
