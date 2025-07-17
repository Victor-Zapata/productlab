export type Idea = {
    id: string;
    title: string;
    description: string;
    votes: number;
    tags: string[];
};

export const mockIdeas: Idea[] = [
    {
        id: '1',
        title: 'App para dividir cuentas en salidas',
        description: 'Calcula quién pagó qué y cuánto debe cada uno.',
        votes: 42,
        tags: ['fintech', 'amistades'],
    },
    {
        id: '2',
        title: 'Marketplace de servicios freelance para adolescentes',
        description: 'Plataforma segura para que menores vendan sus habilidades.',
        votes: 17,
        tags: ['educación', 'freelance'],
    },
];

export const fetchIdeas = (): Promise<Idea[]> =>
    new Promise((res) => setTimeout(() => res(mockIdeas), 1000));