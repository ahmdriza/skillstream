'use client';

import { Card, CardBody } from '@heroui/react';
import { ReactNode } from 'react';

interface StatCardProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    subtext?: string;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    trend?: {
        value: string;
        direction: 'up' | 'down';
    };
}

export function StatCard({
    icon,
    label,
    value,
    subtext,
    color = 'primary',
    trend,
}: StatCardProps) {
    return (
        <Card shadow="sm" className="w-full">
            <CardBody className="flex flex-row justify-between items-start p-4">
                <div className="flex flex-col gap-1">
                    <span className="text-small text-default-500">{label}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{value}</span>
                        {trend && (
                            <span className={`text-small font-medium ${trend.direction === 'up' ? 'text-success' : 'text-danger'}`}>
                                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
                            </span>
                        )}
                    </div>
                    {subtext && (
                        <span className="text-tiny text-default-400">{subtext}</span>
                    )}
                </div>
                <div className={`p-3 rounded-medium bg-${color}/10 text-${color}`}>
                    {icon}
                </div>
            </CardBody>
        </Card>
    );
}

// Compact version for smaller spaces
interface StatCardCompactProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

export function StatCardCompact({ icon, label, value, color = 'primary' }: StatCardCompactProps) {
    return (
        <Card shadow="sm" className="w-full">
            <CardBody className="flex flex-row items-center gap-4 p-3">
                <div className={`p-2 rounded-medium bg-${color}/10 text-${color}`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-tiny text-default-500">{label}</span>
                    <span className="text-large font-bold">{value}</span>
                </div>
            </CardBody>
        </Card>
    );
}
