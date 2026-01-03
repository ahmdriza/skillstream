'use client';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Avatar,
    Typography,
    Box
} from '@mui/material';
import { Card, CardBody } from '@/components/ui/Card';
import { Tabs, Tab } from '@/components/ui/Tabs';
import {
    IconClock,
    IconBook,
    IconGlobe,
    IconCheck,
    IconPlayerPlay,
    IconLock,
    IconStar,
    IconUsers,
    IconChevronDown,
} from '@tabler/icons-react';
import type { RecordedCourse, Instructor } from '@/types';

interface RecordedCourseDetailProps {
    course: RecordedCourse;
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

export function RecordedCourseDetail({ course, instructor }: RecordedCourseDetailProps) {
    const curriculum = course.curriculum || [];

    return (
        <div className="flex flex-col font-sans text-gray-900">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-8 space-y-6">
                            <div className="flex gap-2 flex-wrap">
                                <Chip label="Recorded" color="primary" size="small" />
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
                                    <span>{course.enrolledCount.toLocaleString()} students</span>
                                </div>
                            </div>

                            {instructor && (
                                <div className="flex items-center gap-3">
                                    <Avatar src={instructor.avatar} sx={{ width: 32, height: 32 }} />
                                    <span className="text-gray-500">Created by <span className="text-blue-600 font-medium">{instructor.name}</span></span>
                                </div>
                            )}

                            <div className="flex gap-6 text-gray-500 pt-2">
                                <div className="flex items-center gap-2">
                                    <IconClock size={18} />
                                    <span>{course.totalHours} hours</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconBook size={18} />
                                    <span>{course.lessonsCount} lessons</span>
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

                                <Tab key="curriculum" title="Curriculum">
                                    <div className="pt-6">
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="text-xl font-bold">Course Curriculum</h3>
                                                    <span className="text-sm text-gray-500">
                                                        {curriculum.length} modules • {course.lessonsCount} lessons
                                                    </span>
                                                </div>

                                                <div>
                                                    {curriculum.map((module, moduleIndex) => (
                                                        <Accordion key={module.id} disableGutters>
                                                            <AccordionSummary expandIcon={<IconChevronDown size={18} />}>
                                                                <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'medium' }}>
                                                                    Module {moduleIndex + 1}
                                                                </Typography>
                                                                <Typography sx={{ color: 'text.secondary' }}>{module.title}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="flex flex-col gap-2">
                                                                    {module.lessons.map((lesson) => (
                                                                        <div key={lesson.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100">
                                                                            <div className="flex items-center gap-3">
                                                                                {lesson.isPreview ? (
                                                                                    <IconPlayerPlay size={18} className="text-blue-600" />
                                                                                ) : (
                                                                                    <IconLock size={18} className="text-gray-400" />
                                                                                )}
                                                                                <span className="text-sm">{lesson.title}</span>
                                                                                {lesson.isPreview && (
                                                                                    <Chip size="small" label="Preview" color="primary" variant="outlined" sx={{ height: 20, fontSize: 10 }} />
                                                                                )}
                                                                            </div>
                                                                            <span className="text-xs text-gray-400">{lesson.duration}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    ))}
                                                </div>
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
