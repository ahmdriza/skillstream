'use client';

import Link from 'next/link';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconClock, IconUsers, IconCalendar, IconStarFilled } from '@tabler/icons-react';
import type { Course, Instructor } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const Image = styled('img')({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

interface CourseCardProps {
    course: Course;
    instructor?: Instructor;
}

export function CourseCard({ course, instructor }: CourseCardProps) {
    const isLive = course.type === 'live';
    const href = `/courses/${course.type}/${course.slug}`;
    const router = useRouter();

    const handlePress = () => {
        router.push(href);
    }

    return (
        <Card
            shadow="sm"
            className="w-full h-full hover:scale-[1.02] hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20 bg-white/70 backdrop-blur-sm cursor-pointer"
            onClick={handlePress}
        >
            <CardBody className="overflow-visible p-0 relative">
                <Box sx={{ height: 180, borderRadius: 2, overflow: 'hidden' }}>
                    <Image
                        alt={course.title}
                        src={course.thumbnail}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/600x400?text=Course+Image';
                        }}
                    />
                </Box>
                <div className="absolute top-2 left-2 z-10 flex gap-2">
                    <Chip
                        label={isLive ? '🔴 Live Class' : 'Recorded'}
                        color={isLive ? "error" : "primary"}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                    />
                </div>
                {course.originalPrice && course.originalPrice > course.price && (
                    <div className="absolute top-2 right-2 z-10">
                        <Chip
                            label={`${Math.round((1 - course.price / course.originalPrice) * 100)}% OFF`}
                            color="success"
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                        />
                    </div>
                )}
            </CardBody>
            <CardFooter className="text-small justify-between flex-col items-start gap-2 p-4">
                <Chip size="small" variant="outlined" label={course.category} />

                <b className="text-large line-clamp-2">{course.title}</b>

                {instructor && (
                    <div className="flex gap-2 items-center">
                        <Avatar src={instructor.avatar} sx={{ width: 24, height: 24 }} />
                        <span className="text-gray-500">{instructor.name}</span>
                    </div>
                )}

                <div className="flex gap-2 items-center text-gray-500">
                    <IconStarFilled size={14} className="text-warning" />
                    <span className="font-semibold text-warning">{course.rating}</span>
                    <span className="text-xs">({course.reviewCount.toLocaleString()})</span>
                </div>

                <div className="flex gap-4 text-gray-400 text-xs w-full py-1">
                    {isLive ? (
                        <>
                            <div className="flex gap-1 items-center">
                                <IconCalendar size={14} />
                                <span>{(course as any).schedule?.length || 0} sessions</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <IconUsers size={14} />
                                <span>{(course as any).currentStudents}/{(course as any).maxStudents}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-1 items-center">
                                <IconClock size={14} />
                                <span>{course.totalHours}h</span>
                            </div>
                            <div>{course.lessonsCount} lessons</div>
                        </>
                    )}
                </div>

                <div className="flex justify-between items-center w-full mt-1">
                    <div className="flex gap-2 items-end">
                        <span className="text-large font-bold">{formatPrice(course.price)}</span>
                        {course.originalPrice && course.originalPrice > course.price && (
                            <span className="text-small text-gray-400 line-through">
                                {formatPrice(course.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
