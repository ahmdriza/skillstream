'use client';

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar
} from '@mui/material';
import { Card, CardBody } from '@/components/ui/Card';
import { Tabs, Tab } from '@/components/ui/Tabs';
import {
    IconClock,
    IconCalendar,
    IconGlobe,
    IconCheck,
    IconStar,
    IconUsers,
    IconVideo,
    IconBook
} from '@tabler/icons-react';
import { formatTime } from '@/lib/utils';
import type { LiveCourse, Instructor } from '@/types';

interface LiveCourseDetailProps {
    course: LiveCourse;
    instructor?: Instructor;
}

function StarRating({ value }: { value: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <IconStar
                    key={star}
                    size={16}
                    className={star <= Math.round(value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
            ))}
        </div>
    );
}

export function LiveCourseDetail({ course, instructor }: LiveCourseDetailProps) {
    const schedule = course.schedule || [];

    return (
        <div className="flex flex-col font-sans text-gray-900">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-8 space-y-6">
                            <div className="flex gap-2 flex-wrap">
                                <Chip label="🔴 Live Class" color="error" size="small" />
                                <Chip label={course.category} variant="outlined" size="small" />
                                <Chip label={course.level} variant="outlined" size="small" />
                            </div>

                            <h1 className="text-4xl font-bold">{course.title}</h1>
                            <p className="text-lg text-gray-500">{course.shortDescription}</p>

                            <div className="flex flex-wrap gap-6 text-gray-500">
                                <div className="flex items-center gap-2">
                                    <StarRating value={course.rating} />
                                    <span className="text-yellow-500 font-bold">{course.rating}</span>
                                    <span>({course.reviewCount.toLocaleString()} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconUsers size={18} />
                                    <span>{course.currentStudents} enrolled</span>
                                </div>
                            </div>

                            {instructor && (
                                <div className="flex items-center gap-3">
                                    <Avatar src={instructor.avatar} sx={{ width: 32, height: 32 }} />
                                    <span className="text-gray-500">Taught by <span className="text-blue-600 font-medium">{instructor.name}</span></span>
                                </div>
                            )}

                            <div className="flex gap-6 text-gray-500 pt-2">
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
            <div className="flex-1 bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left Content */}
                        <div className="md:col-span-8">
                            <Tabs aria-label="Course Sections">
                                <Tab key="overview" title="Overview">
                                    <div className="space-y-8 pt-6">
                                        {/* What You'll Learn */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {course.whatYouLearn.map((item, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <div className="mt-0.5 min-w-fit text-green-500">
                                                                <IconCheck size={18} />
                                                            </div>
                                                            <span className="text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Live Course Format */}
                                        <Card shadow="sm" className="bg-blue-50 border-blue-100">
                                            <CardBody className="p-6 flex-row gap-4 items-center">
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                    <IconVideo size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold">Interactive Live Sessions</h3>
                                                    <p className="text-sm text-gray-500">
                                                        Join live video sessions, ask questions in real-time, and interact with your instructor and fellow students.
                                                    </p>
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Description */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">Description</h3>
                                                <div className="whitespace-pre-line text-gray-500">
                                                    {course.description}
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Requirements */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                                                <ul className="list-disc pl-5 space-y-1 text-gray-500">
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

                                                <TableContainer component={Paper} elevation={0} variant="outlined">
                                                    <Table aria-label="Course Schedule">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>SESSION</TableCell>
                                                                <TableCell>DATE</TableCell>
                                                                <TableCell>TIME</TableCell>
                                                                <TableCell>STATUS</TableCell>
                                                            </TableRow>
                                                        </TableHead>
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
                                                                            size="small"
                                                                            variant="filled"
                                                                            color={
                                                                                session.status === 'live' ? 'error' :
                                                                                    session.status === 'upcoming' ? 'primary' : 'default'
                                                                            }
                                                                            label={session.status}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
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
                                                        <Avatar src={instructor.avatar} sx={{ width: 96, height: 96 }} />
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h3 className="text-xl font-bold">{instructor.name}</h3>
                                                                <p className="text-gray-500">{instructor.title}</p>
                                                            </div>
                                                            <div className="flex gap-6 text-sm text-gray-500">
                                                                <div className="flex items-center gap-1">
                                                                    <IconStar size={16} />
                                                                    <span>{instructor.rating} Rating</span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <IconUsers size={16} />
                                                                    <span>{instructor.studentsCount.toLocaleString()} Students</span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <IconBook size={16} />
                                                                    <span>{instructor.coursesCount} Courses</span>
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-500">{instructor.bio}</p>
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
                                            <p className="text-gray-500">Reviews coming soon</p>
                                        </Card>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
