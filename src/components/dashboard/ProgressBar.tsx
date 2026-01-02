'use client';

import { Progress } from '@heroui/react';

interface ProgressBarProps {
    value: number;
    label?: string;
    showPercentage?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
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
        <Progress
            label={label}
            size={size}
            value={value}
            maxValue={100}
            color={color}
            showValueLabel={showPercentage}
            classNames={{
                base: "w-full",
                track: "drop-shadow-md border border-default",
                indicator: animate ? "bg-gradient-to-r from-pink-500 to-yellow-500" : "",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60"
            }}
            isIndeterminate={animate && value === 0} // Or use customized animation class
        />
    );
}

// Multi-section progress bar
interface MultiProgressBarProps {
    sections: Array<{
        value: number;
        color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
        label?: string;
    }>;
    size?: 'sm' | 'md' | 'lg';
}

export function MultiProgressBar({ sections, size = 'md' }: MultiProgressBarProps) {
    // HeroUI doesn't support multi-section progress natively in one bar easily without custom CSS.
    // We will render stacked progress bars or a flex container.
    // A flex container is better for "multi-colored bar".

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className={`flex w-full overflow-hidden rounded-full ${size === 'sm' ? 'h-1' : size === 'md' ? 'h-3' : 'h-5'}`}>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        style={{ width: `${section.value}%` }}
                        className={`h-full bg-${section.color === 'default' ? 'gray-500' :
                            section.color === 'primary' ? 'blue-500' :
                                section.color === 'success' ? 'green-500' :
                                    section.color === 'warning' ? 'yellow-500' :
                                        section.color === 'danger' ? 'red-500' : 'purple-500'}`}
                    />
                ))}
            </div>
            <div className="flex gap-4">
                {sections.map((section, index) => (
                    <div className="flex gap-2 items-center" key={index}>
                        <div className={`w-2 h-2 rounded-full bg-${section.color === 'default' ? 'gray-500' :
                            section.color === 'primary' ? 'blue-500' :
                                section.color === 'success' ? 'green-500' :
                                    section.color === 'warning' ? 'yellow-500' :
                                        section.color === 'danger' ? 'red-500' : 'purple-500'}`} />
                        <span className="text-xs text-default-500">{section.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
