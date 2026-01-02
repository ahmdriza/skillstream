'use client';

import Link from 'next/link';
import {
    Card,
    CardBody,
    Button,
    Chip,
    Avatar,
    Progress,
    AvatarGroup,
} from '@heroui/react';
import {
    IconClock,
    IconTrophy,
    IconFileText,
    IconVideo,
    IconChevronRight,
} from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import coursesData from '@/data/courses.json';
import usersData from '@/data/users.json';
import instructorsData from '@/data/instructors.json';
import type { Course, Instructor, Enrollment } from '@/types';
import { StatCard } from '@/components/dashboard/StatCard';
import { SessionCalendar } from '@/components/dashboard/SessionCalendar';
import { CourseList } from '@/components/dashboard/CourseList';

export default function DashboardPage() {
    const { user } = useAuth();
    const courses = coursesData.courses as Course[];
    const enrollments = usersData.enrollments as Enrollment[];
    const instructors = instructorsData.instructors as Instructor[];

    // Get user's enrolled courses
    const userEnrollments = enrollments.filter(e => e.userId === user?.id || e.userId === 'user-1');

    // Create the format expected by CourseList
    const enrolledCoursesList = userEnrollments.map(e => {
        const course = courses.find(c => c.id === e.courseId);
        const instructor = instructors.find(i => i.id === course?.instructorId);
        if (!course) return null;
        return {
            course,
            instructor,
            enrollment: e
        };
    }).filter((item): item is { course: Course; instructor: Instructor | undefined; enrollment: Enrollment } => item !== null);

    // Stats
    const totalHoursLearned = 12.5;
    const certificatesEarned = usersData.certificates.filter(c => c.userId === user?.id || c.userId === 'user-1').length;
    const upcomingAssignments = 1;

    // Mock sessions for calendar
    const sessions = [
        {
            id: 's1',
            courseId: 'c1',
            title: 'Advanced UX Strategy',
            date: '2026-01-04',
            startTime: '10:00',
            endTime: '11:30',
            status: 'upcoming' as const,
            meetingUrl: '#'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        Welcome back, {user?.name?.split(' ')[0] || 'Alex'}! 👋
                    </h1>
                    <p className="text-default-500 mt-1">
                        You have 2 upcoming classes and 1 assignment due today.
                    </p>
                </div>
                <Button
                    as={Link}
                    href="/profile"
                    variant="flat"
                    color="primary"
                    className="shrink-0"
                >
                    Edit Profile
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    label="Hours Learned"
                    value={totalHoursLearned}
                    icon={<IconClock size={24} />}
                    color="primary"
                    trend={{ value: '+2.5h', direction: 'up' }}
                />
                <StatCard
                    label="Certificates"
                    value={certificatesEarned}
                    icon={<IconTrophy size={24} />}
                    color="warning"
                />
                <StatCard
                    label="Assignments Due"
                    value={upcomingAssignments}
                    icon={<IconFileText size={24} />}
                    color="danger"
                    subtext="1 Urgent"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Next Up - Live Session */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Next Up</h2>
                        <Card shadow="sm" className="w-full">
                            <CardBody className="p-0 flex flex-col sm:flex-row overflow-hidden">
                                <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80"
                                        alt="Class"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Chip color="danger" variant="solid" size="sm" className="font-bold">
                                            LIVE NOW
                                        </Chip>
                                    </div>
                                </div>
                                <div className="flex-1 p-5 flex flex-col gap-3">
                                    <Chip color="primary" variant="flat" size="sm" className="w-fit">
                                        Live Class
                                    </Chip>
                                    <div>
                                        <h3 className="text-xl font-bold">Advanced UX Strategy Workshop</h3>
                                        <p className="text-small text-default-500 line-clamp-2 mt-1">
                                            Join instructor Sarah Jenks for a deep dive into stakeholder mapping and strategy.
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-2">
                                        <Button
                                            color="primary"
                                            startContent={<IconVideo size={18} />}
                                            className="font-medium"
                                        >
                                            Join Session
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Continue Learning */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Continue Learning</h2>
                            <Button
                                as={Link}
                                href="/dashboard/courses"
                                variant="light"
                                color="primary"
                                endContent={<IconChevronRight size={16} />}
                                className="font-medium"
                            >
                                View all
                            </Button>
                        </div>
                        <CourseList
                            courses={enrolledCoursesList}
                            maxItems={2}
                            showProgress={true}
                        />
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Calendar Widget */}
                    <SessionCalendar
                        sessions={sessions}
                    />

                    {/* Upcoming Classes */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Upcoming Classes</h3>
                        <div className="space-y-3">
                            <Card shadow="sm" className="border-l-4 border-l-primary">
                                <CardBody className="p-3 flex flex-row gap-3">
                                    <div className="bg-default-100 rounded-lg p-2 flex flex-col items-center justify-center min-w-[3.5rem] h-14">
                                        <span className="text-[10px] font-bold text-default-500 uppercase">Jan</span>
                                        <span className="text-lg font-bold text-foreground">04</span>
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-tiny font-bold text-primary">10:00 AM - 11:30 AM</span>
                                        <span className="text-small font-bold truncate">Advanced UX Strategy</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <AvatarGroup size="sm" max={3} isBordered>
                                                <Avatar src="https://i.pravatar.cc/100?img=5" />
                                                <Avatar src="https://i.pravatar.cc/100?img=6" />
                                                <Avatar src="https://i.pravatar.cc/100?img=7" />
                                            </AvatarGroup>
                                            <span className="text-tiny text-default-400">joining</span>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    {/* Weekly Goal */}
                    <Card
                        shadow="sm"
                        className="bg-gradient-to-br from-blue-600 to-blue-400 text-white border-none"
                    >
                        <CardBody className="p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <IconTrophy size={20} className="text-yellow-300" />
                                <span className="font-semibold">Weekly Goal</span>
                            </div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-2xl font-bold">4/5</span>
                                <span className="text-small opacity-80 mb-1">lessons</span>
                            </div>
                            <Progress
                                value={80}
                                size="sm"
                                classNames={{
                                    indicator: "bg-yellow-400",
                                    track: "bg-white/20"
                                }}
                                aria-label="Weekly Goal Progress"
                            />
                            <p className="text-tiny mt-3 opacity-90">
                                Keep it up! Just one more lesson to hit your weekly target.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
