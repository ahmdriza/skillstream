'use client';

import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import { forwardRef } from 'react';

export type InputProps = Omit<TextFieldProps, 'variant' | 'size'> & {
    variant?: "outlined" | "filled" | "standard" | "bordered" | "flat" | "faded";
    size?: "sm" | "md" | "lg" | "small" | "medium";
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    onValueChange?: (value: string) => void;
    labelPlacement?: "inside" | "outside" | "outside-left";
    classNames?: any;
    isRequired?: boolean;
    description?: string;
    errorMessage?: string;
    isInvalid?: boolean;
    isClearable?: boolean;
};

export const Input = forwardRef<HTMLDivElement, InputProps>(
    ({ startContent, endContent, onValueChange, onChange, variant = "outlined", size = "md", classNames, isRequired, description, errorMessage, isInvalid, label, ...props }, ref) => {

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) onChange(e);
            if (onValueChange) onValueChange(e.target.value);
        };

        const muiVariant = variant === "bordered" ? "outlined" : (variant === "flat" ? "filled" : "outlined");
        const muiSize: "small" | "medium" = size === "sm" ? "small" : "medium";

        return (
            <TextField
                ref={ref}
                variant={muiVariant}
                size={muiSize}
                fullWidth
                label={label}
                required={isRequired}
                onChange={handleChange}
                error={isInvalid}
                helperText={errorMessage || description}
                slotProps={{
                    input: {
                        startAdornment: startContent ? <InputAdornment position="start">{startContent}</InputAdornment> : null,
                        endAdornment: endContent ? <InputAdornment position="end">{endContent}</InputAdornment> : null,
                    }
                }}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export const Textarea = (props: any) => {
    return <Input {...props} multiline rows={props.minRows || 4} />;
};
