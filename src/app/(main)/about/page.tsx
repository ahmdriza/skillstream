'use client';

import { Avatar, Container } from '@mui/material';
import { Card, CardBody } from '@/components/ui/Card';
import { IconUsers, IconBook, IconGlobe, IconHeart } from '@tabler/icons-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const team = [
    {
        name: 'Sarah Chen',
        role: 'CEO & Founder',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
    {
        name: 'Michael Park',
        role: 'CTO',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Head of Content',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />

            <div className="flex-1 bg-gray-50">
                {/* Hero */}
                <div className="py-20 bg-white text-center border-b border-gray-200">
                    <Container maxWidth="xl" className="px-6">
                        <h1 className="text-4xl font-bold mb-4">About SkillStream</h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            We're on a mission to make quality education accessible to everyone, everywhere.
                            Through live classes and self-paced courses, we're transforming how people learn.
                        </p>
                    </Container>
                </div>

                {/* Stats */}
                <Container maxWidth="xl" className="px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: IconUsers, value: '50,000+', label: 'Students', color: 'bg-blue-100 text-blue-600' },
                            { icon: IconBook, value: '500+', label: 'Courses', color: 'bg-purple-100 text-purple-600' },
                            { icon: IconGlobe, value: '120+', label: 'Countries', color: 'bg-green-100 text-green-600' },
                            { icon: IconHeart, value: '98%', label: 'Satisfaction', color: 'bg-red-100 text-red-600' },
                        ].map((stat, i) => (
                            <Card key={i} shadow="sm" className="text-center">
                                <CardBody className="py-8 flex flex-col items-center gap-4">
                                    <div className={`p-4 rounded-full ${stat.color}`}>
                                        <stat.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                                        <p className="text-gray-500">{stat.label}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </Container>

                {/* Mission */}
                <div className="bg-white py-16">
                    <Container maxWidth="xl" className="px-6 text-center">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            At SkillStream, we believe that learning should be engaging, accessible, and effective.
                            We combine the flexibility of online learning with the engagement of live instruction
                            to create an unparalleled educational experience.
                        </p>
                    </Container>
                </div>

                {/* Team */}
                <Container maxWidth="xl" className="px-6 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <Card key={member.name} shadow="sm" className="text-center">
                                <CardBody className="py-8">
                                    <div className="flex justify-center mb-4">
                                        <Avatar src={member.avatar} sx={{ width: 96, height: 96 }} className="text-large" />
                                    </div>
                                    <h3 className="font-bold text-lg">{member.name}</h3>
                                    <p className="text-gray-500">{member.role}</p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </Container>
            </div>

            <Footer />
        </div>
    );
}
