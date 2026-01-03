'use client';

import { Tooltip } from '@mui/material';
import {
    IconTrophy,
    IconFlame,
    IconStar,
    IconBook,
    IconCertificate,
    IconRocket,
    IconTarget,
    IconMedal,
} from '@tabler/icons-react';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: 'trophy' | 'flame' | 'star' | 'book' | 'certificate' | 'rocket' | 'target' | 'medal';
    color: string;
    earnedAt?: string;
    isEarned: boolean;
}

interface AchievementBadgeProps {
    achievement: Achievement;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

const iconMap: Record<Achievement['icon'], typeof IconTrophy> = {
    trophy: IconTrophy,
    flame: IconFlame,
    star: IconStar,
    book: IconBook,
    certificate: IconCertificate,
    rocket: IconRocket,
    target: IconTarget,
    medal: IconMedal,
};

const sizeMap = {
    sm: { box: 'w-10 h-10', icon: 20 },
    md: { box: 'w-14 h-14', icon: 28 },
    lg: { box: 'w-20 h-20', icon: 36 },
};

export function AchievementBadge({
    achievement,
    size = 'md',
    showLabel = true,
}: AchievementBadgeProps) {
    const Icon = iconMap[achievement.icon] || IconTrophy;
    const dimensions = sizeMap[size];

    // Map colors to Tailwind classes
    const getColorClasses = (color: string, isEarned: boolean) => {
        if (!isEarned) return 'bg-gray-100 text-gray-300';

        switch (color) {
            case 'yellow': return 'bg-yellow-100 text-yellow-600';
            case 'red': return 'bg-red-100 text-red-600';
            case 'blue': return 'bg-blue-100 text-blue-600';
            case 'green': return 'bg-green-100 text-green-600';
            case 'violet': return 'bg-purple-100 text-purple-600';
            case 'orange': return 'bg-orange-100 text-orange-600';
            default: return 'bg-blue-100 text-blue-600';
        }
    };

    const colorClasses = getColorClasses(achievement.color, achievement.isEarned);

    const badge = (
        <div
            className={`
                ${dimensions.box} rounded-full flex items-center justify-center
                ${colorClasses}
                transition-transform hover:scale-105 cursor-pointer
                ${!achievement.isEarned ? 'opacity-50 grayscale' : ''}
            `}
        >
            <Icon size={dimensions.icon} />
        </div>
    );

    const tooltipContent = (
        <div className="flex flex-col gap-1 px-1 py-1">
            <span className="font-bold text-sm">{achievement.name}</span>
            <span className="text-xs text-gray-300">{achievement.description}</span>
            {achievement.earnedAt && (
                <span className="text-xs text-gray-400 pt-1">Earned: {achievement.earnedAt}</span>
            )}
        </div>
    );

    if (!showLabel) {
        return (
            <Tooltip title={tooltipContent} arrow>
                {badge}
            </Tooltip>
        );
    }

    return (
        <Tooltip title={achievement.description} arrow>
            <div className="flex flex-col gap-2 items-center">
                {badge}
                <span className={`text-xs text-center font-medium max-w-[80px] truncate ${achievement.isEarned ? 'text-gray-700' : 'text-gray-400'}`}>
                    {achievement.name}
                </span>
            </div>
        </Tooltip>
    );
}

// Grid display for multiple achievements
interface AchievementGridProps {
    achievements: Achievement[];
    size?: 'sm' | 'md' | 'lg';
}

export function AchievementGrid({ achievements, size = 'md' }: AchievementGridProps) {
    return (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} size={size} />
            ))}
        </div>
    );
}
