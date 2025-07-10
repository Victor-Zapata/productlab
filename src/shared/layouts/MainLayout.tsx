import { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') setIsDark(true);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
            <header className="p-4 flex justify-end">
                <button
                    onClick={() => setIsDark((prev) => !prev)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                    {isDark ? '☀️ Claro' : '🌙 Oscuro'}
                </button>
            </header>

            <main className="p-6">{children}</main>
        </div>
    );
};
