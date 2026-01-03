'use client';

import Link from 'next/link';
import { Card as MuiCard, CardBody as MuiCardBody } from '@/components/ui/Card';
import { Button as LocalButton } from '@/components/ui/Button';

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
                <p className="text-gray-500">Your earned achievements and certifications</p>
            </div>

            {userCertificates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {userCertificates.map((cert) => (
                        <MuiCard key={cert.id} shadow="sm" className="w-full">
                            <MuiCardBody className="p-4 flex flex-col gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-8 text-center flex flex-col items-center justify-center gap-2">
                                    <div className="text-4xl">🏆</div>
                                    <span className="font-semibold text-gray-900">Certificate of Completion</span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold">{cert.courseName}</h3>
                                    <p className="text-small text-gray-500">
                                        Completed on {cert.completedAt}
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-auto pt-2">
                                    <LocalButton
                                        color="primary"
                                        variant="flat"
                                        startContent={<IconDownload size={16} />}
                                        className="flex-1"
                                    >
                                        Download
                                    </LocalButton>
                                    <LocalButton
                                        isIconOnly
                                        variant="light"
                                        color="primary"
                                    >
                                        <IconExternalLink size={18} />
                                    </LocalButton>
                                </div>
                            </MuiCardBody>
                        </MuiCard>
                    ))}
                </div>
            ) : (
                <MuiCard shadow="sm" className="p-8 text-center">
                    <MuiCardBody className="flex flex-col items-center gap-4">
                        <div className="text-4xl mb-2">🎓</div>
                        <h3 className="text-lg font-medium">No certificates yet</h3>
                        <p className="text-gray-500 max-w-xs">
                            Complete a course to earn your first certificate
                        </p>
                        <LocalButton
                            as={Link}
                            href="/dashboard/courses"
                            color="primary"
                            variant="solid"
                        >
                            View My Courses
                        </LocalButton>
                    </MuiCardBody>
                </MuiCard>
            )}
        </div>
    );
}
