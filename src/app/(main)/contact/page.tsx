'use client';

import { useState } from 'react';
import { Container } from '@mui/material';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { IconMail, IconPhone, IconMapPin, IconCheck } from '@tabler/icons-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const contactInfo = [
    { icon: IconMail, label: 'Email', value: 'support@skillstream.com' },
    { icon: IconPhone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: IconMapPin, label: 'Address', value: '123 Learning St, San Francisco, CA' },
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gray-50 py-16">
                <Container maxWidth="xl" className="px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                        <p className="text-gray-500 max-w-lg mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Contact Form */}
                        <div className="md:col-span-7">
                            <Card className="p-4" shadow="sm">
                                <CardBody>
                                    {submitted ? (
                                        <div className="flex flex-col items-center py-12 text-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <IconCheck size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold">Thank you!</h3>
                                            <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                                            <Button variant="outlined" onPress={() => setSubmitted(false)}>
                                                Send another message
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input label="First Name" placeholder="John" variant="outlined" isRequired />
                                                <Input label="Last Name" placeholder="Doe" variant="outlined" isRequired />
                                            </div>
                                            <Input label="Email" placeholder="john@example.com" type="email" variant="outlined" isRequired />
                                            <Input label="Subject" placeholder="How can we help?" variant="outlined" isRequired />
                                            <Textarea label="Message" placeholder="Your message..." minRows={5} variant="outlined" isRequired />
                                            <Button type="submit" color="primary" size="lg" className="font-semibold">Send Message</Button>
                                        </form>
                                    )}
                                </CardBody>
                            </Card>
                        </div>

                        {/* Contact Info */}
                        <div className="md:col-span-5">
                            <div className="flex flex-col gap-4">
                                {contactInfo.map((info) => (
                                    <Card key={info.label} shadow="sm">
                                        <CardBody className="p-4 flex-row gap-4 items-center">
                                            <div className="w-12 h-12 rounded-medium bg-blue-50 flex items-center justify-center text-blue-600">
                                                <info.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-small text-gray-500">{info.label}</p>
                                                <p className="font-medium">{info.value}</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Footer />
        </div >
    );
}
