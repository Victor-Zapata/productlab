// src/shared/components/Button.tsx
import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    variant?: 'primary' | 'secondary'
}

export const Button = ({
    children,
    variant = 'primary',
    className,
    ...rest
}: Props) => (
    <button
        className={clsx(
            'px-6 py-3 rounded font-semibold transition',
            variant === 'primary'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600',
            className
        )}
        {...rest}
    >
        {children}
    </button>
)
