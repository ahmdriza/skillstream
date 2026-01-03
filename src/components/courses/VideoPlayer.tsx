'use client';

import { useState, useRef } from 'react';
import {
    Card,
    Slider,
    IconButton,
    Box,
    Typography
} from '@mui/material';
import {
    IconPlayerPlay,
    IconPlayerPause,
    IconVolume,
    IconVolumeOff,
    IconMaximize,
    IconSettings,
} from '@tabler/icons-react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    onProgress?: (progress: number) => void;
    onComplete?: () => void;
}

export function VideoPlayer({
    src,
    poster,
    title,
    onProgress,
    onComplete,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
            onProgress?.(currentProgress);

            if (currentProgress >= 95) {
                onComplete?.();
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (value: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
            setProgress(value);
        }
    };

    const handleVolumeChange = (value: number) => {
        if (videoRef.current) {
            videoRef.current.volume = value;
            setVolume(value);
            setIsMuted(value === 0);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Card sx={{ width: '100%', bgcolor: 'black', overflow: 'hidden', position: 'relative', '&:hover .controls': { opacity: 1 } }}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                className="w-full aspect-video object-contain cursor-pointer"
            />

            {/* Controls Overlay */}
            <Box className="controls" sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s'
            }}>
                <Slider
                    aria-label="Video Progress"
                    size="small"
                    color="primary"
                    value={progress}
                    onChange={(_, val) => handleSeek(val as number)}
                    sx={{ mb: 1, color: 'primary.main', '& .MuiSlider-thumb': { transition: '0.3s cubic-bezier(.47,1.64,.41,.8)' } }}
                />

                <div className="flex justify-between items-center text-white">
                    <div className="flex gap-2 items-center">
                        <IconButton onClick={togglePlay} sx={{ color: 'white' }}>
                            {isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
                        </IconButton>

                        <div className="flex gap-2 items-center group/vol">
                            <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
                                {isMuted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
                            </IconButton>
                            <Box sx={{ width: 0, overflow: 'hidden', transition: 'width 0.2s', '.group\/vol:hover &': { width: 80 } }}>
                                <Slider
                                    aria-label="Volume"
                                    size="small"
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={volume}
                                    onChange={(_, val) => handleVolumeChange(val as number)}
                                    sx={{ color: 'white' }}
                                />
                            </Box>
                        </div>

                        <span className="text-xs">
                            {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <IconButton sx={{ color: 'white' }}>
                            <IconSettings size={20} />
                        </IconButton>
                        <IconButton onClick={toggleFullscreen} sx={{ color: 'white' }}>
                            <IconMaximize size={20} />
                        </IconButton>
                    </div>
                </div>
            </Box>

            {title && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'medium' }}>{title}</Typography>
                </Box>
            )}
        </Card>
    );
}
