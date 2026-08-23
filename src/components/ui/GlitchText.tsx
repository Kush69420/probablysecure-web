import React from 'react';
import { cn } from '../../utils/cn';

interface GlitchTextProps extends React.HTMLAttributes<HTMLElement> {
    text: string;
    className?: string;
    as?: any;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    text,
    className,
    as: Component = 'h1',
    ...props
}) => {
    return (
        <Component className={cn('relative inline-block group', className)} {...props}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-blue opacity-0 group-hover:opacity-70 group-hover:animate-pulse group-hover:translate-x-[2px]">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-purple opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:animate-pulse">
                {text}
            </span>
        </Component>
    );
};
