'use client';

import { Button as HeroButton, ButtonProps as HeroButtonProps } from "@heroui/react";
import { forwardRef } from 'react';

export interface ButtonProps extends HeroButtonProps {
    // Add any custom props if needed, mostly matching HeroUI props
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <HeroButton
                ref={ref}
                radius="sm"
                className={className}
                {...props}
            >
                {children}
            </HeroButton>
        );
    }
);

Button.displayName = 'Button';
