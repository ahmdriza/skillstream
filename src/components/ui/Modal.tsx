'use client';

import { Modal as HeroModal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalProps as HeroModalProps, Button } from "@heroui/react";
import { ReactNode } from 'react';

export interface ModalProps extends Omit<HeroModalProps, 'children'> {
    children: ReactNode;
    title?: string;
    footer?: ReactNode;
}

export function Modal({ children, title, footer, isOpen, onClose, ...props }: ModalProps) {
    return (
        <HeroModal
            isOpen={isOpen}
            onClose={onClose}
            backdrop="blur"
            radius="md"
            {...props}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        {title && <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>}
                        <ModalBody>
                            {children}
                        </ModalBody>
                        {footer && <ModalFooter>{footer}</ModalFooter>}
                    </>
                )}
            </ModalContent>
        </HeroModal>
    );
}
