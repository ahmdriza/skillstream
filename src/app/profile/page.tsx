'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Card,
    CardBody,
    Button,
    Avatar,
    Input,
    Textarea,
    Tab,
    Tabs,
} from '@heroui/react';
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

            <div className="flex-1 bg-default-50 py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Sidebar / Tabs */}
                        <div className="md:col-span-3">
                            <Card className="p-2">
                                <Tabs
                                    aria-label="Profile Sections"
                                    isVertical
                                    selectedKey={activeTab}
                                    onSelectionChange={(key) => setActiveTab(key as string)}
                                    classNames={{
                                        tabList: "w-full",
                                        tab: "justify-start h-12",
                                        tabContent: "group-data-[selected=true]:text-primary"
                                    }}
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
                                <p className="text-small text-default-500 mb-1">Home / Account Settings</p>
                                <h1 className="text-2xl font-bold mb-1">Personal Info</h1>
                                <p className="text-default-500">Manage your personal details and preferences.</p>
                            </div>

                            <Card shadow="sm">
                                <CardBody className="p-8 gap-8">
                                    {/* Profile Photo */}
                                    <div className="flex gap-6 pb-8 border-b border-divider">
                                        <div className="relative">
                                            <Avatar
                                                src={user?.avatar}
                                                className="w-20 h-20 text-large"
                                                isBordered
                                            />
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                                radius="full"
                                                className="absolute -bottom-1 -right-1 z-10 bg-background shadow-sm border border-divider"
                                            >
                                                <IconCamera size={14} />
                                            </Button>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-medium">Profile Picture</h3>
                                            <p className="text-tiny text-default-500 mb-3">
                                                PNG or JPG no bigger than 800px wide.
                                            </p>
                                            <div className="flex gap-2">
                                                <Button size="sm" color="primary">Upload New</Button>
                                                <Button size="sm" variant="light" color="danger">
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
                                            variant="bordered"
                                            labelPlacement="outside"
                                            placeholder="Enter first name"
                                        />
                                        <Input
                                            label="Last Name"
                                            defaultValue={user?.name?.split(' ')[1] || 'Johnson'}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            placeholder="Enter last name"
                                        />
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Headline"
                                                defaultValue={user?.headline || 'Software Developer'}
                                                variant="bordered"
                                                labelPlacement="outside"
                                                placeholder="Enter headline"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Input
                                                label={
                                                    <div className="flex gap-1">
                                                        Email Address
                                                        <span className="text-tiny text-primary font-medium">(Verified)</span>
                                                    </div>
                                                }
                                                defaultValue={user?.email || 'alex@example.com'}
                                                isDisabled
                                                variant="bordered"
                                                labelPlacement="outside"
                                                endContent={<IconLock size={16} className="text-default-400" />}
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Textarea
                                                label="Bio"
                                                defaultValue={user?.bio || 'Passionate about learning new technologies and building great products.'}
                                                variant="bordered"
                                                labelPlacement="outside"
                                                minRows={4}
                                                placeholder="Enter bio"
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2 pt-6 border-t border-divider">
                                        <Button variant="light">Cancel</Button>
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
