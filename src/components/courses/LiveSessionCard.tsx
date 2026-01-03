'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    Box,
    Avatar,
    Chip,
    Button as MuiButton
} from '@mui/material';
import { Button } from '@/components/ui/Button';
import { IconCalendar, IconClock, IconVideo } from '@tabler/icons-react';
import type { LiveSession, Instructor } from '@/types';
import Link from 'next/link';

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
        if (isLive) return <Chip label="🔴 LIVE NOW" color="error" size="small" />;
        if (isCompleted) return <Chip label="Completed" variant="outlined" size="small" />;
        return <Chip label="Upcoming" color="primary" variant="outlined" size="small" />;
    };

    return (
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
                action={getStatusChip()}
                subheader={session.date}
                sx={{ pb: 0 }}
            />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                    <Typography variant="h6" component="h4" noWrap title={session.title} sx={{ fontWeight: 'bold' }}>
                        {session.title}
                    </Typography>
                    {session.courseTitle && (
                        <Typography variant="body2" color="text.secondary">
                            {session.courseTitle}
                        </Typography>
                    )}
                </Box>

                {instructor && (
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <Avatar src={instructor.avatar} sx={{ width: 32, height: 32 }} />
                        <Box>
                            <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>{instructor.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{instructor.title}</Typography>
                        </Box>
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    bgcolor: 'action.hover',
                    p: 1,
                    borderRadius: 1,
                    width: 'fit-content'
                }}>
                    <IconClock size={16} className="text-gray-500" />
                    <Typography variant="caption" color="text.secondary">
                        {session.startTime} - {session.endTime}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                {isLive && (
                    <Button
                        fullWidth
                        color="error"
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
                        color="inherit"
                        startContent={<IconCalendar size={18} />}
                        // @ts-ignore
                        disabled
                    >
                        Starts at {session.startTime}
                    </Button>
                )}

                {isCompleted && session.recordingUrl && (
                    <MuiButton
                        fullWidth
                        variant="outlined"
                        component={Link}
                        href={session.recordingUrl}
                        target="_blank"
                    >
                        Watch Recording
                    </MuiButton>
                )}
            </CardActions>
        </Card>
    );
}
