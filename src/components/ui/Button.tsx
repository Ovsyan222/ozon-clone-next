import { cn } from "../../lib/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isDisabled?: boolean
    variant?: 'primary' | 'secondary'
}

export function Button({
    children,
    className,
    isDisabled = false, 
    variant = 'primary',
    ...rest
}: Props) {
    return (
        <button className={cn('bg-primary text-white hover:bg-blue-800 px-4 py-2 rounded-3xl font-semibold',
            {
                'opacity-50 cursor-not-allowed': isDisabled,
                'bg-transparent text-foreground': variant === 'secondary'
            }, className
        )}
        {...rest}
        disabled={isDisabled}>
            {children}
        </button>
    )
}