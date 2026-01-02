'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    Card,
    CardBody,
    Button,
    Chip,
    Avatar,
    Tab,
    Tabs,
    Divider,
    Progress,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@heroui/react';
import {
    IconClock,
    IconCalendar,
    IconGlobe,
    IconCheck,
    IconStar,
    IconUsers,
    IconVideo,
} from '@tabler/icons-react';
import coursesData from '@/data/courses.json';
import instructorsData from '@/data/instructors.json';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { LiveCourse, Instructor } from '@/types';
import { formatPrice, formatTime } from '@/lib/utils';

interface PageProps {
    params: Promise<{ slug: string }>;
}

function StarRating({ value }: { value: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <IconStar
                    key={star}
                    size={16}
                    className={star <= Math.round(value) ? "text-warning fill-warning" : "text-default-300"}
                />
            ))}
        </div>
    );
}

export default async function LiveCourseDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const courses = coursesData.courses as LiveCourse[];
    const instructors = instructorsData.instructors as Instructor[];

    const course = courses.find((c) => c.slug === slug && c.type === 'live');

    if (!course) {
        notFound();
    }

    const instructor = instructors.find((i) => i.id === course.instructorId);
    const schedule = course.schedule || [];
    const spotsRemaining = course.maxStudents - course.currentStudents;
    const spotsPercentage = (course.currentStudents / course.maxStudents) * 100;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <div className="bg-content1 border-b border-divider py-16 dark">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-8 space-y-6">
                            <div className="flex gap-2 flex-wrap">
                                <Chip color="danger" variant="solid">🔴 Live Class</Chip>
                                <Chip variant="flat">{course.category}</Chip>
                                <Chip variant="flat">{course.level}</Chip>
                            </div>

                            <h1 className="text-4xl font-bold text-foreground">{course.title}</h1>
                            <p className="text-large text-default-500">{course.shortDescription}</p>

                            <div className="flex flex-wrap gap-6 text-default-500">
                                <div className="flex items-center gap-2">
                                    <StarRating value={course.rating} />
                                    <span className="text-warning font-bold">{course.rating}</span>
                                    <span>({course.reviewCount.toLocaleString()} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconUsers size={18} />
                                    <span>{course.currentStudents} enrolled</span>
                                </div>
                            </div>

                            {instructor && (
                                <div className="flex items-center gap-3">
                                    <Avatar src={instructor.avatar} size="sm" />
                                    <span className="text-default-500">Taught by <span className="text-primary font-medium">{instructor.name}</span></span>
                                </div>
                            )}

                            <div className="flex gap-6 text-default-500 pt-2">
                                <div className="flex items-center gap-2">
                                    <IconCalendar size={18} />
                                    <span>{schedule.length} live sessions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconClock size={18} />
                                    <span>{course.totalHours} hours total</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconGlobe size={18} />
                                    <span>{course.language}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-default-50 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left Content */}
                        <div className="md:col-span-8">
                            <Tabs
                                aria-label="Course Sections"
                                variant="underlined"
                                classNames={{
                                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                    cursor: "w-full bg-primary",
                                    tab: "max-w-fit px-0 h-12",
                                    tabContent: "group-data-[selected=true]:text-primary"
                                }}
                            >
                                <Tab key="overview" title="Overview">
                                    <div className="space-y-8 pt-6">
                                        {/* What You'll Learn */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {course.whatYouLearn.map((item, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <div className="mt-0.5 min-w-fit text-success">
                                                                <IconCheck size={18} />
                                                            </div>
                                                            <span className="text-small">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Live Course Format */}
                                        <Card shadow="sm" className="bg-primary-50 dark:bg-primary-900/10 border-primary-100">
                                            <CardBody className="p-6 flex-row gap-4 items-center">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <IconVideo size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold">Interactive Live Sessions</h3>
                                                    <p className="text-small text-default-500">
                                                        Join live video sessions, ask questions in real-time, and interact with your instructor and fellow students.
                                                    </p>
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Description */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">Description</h3>
                                                <div className="whitespace-pre-line text-default-500">
                                                    {course.description}
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Requirements */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                                                <ul className="list-disc pl-5 space-y-1 text-default-500">
                                                    {course.requirements.map((req, index) => (
                                                        <li key={index}>{req}</li>
                                                    ))}
                                                </ul>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Tab>

                                <Tab key="schedule" title="Schedule">
                                    <div className="pt-6">
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-6">Live Session Schedule</h3>

                                                <Table aria-label="Course Schedule">
                                                    <TableHeader>
                                                        <TableColumn>SESSION</TableColumn>
                                                        <TableColumn>DATE</TableColumn>
                                                        <TableColumn>TIME</TableColumn>
                                                        <TableColumn>STATUS</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {schedule.map((session, index) => (
                                                            <TableRow key={session.id}>
                                                                <TableCell>
                                                                    <span className="font-medium">Session {index + 1}: {session.title}</span>
                                                                </TableCell>
                                                                <TableCell>{session.date}</TableCell>
                                                                <TableCell>{formatTime(session.startTime)} - {formatTime(session.endTime)}</TableCell>
                                                                <TableCell>
                                                                    <Chip
                                                                        size="sm"
                                                                        variant="flat"
                                                                        color={
                                                                            session.status === 'live' ? 'danger' :
                                                                                session.status === 'upcoming' ? 'primary' : 'default'
                                                                        }
                                                                    >
                                                                        {session.status}
                                                                    </Chip>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Tab>

                                <Tab key="instructor" title="Instructor">
                                    <div className="pt-6">
                                        {instructor && (
                                            <Card shadow="sm">
                                                <CardBody className="p-6">
                                                    <div className="flex flex-col sm:flex-row gap-6">
                                                        <Avatar src={instructor.avatar} className="w-24 h-24 text-large" />
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h3 className="text-xl font-bold">{instructor.name}</h3>
                                                                <p className="text-default-500">{instructor.title}</p>
                                                            </div>
                                                            <div className="flex gap-6 text-small text-default-500">
                                                                <div className="flex items-center gap-1">
                                                                    <IconStar size={16} />
                                                                    <span>{instructor.rating} Rating</span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <IconUsers size={16} />
                                                                    <span>{instructor.studentsCount.toLocaleString()} Students</span>
                                                                </div>
                                                            </div>
                                                            <p className="text-default-500">{instructor.bio}</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        )}
                                    </div>
                                </Tab>

                                <Tab key="reviews" title="Reviews">
                                    <div className="pt-6">
                                        <Card shadow="sm" className="p-12 text-center">
                                            <p className="text-default-500">Reviews coming soon</p>
                                        </Card>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="md:col-span-4">
                            <div className="sticky top-24 space-y-4">
                                <Card shadow="md" className="overflow-visible">
                                    <CardBody className="p-0 overflow-visible">
                                        {/* Thumbnail */}
                                        <div className="relative">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full aspect-video object-cover rounded-t-lg"
                                            />
                                        </div>

                                        <div className="p-6 space-y-6">
                                            <div className="p-4 bg-warning-50 dark:bg-warning-900/10 rounded-medium">
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-medium">Spots Remaining</span>
                                                    <span className="font-bold text-warning">{spotsRemaining} of {course.maxStudents}</span>
                                                </div>
                                                <Progress value={spotsPercentage} color="warning" size="md" aria-label="Spots remaining" />
                                                <p className="text-tiny text-default-500 mt-2">Enroll soon - limited seats!</p>
                                            </div>

                                            <div className="flex items-end gap-3">
                                                <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                                                {course.originalPrice && course.originalPrice > course.price && (
                                                    <>
                                                        <span className="text-large text-default-400 line-through mb-1">
                                                            {formatPrice(course.originalPrice)}
                                                        </span>
                                                        <Chip color="danger" variant="flat" size="sm" className="mb-1">
                                                            {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                                                        </Chip>
                                                    </>
                                                )}
                                            </div>

                                            <Button fullWidth size="lg" color="danger" className="font-semibold shadow-lg shadow-danger/20">
                                                Enroll Now
                                            </Button>

                                            <p className="text-center text-small text-default-500">
                                                30-Day Money-Back Guarantee
                                            </p>

                                            <Divider />

                                            <div>
                                                <h4 className="font-semibold mb-3">This course includes:</h4>
                                                <ul className="space-y-2">
                                                    {course.features.map((feature, index) => (
                                                        <li key={index} className="flex gap-3 text-small text-default-500">
                                                            <IconCheck size={18} className="text-success min-w-4" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
