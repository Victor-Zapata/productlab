import { mockIdeas } from '../data/mockIdeas'

export const fetchIdeaById = (id: string) => {
    return new Promise((resolve, reject) => {
        const idea = mockIdeas.find(i => i.id === id)
        setTimeout(() => {
            idea ? resolve(idea) : reject('Idea no encontrada')
        }, 600)
    })
}
