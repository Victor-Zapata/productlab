import { useState } from "react";
import { Button } from "@/shared/components/Button";
import toast from "react-hot-toast";
import { getSuggestionFromOpenAI } from "../services/openaiApi";
import { submitIdea } from "../services/submitApi";
import { motion } from "framer-motion";

export const IdeaForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
    const [customPrompt, setCustomPrompt] = useState(
        "¿Qué mejoras podrías sugerirme para esta idea?"
    );


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!title.trim()) newErrors.title = "El título es obligatorio.";
        else if (title.length < 5) newErrors.title = "Debe tener al menos 5 caracteres.";
        if (!description.trim()) newErrors.description = "La descripción es obligatoria.";
        else if (description.length < 15) newErrors.description = "Debe tener al menos 15 caracteres.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Revisá los campos.");
            return;
        }

        try {
            setLoading(true);
            setErrors({});
            toast.loading("Enviando idea...");

            const res = await submitIdea({ title, description });
            if (!res.success) throw new Error("Falló el envío");

            toast.dismiss();
            toast.success("¡Idea enviada con éxito!");

            setTitle("");
            setDescription("");

            toast.loading("Generando sugerencia con IA...");
            const aiSuggestion = await getSuggestionFromOpenAI({ title, description, prompt: customPrompt });
            toast.dismiss();
            toast.success("¡Sugerencia generada!");
            setSuggestion(aiSuggestion);
        } catch (error) {
            toast.dismiss();
            toast.error("Ocurrió un error 😢");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full mx-auto">
            <div>
                <label className="block text-sm font-medium mb-1">Título de la idea</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-4 py-2 rounded border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition
            ${errors.title ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"}`}
                    placeholder="Mi app para compartir gastos..."
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-2 rounded border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition
            ${errors.description ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"}`}
                    placeholder="Contá en qué consiste, a quién ayuda, cómo se usaría..."
                />
                <div>
                    <label className="block text-sm font-medium mb-1">Prompt para IA (opcional)</label>
                    <input
                        type="text"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="w-full px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="¿Qué mejoras podrías sugerirme para esta idea?"
                    />
                </div>

                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Idea 🚀"}
            </Button>

            {suggestion && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 p-4 rounded bg-yellow-100 dark:bg-yellow-900 text-zinc-800 dark:text-white"
                >
                    <strong>Sugerencia IA:</strong> {suggestion}
                </motion.div>
            )}
        </form>
    );
};
