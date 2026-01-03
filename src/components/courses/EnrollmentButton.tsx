'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
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
    const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(true);
        onEnroll?.();
    };

    const formatPrice = (price: number) => {
        return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
    };

    const onClose = () => setIsOpen(false);

    if (isEnrolled) {
        return (
            <Button
                size={size}
                fullWidth={fullWidth} // Note: Button adapter might not support fullWidth directly if not mapped, but MUI props often pass through
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
                // @ts-ignore
                fullWidth={fullWidth}
                color="primary"
                startContent={<IconShoppingCart size={18} />}
                isLoading={enrolling}
                onPress={handleEnroll}
            >
                {course.price === 0 ? 'Enroll for Free' : `Enroll - ${formatPrice(course.price)}`}
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onClose}>
                <ModalContent>

                    <>
                        <ModalHeader className="flex flex-col gap-1">Enrollment Successful!</ModalHeader>
                        <ModalBody>
                            <p className="text-gray-500">
                                You have successfully enrolled in <strong>{course.title}</strong>.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="error" variant="text" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={() => router.push(`/dashboard/courses/${course.id}/learn`)}>
                                Start Learning
                            </Button>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </>
    );
}
