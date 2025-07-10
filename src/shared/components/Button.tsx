type Props = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...rest }: Props) => (
    <button
        {...rest}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
        {children}
    </button>
);
