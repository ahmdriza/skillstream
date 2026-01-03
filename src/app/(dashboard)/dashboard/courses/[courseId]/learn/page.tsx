'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
    Card,
    CardBody,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    LinearProgress,
    Box,
    Typography,
    Chip
} from '@mui/material';
import {
    IconArrowLeft,
    IconPlayerPlay,
    IconCheck,
    IconLock,
    IconFile,
    IconQuestionMark,
    IconChevronLeft,
    IconChevronRight,
    IconChevronDown,
} from '@tabler/icons-react';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import coursesData from '@/data/courses.json';
import type { RecordedCourse, Lesson } from '@/types';

export default function CourseLearnPage() {
    const params = useParams();
    const courseId = params.courseId as string;

    const courses = coursesData.courses as RecordedCourse[];
    const course = courses.find((c) => c.id === courseId || c.slug === courseId);

    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (course?.curriculum && course.curriculum.length > 0) {
            const firstModule = course.curriculum[0];
            if (firstModule.lessons.length > 0) {
                setCurrentLesson(firstModule.lessons[0]);
                setExpandedModules(new Set([firstModule.id]));
            }
        }
    }, [course]);

    if (!course || course.type !== 'recorded') {
        notFound();
    }

    const curriculum = course.curriculum || [];
    const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
    const progress = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

    const handleLessonComplete = () => {
        if (currentLesson && !completedLessons.includes(currentLesson.id)) {
            setCompletedLessons([...completedLessons, currentLesson.id]);
        }
    };

    const navigateLesson = (direction: 'prev' | 'next') => {
        let allLessons: { lesson: Lesson; moduleId: string }[] = [];
        curriculum.forEach((module) => {
            module.lessons.forEach((lesson) => {
                allLessons.push({ lesson, moduleId: module.id });
            });
        });

        const currentIndex = allLessons.findIndex((l) => l.lesson.id === currentLesson?.id);
        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (newIndex >= 0 && newIndex < allLessons.length) {
            const next = allLessons[newIndex];
            setCurrentLesson(next.lesson);
            if (!expandedModules.has(next.moduleId)) {
                const newSet = new Set(expandedModules);
                newSet.add(next.moduleId);
                setExpandedModules(newSet);
            }
        }
    };

    const toggleModule = (panelId: string) => {
        const newSet = new Set(expandedModules);
        if (newSet.has(panelId)) {
            newSet.delete(panelId);
        } else {
            newSet.add(panelId);
        }
        setExpandedModules(newSet);
    };

    const getLessonIcon = (lesson: Lesson) => {
        if (completedLessons.includes(lesson.id)) {
            return <IconCheck size={16} className="text-green-500" />;
        }
        switch (lesson.type) {
            case 'video':
                return <IconPlayerPlay size={16} />;
            case 'quiz':
                return <IconQuestionMark size={16} />;
            default:
                return <IconFile size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between max-w-[1600px] mx-auto w-full">
                    <div className="flex items-center gap-4">
                        <Button
                            as={Link}
                            href="/dashboard/courses"
                            isIconOnly
                            variant="light"
                            radius="full"
                        >
                            <IconArrowLeft size={20} />
                        </Button>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Course</p>
                            <h1 className="text-base font-bold line-clamp-1">{course.title}</h1>
                        </div>
                    </div>
                    <div className="w-48 hidden sm:block">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-xs font-medium">{Math.round(progress)}%</span>
                        </div>
                        <LinearProgress variant="determinate" value={progress} color="success" sx={{ height: 6, borderRadius: 3 }} />
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 lg:p-6">
                {/* Main Content */}
                <div className="lg:col-span-9 order-1 lg:order-1">
                    <div className="space-y-4">
                        {/* Video Player */}
                        <VideoPlayer
                            src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
                            poster={course.thumbnail}
                            title={currentLesson?.title}
                            onComplete={handleLessonComplete}
                        />

                        {/* Lesson Navigation */}
                        <Card shadow="sm" className="hidden sm:flex">
                            <CardBody className="p-4 flex-row justify-between items-center bg-white">
                                <Button
                                    variant="light"
                                    startContent={<IconChevronLeft size={16} />}
                                    onPress={() => navigateLesson('prev')}
                                >
                                    Previous
                                </Button>
                                <div className="text-center">
                                    <h3 className="font-semibold text-base">{currentLesson?.title}</h3>
                                    <p className="text-sm text-gray-500">{currentLesson?.duration}</p>
                                </div>
                                <Button
                                    variant="light"
                                    endContent={<IconChevronRight size={16} />}
                                    onPress={() => navigateLesson('next')}
                                >
                                    Next
                                </Button>
                            </CardBody>
                        </Card>

                        {/* Mobile Nav (Simpler) */}
                        <div className="flex justify-between sm:hidden px-4">
                            <Button size="sm" variant="flat" onPress={() => navigateLesson('prev')}>Prev</Button>
                            <Button size="sm" variant="flat" onPress={() => navigateLesson('next')}>Next</Button>
                        </div>

                        {/* Mark Complete Button */}
                        {currentLesson && !completedLessons.includes(currentLesson.id) && (
                            <Button
                                fullWidth
                                color="success"
                                variant="shadow"
                                startContent={<IconCheck size={16} />}
                                onPress={handleLessonComplete}
                                className="font-semibold"
                            >
                                Mark as Complete
                            </Button>
                        )}
                    </div>
                </div>

                {/* Sidebar - Curriculum */}
                <div className="lg:col-span-3 order-2 lg:order-2 h-full">
                    <Card className="h-full lg:max-h-[calc(100vh-120px)] rounded-none lg:rounded-lg border-t lg:border-none border-gray-200">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-bold text-base">Course Content</h3>
                            <p className="text-sm text-gray-500">
                                {completedLessons.length} of {totalLessons} lessons completed
                            </p>
                        </div>

                        <Box className="h-[400px] lg:h-full overflow-y-auto">
                            {curriculum.map((module, moduleIndex) => (
                                <Accordion
                                    key={module.id}
                                    expanded={expandedModules.has(module.id)}
                                    onChange={() => toggleModule(module.id)}
                                    disableGutters
                                    elevation={0}
                                    sx={{ '&:before': { display: 'none' }, borderBottom: '1px solid #e5e7eb' }}
                                >
                                    <AccordionSummary expandIcon={<IconChevronDown size={16} />}>
                                        <Box>
                                            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                                                Module {moduleIndex + 1}
                                            </Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'medium', lineHeight: 1.2 }}>
                                                {module.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {module.lessons.length} lessons
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 0 }}>
                                        <div className="flex flex-col w-full">
                                            {module.lessons.map((lesson) => {
                                                const isActive = currentLesson?.id === lesson.id;

                                                return (
                                                    <div
                                                        key={lesson.id}
                                                        className={`
                                                            group flex items-center justify-between p-3 cursor-pointer transition-colors border-l-2
                                                            ${isActive ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50 border-transparent'}
                                                        `}
                                                        onClick={() => setCurrentLesson(lesson)}
                                                    >
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className={isActive ? 'text-blue-500' : 'text-gray-400'}>
                                                                {getLessonIcon(lesson)}
                                                            </div>
                                                            <div className="flex flex-col min-w-0 flex-1">
                                                                <span className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                                                                    {lesson.title}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {lesson.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Card>
                </div>
            </div>
        </div>
    );
}
