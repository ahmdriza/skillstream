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
│   │   │   ├── recorded/[slug]/page.tsx
│   │   │   └── live/[slug]/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── (dashboard)/                   # Dashboard route group
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── courses/
│   │       │   ├── page.tsx
│   │       │   └── [courseId]/learn/page.tsx  ✓ NEW
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
│   │   ├── Button.tsx                 ✓
│   │   ├── Card.tsx                   ✓
│   │   ├── Input.tsx                  ✓
│   │   ├── Modal.tsx                  ✓
│   │   └── index.ts
│   │
│   ├── layout/
│   │   ├── Header.tsx                 ✓
│   │   ├── Footer.tsx                 ✓
│   │   ├── Sidebar.tsx                ✓ NEW
│   │   ├── DashboardNav.tsx           ✓ NEW
│   │   └── index.ts
│   │
│   ├── courses/
│   │   ├── CourseCard.tsx             ✓
│   │   ├── CourseGrid.tsx             ✓ NEW
│   │   ├── CourseFilter.tsx           ✓ NEW
│   │   ├── VideoPlayer.tsx            ✓ NEW
│   │   ├── LiveSessionCard.tsx        ✓ NEW
│   │   ├── EnrollmentButton.tsx       ✓ NEW
│   │   └── index.ts
│   │
│   ├── dashboard/
│   │   ├── ProgressBar.tsx            ✓ NEW
│   │   ├── SessionCalendar.tsx        ✓ NEW
│   │   ├── CourseList.tsx             ✓ NEW
│   │   ├── StatCard.tsx               ✓ NEW
│   │   └── index.ts
│   │
│   └── profile/
│       ├── ProfileHeader.tsx          ✓ NEW
│       ├── EditProfile.tsx            ✓ NEW
│       ├── AchievementBadge.tsx       ✓ NEW
│       └── index.ts
│
├── context/
│   ├── AuthContext.tsx                ✓
│   └── ThemeContext.tsx               ✓
│
├── lib/
│   ├── api.ts                         ✓
│   ├── auth.ts                        ✓
│   ├── constants.ts                   ✓
│   └── utils.ts                       ✓
│
├── types/
│   ├── course.ts                      ✓
│   ├── user.ts                        ✓
│   ├── enrollment.ts                  ✓
│   ├── session.ts                     ✓
│   └── index.ts
│
└── data/
    ├── courses.json                   ✓
    ├── instructors.json               ✓
    ├── categories.json                ✓
    └── users.json                     ✓
```

## Components Summary

### UI Components (`/components/ui/`)
- **Button** - Wrapper around Mantine Button with loading state
- **Card** - Wrapper around Mantine Card with hover option
- **Input** - Text/Password input with type switching
- **Modal** - Centered modal dialog

### Layout Components (`/components/layout/`)
- **Header** - Main navigation header with search and auth
- **Footer** - Site footer with links and social icons
- **Sidebar** - Dashboard sidebar navigation
- **DashboardNav** - Horizontal dashboard navigation

### Course Components (`/components/courses/`)
- **CourseCard** - Course preview card with image and details
- **CourseGrid** - Grid/list layout for courses
- **CourseFilter** - Expandable filter panel for catalog
- **VideoPlayer** - Video player with controls and progress
- **LiveSessionCard** - Live session card with status
- **EnrollmentButton** - Enroll button with auth check

### Dashboard Components (`/components/dashboard/`)
- **ProgressBar** - Simple and multi-section progress bars
- **SessionCalendar** - Calendar with session indicators
- **CourseList** - List of enrolled courses with progress
- **StatCard** - Statistics card with icon

### Profile Components (`/components/profile/`)
- **ProfileHeader** - User profile header with avatar
- **EditProfile** - Profile editing form
- **AchievementBadge** - Achievement/badge display
