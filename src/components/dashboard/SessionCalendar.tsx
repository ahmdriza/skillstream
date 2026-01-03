'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import type { LiveSession } from '@/types';

interface SessionCalendarProps {
    sessions?: Array<
        LiveSession & {
            courseTitle?: string;
        }
    >;
    onSessionClick?: (session: LiveSession) => void;
}

export function SessionCalendar({ sessions = [], onSessionClick }: SessionCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days: Array<{ day: number | null; date: Date | null; hasSession: boolean }> = [];

        // Add empty days for padding
        for (let i = 0; i < startingDay; i++) {
            days.push({ day: null, date: null, hasSession: false });
        }

        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            const dateStr = dayDate.toISOString().split('T')[0];
            const hasSession = sessions.some((s) => s.date === dateStr);
            days.push({ day: i, date: dayDate, hasSession });
        }

        return days;
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const days = getDaysInMonth(currentDate);
    const today = new Date();
    const isToday = (date: Date | null) => {
        if (!date) return false;
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    return (
        <Card className="max-w-md w-full">
            <CardHeader className="flex justify-between items-center px-4 py-3">
                <Button isIconOnly variant="text" onClick={goToPreviousMonth} size="small">
                    <IconChevronLeft size={18} />
                </Button>
                <div className="font-semibold text-medium">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <Button isIconOnly variant="text" onClick={goToNextMonth} size="small">
                    <IconChevronRight size={18} />
                </Button>
            </CardHeader>

            <CardBody className="pt-0">
                {/* Day names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                        <div key={day} className="text-center text-xs text-gray-400 font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                    {days.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                h-8 w-8 flex items-center justify-center rounded-full text-small mx-auto relative
                                ${!item.day ? 'invisible' : ''}
                                ${isToday(item.date) ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}
                            `}
                            onClick={() => {
                                if (item.hasSession && item.date) {
                                    const session = sessions.find(
                                        (s) => s.date === item.date?.toISOString().split('T')[0]
                                    );
                                    if (session) onSessionClick?.(session);
                                }
                            }}
                        >
                            {item.day}
                            {item.hasSession && !isToday(item.date) && (
                                <span className="absolute bottom-0.5 w-1 h-1 bg-red-500 rounded-full"></span>
                            )}
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}
