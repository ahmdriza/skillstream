'use client';

import { useState } from 'react';
import {
    Card,
    CardBody,
    Input,
    Textarea,
    Button,
    Avatar,
    User
} from '@heroui/react';
import { IconCamera, IconCheck } from '@tabler/icons-react';
import type { User as UserType } from '@/types';

interface EditProfileProps {
    user: UserType;
    onSave?: (data: Partial<UserType>) => void;
    onCancel?: () => void;
}

export function EditProfile({ user, onSave, onCancel }: EditProfileProps) {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        headline: user.headline || '',
        bio: user.bio || '',
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        onSave?.(formData);
        setSaving(false);
    };

    return (
        <Card className="w-full">
            <CardBody className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Avatar Section */}
                    <div className="flex gap-6 items-start">
                        <div className="relative">
                            <Avatar src={user.avatar} className="w-24 h-24" />
                            <Button
                                isIconOnly
                                size="sm"
                                radius="full"
                                variant="solid"
                                className="absolute bottom-0 right-0 z-10"
                            >
                                <IconCamera size={14} />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-medium">Profile Picture</span>
                            <span className="text-tiny text-default-400 mb-2">
                                PNG or JPG, max 800px wide
                            </span>
                            <div className="flex gap-2">
                                <Button size="sm" variant="flat">Upload New</Button>
                                <Button size="sm" variant="light" color="danger">
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            placeholder="Your full name"
                            value={formData.name}
                            onValueChange={(val) => handleChange('name', val)}
                            isRequired
                            variant="bordered"
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onValueChange={(val) => handleChange('email', val)}
                            isDisabled
                            variant="bordered"
                        />
                    </div>

                    <Input
                        label="Headline"
                        placeholder="e.g., Software Developer at Company"
                        value={formData.headline}
                        onValueChange={(val) => handleChange('headline', val)}
                        variant="bordered"
                    />

                    <Textarea
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        value={formData.bio}
                        onValueChange={(val) => handleChange('bio', val)}
                        minRows={4}
                        variant="bordered"
                    />

                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-2">
                        <Button variant="light" onPress={onCancel} isDisabled={saving}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={saving}
                            startContent={!saving && <IconCheck size={16} />}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
