'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Tab,
    Tabs,
    Link as HeroLink
} from '@heroui/react';
import { IconBook, IconBrandGoogle, IconAlertCircle, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const result = await register(name, email, password, role);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Registration failed');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-lg">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <IconBook size={24} color="white" />
                        </div>
                        <span className="font-bold text-2xl text-foreground">SkillStream</span>
                    </Link>
                </div>

                <Card className="w-full">
                    <CardHeader className="flex flex-col gap-2 items-center text-center p-6 pb-2">
                        <h2 className="text-2xl font-bold">Create your account</h2>
                        <p className="text-default-500 text-small">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </CardHeader>
                    <CardBody className="p-6 gap-6">
                        <Button
                            variant="bordered"
                            startContent={<IconBrandGoogle size={18} />}
                            fullWidth
                            size="lg"
                        >
                            Continue with Google
                        </Button>

                        <div className="flex items-center gap-4">
                            <Divider className="flex-1" />
                            <span className="text-tiny text-default-400 uppercase font-bold">Or continue with email</span>
                            <Divider className="flex-1" />
                        </div>

                        {error && (
                            <div className="bg-danger-50 text-danger p-3 rounded-medium flex items-center gap-2 text-small">
                                <IconAlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-small font-medium text-foreground">I want to:</span>
                                <Tabs
                                    aria-label="Role Selection"
                                    fullWidth
                                    size="md"
                                    selectedKey={role}
                                    onSelectionChange={(key) => setRole(key as UserRole)}
                                >
                                    <Tab key="student" title={
                                        <div className="flex items-center space-x-2">
                                            <span>📚</span>
                                            <span>Learn</span>
                                        </div>
                                    } />
                                    <Tab key="teacher" title={
                                        <div className="flex items-center space-x-2">
                                            <span>👨‍🏫</span>
                                            <span>Teach</span>
                                        </div>
                                    } />
                                </Tabs>
                            </div>

                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                value={name}
                                onValueChange={setName}
                                isRequired
                                variant="bordered"
                                labelPlacement="outside"
                            />

                            <Input
                                type="email"
                                label="Email"
                                placeholder="your@email.com"
                                value={email}
                                onValueChange={setEmail}
                                isRequired
                                variant="bordered"
                                labelPlacement="outside"
                            />

                            <Input
                                label="Password"
                                placeholder="Create a password"
                                value={password}
                                onValueChange={setPassword}
                                isRequired
                                variant="bordered"
                                labelPlacement="outside"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <IconEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />

                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onValueChange={setConfirmPassword}
                                isRequired
                                variant="bordered"
                                labelPlacement="outside"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
                                        {isVisibleConfirm ? (
                                            <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <IconEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisibleConfirm ? "text" : "password"}
                            />

                            <div className="text-tiny text-default-500">
                                By signing up, you agree to our{' '}
                                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                            </div>

                            <Button type="submit" color="primary" fullWidth size="lg" isLoading={loading} className="font-bold">
                                Create Account
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
