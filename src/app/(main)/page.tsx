'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Chip, Avatar, AvatarGroup } from '@mui/material';
import {
  IconPlayerPlay,
  IconUsers,
  IconBook,
  IconStar,
  IconCode,
  IconPalette,
  IconBriefcase,
  IconChartLine,
  IconChartBar,
  IconUser,
  IconCamera,
  IconMusic,
  IconArrowRight,
  IconCalendar,
  IconStarFilled,
} from '@tabler/icons-react';
import coursesData from '@/data/courses.json';
import instructorsData from '@/data/instructors.json';
import categoriesData from '@/data/categories.json';
import { CourseCard } from '@/components/courses/CourseCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Course, Instructor, Category } from '@/types';

// Icon mapping for categories
const categoryIcons: Record<string, typeof IconCode> = {
  IconCode,
  IconPalette,
  IconBriefcase,
  IconChartLine,
  IconChartBar,
  IconUser,
  IconCamera,
  IconMusic,
};

export default function HomePage() {
  const courses = coursesData.courses as Course[];
  const instructors = instructorsData.instructors as Instructor[];
  const categories = categoriesData.categories as Category[];

  const featuredCourses = courses.slice(0, 4);
  const liveCourses = courses.filter(c => c.type === 'live');
  const upcomingSessions = liveCourses.slice(0, 3);

  const getInstructor = (instructorId: string) =>
    instructors.find(i => i.id === instructorId);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-50/50 via-white to-transparent pointer-events-none" />
          <div className="absolute -top-[20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none animate-pulse-slow" />
          <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-300/10 blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }} />

          <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-tiny font-bold text-primary uppercase tracking-wider">New Live Courses Available</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
                  Master Skills, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                    Shape Future.
                  </span>
                </h1>

                <p className="text-xl text-default-500 max-w-xl leading-relaxed">
                  Join thousands of learners achieving their goals with our flexible,
                  instructor-led live classes and premium on-demand content.
                </p>

                <div className="flex flex-wrap gap-4 mt-2">
                  <Button
                    as={Link}
                    href="/courses"
                    size="lg"
                    color="primary"
                    className="font-semibold shadow-lg shadow-blue-500/30 px-8"
                    radius="full"
                  >
                    Browse Courses
                  </Button>
                  <Button
                    variant="bordered"
                    size="lg"
                    radius="full"
                    className="bg-white/50 backdrop-blur-md border-default-200"
                    startContent={<div className="p-1 bg-default-100 rounded-full"><IconPlayerPlay size={14} className="ml-0.5" /></div>}
                  >
                    Watch Showreel
                  </Button>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-10 h-10 border-2 border-white shadow-sm" />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 text-warning">
                      {[1, 2, 3, 4, 5].map(i => <IconStarFilled key={i} size={14} />)}
                    </div>
                    <span className="text-small font-medium text-default-500">Loved by 10,000+ students</span>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block perspective-1000">
                <div className="relative z-10 animate-float">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border-4 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                      alt="Students learning"
                      className="w-full h-auto object-cover"
                    />

                    {/* Glass Card Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <Card className="bg-white/80 backdrop-blur-md border border-white/40 shadow-xl" radius="lg">
                        <CardBody className="flex flex-row items-center gap-4 p-4">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary">
                            <IconCalendar size={24} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-lg">Next Live Session</span>
                            <span className="text-default-500">Web Development Bootcamp • Starts in 2h</span>
                          </div>
                          <Button size="sm" color="primary" className="ml-auto">Join</Button>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements around image */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600 rounded-full blur-2xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section with Glassmorphism */}
        <div className="container mx-auto px-6 -mt-10 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: IconUsers, label: 'Active Learners', value: '12.5k+' },
              { icon: IconUser, label: 'Expert Mentors', value: '450+' },
              { icon: IconBook, label: 'Premium Courses', value: '1.2k+' },
              { icon: IconStar, label: 'Student Rating', value: '4.9/5' },
            ].map((stat, i) => (
              <Card key={i} className="border border-default-100 shadow-lg shadow-default-100/50 bg-white/80 backdrop-blur-md hover:-translate-y-1 transition-transform">
                <CardBody className="flex flex-row items-center gap-4 p-6">
                  <div className="p-3 rounded-2xl bg-primary-50 text-primary mb-auto">
                    <stat.icon size={26} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    <span className="text-small font-medium text-default-500">{stat.label}</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <section className="py-32 bg-background relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex justify-between items-end mb-12">
              <div className="max-w-md">
                <span className="text-primary font-bold uppercase tracking-widest text-xs">Discover</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">Explore Categories</h2>
                <p className="text-default-500 mt-2">Find the perfect path for your career growth from our diverse catalog.</p>
              </div>
              <Button as={Link} href="/courses" variant="light" color="primary" className="font-medium" endContent={<IconArrowRight size={16} />}>
                View All Categories
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.icon] || IconCode;
                return (
                  <Link
                    key={category.id}
                    href={`/courses?category=${category.slug}`}
                    className="group"
                  >
                    <Card shadow="sm" className="h-full border border-transparent hover:border-primary/20 hover:shadow-md transition-all">
                      <CardBody className="flex flex-col items-center justify-center p-6 gap-3 text-center">
                        <div className="p-3 rounded-full bg-default-100 text-default-500 group-hover:bg-primary group-hover:text-white transition-colors">
                          <IconComponent size={24} />
                        </div>
                        <span className="font-semibold text-small">{category.name}</span>
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-24 bg-default-50/50 border-y border-default-100">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold">Featured Courses</h2>
                <p className="text-default-500">Hand-picked premium content for you</p>
              </div>
              <Button
                as={Link}
                href="/courses"
                radius="full"
                className="bg-white border hover:bg-gray-50 font-medium"
                variant="bordered"
                endContent={<IconArrowRight size={16} />}
              >
                View Catalog
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  instructor={getInstructor(course.instructorId)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-x-6 top-0 bottom-0 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="h-full flex flex-col items-center justify-center text-center px-6 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Start Your Learning Journey
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Join a community of thousands of ambitious learners.
                Unlock your potential today with SkillStream Premium.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  as={Link}
                  href="/register"
                  size="lg"
                  radius="full"
                  className="bg-white text-blue-600 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-md px-8"
                >
                  Get Started for Free
                </Button>
                <Button
                  as={Link}
                  href="/courses"
                  size="lg"
                  radius="full"
                  variant="bordered"
                  className="text-white border-white/50 hover:bg-white/10 font-medium px-8"
                >
                  Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
