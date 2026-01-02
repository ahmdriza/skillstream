'use client';

import Link from 'next/link';
import {
    Card,
    CardBody,
    Button,
    Tab,
    Tabs,
    Badge,
    Avatar,
    Progress,
} from '@heroui/react';
import { IconPlayerPlay, IconCalendar } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import coursesData from '@/data/courses.json';
import usersData from '@/data/users.json';
import instructorsData from '@/data/instructors.json';
import type { Course, Instructor } from '@/types';

export default function MyCoursesPage() {
    const { user } = useAuth();
    const courses = coursesData.courses as Course[];
    const enrollments = usersData.enrollments;
    const instructors = instructorsData.instructors as Instructor[];

    // Get user's enrolled courses
    const userEnrollments = enrollments.filter(
        (e) => e.userId === user?.id || e.userId === 'user-1'
    );
    const enrolledCourses = userEnrollments.map((e) => {
        const course = courses.find((c) => c.id === e.courseId);
        return { ...course, enrollment: e };
    }).filter((c) => c.title);

    const recordedCourses = enrolledCourses.filter((c) => c.type === 'recorded');
    const liveCourses = enrolledCourses.filter((c) => c.type === 'live');

    const getInstructor = (instructorId: string) =>
        instructors.find((i) => i.id === instructorId);

    const CourseCard = ({ course }: { course: any }) => {
        const instructor = getInstructor(course.instructorId);
        const isLive = course.type === 'live';

        return (
            <Card className="w-full" shadow="sm">
                <CardBody className="p-0">
                    <div className="relative">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-3 left-3">
                            <Badge
                                content={isLive ? 'Live' : 'Recorded'}
                                color={isLive ? 'danger' : 'primary'}
                                variant="solid"
                                size="sm"
                                shape="rectangle"
                                className="font-semibold border-none px-2"
                            >
                                {/* invisible trigger since Badge wraps children */}
                                <div className="hidden" />
                            </Badge>
                            {/* HeroUI Badge usage might differ, using Chip styled div for reliability if needed, 
                                but Badge usually wraps an element. Re-implementing badge visually nicely. */}
                            <div className={`px-2 py-1 rounded text-xs font-semibold text-white ${isLive ? 'bg-red-500' : 'bg-blue-500'}`}>
                                {isLive ? 'Live' : 'Recorded'}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 flex flex-col gap-4">
                        <h3 className="text-lg font-bold line-clamp-2">{course.title}</h3>

                        {instructor && (
                            <div className="flex items-center gap-2">
                                <Avatar src={instructor.avatar} size="sm" isBordered />
                                <span className="text-small text-default-500">{instructor.name}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-default-500">Progress</span>
                                <span className="font-medium">{course.enrollment.progress}%</span>
                            </div>
                            <Progress
                                value={course.enrollment.progress}
                                size="sm"
                                color="primary"
                                aria-label="Course Progress"
                            />
                        </div>

                        <Button
                            as={Link}
                            href={`/dashboard/courses/${course.id}/learn`}
                            color="primary"
                            variant="flat"
                            startContent={isLive ? <IconCalendar size={18} /> : <IconPlayerPlay size={18} />}
                            className="font-medium mt-2"
                            fullWidth
                        >
                            {isLive ? 'View Sessions' : 'Continue Learning'}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        );
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Courses</h1>
                    <p className="text-default-500">Track your learning progress</p>
                </div>
                <Button
                    as={Link}
                    href="/courses"
                    color="primary"
                    variant="solid"
                >
                    Browse More Courses
                </Button>
            </div>

            <div className="flex w-full flex-col">
                <Tabs aria-label="Course Filters" color="primary" variant="underlined">
                    <Tab key="all" title={`All Courses (${enrolledCourses.length})`}>
                        <div className="mt-4">
                            {enrolledCourses.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {enrolledCourses.map((course: any) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-8 text-center" shadow="sm">
                                    <div className="flex flex-col items-center gap-4">
                                        <h3 className="text-lg font-medium">No courses yet</h3>
                                        <p className="text-default-500">
                                            Start your learning journey by enrolling in a course
                                        </p>
                                        <Button as={Link} href="/courses" color="primary">
                                            Browse Courses
                                        </Button>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </Tab>
                    <Tab key="recorded" title={`Recorded (${recordedCourses.length})`}>
                        <div className="mt-4">
                            {recordedCourses.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recordedCourses.map((course: any) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-8 text-center" shadow="sm">
                                    <p className="text-default-500">No recorded courses enrolled</p>
                                </Card>
                            )}
                        </div>
                    </Tab>
                    <Tab key="live" title={`Live (${liveCourses.length})`}>
                        <div className="mt-4">
                            {liveCourses.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {liveCourses.map((course: any) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-8 text-center" shadow="sm">
                                    <p className="text-default-500">No live courses enrolled</p>
                                </Card>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
