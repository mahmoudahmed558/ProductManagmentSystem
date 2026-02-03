import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Search, Filter, Pencil, Trash2, Plus, Package, Grid3x3, List } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category?: string;
    stock?: number;
    sku?: string;
    featured_image: string;
    created_at: string;
}

interface Props {
    products: {
        data: Product[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: string[];
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Index({ products, categories, filters }: Props) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/products', { preserveState: true });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(`/products/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Products" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-2">
                            Products
                            <span className="text-gradient-primary"> Collection</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your inventory and track your products
                        </p>
                    </div>
                    
                    <Link
                        href="/products/create"
                        className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105 inline-flex items-center gap-2 w-fit"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Product
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="glass-card p-6 rounded-3xl">
                    <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search products by name, description, or SKU..."
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative min-w-[200px]">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105"
                        >
                            Search
                        </button>

                        {/* View Toggle */}
                        <div className="flex gap-2 p-1 rounded-xl bg-muted">
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${
                                    viewMode === 'grid'
                                        ? 'bg-background shadow-lg'
                                        : 'hover:bg-background/50'
                                }`}
                            >
                                <Grid3x3 className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${
                                    viewMode === 'list'
                                        ? 'bg-background shadow-lg'
                                        : 'hover:bg-background/50'
                                }`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Products Grid/List */}
                {products.data.length === 0 ? (
                    <div className="glass-card p-12 rounded-3xl text-center">
                        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
                        <p className="text-muted-foreground mb-6">
                            {filters.search || filters.category
                                ? 'Try adjusting your filters'
                                : 'Get started by adding your first product'}
                        </p>
                        <Link
                            href="/products/create"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105"
                        >
                            <Plus className="w-5 h-5" />
                            Add Product
                        </Link>
                    </div>
                ) : (
                    <>
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                    : 'flex flex-col gap-4'
                            }
                        >
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className={`glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all group ${
                                        viewMode === 'list' ? 'flex flex-row' : ''
                                    }`}
                                >
                                    {/* Image */}
                                    <div
                                        className={`relative ${
                                            viewMode === 'grid'
                                                ? 'aspect-square'
                                                : 'w-32 h-32 flex-shrink-0'
                                        }`}
                                    >
                                        {product.featured_image ? (
                                            <img
                                                src={product.featured_image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                                                <Package className="w-12 h-12 text-white" />
                                            </div>
                                        )}
                                        
                                        {/* Stock Badge */}
                                        {product.stock !== undefined && (
                                            <div
                                                className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${
                                                    product.stock === 0
                                                        ? 'bg-red-500 text-white'
                                                        : product.stock < 10
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-emerald-500 text-white'
                                                }`}
                                            >
                                                {product.stock === 0
                                                    ? 'Out of Stock'
                                                    : product.stock < 10
                                                    ? 'Low Stock'
                                                    : `${product.stock} in stock`}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={`p-4 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                        {/* Category */}
                                        {product.category && (
                                            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-2 w-fit">
                                                {product.category}
                                            </span>
                                        )}

                                        {/* Name */}
                                        <h3 className="text-lg font-bold mb-1 line-clamp-2">
                                            {product.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {product.description}
                                        </p>

                                        {/* SKU */}
                                        {product.sku && (
                                            <p className="text-xs text-muted-foreground mb-2">
                                                SKU: {product.sku}
                                            </p>
                                        )}

                                        {/* Price */}
                                        <div className="text-2xl font-black text-gradient-primary mb-4">
                                            ${product.price}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 mt-auto">
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="flex-1 px-4 py-2 rounded-xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105 flex items-center justify-center gap-2"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 font-semibold hover:bg-red-500/20 transition-all hover:scale-105 flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {products.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.visit(link.url)}
                                        disabled={!link.url}
                                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                                            link.active
                                                ? 'bg-gradient-primary text-white hover-glow'
                                                : link.url
                                                ? 'glass hover:scale-105'
                                                : 'opacity-50 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}
