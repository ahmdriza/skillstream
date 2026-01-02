'use client';

import Link from 'next/link';
import {
    Card,
    CardBody,
    Avatar,
    Progress,
    Chip,
    Button
} from '@heroui/react';
import { IconPlayerPlay, IconChevronRight } from '@tabler/icons-react';
import type { Course, Instructor, Enrollment } from '@/types';

interface CourseListProps {
    courses: Array<{
        course: Course;
        instructor?: Instructor;
        enrollment?: Enrollment;
    }>;
    showProgress?: boolean;
    maxItems?: number;
}

export function CourseList({ courses, showProgress = true, maxItems }: CourseListProps) {
    const displayCourses = maxItems ? courses.slice(0, maxItems) : courses;

    return (
        <div className="flex flex-col gap-3">
            {displayCourses.map(({ course, instructor, enrollment }) => (
                <Card
                    key={course.id}
                    isPressable
                    as={Link}
                    href={`/dashboard/courses/${course.id}/learn`}
                    className="w-full"
                    shadow="sm"
                >
                    <CardBody className="flex flex-row gap-4 p-3 overflow-visible items-center">
                        {/* Thumbnail */}
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="bg-white/90 rounded-full p-1">
                                    <IconPlayerPlay size={12} className="text-primary ml-0.5" />
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-small truncate pr-2">{course.title}</h4>
                                <Chip size="sm" variant="flat" color={course.type === 'live' ? 'danger' : 'primary'} className="h-5 text-tiny px-1">
                                    {course.type}
                                </Chip>
                            </div>

                            {instructor && (
                                <div className="flex items-center gap-1">
                                    <Avatar src={instructor.avatar} size="sm" className="w-4 h-4" />
                                    <span className="text-tiny text-default-500">{instructor.name}</span>
                                </div>
                            )}

                            {showProgress && enrollment && (
                                <div className="w-full mt-1">
                                    <div className="flex justify-between mb-0.5">
                                        <span className="text-tiny text-default-400">Progress</span>
                                        <span className="text-tiny font-medium">{enrollment.progress}%</span>
                                    </div>
                                    <Progress
                                        value={enrollment.progress}
                                        size="sm"
                                        color={enrollment.progress === 100 ? 'success' : 'primary'}
                                        aria-label="Course Progress"
                                    />
                                </div>
                            )}
                        </div>

                        <IconChevronRight size={18} className="text-default-300" />
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
