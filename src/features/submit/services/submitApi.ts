export const submitIdea = (idea: {
    title: string
    description: string
}): Promise<{ success: boolean }> =>
    new Promise((res) =>
        setTimeout(() => res({ success: true }), 800)
    )

export const getSuggestionForIdea = (idea: {
    title: string
    description: string
}): Promise<string> =>
    new Promise((res) =>
        setTimeout(() => {
            res(
                `¿Qué tal si la idea "${idea.title}" también incluye una app móvil para validar en tiempo real?`
            )
        }, 1200)
    )
