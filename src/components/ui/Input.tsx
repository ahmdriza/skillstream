'use client';

import { Input as HeroInput, InputProps as HeroInputProps } from "@heroui/react";
import { forwardRef, useState } from 'react';
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export interface InputProps extends HeroInputProps {
    // Custom props
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = 'text', label, placeholder, ...props }, ref) => {
        const [isVisible, setIsVisible] = useState(false);

        if (type === 'password') {
            const toggleVisibility = () => setIsVisible(!isVisible);

            return (
                <HeroInput
                    ref={ref}
                    label={label}
                    placeholder={placeholder}
                    variant="bordered"
                    labelPlacement="outside"
                    size="sm"
                    radius="sm"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <IconEyeOff className="text-2xl text-default-400 pointer-events-none" size={20} />
                            ) : (
                                <IconEye className="text-2xl text-default-400 pointer-events-none" size={20} />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    {...props}
                />
            );
        }

        return (
            <HeroInput
                ref={ref}
                type={type}
                label={label}
                placeholder={placeholder}
                variant="bordered"
                labelPlacement="outside"
                size="sm"
                radius="sm"
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';
