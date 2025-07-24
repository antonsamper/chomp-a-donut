import type { ComponentProps, FunctionComponent, PropsWithChildren } from 'react';

export const Button: FunctionComponent<PropsWithChildren<ComponentProps<'button'>>> = ({ children, ...properties }) => {
    return (
        <button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-secondary cursor-pointer rounded-full px-6 py-2.5 text-2xl font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
            {...properties}
        >
            {children}
        </button>
    );
};
