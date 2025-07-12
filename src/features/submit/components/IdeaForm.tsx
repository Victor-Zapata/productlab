// src/features/submit/components/IdeaForm.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Button } from '@/shared/components/Button'
import { getSuggestionFromOpenAI } from '../services/openaiApi'
import { submitIdea } from '../services/submitApi'
import { useIdeasStore } from '@/features/ideas/store/useIdeasStore'
import type { Idea } from '@/features/ideas/store/useIdeasStore'


type Props = { onSuccess?: () => void }

export const IdeaForm = ({ onSuccess }: Props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [customPrompt, setCustomPrompt] = useState('')
    const [suggestion, setSuggestion] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addIdea = useIdeasStore((s) => s.addIdea)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) {
            toast.error('Completá título y descripción')
            return
        }

        setIsSubmitting(true)
        try {
            const aiSuggestion = await getSuggestionFromOpenAI({
                title,
                description,
                prompt: customPrompt || undefined,
            })
            setSuggestion(aiSuggestion)

            const newIdeaInput: Omit<Idea, 'id' | 'createdAt' | 'votes'> = {
                title,
                description,
                suggestion: aiSuggestion,
                tags: [],
            }
            const saved = await submitIdea(newIdeaInput)
            addIdea(saved)
            toast.success('✅ Idea enviada con éxito')

            // limpiamos, dejamos la sugerencia visible
            setTitle('')
            setDescription('')
            setCustomPrompt('')

            setTimeout(() => {
                onSuccess ? onSuccess() : navigate('/')
            }, 800)
        } catch (err) {
            console.error(err)
            toast.error('❌ Error al enviar idea')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Título de la idea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            />

            <textarea
                placeholder="Descripción detallada"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full p-3 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            />

            <textarea
                placeholder="Prompt personalizado (opcional)"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
                className="w-full p-3 rounded border border-dashed border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-sm"
            />

            {suggestion && (
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded text-zinc-800 dark:text-white">
                    <strong>💡 Sugerencia IA:</strong> {suggestion}
                </div>
            )}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Idea 🚀'}
            </Button>
        </form>
    )
}
