'use client'

interface BaseButtonInterface {
    children: React.ReactNode,
    type: "button" | "submit" | "reset",
    className: string,
    isLoading: boolean,
}

export default function BaseButton({children, isLoading = false, type = "button", className = ''}: BaseButtonInterface) {
    return (
        <button
            disabled={isLoading}
            type={type}
            className={"base-button" + (className ? ' ' + className : '')}
        >
            {children}
        </button>
    )
}