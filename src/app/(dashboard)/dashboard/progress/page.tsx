'use client';

import {
    Card,
    CardBody,
    Progress,
    CircularProgress,
} from '@heroui/react';
import { IconClock, IconBook, IconTrophy } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';

export default function ProgressPage() {
    const { user } = useAuth();

    // Demo stats
    const stats = {
        totalHours: 12.5,
        coursesCompleted: 1,
        coursesInProgress: 3,
        lessonsCompleted: 45,
        totalLessons: 120,
        weeklyGoal: 80,
        streak: 7,
    };

    // Derived values
    const overallProgress = (stats.lessonsCompleted / stats.totalLessons) * 100;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Learning Progress</h1>
                <p className="text-default-500">Track your learning journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Overall Progress */}
                <div className="md:col-span-4 h-full">
                    <Card shadow="sm" className="h-full">
                        <CardBody className="flex flex-col items-center justify-center py-8 gap-6">
                            <CircularProgress
                                classNames={{
                                    svg: "w-40 h-40 drop-shadow-md",
                                    indicator: "stroke-primary",
                                    track: "stroke-default-100/50",
                                    value: "text-2xl font-bold text-foreground",
                                }}
                                value={overallProgress}
                                strokeWidth={3}
                                showValueLabel={true}
                                formatOptions={{ style: "percent" }}
                                aria-label="Overall Progress"
                            />

                            <div className="text-center">
                                <h3 className="text-lg font-bold mb-1">Overall Progress</h3>
                                <p className="text-small text-default-500">
                                    {stats.lessonsCompleted} of {stats.totalLessons} lessons completed
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Stats Cards */}
                <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Hours Learned */}
                        <Card shadow="sm">
                            <CardBody className="flex flex-row items-center gap-4 p-5">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <IconClock size={24} />
                                </div>
                                <div>
                                    <p className="text-small text-default-500">Hours Learned</p>
                                    <p className="text-2xl font-bold">{stats.totalHours}</p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Courses Completed */}
                        <Card shadow="sm">
                            <CardBody className="flex flex-row items-center gap-4 p-5">
                                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <IconBook size={24} />
                                </div>
                                <div>
                                    <p className="text-small text-default-500">Courses Completed</p>
                                    <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Day Streak */}
                        <Card shadow="sm">
                            <CardBody className="flex flex-row items-center gap-4 p-5">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <IconTrophy size={24} />
                                </div>
                                <div>
                                    <p className="text-small text-default-500">Day Streak</p>
                                    <p className="text-2xl font-bold">{stats.streak} days 🔥</p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Weekly Goal */}
                        <Card shadow="sm">
                            <CardBody className="p-5 flex flex-col justify-center">
                                <p className="text-small text-default-500 mb-2">Weekly Goal</p>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-lg font-bold">{stats.weeklyGoal}%</span>
                                    <span className="text-small text-default-500">4/5 lessons</span>
                                </div>
                                <Progress
                                    value={stats.weeklyGoal}
                                    color="primary"
                                    size="md"
                                    radius="md"
                                    aria-label="Weekly Goal Progress"
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
