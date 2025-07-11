
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors">
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        </div>
    );
};
