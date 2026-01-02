// Course Types
export type CourseType = 'recorded' | 'live';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseStatus = 'draft' | 'published' | 'archived';

export interface Course {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    thumbnail: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    enrolledCount: number;
    category: string;
    level: CourseLevel;
    type: CourseType;
    instructorId: string;
    totalHours: number;
    lessonsCount: number;
    language: string;
    lastUpdated: string;
    features: string[];
    requirements: string[];
    whatYouLearn: string[];
}

export interface RecordedCourse extends Course {
    type: 'recorded';
    curriculum: CurriculumModule[];
}

export interface LiveCourse extends Course {
    type: 'live';
    schedule: LiveSession[];
    maxStudents: number;
    currentStudents: number;
    startDate: string;
    endDate: string;
}

export interface CurriculumModule {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'quiz' | 'assignment' | 'reading';
    isPreview?: boolean;
    isCompleted?: boolean;
}

export interface LiveSession {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'upcoming' | 'live' | 'completed';
    meetingUrl?: string;
    recordingUrl?: string;
}

// Instructor Types
export interface Instructor {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio: string;
    rating: number;
    reviewCount: number;
    studentsCount: number;
    coursesCount: number;
    socials?: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
}

// Category Types
export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    coursesCount: number;
}

// Review Types
export interface Review {
    id: string;
    courseId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    createdAt: string;
}
