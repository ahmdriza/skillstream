'use client';

import { Card as MuiCard, CardContent, Box } from "@mui/material";

export const Card = ({ className, children, shadow = "md", ...props }: any) => {
    // shadow prop mapping could be implemented if needed, MUI Card has elevation
    return (
        <MuiCard className={className} elevation={shadow === "sm" ? 1 : 3} {...props}>
            {children}
        </MuiCard>
    );
};

export const CardBody = ({ className, children, ...props }: any) => (
    <CardContent className={className} {...props}>{children}</CardContent>
);

export const CardHeader = ({ className, children, ...props }: any) => (
    <Box className={`p-4 flex flex-col items-start ${className}`} {...props}>{children}</Box>
);

export const CardFooter = ({ className, children, ...props }: any) => (
    <Box className={`p-4 flex items-center ${className}`} {...props}>{children}</Box>
);

export const Divider = ({ className, ...props }: any) => (
    <Box component="hr" className={`border-t border-gray-200 my-0 ${className}`} {...props} />
);
