'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { IconShoppingCart, IconCheck } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import type { Course } from '@/types';

interface EnrollmentButtonProps {
    course: Course;
    isEnrolled?: boolean;
    onEnroll?: () => void;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export function EnrollmentButton({
    course,
    isEnrolled = false,
    onEnroll,
    size = 'md',
    fullWidth = false,
}: EnrollmentButtonProps) {
    const router = useRouter();
    const { user } = useAuth();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [enrolling, setEnrolling] = useState(false);

    const handleEnroll = async () => {
        if (!user) {
            router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }

        setEnrolling(true);

        // Simulate enrollment API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setEnrolling(false);
        onOpen();
        onEnroll?.();
    };

    const formatPrice = (price: number) => {
        return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
    };

    if (isEnrolled) {
        return (
            <Button
                size={size}
                fullWidth={fullWidth}
                color="success"
                startContent={<IconCheck size={18} />}
                onPress={() => router.push(`/dashboard/courses/${course.id}/learn`)}
            >
                Continue Learning
            </Button>
        );
    }

    return (
        <>
            <Button
                size={size}
                fullWidth={fullWidth}
                color="primary"
                startContent={<IconShoppingCart size={18} />}
                isLoading={enrolling}
                onPress={handleEnroll}
            >
                {course.price === 0 ? 'Enroll for Free' : `Enroll - ${formatPrice(course.price)}`}
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Enrollment Successful!</ModalHeader>
                            <ModalBody>
                                <p className="text-default-500">
                                    You have successfully enrolled in <strong>{course.title}</strong>.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => router.push(`/dashboard/courses/${course.id}/learn`)}>
                                    Start Learning
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
