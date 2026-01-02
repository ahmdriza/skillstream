'use client';

import { useState, useRef } from 'react';
import {
    Card,
    Button,
    Slider
} from '@heroui/react';
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
        <Card className="w-full bg-black overflow-hidden relative group">
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity opacity-0 group-hover:opacity-100">
                <Slider
                    aria-label="Video Progress"
                    size="sm"
                    color="primary"
                    value={progress}
                    onChange={(val) => handleSeek(val as number)}
                    className="mb-2"
                />

                <div className="flex justify-between items-center text-white">
                    <div className="flex gap-2 items-center">
                        <Button isIconOnly variant="light" color="primary" className="text-white" onPress={togglePlay}>
                            {isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
                        </Button>

                        <div className="flex gap-2 items-center group/vol">
                            <Button isIconOnly variant="light" color="primary" className="text-white" onPress={toggleMute}>
                                {isMuted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
                            </Button>
                            <div className="w-20 hidden group-hover/vol:block transition-all">
                                <Slider
                                    aria-label="Volume"
                                    size="sm"
                                    color="foreground"
                                    minValue={0}
                                    maxValue={1}
                                    step={0.1}
                                    value={volume}
                                    onChange={(val) => handleVolumeChange(val as number)}
                                />
                            </div>
                        </div>

                        <span className="text-xs">
                            {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <Button isIconOnly variant="light" className="text-white">
                            <IconSettings size={20} />
                        </Button>
                        <Button isIconOnly variant="light" className="text-white" onPress={toggleFullscreen}>
                            <IconMaximize size={20} />
                        </Button>
                    </div>
                </div>
            </div>

            {title && (
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
                    <h3 className="text-white font-medium">{title}</h3>
                </div>
            )}
        </Card>
    );
}
