'use client';

import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar, Chip, Tooltip } from '@mui/material';
import { IconCamera, IconEdit, IconMail, IconCalendar } from '@tabler/icons-react';
import type { User } from '@/types';

interface ProfileHeaderProps {
    user: User;
    onEditClick?: () => void;
    showEditButton?: boolean;
}

export function ProfileHeader({
    user,
    onEditClick,
    showEditButton = true,
}: ProfileHeaderProps) {
    return (
        <Card className="w-full">
            <CardBody className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start w-full">
                        {/* Avatar */}
                        <div className="relative">
                            <Avatar
                                src={user.avatar}
                                sx={{ width: { xs: 96, md: 128 }, height: { xs: 96, md: 128 }, border: '4px solid white', boxShadow: 1 }}
                            />
                            <div className="absolute bottom-0 right-0">
                                <Tooltip title="Change Avatar">
                                    <Button isIconOnly size="sm" radius="full" color="primary" variant="contained">
                                        <IconCamera size={14} />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <Chip
                                    label={user.role}
                                    color={user.role === 'teacher' ? 'secondary' : 'primary'}
                                    variant="outlined"
                                    size="small"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </div>

                            {user.headline && (
                                <p className="text-gray-500 font-medium">{user.headline}</p>
                            )}

                            <div className="flex gap-4 mt-2">
                                <div className="flex gap-1 items-center text-small text-gray-400">
                                    <IconMail size={16} />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex gap-1 items-center text-small text-gray-400">
                                    <IconCalendar size={16} />
                                    <span>Joined {user.createdAt}</span>
                                </div>
                            </div>

                            {user.bio && (
                                <p className="text-gray-500 mt-4 text-small max-w-lg">
                                    {user.bio}
                                </p>
                            )}
                        </div>
                    </div>

                    {showEditButton && (
                        <Button
                            variant="outlined"
                            startContent={<IconEdit size={16} />}
                            onPress={onEditClick}
                        >
                            Edit Profile
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
