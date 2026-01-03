'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from "@mui/material";
import { forwardRef } from 'react';
import Link from "next/link";

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
    variant?: "text" | "outlined" | "contained" | "ghost" | "flat" | "bordered" | "light" | "shadow" | "solid";
    size?: "sm" | "md" | "lg" | "small" | "medium" | "large";
    onPress?: () => void;
    isLoading?: boolean;
    radius?: "none" | "sm" | "md" | "lg" | "full";
    isIconOnly?: boolean;
    as?: any;
    href?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, onPress, onClick, isLoading, radius, variant = "contained", color = "primary", size = "md", isIconOnly, as, href, startContent, endContent, ...props }, ref) => {
        const handleClick = onPress || onClick;

        // Map variants
        let muiVariant: "text" | "outlined" | "contained" = "contained";
        if (variant === "bordered") muiVariant = "outlined";
        if (variant === "light" || variant === "flat" || variant === "ghost") muiVariant = "text";
        if (variant === "solid") muiVariant = "contained";

        // Map colors
        let muiColor = color;
        if ((color as string) === "danger") muiColor = "error";

        // Map sizes
        let muiSize: "small" | "medium" | "large" = "medium";
        if (size === "sm") muiSize = "small";
        if (size === "lg") muiSize = "large";
        if (size === "md") muiSize = "medium";

        const content = (
            <>
                {isLoading && <CircularProgress size={muiSize === "small" ? 16 : 20} color="inherit" sx={{ mr: 1 }} />}
                {!isLoading && startContent && <span className="mr-2 flex items-center">{startContent}</span>}
                {children}
                {!isLoading && endContent && <span className="ml-2 flex items-center">{endContent}</span>}
            </>
        );

        if (as === Link && href) {
            return (
                <MuiButton
                    component={Link}
                    href={href}
                    variant={muiVariant}
                    color={muiColor as any}
                    size={muiSize}
                    className={className}
                    onClick={handleClick as any}
                    disabled={isLoading || props.disabled}
                    startIcon={null}
                    endIcon={null}
                    sx={{
                        borderRadius: radius === "full" ? '9999px' : undefined,
                        padding: isIconOnly ? '8px' : undefined,
                        minWidth: isIconOnly ? 'auto' : undefined,
                    }}
                    {...props}
                >
                    {content}
                </MuiButton>
            );
        }

        return (
            <MuiButton
                ref={ref}
                variant={muiVariant}
                color={muiColor as any}
                size={muiSize}
                className={className}
                onClick={handleClick}
                disabled={isLoading || props.disabled}
                sx={{
                    borderRadius: radius === "full" ? '9999px' : undefined,
                    padding: isIconOnly ? '8px' : undefined,
                    minWidth: isIconOnly ? 'auto' : undefined,
                }}
                {...props}
            >
                {content}
            </MuiButton>
        );
    }
);

Button.displayName = 'Button';
