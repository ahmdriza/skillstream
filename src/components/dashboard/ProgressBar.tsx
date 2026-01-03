'use client';

import { LinearProgress, Box, Typography } from '@mui/material';

interface ProgressBarProps {
    value: number;
    label?: string;
    showPercentage?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "inherit";
    animate?: boolean;
}

export function ProgressBar({
    value,
    label,
    showPercentage = true,
    size = 'md',
    color = 'primary',
    animate = false,
}: ProgressBarProps) {
    return (
        <Box sx={{ width: '100%' }}>
            {(label || showPercentage) && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    {label && <Typography variant="body2" color="text.secondary" fontWeight={500}>{label}</Typography>}
                    {showPercentage && <Typography variant="body2" color="text.secondary">{Math.round(value)}%</Typography>}
                </Box>
            )}
            <LinearProgress
                variant={animate && value === 0 ? "indeterminate" : "determinate"}
                value={value}
                color={color as any}
                sx={{
                    height: size === 'sm' ? 4 : size === 'md' ? 8 : 12,
                    borderRadius: 5
                }}
            />
        </Box>
    );
}

// Multi-section progress bar
interface MultiProgressBarProps {
    sections: Array<{
        value: number;
        color: string;
        label?: string;
    }>;
    size?: 'sm' | 'md' | 'lg';
}

export function MultiProgressBar({ sections, size = 'md' }: MultiProgressBarProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className={`flex w-full overflow-hidden rounded-full ${size === 'sm' ? 'h-1' : size === 'md' ? 'h-3' : 'h-5'}`}>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        style={{ width: `${section.value}%` }}
                        className={`h-full bg-${getTailwindColor(section.color)}`}
                    />
                ))}
            </div>
            <div className="flex gap-4">
                {sections.map((section, index) => (
                    <div className="flex gap-2 items-center" key={index}>
                        <div className={`w-2 h-2 rounded-full bg-${getTailwindColor(section.color)}`} />
                        <span className="text-xs text-gray-500">{section.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getTailwindColor(color: string) {
    const map: any = {
        default: 'gray-500',
        primary: 'blue-500',
        success: 'green-500',
        warning: 'yellow-500',
        danger: 'red-500',
        error: 'red-500',
        purple: 'purple-500'
    };
    return map[color] || 'blue-500';
}
