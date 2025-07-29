'use client'

interface BaseLabelProps {
    className?: string,
    isDark?: boolean,
    children: React.ReactNode
}

export default function BaseLabel({className, isDark, children}: BaseLabelProps) {
    return (
        <div className={"label" 
                        + (isDark ? ' label_dark' : '') 
                        + (className ? ' ' + className : '' )
                    }>{children}</div>
    )
}