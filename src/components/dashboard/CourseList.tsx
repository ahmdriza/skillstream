'use client';

import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Avatar, LinearProgress, Chip } from '@mui/material';
import { Button } from '@/components/ui/Button';
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
                <div key={course.id} className="w-full">
                    {/* Link wrapper needs to be outside or handled as button */}
                    <Card
                    // className="w-full cursor-pointer hover:shadow-md transition-shadow"
                    // shadow="sm"
                    // MUI Card onClick
                    >
                        <Button
                            as={Link}
                            href={`/dashboard/courses/${course.id}/learn`}
                            variant="text"
                            className="w-full p-0 h-auto block text-left normal-case"
                            sx={{ color: 'inherit', display: 'block' }}
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
                                            <IconPlayerPlay size={12} className="text-blue-600 ml-0.5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 flex flex-col gap-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-small truncate pr-2">{course.title}</h4>
                                        <Chip
                                            size="small"
                                            variant="outlined"
                                            color={course.type === 'live' ? 'error' : 'primary'}
                                            label={course.type}
                                            sx={{ height: 20, fontSize: '0.625rem', px: 0.5 }}
                                        />
                                    </div>

                                    {instructor && (
                                        <div className="flex items-center gap-1">
                                            <Avatar src={instructor.avatar} sx={{ width: 16, height: 16 }} />
                                            <span className="text-xs text-gray-500">{instructor.name}</span>
                                        </div>
                                    )}

                                    {showProgress && enrollment && (
                                        <div className="w-full mt-1">
                                            <div className="flex justify-between mb-0.5">
                                                <span className="text-xs text-gray-400">Progress</span>
                                                <span className="text-xs font-medium">{enrollment.progress}%</span>
                                            </div>
                                            <LinearProgress
                                                variant="determinate"
                                                value={enrollment.progress}
                                                color={enrollment.progress === 100 ? 'success' : 'primary'}
                                                sx={{ height: 4, borderRadius: 2 }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <IconChevronRight size={18} className="text-gray-300" />
                            </CardBody>
                        </Button>
                    </Card>
                </div>
            ))}
        </div>
    );
}
