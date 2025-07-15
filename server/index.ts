// server/index.ts

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// ——— Endpoint IA ————————————————————————————————
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/openai', async (req: Request, res: Response) => {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  try {
    const { title, description, prompt } = req.body;
    const fullPrompt = prompt?.trim()
      ? prompt
      : `Mejorá esta idea: ${title} - ${description}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Sos un experto en validar ideas de negocio.',
        },
        { role: 'user', content: fullPrompt },
      ],
    });

    const suggestion = completion.choices?.[0]?.message?.content ?? '';
    return res.json({ suggestion });
  } catch (error) {
    console.error('❌ Error en OpenAI:', error);
    return res.status(500).json({ error: 'Error en el servidor de OpenAI' });
  }
});

// ——— CRUD de Ideas —————————————————————————————

// 1) Crear idea con tags y persistir en BD
app.post('/api/ideas', async (req: Request, res: Response) => {
  const { title, description, suggestion, tags } = req.body;
  if (!title || !description || !suggestion) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const created = await prisma.idea.create({
      data: {
        title,
        description,
        suggestion,
        // Para cada tag, conectamos o creamos
        ideaTags: {
          create: (tags || []).map((tag: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
      include: {
        ideaTags: { include: { tag: true } },
      },
    });

    // Convertimos ideaTags a array de strings
    const responseIdea = {
      id: created.id,
      title: created.title,
      description: created.description,
      suggestion: created.suggestion,
      votes: created.votes,
      createdAt: created.createdAt,
      tags: created.ideaTags.map(
        (it: { tag: { name: string } }) => it.tag.name,
      ),
    };

    return res.status(201).json(responseIdea);
  } catch (err) {
    console.error('Error al crear idea en DB:', err);
    return res.status(500).json({ error: 'Error interno al guardar la idea' });
  }
});

// 2) Listar ideas (más recientes primero)
app.get('/api/ideas', async (_req: Request, res: Response) => {
  try {
    const list = await prisma.idea.findMany({
      orderBy: { createdAt: 'desc' },
      include: { ideaTags: { include: { tag: true } } },
    });
    // Mapeamos al mismo formato de tags:string[]
    const response = list.map((i: any) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      suggestion: i.suggestion,
      votes: i.votes,
      createdAt: i.createdAt,
      tags: i.ideaTags.map((it: { tag: { name: string } }) => it.tag.name),
    }));
    res.json(response);
  } catch (err) {
    console.error('Error al obtener ideas:', err);
    res.status(500).json({ error: 'Error interno al listar ideas' });
  }
});

// 3) Votar una idea (incrementar votes)
app.post('/api/ideas/:id/vote', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await prisma.idea.update({
      where: { id },
      data: { votes: { increment: 1 } },
    });
    res.json({ votes: updated.votes });
  } catch {
    res.status(404).json({ error: 'Idea no encontrada' });
  }
});

// 4) Ruta healthcheck
app.get('/', (_req: Request, res: Response) => {
  res.send('🟢 Backend de ProductLab corriendo correctamente.');
});

// Arrancamos el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});

// Al cerrar la app, desconectamos Prisma
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
