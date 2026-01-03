'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, Divider } from '@/components/ui/Card';
import { IconBook, IconBrandGoogle, IconAlertCircle, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Login failed');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-md flex flex-col gap-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <IconBook size={24} color="white" />
                        </div>
                        <span className="font-bold text-2xl text-foreground">SkillStream</span>
                    </Link>
                </div>

                <Card className="w-full shadow-xl">
                    <CardHeader className="flex flex-col gap-2 items-center text-center p-6 border-b border-default-100">
                        <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
                        <p className="text-default-500 text-small">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary font-medium hover:underline transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </CardHeader>
                    <CardBody className="p-6 gap-6 overflow-visible">
                        <Button
                            variant="bordered"
                            startContent={<IconBrandGoogle size={20} />}
                            fullWidth
                            size="lg"
                            className="bg-white hover:bg-default-50 font-medium border-default-200"
                        >
                            Continue with Google
                        </Button>

                        <div className="flex items-center gap-4 w-full">
                            <Divider className="flex-1" />
                            <span className="text-tiny text-default-400 uppercase font-bold shrink-0">Or continue with email</span>
                            <Divider className="flex-1" />
                        </div>

                        {error && (
                            <div className="bg-danger-50 text-danger p-3 rounded-medium flex items-center gap-2 text-small border border-danger-100">
                                <IconAlertCircle size={18} className="shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-small font-medium text-default-700">Email</label>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onValueChange={setEmail}
                                    isRequired
                                    variant="bordered"
                                    classNames={{
                                        inputWrapper: "bg-default-50 hover:bg-default-100 transition-colors",
                                        mainWrapper: "h-full"
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-small font-medium text-default-700">Password</label>
                                <Input
                                    placeholder="Your password"
                                    value={password}
                                    onValueChange={setPassword}
                                    isRequired
                                    variant="bordered"
                                    endContent={
                                        <button className="focus:outline-none text-default-400 hover:text-default-600 transition-colors" type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <IconEyeOff size={20} />
                                            ) : (
                                                <IconEye size={20} />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    classNames={{
                                        inputWrapper: "bg-default-50 hover:bg-default-100 transition-colors"
                                    }}
                                />
                            </div>

                            <div className="flex justify-between items-center px-1">
                                <Checkbox size="sm" classNames={{ label: "text-small text-default-500" }}>Remember me</Checkbox>
                                <Link href="/forgot-password" className="text-small text-primary hover:text-primary-600 transition-colors font-medium">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                color="primary"
                                fullWidth
                                size="lg"
                                isLoading={loading}
                                className="font-bold shadow-lg shadow-primary/30"
                            >
                                Sign in
                            </Button>
                        </form>

                        {/* Demo credentials */}
                        <div className="bg-default-50 p-4 rounded-medium border border-default-200/60 mt-2">
                            <p className="text-xs font-semibold mb-2 text-default-600 uppercase tracking-wider">Demo Credentials</p>
                            <div className="flex flex-col gap-2 text-xs text-default-500">
                                <div className="flex items-center justify-between p-2 bg-white rounded border border-default-100">
                                    <span className="font-medium">Student</span>
                                    <div className="flex gap-2">
                                        <code className="bg-default-100 px-1.5 py-0.5 rounded text-default-700">student@demo.com</code>
                                        <code className="bg-default-100 px-1.5 py-0.5 rounded text-default-700">demo123</code>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white rounded border border-default-100">
                                    <span className="font-medium">Teacher</span>
                                    <div className="flex gap-2">
                                        <code className="bg-default-100 px-1.5 py-0.5 rounded text-default-700">teacher@demo.com</code>
                                        <code className="bg-default-100 px-1.5 py-0.5 rounded text-default-700">demo123</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
