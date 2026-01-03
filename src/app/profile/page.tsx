'use client';

import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs, Tab } from '@/components/ui/Tabs';
import { Avatar } from '@mui/material';
import {
    IconUser,
    IconLock,
    IconCreditCard,
    IconBell,
    IconCamera,
} from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gray-50 py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Sidebar / Tabs */}
                        <div className="md:col-span-3">
                            <Card className="p-2">
                                <Tabs
                                    selectedKey={activeTab}
                                    onSelectionChange={(key: any) => setActiveTab(key as string)}
                                    orientation="vertical"
                                    aria-label="Profile Sections"
                                    sx={{ borderRight: 1, borderColor: 'divider', minHeight: 200 }}
                                >
                                    <Tab
                                        key="personal"
                                        title={
                                            <div className="flex items-center gap-2">
                                                <IconUser size={18} />
                                                <span>Personal Info</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="security"
                                        title={
                                            <div className="flex items-center gap-2">
                                                <IconLock size={18} />
                                                <span>Login & Security</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="payment"
                                        title={
                                            <div className="flex items-center gap-2">
                                                <IconCreditCard size={18} />
                                                <span>Payment Methods</span>
                                            </div>
                                        }
                                    />
                                    <Tab
                                        key="notifications"
                                        title={
                                            <div className="flex items-center gap-2">
                                                <IconBell size={18} />
                                                <span>Notifications</span>
                                            </div>
                                        }
                                    />
                                </Tabs>
                            </Card>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-9">
                            <div className="mb-6">
                                <p className="text-small text-gray-500 mb-1">Home / Account Settings</p>
                                <h1 className="text-2xl font-bold mb-1">Personal Info</h1>
                                <p className="text-gray-500">Manage your personal details and preferences.</p>
                            </div>

                            <Card shadow="sm">
                                <CardBody className="p-8 gap-8">
                                    {/* Profile Photo */}
                                    <div className="flex gap-6 pb-8 border-b border-gray-200">
                                        <div className="relative">
                                            <Avatar
                                                src={user?.avatar}
                                                sx={{ width: 80, height: 80, border: '1px solid #e5e7eb' }}
                                            />
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="outlined"
                                                radius="full"
                                                className="absolute -bottom-1 -right-1 z-10 bg-white shadow-sm border border-gray-200"
                                            >
                                                <IconCamera size={14} />
                                            </Button>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-medium">Profile Picture</h3>
                                            <p className="text-tiny text-gray-500 mb-3">
                                                PNG or JPG no bigger than 800px wide.
                                            </p>
                                            <div className="flex gap-2">
                                                <Button size="sm" color="primary">Upload New</Button>
                                                <Button size="sm" variant="text" color="error">
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="First Name"
                                            defaultValue={user?.name?.split(' ')[0] || 'Alex'}
                                            variant="outlined"
                                            placeholder="Enter first name"
                                        />
                                        <Input
                                            label="Last Name"
                                            defaultValue={user?.name?.split(' ')[1] || 'Johnson'}
                                            variant="outlined"
                                            placeholder="Enter last name"
                                        />
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Headline"
                                                defaultValue={user?.headline || 'Software Developer'}
                                                variant="outlined"
                                                placeholder="Enter headline"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Email Address"
                                                defaultValue={user?.email || 'alex@example.com'}
                                                disabled
                                                variant="outlined"
                                                endContent={<IconLock size={16} className="text-gray-400" />}
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Bio"
                                                defaultValue={user?.bio || 'Passionate about learning new technologies and building great products.'}
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                placeholder="Enter bio"
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2 pt-6 border-t border-gray-200">
                                        <Button variant="text">Cancel</Button>
                                        <Button color="primary">Save Changes</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
