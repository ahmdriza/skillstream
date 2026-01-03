'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { IconBook, IconCheck, IconMail } from '@tabler/icons-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSubmitted(true);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white">
                            <IconBook size={24} />
                        </div>
                        <span className="font-bold text-xl text-foreground">
                            SkillStream
                        </span>
                    </Link>
                </div>

                <Card className="w-full" shadow="sm">
                    <CardBody className="p-8">
                        {submitted ? (
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <IconCheck size={32} />
                                </div>
                                <h2 className="text-2xl font-bold">Check your email</h2>
                                <p className="text-default-500">
                                    If an account exists for {email}, you will receive a password
                                    reset link shortly.
                                </p>
                                <Button
                                    as={Link}
                                    href="/login"
                                    color="primary"
                                    variant="flat"
                                    className="w-full mt-2"
                                >
                                    Back to login
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold mb-2">
                                        Forgot your password?
                                    </h2>
                                    <p className="text-default-500 text-small">
                                        Enter your email address and we&apos;ll send you a link to reset
                                        your password.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <Input
                                        label="Email"
                                        placeholder="your@email.com"
                                        type="email"
                                        variant="bordered"
                                        value={email}
                                        onValueChange={setEmail}
                                        isRequired
                                        startContent={<IconMail size={18} className="text-default-400" />}
                                    />

                                    <Button
                                        type="submit"
                                        color="primary"
                                        fullWidth
                                        isLoading={loading}
                                    >
                                        Send reset link
                                    </Button>

                                    <div className="text-center text-small">
                                        <Link
                                            href="/login"
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Back to login
                                        </Link>
                                    </div>
                                </form>
                            </>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
