import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const Layout = ({ children }: Props) => (
    <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">{children}</div>
)
