export default async function handler(req: Request) {
    // 🔒 Solo permitimos POST
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Método no permitido' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const body = await req.json();
        const { title, description, prompt } = body;

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        if (!OPENAI_API_KEY) {
            return new Response(JSON.stringify({ error: 'Falta la API Key' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const fullPrompt = prompt?.trim()
            ? prompt
            : `Mejorá esta idea: ${title} - ${description}`;

        console.log('➡️ Enviando a OpenAI prompt:', fullPrompt);

        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Sos un experto en validar ideas de negocio.' },
                    { role: 'user', content: fullPrompt },
                ],
            }),
        });

        const json = await openaiRes.json();

        if (!json.choices || !json.choices[0]?.message?.content) {
            throw new Error('Respuesta inesperada de OpenAI');
        }

        const suggestion = json.choices[0].message.content;

        return new Response(JSON.stringify({ suggestion }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('❌ Error en API OpenAI:', error);
        return new Response(JSON.stringify({ error: 'Error en el servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
