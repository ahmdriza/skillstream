'use client';

import { CircularProgress, Box, Typography } from "@mui/material";

export default function Loading() {
    return (
        <Box
            className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-sm z-50 fixed inset-0"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
            <CircularProgress size={60} color="primary" />
            <Typography variant="body1" className="text-gray-500 font-medium animate-pulse" sx={{ mt: 2 }}>
                Loading experience...
            </Typography>
        </Box>
    );
}
