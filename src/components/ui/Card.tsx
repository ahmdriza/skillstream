'use client';

import { Card as HeroCard, CardBody, CardHeader, CardFooter, CardProps as HeroCardProps } from "@heroui/react";
import { forwardRef, ReactNode } from 'react';

export interface CardProps extends HeroCardProps {
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, header, footer, hoverable, className, ...props }, ref) => {
        return (
            <HeroCard
                ref={ref}
                shadow="sm"
                isPressable={hoverable}
                className={`p-2 ${className || ''}`}
                {...props}
            >
                {header && <CardHeader className="p-3 pb-0">{header}</CardHeader>}
                <CardBody className="p-3">{children}</CardBody>
                {footer && <CardFooter className="p-3 pt-0">{footer}</CardFooter>}
            </HeroCard>
        );
    }
);

Card.displayName = 'Card';

// Export subcomponents for flexible usage
export { CardHeader, CardBody, CardFooter };
