
export async function getSuggestionFromOpenAI({
    title,
    description,
    prompt,
}: {
    title: string;
    description: string;
    prompt?: string;
}): Promise<string> {
    try {
        const res = await fetch('http://localhost:4000/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, prompt }),
        });

        if (!res.ok) {
            throw new Error('Error con la API de OpenAI');
        }

        const data = await res.json();
        return data.suggestion;
    } catch (error) {
        console.error('Error al obtener sugerencia:', error);
        throw error;
    }
}
