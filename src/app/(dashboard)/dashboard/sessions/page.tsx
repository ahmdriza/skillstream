'use client';

import Link from 'next/link';
import {
    Card,
    CardBody,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs, Tab } from '@/components/ui/Tabs';
import {
    Chip,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button as MuiButton
} from '@mui/material';
import { IconVideo, IconPlayerPlay, IconCalendar } from '@tabler/icons-react';
import coursesData from '@/data/courses.json';
import instructorsData from '@/data/instructors.json';
import type { LiveCourse, Instructor, LiveSession } from '@/types';
import { formatTime } from '@/lib/utils';

export default function LiveSessionsPage() {
    const courses = coursesData.courses as LiveCourse[];
    const instructors = instructorsData.instructors as Instructor[];

    const liveCourses = courses.filter((c) => c.type === 'live');

    // Get all sessions from all live courses
    const allSessions = liveCourses.flatMap((course) =>
        (course.schedule || []).map((session) => ({
            ...session,
            courseId: course.id,
            courseTitle: course.title,
            instructorId: course.instructorId,
        }))
    );

    const upcomingSessions = allSessions.filter((s) => s.status === 'upcoming');
    const pastSessions = allSessions.filter((s) => s.status === 'completed');

    const getInstructor = (instructorId: string) =>
        instructors.find((i) => i.id === instructorId);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Live Sessions</h1>
                    <p className="text-gray-500">Manage your live classes and recordings</p>
                </div>
                <Button
                    as={Link}
                    href="/courses?type=live"
                    color="primary"
                    variant="flat"
                >
                    Explore Live Courses
                </Button>
            </div>

            <div className="flex w-full flex-col">
                <Tabs aria-label="Session Type">
                    <Tab
                        key="upcoming"
                        title={
                            <div className="flex items-center space-x-2">
                                <IconCalendar size={16} />
                                <span>Upcoming ({upcomingSessions.length})</span>
                            </div>
                        }
                    >
                        <div className="mt-4">
                            {upcomingSessions.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {upcomingSessions.map((session: any) => {
                                        const instructor = getInstructor(session.instructorId);
                                        return (
                                            <Card key={session.id} shadow="sm" className="w-full">
                                                <CardBody className="p-5 flex flex-col gap-4">
                                                    <div className="flex justify-between items-start">
                                                        <Chip color="primary" variant="outlined" size="small" label="Upcoming" />
                                                        <span className="text-sm text-gray-500 font-medium">
                                                            {session.date}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-bold mb-1">{session.title}</h3>
                                                        <p className="text-sm text-gray-500">{session.courseTitle}</p>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="flex items-center gap-2">
                                                            {instructor && (
                                                                <>
                                                                    <Avatar src={instructor.avatar} sx={{ width: 32, height: 32 }} />
                                                                    <span className="text-sm font-medium">{instructor.name}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-semibold">
                                                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                                                        </span>
                                                    </div>

                                                    <Button
                                                        fullWidth
                                                        color="primary"
                                                        startContent={<IconVideo size={18} />}
                                                        // @ts-ignore
                                                        isDisabled
                                                        className="mt-2"
                                                    >
                                                        Join When Live
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ) : (
                                <Card className="p-8 text-center" shadow="sm">
                                    <CardBody className="flex flex-col items-center gap-4">
                                        <h3 className="text-lg font-medium">No upcoming sessions</h3>
                                        <p className="text-gray-500">
                                            Enroll in a live course to see upcoming sessions
                                        </p>
                                        <Button as={Link} href="/courses?type=live" color="primary">
                                            Browse Live Courses
                                        </Button>
                                    </CardBody>
                                </Card>
                            )}
                        </div>
                    </Tab>
                    <Tab
                        key="past"
                        title={
                            <div className="flex items-center space-x-2">
                                <IconPlayerPlay size={16} />
                                <span>Past Sessions ({pastSessions.length})</span>
                            </div>
                        }
                    >
                        <div className="mt-4">
                            {pastSessions.length > 0 ? (
                                <Card shadow="sm">
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table aria-label="Past Sessions">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>SESSION</TableCell>
                                                    <TableCell>DATE</TableCell>
                                                    <TableCell>RECORDING</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pastSessions.map((session: any) => (
                                                    <TableRow key={session.id}>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-sm">{session.title}</span>
                                                                <span className="text-xs text-gray-500">{session.courseTitle}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{session.date}</TableCell>
                                                        <TableCell>
                                                            <MuiButton
                                                                size="small"
                                                                variant="text"
                                                                color="primary"
                                                                startIcon={<IconPlayerPlay size={16} />}
                                                            >
                                                                Watch
                                                            </MuiButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            ) : (
                                <Card className="p-8 text-center" shadow="sm">
                                    <CardBody>
                                        <p className="text-gray-500">No past sessions yet</p>
                                    </CardBody>
                                </Card>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
