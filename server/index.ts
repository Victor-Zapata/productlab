import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// In-memory store
interface Idea { id: string; title: string; description: string; suggestion: string; tags: string[]; votes: number; createdAt: string }
const ideas: Idea[] = [];

// OpenAI endpoint
app.post('/api/openai', async (req, res) => {
    const { title, description, prompt } = req.body;
    const fullPrompt = prompt?.trim() ? prompt : `Mejorá esta idea: ${title} - ${description}`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Sos un experto en validar ideas de negocio.' },
            { role: 'user', content: fullPrompt },
        ],
    });

    const suggestion = completion.choices?.[0]?.message?.content || '';
    res.json({ suggestion });
});

// Ideas endpoints
app.get('/api/ideas', (_req, res) => res.json(ideas));
app.post('/api/ideas', (req, res) => {
    const { title, description, suggestion, tags, votes } = req.body;
    if (!title || !description || !suggestion) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    const newIdea: Idea = {
        id: Date.now().toString(),
        title,
        description,
        suggestion,
        tags: tags || [],
        votes: votes ?? 0,
        createdAt: new Date().toISOString(),
    };
    ideas.unshift(newIdea);
    res.status(201).json(newIdea);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
});
