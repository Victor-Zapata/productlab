// src/features/ideas/pages/SubmitIdeaPage.tsx

import { useState } from 'react'
import toast from 'react-hot-toast'

export const SubmitIdeaPage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !description) {
            toast.error('Completá todos los campos')
            return
        }

        const loadingToast = toast.loading('Enviando tu idea...')

        try {
            // Simulamos envío
            await new Promise((res) => setTimeout(res, 1500))
            toast.success('¡Idea enviada con éxito!', { id: loadingToast })

            // Reiniciamos campos
            setTitle('')
            setDescription('')
        } catch (err) {
            toast.error('Ocurrió un error', { id: loadingToast })
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sugerir una idea 💡</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Título de la idea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}
