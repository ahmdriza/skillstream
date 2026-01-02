'use client';

import { useState, useEffect } from 'react';
import coursesData from '@/data/courses.json';
import type { Course } from '@/types/course';

export function useCourses(type?: 'recorded' | 'live' | 'all') {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const allCourses = coursesData.courses as Course[];

        if (type && type !== 'all') {
            setCourses(allCourses.filter(c => c.type === type));
        } else {
            setCourses(allCourses);
        }

        setLoading(false);
    }, [type]);

    return { courses, loading };
}
