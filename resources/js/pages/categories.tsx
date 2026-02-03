import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Tags, Plus, Grid3x3, Package } from 'lucide-react';

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
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-2">
                            Product
                            <span className="text-gradient-primary"> Categories</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Organize your products into categories
                        </p>
                    </div>
                    
                    <button className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105 inline-flex items-center gap-2 w-fit">
                        <Plus className="w-5 h-5" />
                        Add Category
                    </button>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                                <Tags className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">{stats.totalCategories}</div>
                                <div className="text-sm text-muted-foreground">Total Categories</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">
                                    {stats.totalProducts}
                                </div>
                                <div className="text-sm text-muted-foreground">Total Products</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                                <Grid3x3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">
                                    {stats.avgPerCategory}
                                </div>
                                <div className="text-sm text-muted-foreground">Avg per Category</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div 
                            key={category.id}
                            className="glass-card p-6 rounded-3xl hover:scale-105 transition-all group cursor-pointer relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                            
                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Tags className="w-8 h-8 text-white" />
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                                <p className="text-3xl font-black text-gradient-primary mb-1">
                                    {category.count}
                                </p>
                                <p className="text-sm text-muted-foreground">Products</p>
                                
                                <button className="mt-4 w-full py-2 rounded-xl glass border border-border hover:bg-foreground/5 transition-all text-sm font-semibold">
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
