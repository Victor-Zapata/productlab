// src/features/submit/services/submitApi.ts

import type { Idea } from '@/features/ideas/store/useIdeasStore'


/**
 * Envía la idea al backend y recibe la Idea completa de vuelta.
 */
export async function submitIdea(
    ideaInput: Omit<Idea, 'id' | 'createdAt' | 'votes'>
): Promise<Idea> {
    const res = await fetch('http://localhost:4000/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ideaInput),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error enviando la idea');
    }

    const created: Idea = await res.json();
    return created;
}
