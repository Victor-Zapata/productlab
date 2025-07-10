export const getSuggestionFromOpenAI = async ({
    title,
    description,
    prompt,
}: {
    title: string;
    description: string;
    prompt?: string;
}) => {
    const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, prompt }),
    });

    if (!response.ok) {
        throw new Error("Error con la API de OpenAI");
    }

    const data = await response.json();
    return data.suggestion;
};
