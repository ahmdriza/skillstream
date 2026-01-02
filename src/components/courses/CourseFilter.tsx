'use client';

import { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    CheckboxGroup,
    Button,
    Slider,
    Accordion,
    AccordionItem
} from '@heroui/react';
import { IconFilter } from '@tabler/icons-react';
import type { Category } from '@/types';

interface CourseFilterProps {
    categories: Category[];
    onFilterChange: (filters: FilterState) => void;
    initialFilters?: Partial<FilterState>;
}

export interface FilterState {
    courseType: 'all' | 'recorded' | 'live';
    category: string;
    levels: string[];
    priceRange: [number, number];
    rating: number;
}

const defaultFilters: FilterState = {
    courseType: 'all',
    category: '',
    levels: [],
    priceRange: [0, 500],
    rating: 0,
};

export function CourseFilter({
    categories,
    onFilterChange,
    initialFilters = {},
}: CourseFilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        ...defaultFilters,
        ...initialFilters,
    });

    const updateFilter = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    return (
        <Card className="max-w-[300px] w-full h-auto">
            <CardHeader className="flex justify-between items-center px-4 py-3 border-b border-default-100">
                <div className="flex gap-2 items-center">
                    <IconFilter size={18} />
                    <span className="font-semibold">Filters</span>
                </div>
                <Button variant="light" size="sm" color="danger" onPress={clearFilters}>
                    Clear
                </Button>
            </CardHeader>

            <CardBody className="p-0">
                <Accordion selectionMode="multiple" defaultExpandedKeys={["type", "category", "level"]} variant="light">
                    <AccordionItem key="type" aria-label="Learning Format" title="Learning Format">
                        <div className="flex flex-col gap-2 pb-2">
                            <Checkbox
                                isSelected={filters.courseType === 'all'}
                                onValueChange={() => updateFilter('courseType', 'all')}
                                size="sm"
                                classNames={{ label: "text-small" }}
                            >
                                All Formats
                            </Checkbox>
                            <Checkbox
                                isSelected={filters.courseType === 'recorded'}
                                onValueChange={() => updateFilter('courseType', 'recorded')}
                                size="sm"
                                classNames={{ label: "text-small" }}
                            >
                                Recorded Courses
                            </Checkbox>
                            <Checkbox
                                isSelected={filters.courseType === 'live'}
                                onValueChange={() => updateFilter('courseType', 'live')}
                                size="sm"
                                classNames={{ label: "text-small" }}
                            >
                                Live Classes
                            </Checkbox>
                        </div>
                    </AccordionItem>

                    <AccordionItem key="category" aria-label="Category" title="Category">
                        <div className="flex flex-col gap-2 pb-2">
                            <CheckboxGroup
                                value={filters.category ? [filters.category] : []}
                                onValueChange={(vals) => updateFilter('category', vals[0] || '')}
                            >
                                {categories.slice(0, 6).map((cat) => (
                                    <Checkbox
                                        key={cat.id}
                                        value={cat.slug}
                                        size="sm"
                                        classNames={{ label: "text-small" }}
                                    >
                                        {cat.name}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </div>
                    </AccordionItem>

                    <AccordionItem key="level" aria-label="Level" title="Level">
                        <div className="flex flex-col gap-2 pb-2">
                            <CheckboxGroup
                                value={filters.levels}
                                onValueChange={(vals) => updateFilter('levels', vals as string[])}
                            >
                                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                    <Checkbox
                                        key={level}
                                        value={level}
                                        size="sm"
                                        classNames={{ label: "text-small" }}
                                    >
                                        {level}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </div>
                    </AccordionItem>

                    <AccordionItem key="price" aria-label="Price Range" title="Price Range">
                        <div className="px-2 pb-4">
                            <Slider
                                label="Price Range"
                                size="sm"
                                step={10}
                                minValue={0}
                                maxValue={500}
                                value={filters.priceRange}
                                onChange={(val) => updateFilter('priceRange', val as [number, number])}
                                formatOptions={{ style: "currency", currency: "USD" }}
                                className="max-w-md"
                            />
                        </div>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    );
}
