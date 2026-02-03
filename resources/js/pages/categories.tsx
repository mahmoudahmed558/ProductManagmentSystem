import { Head } from '@inertiajs/react';
import { Tags, Plus, Grid3x3, Package } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categories', href: '/categories' },
];

interface Category {
    id: number;
    name: string;
    count: number;
    color: string;
}

interface CategoriesProps {
    categories: Category[];
    stats: {
        totalCategories: number;
        totalProducts: number;
        avgPerCategory: number;
    };
}

export default function Categories({ categories, stats }: CategoriesProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="mb-2 text-4xl font-black">
                            Product
                            <span className="text-gradient-primary">
                                {' '}
                                Categories
                            </span>
                        </h1>
                        <p className="text-muted-foreground">
                            Organize your products into categories
                        </p>
                    </div>

                    <button className="bg-gradient-primary hover-glow inline-flex w-fit items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white transition-all hover:scale-105">
                        <Plus className="h-5 w-5" />
                        Add Category
                    </button>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-xl">
                                <Tags className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">
                                    {stats.totalCategories}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Total Categories
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-secondary flex h-12 w-12 items-center justify-center rounded-xl">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">
                                    {stats.totalProducts}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Total Products
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-accent flex h-12 w-12 items-center justify-center rounded-xl">
                                <Grid3x3 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">
                                    {stats.avgPerCategory}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Avg per Category
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="glass-card group relative cursor-pointer overflow-hidden rounded-3xl p-6 transition-all hover:scale-105"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 transition-opacity group-hover:opacity-10`}
                            ></div>

                            <div className="relative z-10">
                                <div
                                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${category.color} mb-4 flex items-center justify-center transition-transform group-hover:scale-110`}
                                >
                                    <Tags className="h-8 w-8 text-white" />
                                </div>

                                <h3 className="mb-2 text-xl font-bold">
                                    {category.name}
                                </h3>
                                <p className="text-gradient-primary mb-1 text-3xl font-black">
                                    {category.count}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Products
                                </p>

                                <button className="glass mt-4 w-full rounded-xl border border-border py-2 text-sm font-semibold transition-all hover:bg-foreground/5">
                                    View Products
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
