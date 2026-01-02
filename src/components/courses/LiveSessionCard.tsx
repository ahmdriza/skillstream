'use client';

import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Chip,
    Avatar,
    Link
} from '@heroui/react';
import { IconCalendar, IconClock, IconUsers, IconVideo } from '@tabler/icons-react';
import type { LiveSession, Instructor } from '@/types';

interface LiveSessionCardProps {
    session: LiveSession & {
        courseId?: string;
        courseTitle?: string;
    };
    instructor?: Instructor;
    onJoin?: () => void;
}

export function LiveSessionCard({ session, instructor, onJoin }: LiveSessionCardProps) {
    const isLive = session.status === 'live';
    const isUpcoming = session.status === 'upcoming';
    const isCompleted = session.status === 'completed';

    const getStatusChip = () => {
        if (isLive) return <Chip color="danger" variant="solid" size="sm">🔴 LIVE NOW</Chip>;
        if (isCompleted) return <Chip color="default" variant="flat" size="sm">Completed</Chip>;
        return <Chip color="primary" variant="flat" size="sm">Upcoming</Chip>;
    };

    return (
        <Card shadow="sm" className="w-full">
            <CardHeader className="flex justify-between pb-0">
                {getStatusChip()}
                <span className="text-small text-default-500">
                    {session.date}
                </span>
            </CardHeader>
            <CardBody className="gap-3">
                <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-large line-clamp-2">{session.title}</h4>
                    {session.courseTitle && (
                        <span className="text-small text-default-400">{session.courseTitle}</span>
                    )}
                </div>

                {instructor && (
                    <div className="flex gap-3 items-center">
                        <Avatar src={instructor.avatar} size="sm" />
                        <div className="flex flex-col">
                            <span className="text-small font-semibold">{instructor.name}</span>
                            <span className="text-tiny text-default-400">{instructor.title}</span>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 text-small text-default-500 items-center bg-default-100 p-2 rounded-medium w-fit">
                    <IconClock size={16} />
                    <span>{session.startTime} - {session.endTime}</span>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                {isLive && (
                    <Button
                        fullWidth
                        color="danger"
                        startContent={<IconVideo size={18} />}
                        onPress={onJoin}
                    >
                        Join Now
                    </Button>
                )}

                {isUpcoming && (
                    <Button
                        fullWidth
                        variant="flat"
                        startContent={<IconCalendar size={18} />}
                        isDisabled
                    >
                        Starts at {session.startTime}
                    </Button>
                )}

                {isCompleted && session.recordingUrl && (
                    <Button
                        fullWidth
                        variant="ghost"
                        as={Link}
                        href={session.recordingUrl}
                        isExternal
                        showAnchorIcon={false}
                    >
                        Watch Recording
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
