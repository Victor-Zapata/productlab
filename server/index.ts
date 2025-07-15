// server/index.ts
import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ——— Interfaz de servidor y array en memoria —————————————
interface Idea {
  id: string;
  title: string;
  description: string;
  suggestion: string;
  tags: string[];
  votes: number;
  createdAt: string;
}

// array en memoria (será nuestro "store" temporal)
const ideas: Idea[] = [];

// ——— API para IA ————————————————————————————————————————
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.post('/api/openai', async (req, res) => {
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

    const suggestion = completion.choices?.[0]?.message?.content || '';
    return res.json({ suggestion });
  } catch (error) {
    console.error('❌ Error en OpenAI:', error);
    return res.status(500).json({ error: 'Error en el servidor de OpenAI' });
  }
});

// ——— RUTAS DE IDEAS —————————————————————————————————————

// 1) Crear idea
app.post('/api/ideas', (req, res) => {
  const { title, description, suggestion, tags } = req.body;
  if (!title || !description || !suggestion) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  const newIdea: Idea = {
    id: uuid(),
    title,
    description,
    suggestion,
    tags: Array.isArray(tags) ? tags : [],
    votes: 0, // <— inicializamos votes en 0
    createdAt: new Date().toISOString(),
  };
  ideas.push(newIdea);
  return res.status(201).json(newIdea);
});

// 2) Listar todas las ideas
app.get('/api/ideas', (_req, res) => {
  return res.json(ideas);
});

// 3) Votar una idea
app.post('/api/ideas/:id/vote', (req, res) => {
  const { id } = req.params;
  const idea = ideas.find((i) => i.id === id);
  if (!idea) {
    return res.status(404).json({ error: 'Idea no encontrada' });
  }
  idea.votes += 1;
  return res.json({ votes: idea.votes });
});

// 4) Ruta de comprobación
app.get('/', (_req, res) => {
  res.send('🟢 Backend de ProductLab corriendo correctamente.');
});

// ——— Levantamos el servidor ——————————————————————————————
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
