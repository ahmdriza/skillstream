'use client';

import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Box,
    Checkbox,
    FormControlLabel,
    Slider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormGroup
} from '@mui/material';
import { Button } from '@/components/ui/Button';
import { IconFilter, IconChevronDown } from '@tabler/icons-react';
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

    const handleLevelChange = (level: string, checked: boolean) => {
        let newLevels = [...filters.levels];
        if (checked) {
            newLevels.push(level);
        } else {
            newLevels = newLevels.filter(l => l !== level);
        }
        updateFilter('levels', newLevels);
    };

    return (
        <Card sx={{ maxWidth: 300, width: '100%', height: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                <div className="flex gap-2 items-center">
                    <IconFilter size={18} />
                    <span className="font-semibold">Filters</span>
                </div>
                <Button variant="text" size="small" color="error" onPress={clearFilters}>
                    Clear
                </Button>
            </Box>

            <CardContent sx={{ p: 0 }}>
                {/* Learning Format */}
                <Accordion defaultExpanded disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<IconChevronDown size={16} />}>
                        <Typography variant="subtitle2">Learning Format</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={filters.courseType === 'all'} onChange={() => updateFilter('courseType', 'all')} size="small" />}
                                label={<Typography variant="body2">All Formats</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={filters.courseType === 'recorded'} onChange={() => updateFilter('courseType', 'recorded')} size="small" />}
                                label={<Typography variant="body2">Recorded Courses</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={filters.courseType === 'live'} onChange={() => updateFilter('courseType', 'live')} size="small" />}
                                label={<Typography variant="body2">Live Classes</Typography>}
                            />
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>

                {/* Category */}
                <Accordion defaultExpanded disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<IconChevronDown size={16} />}>
                        <Typography variant="subtitle2">Category</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {categories.slice(0, 6).map((cat) => (
                                <FormControlLabel
                                    key={cat.id}
                                    control={
                                        <Checkbox
                                            checked={filters.category === cat.slug}
                                            onChange={() => updateFilter('category', filters.category === cat.slug ? '' : cat.slug)}
                                            size="small"
                                        />
                                    }
                                    label={<Typography variant="body2">{cat.name}</Typography>}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>

                {/* Level */}
                <Accordion defaultExpanded disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<IconChevronDown size={16} />}>
                        <Typography variant="subtitle2">Level</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                <FormControlLabel
                                    key={level}
                                    control={
                                        <Checkbox
                                            checked={filters.levels.includes(level)}
                                            onChange={(e) => handleLevelChange(level, e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Typography variant="body2">{level}</Typography>}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>

                {/* Price Range */}
                <Accordion defaultExpanded disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<IconChevronDown size={16} />}>
                        <Typography variant="subtitle2">Price Range</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ px: 2, pb: 2 }}>
                            <Slider
                                size="small"
                                step={10}
                                min={0}
                                max={500}
                                value={filters.priceRange}
                                onChange={(_, val) => updateFilter('priceRange', val as [number, number])}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `$${value}`}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="caption" color="text.secondary">${filters.priceRange[0]}</Typography>
                                <Typography variant="caption" color="text.secondary">${filters.priceRange[1]}</Typography>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
}
