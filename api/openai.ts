export const config = {
    runtime: 'edge', 
};

export default async function handler(req: Request) {
    try {
        if (req.method && req.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Método no permitido' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json' },
            });
        }

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

        console.log('➡️ Prompt a enviar:', fullPrompt);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

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
            signal: controller.signal,
        });

        clearTimeout(timeout);

        const json = await openaiRes.json();

        if (!json.choices || !json.choices[0]?.message?.content) {
            return new Response(JSON.stringify({ error: 'Respuesta inválida de OpenAI' }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const suggestion = json.choices[0].message.content;

        return new Response(JSON.stringify({ suggestion }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('❌ Error al llamar a OpenAI:', error);
        return new Response(JSON.stringify({ error: 'Error en el servidor o timeout' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
