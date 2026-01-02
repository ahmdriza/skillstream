'use client';

import { CourseCard } from './CourseCard';
import type { Course, Instructor } from '@/types';

interface CourseGridProps {
    courses: Course[];
    instructors?: Instructor[];
    getInstructor?: (instructorId: string) => Instructor | undefined;
    viewMode?: 'grid' | 'list';
    className?: string;
}

export function CourseGrid({
    courses,
    instructors = [],
    getInstructor,
    viewMode = 'grid',
    className = '',
}: CourseGridProps) {
    const findInstructor = getInstructor || ((id: string) =>
        instructors.find((i) => i.id === id)
    );

    const gridClasses = viewMode === 'grid'
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        : "grid grid-cols-1 gap-4";

    return (
        <div className={`${gridClasses} ${className}`}>
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    instructor={findInstructor(course.instructorId)}
                />
            ))}
        </div>
    );
}
