'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const Modal = ({ isOpen, onClose, children, className, ...props }: any) => (
    <Dialog open={isOpen} onClose={onClose} className={className} fullWidth maxWidth="sm" {...props}>
        {children}
    </Dialog>
);

export const ModalContent = ({ children }: any) => <>{children}</>;

export const ModalHeader = ({ children, className }: any) => (
    <DialogTitle className={className}>{children}</DialogTitle>
);

export const ModalBody = ({ children, className }: any) => (
    <DialogContent className={className}>{children}</DialogContent>
);

export const ModalFooter = ({ children, className }: any) => (
    <DialogActions className={className}>{children}</DialogActions>
);
