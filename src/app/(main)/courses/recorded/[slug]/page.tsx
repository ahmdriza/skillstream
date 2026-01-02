import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import instructorsData from '@/data/instructors.json';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { RecordedCourse, Instructor } from '@/types';
import { RecordedCourseDetail } from '@/components/courses/RecordedCourseDetail';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function RecordedCourseDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const courses = coursesData.courses as RecordedCourse[];
    const instructors = instructorsData.instructors as Instructor[];

    const course = courses.find((c) => c.slug === slug && c.type === 'recorded');

    if (!course) {
        notFound();
    }

    const instructor = instructors.find((i) => i.id === course.instructorId);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <RecordedCourseDetail course={course} instructor={instructor} />
            <Footer />
        </div>
    );
}
