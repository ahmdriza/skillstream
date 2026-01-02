// API Client for SkillStream
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    headers?: Record<string, string>;
}

async function request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = config;

    const token = typeof window !== 'undefined'
        ? localStorage.getItem('skillstream_token')
        : null;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

import type { Course, User, Enrollment } from '@/types';

// API methods
export const api = {
    // Courses
    getCourses: () => request<Course[]>('/courses'),
    getCourse: (slug: string) => request<Course>(`/courses/${slug}`),

    // Auth
    login: (email: string, password: string) =>
        request<{ user: User; token: string }>('/auth/login', { method: 'POST', body: { email, password } }),
    register: (data: unknown) =>
        request<{ user: User; token: string }>('/auth/register', { method: 'POST', body: data }),

    // Enrollments
    getEnrollments: () => request<Enrollment[]>('/enrollments'),
    enroll: (courseId: string) =>
        request<Enrollment>('/enrollments', { method: 'POST', body: { courseId } }),

    // User
    getProfile: () => request<User>('/users/me'),
    updateProfile: (data: Partial<User>) =>
        request<User>('/users/me', { method: 'PUT', body: data }),
};

export default api;
