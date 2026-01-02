'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    Input,
    Select,
    SelectItem,
    Button,
    Chip,
    Spinner
} from '@heroui/react';
import {
    IconSearch,
    IconLayoutGrid,
    IconList,
    IconX,
} from '@tabler/icons-react';
import coursesData from '@/data/courses.json';
import instructorsData from '@/data/instructors.json';
import categoriesData from '@/data/categories.json';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { CourseFilter, type FilterState } from '@/components/courses/CourseFilter';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Course, Instructor, Category } from '@/types';

function CourseCatalogContent() {
    const searchParams = useSearchParams();
    const initialType = (searchParams.get('type') as FilterState['courseType']) || 'all';
    const initialCategory = searchParams.get('category') || '';

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>('popular');

    // Unified filter state matching CourseFilter component
    const [filters, setFilters] = useState<FilterState>({
        courseType: initialType,
        category: initialCategory,
        levels: [],
        priceRange: [0, 500],
        rating: 0,
    });

    const courses = coursesData.courses as Course[];
    const instructors = instructorsData.instructors as Instructor[];
    const categories = categoriesData.categories as Category[];

    const getInstructor = (instructorId: string) =>
        instructors.find((i) => i.id === instructorId);

    // Filter courses
    const filteredCourses = courses.filter((course) => {
        // Filter by type
        if (filters.courseType !== 'all' && course.type !== filters.courseType) return false;

        // Filter by category
        if (filters.category && course.category.toLowerCase() !== filters.category.toLowerCase())
            return false;

        // Filter by level
        if (filters.levels.length > 0 && !filters.levels.includes(course.level)) return false;

        // Filter by price
        if (course.price < filters.priceRange[0] || course.price > filters.priceRange[1]) return false;

        // Filter by rating
        if (filters.rating > 0 && course.rating < filters.rating) return false;

        // Filter by search query
        if (
            searchQuery &&
            !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
        )
            return false;

        return true;
    });

    // Sort courses
    const sortedCourses = [...filteredCourses].sort((a, b: any) => {
        switch (sortBy) {
            case 'popular':
                return b.enrolledCount - a.enrolledCount;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    const clearFilters = () => {
        setFilters({
            courseType: 'all',
            category: '',
            levels: [],
            priceRange: [0, 500],
            rating: 0,
        });
        setSearchQuery('');
    };

    const hasActiveFilters =
        filters.courseType !== 'all' || filters.category || filters.levels.length > 0 || searchQuery || filters.rating > 0;

    return (
        <div className="min-h-screen flex flex-col bg-default-50 font-sans">
            <Header />

            <div className="flex-1 container mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <div className="text-small text-default-500 mb-2">
                    Home {'>'} Courses
                </div>
                <h1 className="text-3xl font-bold mb-2">Explore Our Catalog</h1>
                <p className="text-default-500 mb-8 max-w-2xl">
                    Master new skills with self-paced videos or join live expert-led sessions.
                    Choose the format that fits your learning style.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="hidden md:block col-span-1">
                        <CourseFilter
                            categories={categories}
                            initialFilters={filters}
                            onFilterChange={setFilters}
                        />
                    </div>

                    {/* Course Grid */}
                    <div className="col-span-1 md:col-span-3">
                        {/* Toolbar */}
                        <div className="bg-background border border-default-200 rounded-medium p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                            <Input
                                placeholder="Search courses..."
                                startContent={<IconSearch size={16} />}
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                                className="w-full md:max-w-xs"
                                variant="bordered"
                                size="sm"
                            />

                            <div className="flex gap-4 items-center w-full md:w-auto">
                                <Select
                                    aria-label="Sort by"
                                    placeholder="Sort by"
                                    defaultSelectedKeys={['popular']}
                                    selectedKeys={[sortBy]}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                                    className="w-40"
                                    size="sm"
                                    variant="bordered"
                                >
                                    <SelectItem key="popular">Most Popular</SelectItem>
                                    <SelectItem key="rating">Highest Rated</SelectItem>
                                    <SelectItem key="newest">Newest</SelectItem>
                                    <SelectItem key="price-low">Price: Low to High</SelectItem>
                                    <SelectItem key="price-high">Price: High to Low</SelectItem>
                                </Select>

                                <div className="border border-default-200 rounded-lg p-1 flex">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant={viewMode === 'grid' ? "solid" : "light"}
                                        color={viewMode === 'grid' ? "primary" : "default"}
                                        onPress={() => setViewMode('grid')}
                                    >
                                        <IconLayoutGrid size={16} />
                                    </Button>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant={viewMode === 'list' ? "solid" : "light"}
                                        color={viewMode === 'list' ? "primary" : "default"}
                                        onPress={() => setViewMode('list')}
                                    >
                                        <IconList size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Summary (Mobile mostly, or quick view) */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2 mb-6 items-center">
                                {filters.courseType !== 'all' && (
                                    <Chip onClose={() => setFilters(prev => ({ ...prev, courseType: 'all' }))} variant="flat" color="primary">
                                        Type: {filters.courseType}
                                    </Chip>
                                )}
                                {filters.category && (
                                    <Chip onClose={() => setFilters(prev => ({ ...prev, category: '' }))} variant="flat" color="secondary">
                                        Cat: {categories.find(c => c.slug === filters.category)?.name || filters.category}
                                    </Chip>
                                )}
                                <Button size="sm" variant="light" color="danger" onPress={clearFilters}>
                                    Clear all
                                </Button>
                            </div>
                        )}

                        {/* Results */}
                        <div className="text-small text-default-500 mb-6">
                            Showing {sortedCourses.length} of {courses.length} courses
                        </div>

                        {sortedCourses.length > 0 ? (
                            <CourseGrid
                                courses={sortedCourses}
                                instructors={instructors}
                                viewMode={viewMode}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-default-300 rounded-medium bg-background text-center">
                                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                                <p className="text-default-500 mb-4">Try adjusting your filters or search query</p>
                                <Button variant="flat" onPress={clearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function CourseCatalogPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center">
                <Spinner size="lg" />
            </div>
        }>
            <CourseCatalogContent />
        </Suspense>
    );
}
