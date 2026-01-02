'use client';

import Link from 'next/link';
import {
    Card,
    CardBody,
    Button,
    Tab,
    Tabs,
    Chip,
    Avatar,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@heroui/react';
import { IconVideo, IconPlayerPlay, IconCalendar } from '@tabler/icons-react';
import coursesData from '@/data/courses.json';
import instructorsData from '@/data/instructors.json';
import type { LiveCourse, Instructor, LiveSession } from '@/types';
import { formatTime } from '@/lib/utils'; // Assuming this utility still works or needs replacement if it relied on Mantine (unlikely)

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
                    <p className="text-default-500">Manage your live classes and recordings</p>
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
                <Tabs aria-label="Session Type" color="primary" variant="underlined">
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
                                                        <Chip color="primary" variant="flat" size="sm">
                                                            Upcoming
                                                        </Chip>
                                                        <span className="text-small text-default-500 font-medium">
                                                            {session.date}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-bold mb-1">{session.title}</h3>
                                                        <p className="text-small text-default-500">{session.courseTitle}</p>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="flex items-center gap-2">
                                                            {instructor && (
                                                                <>
                                                                    <Avatar src={instructor.avatar} size="sm" isBordered />
                                                                    <span className="text-small font-medium">{instructor.name}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <span className="text-small font-semibold">
                                                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                                                        </span>
                                                    </div>

                                                    <Button
                                                        fullWidth
                                                        color="primary"
                                                        startContent={<IconVideo size={18} />}
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
                                    <div className="flex flex-col items-center gap-4">
                                        <h3 className="text-lg font-medium">No upcoming sessions</h3>
                                        <p className="text-default-500">
                                            Enroll in a live course to see upcoming sessions
                                        </p>
                                        <Button as={Link} href="/courses?type=live" color="primary">
                                            Browse Live Courses
                                        </Button>
                                    </div>
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
                                    <Table aria-label="Past Sessions">
                                        <TableHeader>
                                            <TableColumn>SESSION</TableColumn>
                                            <TableColumn>DATE</TableColumn>
                                            <TableColumn>RECORDING</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {pastSessions.map((session: any) => (
                                                <TableRow key={session.id}>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-small">{session.title}</span>
                                                            <span className="text-tiny text-default-500">{session.courseTitle}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{session.date}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            size="sm"
                                                            variant="light"
                                                            color="primary"
                                                            startContent={<IconPlayerPlay size={16} />}
                                                        >
                                                            Watch
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            ) : (
                                <Card className="p-8 text-center" shadow="sm">
                                    <p className="text-default-500">No past sessions yet</p>
                                </Card>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
