'use client';

import { useState, useEffect } from 'react';
import usersData from '@/data/users.json';
import type { Enrollment } from '@/types/enrollment';

export function useEnrollment(userId?: string) {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const allEnrollments = usersData.enrollments as Enrollment[];

        if (userId) {
            setEnrollments(allEnrollments.filter(e => e.userId === userId));
        } else {
            setEnrollments(allEnrollments);
        }

        setLoading(false);
    }, [userId]);

    const isEnrolled = (courseId: string) => {
        return enrollments.some(e => e.courseId === courseId);
    };

    const getProgress = (courseId: string) => {
        const enrollment = enrollments.find(e => e.courseId === courseId);
        return enrollment?.progress || 0;
    };

    return { enrollments, loading, isEnrolled, getProgress };
}
