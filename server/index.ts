// server/index.ts
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

// Cache en memoria para no leer disco cada vez
const lawCache: Record<string, string> = {};

async function getLawSnippet(province: string): Promise<string> {
  const key = province.toLowerCase().replace(/\s+/g, '_');
  if (!lawCache[key]) {
    const file = path.resolve(__dirname, 'legal', `${key}.txt`);
    lawCache[key] = await readFile(file, 'utf8');
  }
  return lawCache[key];
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

    // 1) Leemos la ley de la provincia
    const lawText = await getLawSnippet(province);

    // 2) Construimos el system prompt
    const systemPrompt = `
Eres un asesor experto en leyes de tránsito de Argentina.
A continuación tienes extractos de la normativa de la provincia de ${province}:
${lawText}

Cuando respondas, sé preciso, cita artículo si aplica y responde sólo con la información pertinente.
    `.trim();

    // 3) El mensaje del usuario
    const userPrompt = `Usuario pregunta: "${question}"`;

    // 4) Llamamos a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const answer = completion.choices?.[0]?.message?.content ?? '';
    return res.json({ answer });
  } catch (err) {
    console.error('❌ Error en OpenAI:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
});

// Crear pregunta
app.post('/api/questions', async (req, res) => {
  const { question, province, answer } = req.body;
  if (!question || !province || !answer) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  const saved = await prisma.question.create({
    data: { question, province, answer },
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

app.get('/', (_req, res) => res.send('🟢 OK'));
const PORT = +process.env.PORT! || 4000;
app.listen(PORT, () => console.log(`🚀 API en :${PORT}`));
