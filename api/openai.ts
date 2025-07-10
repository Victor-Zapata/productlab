export default async function handler(req: Request): Promise<Response> {
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Método no permitido" }), {
            status: 405,
        });
    }

    try {
        const { title, description, prompt } = await req.json();

        const fullPrompt = `${prompt || "¿Qué mejoras podrías sugerirme para esta idea?"}
  
  Título: ${title}
  Descripción: ${description}`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Sos un experto en innovación y productos." },
                    { role: "user", content: fullPrompt },
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return new Response(JSON.stringify({ error: "Error al llamar a OpenAI" }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ suggestion: data.choices[0].message.content }));
    } catch (error) {
        console.error("Error general:", error);
        return new Response(JSON.stringify({ error: "Error inesperado" }), {
            status: 500,
        });
    }
}
