// server/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prisma = new PrismaClient();

app.post('/api/openai', async (req, res) => {
  const { question, province } = req.body;
  if (!question || !province) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Sos un experto en tránsito en Argentina.',
        },
        { role: 'user', content: `Provincia ${province}: ${question}` },
      ],
    });
    const answer = completion.choices?.[0]?.message?.content || '';
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno de OpenAI' });
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
