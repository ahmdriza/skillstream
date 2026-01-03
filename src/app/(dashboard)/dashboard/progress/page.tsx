'use client';

import { Card, CardBody } from '@/components/ui/Card';
import { CircularProgress, LinearProgress, Box, Typography } from '@mui/material';
import { IconClock, IconBook, IconTrophy } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';

function CircularProgressWithLabel(props: any) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} size={160} thickness={4} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h5" component="div" color="text.primary" fontWeight="bold">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

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
                <p className="text-gray-500">Track your learning journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Overall Progress */}
                <div className="md:col-span-4 h-full">
                    <Card shadow="sm" className="h-full">
                        <CardBody className="flex flex-col items-center justify-center py-8 gap-6">
                            <CircularProgressWithLabel value={overallProgress} />

                            <div className="text-center">
                                <h3 className="text-lg font-bold mb-1">Overall Progress</h3>
                                <p className="text-small text-gray-500">
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
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                    <IconClock size={24} />
                                </div>
                                <div>
                                    <p className="text-small text-gray-500">Hours Learned</p>
                                    <p className="text-2xl font-bold">{stats.totalHours}</p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Courses Completed */}
                        <Card shadow="sm">
                            <CardBody className="flex flex-row items-center gap-4 p-5">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                                    <IconBook size={24} />
                                </div>
                                <div>
                                    <p className="text-small text-gray-500">Courses Completed</p>
                                    <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Day Streak */}
                        <Card shadow="sm">
                            <CardBody className="flex flex-row items-center gap-4 p-5">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                    <IconTrophy size={24} />
                                </div>
                                <div>
                                    <p className="text-small text-gray-500">Day Streak</p>
                                    <p className="text-2xl font-bold">{stats.streak} days 🔥</p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Weekly Goal */}
                        <Card shadow="sm">
                            <CardBody className="p-5 flex flex-col justify-center">
                                <p className="text-small text-gray-500 mb-2">Weekly Goal</p>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-lg font-bold">{stats.weeklyGoal}%</span>
                                    <span className="text-small text-gray-500">4/5 lessons</span>
                                </div>
                                <LinearProgress
                                    variant="determinate"
                                    value={stats.weeklyGoal}
                                    color="primary"
                                    sx={{ height: 8, borderRadius: 2 }}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
