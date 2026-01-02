// Enrollment Types
export interface Enrollment {
    id: string;
    courseId: string;
    userId: string;
    enrolledAt: string;
    progress: number;
    lastAccessed: string;
    completedLessons: string[];
}

// Certificate Types
export interface Certificate {
    id: string;
    courseId: string;
    courseName: string;
    userName: string;
    completedAt: string;
    certificateUrl: string;
}
