'use client';

import Link from 'next/link';
import {
    Card,
    CardBody,
    Button,
    Chip,
} from '@heroui/react';
import { IconDownload, IconExternalLink, IconTrophy } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import usersData from '@/data/users.json';
import type { Certificate } from '@/types';

export default function CertificatesPage() {
    const { user } = useAuth();

    const userCertificates = usersData.certificates.filter(
        (c) => c.userId === user?.id || c.userId === 'user-1'
    ) as Certificate[];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">My Certificates</h1>
                <p className="text-default-500">Your earned achievements and certifications</p>
            </div>

            {userCertificates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {userCertificates.map((cert) => (
                        <Card key={cert.id} shadow="sm" className="w-full">
                            <CardBody className="p-4 flex flex-col gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-8 text-center flex flex-col items-center justify-center gap-2">
                                    <div className="text-4xl">🏆</div>
                                    <span className="font-semibold text-foreground">Certificate of Completion</span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold">{cert.courseName}</h3>
                                    <p className="text-small text-default-500">
                                        Completed on {cert.completedAt}
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-auto pt-2">
                                    <Button
                                        color="primary"
                                        variant="flat"
                                        startContent={<IconDownload size={16} />}
                                        className="flex-1"
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        color="primary"
                                    >
                                        <IconExternalLink size={18} />
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card shadow="sm" className="p-8 text-center">
                    <CardBody className="flex flex-col items-center gap-4">
                        <div className="text-4xl mb-2">🎓</div>
                        <h3 className="text-lg font-medium">No certificates yet</h3>
                        <p className="text-default-500 max-w-xs">
                            Complete a course to earn your first certificate
                        </p>
                        <Button
                            as={Link}
                            href="/dashboard/courses"
                            color="primary"
                            variant="solid"
                        >
                            View My Courses
                        </Button>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}
