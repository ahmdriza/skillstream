// App Constants
export const APP_NAME = 'SkillStream';
export const APP_DESCRIPTION = 'Master new skills with live instructor-led classes or self-paced recorded courses.';

// Routes
export const ROUTES = {
    HOME: '/',
    COURSES: '/courses',
    COURSE_DETAIL: (type: string, slug: string) => `/courses/${type}/${slug}`,
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    ABOUT: '/about',
    CONTACT: '/contact',
};

// Course Types
export const COURSE_TYPES = {
    RECORDED: 'recorded',
    LIVE: 'live',
} as const;

// Course Levels
export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

// Categories
export const CATEGORIES = [
    'Development',
    'Design',
    'Business',
    'Marketing',
    'Data Science',
    'Personal Development',
    'Photography',
    'Music',
] as const;
