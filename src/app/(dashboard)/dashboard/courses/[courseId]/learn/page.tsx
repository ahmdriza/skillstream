'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
    Card,
    CardBody,
    Button,
    Progress,
    Accordion,
    AccordionItem,
    Listbox,
    ListboxItem,
    ScrollShadow,
} from '@heroui/react';
import {
    IconArrowLeft,
    IconPlayerPlay,
    IconCheck,
    IconLock,
    IconFile,
    IconQuestionMark,
    IconChevronLeft,
    IconChevronRight,
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
    // HeroUI Accordion uses Set or output of keys for selected keys
    const [openedModules, setOpenedModules] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (course?.curriculum && course.curriculum.length > 0) {
            const firstModule = course.curriculum[0];
            if (firstModule.lessons.length > 0) {
                setCurrentLesson(firstModule.lessons[0]);
                setOpenedModules(new Set([firstModule.id]));
            }
        }
    }, [course]);

    if (!course || course.type !== 'recorded') {
        notFound();
    }

    const curriculum = course.curriculum || [];
    const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
    const progress = (completedLessons.length / totalLessons) * 100;

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
            if (!openedModules.has(next.moduleId)) {
                const newSet = new Set(openedModules);
                newSet.add(next.moduleId);
                setOpenedModules(newSet);
            }
        }
    };

    const getLessonIcon = (lesson: Lesson) => {
        if (completedLessons.includes(lesson.id)) {
            return <IconCheck size={16} className="text-success" />;
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
        <div className="min-h-screen bg-default-50 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background border-b border-divider px-4 py-3 shadow-sm">
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
                            <p className="text-tiny text-default-500 uppercase font-bold">Course</p>
                            <h1 className="text-medium font-bold line-clamp-1">{course.title}</h1>
                        </div>
                    </div>
                    <div className="w-48 hidden sm:block">
                        <div className="flex justify-between mb-1">
                            <span className="text-tiny text-default-500">Progress</span>
                            <span className="text-tiny font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} size="sm" color="success" aria-label="Course Progress" />
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
                            <CardBody className="p-4 flex-row justify-between items-center bg-content1">
                                <Button
                                    variant="light"
                                    startContent={<IconChevronLeft size={16} />}
                                    onPress={() => navigateLesson('prev')}
                                >
                                    Previous
                                </Button>
                                <div className="text-center">
                                    <h3 className="font-semibold text-medium">{currentLesson?.title}</h3>
                                    <p className="text-small text-default-500">{currentLesson?.duration}</p>
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
                    <Card className="h-full lg:max-h-[calc(100vh-120px)] rounded-none lg:rounded-medium border-t lg:border-none border-divider">
                        <div className="p-4 border-b border-divider bg-default-50">
                            <h3 className="font-bold text-medium">Course Content</h3>
                            <p className="text-small text-default-500">
                                {completedLessons.length} of {totalLessons} lessons completed
                            </p>
                        </div>

                        <ScrollShadow className="h-[400px] lg:h-full overflow-y-auto">
                            <Accordion
                                selectionMode="multiple"
                                selectedKeys={openedModules}
                                onSelectionChange={(keys) => setOpenedModules(keys as Set<string>)}
                                variant="light"
                                itemClasses={{
                                    title: "text-small font-medium",
                                    trigger: "py-3",
                                    content: "pb-2 pt-0",
                                }}
                            >
                                {curriculum.map((module, moduleIndex) => (
                                    <AccordionItem
                                        key={module.id}
                                        aria-label={`Module ${moduleIndex + 1}`}
                                        title={`Module ${moduleIndex + 1}: ${module.title}`}
                                        subtitle={`${module.lessons.length} lessons`}
                                    >
                                        <div className="flex flex-col gap-1 w-full pl-2">
                                            {module.lessons.map((lesson) => {
                                                const isActive = currentLesson?.id === lesson.id;
                                                const isCompleted = completedLessons.includes(lesson.id);

                                                return (
                                                    <div
                                                        key={lesson.id}
                                                        className={`
                                                            group flex items-center justify-between p-2 rounded-medium cursor-pointer transition-colors
                                                            ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-default-100'}
                                                        `}
                                                        onClick={() => setCurrentLesson(lesson)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={isActive ? 'text-primary' : 'text-default-400'}>
                                                                {getLessonIcon(lesson)}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className={`text-small font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                                                                    {lesson.title}
                                                                </span>
                                                                <span className="text-tiny text-default-400">
                                                                    {lesson.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollShadow>
                    </Card>
                </div>
            </div>
        </div>
    );
}
