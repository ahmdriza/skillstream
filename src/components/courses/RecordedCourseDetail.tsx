'use client';

import {
    Card,
    CardBody,
    Button,
    Chip,
    Avatar,
    Tab,
    Tabs,
    Accordion,
    AccordionItem,
    Divider,
} from '@heroui/react';
import {
    IconClock,
    IconBook,
    IconGlobe,
    IconCheck,
    IconPlayerPlay,
    IconLock,
    IconStar,
    IconUsers,
} from '@tabler/icons-react';
import { formatPrice } from '@/lib/utils';
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
                    className={star <= Math.round(value) ? "text-warning fill-warning" : "text-default-300"}
                />
            ))}
        </div>
    );
}

export function RecordedCourseDetail({ course, instructor }: RecordedCourseDetailProps) {
    const curriculum = course.curriculum || [];

    return (
        <div className="flex flex-col font-sans text-foreground">
            {/* Hero Section */}
            <div className="bg-content1 border-b border-divider py-16 dark">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-8 space-y-6">
                            <div className="flex gap-2 flex-wrap">
                                <Chip color="primary" variant="solid">Recorded</Chip>
                                <Chip variant="flat">{course.category}</Chip>
                                <Chip variant="flat">{course.level}</Chip>
                            </div>

                            <h1 className="text-4xl font-bold text-foreground">{course.title}</h1>
                            <p className="text-large text-default-500">{course.shortDescription}</p>

                            <div className="flex flex-wrap gap-6 text-default-500">
                                <div className="flex items-center gap-2">
                                    <StarRating value={course.rating} />
                                    <span className="text-warning font-bold">{course.rating}</span>
                                    <span>({course.reviewCount.toLocaleString()} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconUsers size={18} />
                                    <span>{course.enrolledCount.toLocaleString()} students</span>
                                </div>
                            </div>

                            {instructor && (
                                <div className="flex items-center gap-3">
                                    <Avatar src={instructor.avatar} size="sm" />
                                    <span className="text-default-500">Created by <span className="text-primary font-medium">{instructor.name}</span></span>
                                </div>
                            )}

                            <div className="flex gap-6 text-default-500 pt-2">
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
            <div className="flex-1 bg-default-50 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left Content */}
                        <div className="md:col-span-8">
                            <Tabs
                                aria-label="Course Sections"
                                variant="underlined"
                                classNames={{
                                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                    cursor: "w-full bg-primary",
                                    tab: "max-w-fit px-0 h-12",
                                    tabContent: "group-data-[selected=true]:text-primary"
                                }}
                            >
                                <Tab key="overview" title="Overview">
                                    <div className="space-y-8 pt-6">
                                        {/* What You'll Learn */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {course.whatYouLearn.map((item, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <div className="mt-0.5 min-w-fit text-success">
                                                                <IconCheck size={18} />
                                                            </div>
                                                            <span className="text-small">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Description */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">Description</h3>
                                                <div className="whitespace-pre-line text-default-500">
                                                    {course.description}
                                                </div>
                                            </CardBody>
                                        </Card>

                                        {/* Requirements */}
                                        <Card shadow="sm">
                                            <CardBody className="p-6">
                                                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                                                <ul className="list-disc pl-5 space-y-1 text-default-500">
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
                                                    <span className="text-small text-default-500">
                                                        {curriculum.length} modules • {course.lessonsCount} lessons
                                                    </span>
                                                </div>

                                                <Accordion variant="splitted">
                                                    {curriculum.map((module, moduleIndex) => (
                                                        <AccordionItem
                                                            key={module.id}
                                                            aria-label={`Module ${moduleIndex + 1}`}
                                                            title={`Module ${moduleIndex + 1}: ${module.title}`}
                                                            subtitle={`${module.lessons.length} lessons`}
                                                        >
                                                            <div className="flex flex-col gap-2 pb-2">
                                                                {module.lessons.map((lesson) => (
                                                                    <div key={lesson.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-default-100">
                                                                        <div className="flex items-center gap-3">
                                                                            {lesson.isPreview ? (
                                                                                <IconPlayerPlay size={18} className="text-primary" />
                                                                            ) : (
                                                                                <IconLock size={18} className="text-default-400" />
                                                                            )}
                                                                            <span className="text-small">{lesson.title}</span>
                                                                            {lesson.isPreview && (
                                                                                <Chip size="sm" variant="flat" color="primary" className="h-5 text-[10px]">Preview</Chip>
                                                                            )}
                                                                        </div>
                                                                        <span className="text-tiny text-default-400">{lesson.duration}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
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
                                                        <Avatar src={instructor.avatar} className="w-24 h-24 text-large" />
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h3 className="text-xl font-bold">{instructor.name}</h3>
                                                                <p className="text-default-500">{instructor.title}</p>
                                                            </div>
                                                            <div className="flex gap-6 text-small text-default-500">
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
                                                            <p className="text-default-500">{instructor.bio}</p>
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
                                            <p className="text-default-500">Reviews coming soon</p>
                                        </Card>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="md:col-span-4">
                            <div className="sticky top-24 space-y-4">
                                <Card shadow="md" className="overflow-visible">
                                    <CardBody className="p-0 overflow-visible">
                                        {/* Thumbnail with overlay if needed */}
                                        <div className="relative">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full aspect-video object-cover rounded-t-lg"
                                            />
                                            {/* Play button overlay could go here */}
                                        </div>

                                        <div className="p-6 space-y-6">
                                            <div className="flex items-end gap-3">
                                                <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                                                {course.originalPrice && course.originalPrice > course.price && (
                                                    <>
                                                        <span className="text-large text-default-400 line-through mb-1">
                                                            {formatPrice(course.originalPrice)}
                                                        </span>
                                                        <Chip color="danger" variant="flat" size="sm" className="mb-1">
                                                            {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                                                        </Chip>
                                                    </>
                                                )}
                                            </div>

                                            <Button fullWidth size="lg" color="primary" className="font-semibold shadow-lg shadow-primary/20">
                                                Enroll Now
                                            </Button>

                                            <p className="text-center text-small text-default-500">
                                                30-Day Money-Back Guarantee
                                            </p>

                                            <Divider />

                                            <div>
                                                <h4 className="font-semibold mb-3">This course includes:</h4>
                                                <ul className="space-y-2">
                                                    {course.features.map((feature, index) => (
                                                        <li key={index} className="flex gap-3 text-small text-default-500">
                                                            <IconCheck size={18} className="text-success min-w-4" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
