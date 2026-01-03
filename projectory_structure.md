# SkillStream Frontend Structure

This project follows the structure defined in `structure.md`.

```
src/
├── app/
│   ├── (auth)/                        # Auth route group
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   │
│   ├── (main)/                        # Main public pages route group
│   │   ├── page.tsx                   # Homepage
│   │   ├── courses/
│   │   │   ├── page.tsx               # Catalog
│   │   │   ├── recorded/
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── live/
│   │   │       └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── (dashboard)/                   # Dashboard route group
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── courses/
│   │       │   ├── page.tsx
│   │       │   └── [courseId]/
│   │       │       └── learn/page.tsx
│   │       ├── sessions/page.tsx
│   │       ├── progress/page.tsx
│   │       └── certificates/page.tsx
│   │
│   ├── profile/page.tsx
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── ui/                            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   └── index.ts
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DashboardNav.tsx
│   │   └── index.ts
│   │
│   ├── courses/
│   │   ├── CourseCard.tsx
│   │   ├── CourseGrid.tsx
│   │   ├── CourseFilter.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── LiveSessionCard.tsx
│   │   ├── EnrollmentButton.tsx
│   │   ├── LiveCourseDetail.tsx
│   │   ├── RecordedCourseDetail.tsx
│   │   └── index.ts
│   │
│   ├── dashboard/
│   │   ├── ProgressBar.tsx
│   │   ├── SessionCalendar.tsx
│   │   ├── CourseList.tsx
│   │   ├── StatCard.tsx
│   │   └── index.ts
│   │
│   └── profile/
│       ├── ProfileHeader.tsx
│       ├── EditProfile.tsx
│       ├── AchievementBadge.tsx
│       └── index.ts
│
├── context/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── constants.ts
│   └── utils.ts
│
├── types/
│   ├── course.ts
│   ├── user.ts
│   ├── enrollment.ts
│   ├── session.ts
│   └── index.ts
│
└── data/
    ├── courses.json
    ├── instructors.json
    ├── categories.json
    └── users.json
```

## Components Summary

### UI Components (`/components/ui/`)
- **Button** - Custom button component with loading state and variants.
- **Card** - Reusable card container with hover effects.
- **Checkbox** - Checkbox input component.
- **Input** - Text/Password input with validation states.
- **Modal** - Accessible modal dialog for overlays.
- **Tabs** - Tabbed interface component.

### Layout Components (`/components/layout/`)
- **Header** - Main navigation header with responsive mobile menu.
- **Footer** - Site footer with sitemap and social links.
- **Sidebar** - Vertical navigation sidebar for the dashboard.
- **DashboardNav** - Top navigation bar for the dashboard area.

### Course Components (`/components/courses/`)
- **CourseCard** - Card displaying course summary (image, title, instructor).
- **CourseGrid** - Responsive grid or list layout for displaying courses.
- **CourseFilter** - Sidebar or modal for filtering courses by category, level, etc.
- **VideoPlayer** - Custom video player for course content.
- **LiveSessionCard** - Card specifically for displaying upcoming live sessions.
- **EnrollmentButton** - Action button handling course enrollment logic.
- **LiveCourseDetail** - Detailed view for live courses.
- **RecordedCourseDetail** - Detailed view for recorded courses.

### Dashboard Components (`/components/dashboard/`)
- **ProgressBar** - Visual indicator of course or session progress.
- **SessionCalendar** - Calendar view of scheduled sessions.
- **CourseList** - List view of enrolled courses in the dashboard.
- **StatCard** - Card displaying key metrics (e.g., hours learned, courses completed).

### Profile Components (`/components/profile/`)
- **ProfileHeader** - Header section of the user profile with avatar and basic info.
- **EditProfile** - Form for updating user profile details.
- **AchievementBadge** - Display component for earned certificates and badges.
