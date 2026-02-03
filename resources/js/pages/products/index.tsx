import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Search,
    Filter,
    Pencil,
    Trash2,
    Plus,
    Package,
    Grid3x3,
    List,
} from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    products: {
        data: Product[];
        links: PaginationLink[];
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
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="mb-2 text-4xl font-black">
                            Products
                            <span className="text-gradient-primary">
                                {' '}
                                Collection
                            </span>
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your inventory and track your products
                        </p>
                    </div>

                    <Link
                        href="/products/create"
                        className="bg-gradient-primary hover-glow inline-flex w-fit items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white transition-all hover:scale-105"
                    >
                        <Plus className="h-5 w-5" />
                        Add New Product
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="glass-card rounded-3xl p-6">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col gap-4 lg:flex-row"
                    >
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search products by name, description, or SKU..."
                                value={data.search}
                                onChange={(e) =>
                                    setData('search', e.target.value)
                                }
                                className="w-full rounded-xl border border-border bg-background py-3 pr-4 pl-12 transition-all outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative min-w-[200px]">
                            <Filter className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <select
                                value={data.category}
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-background py-3 pr-4 pl-12 transition-all outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
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
                            className="bg-gradient-primary hover-glow rounded-xl px-8 py-3 font-semibold text-white transition-all hover:scale-105"
                        >
                            Search
                        </button>

                        {/* View Toggle */}
                        <div className="flex gap-2 rounded-xl bg-muted p-1">
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                className={`rounded-lg p-2 transition-all ${
                                    viewMode === 'grid'
                                        ? 'bg-background shadow-lg'
                                        : 'hover:bg-background/50'
                                }`}
                            >
                                <Grid3x3 className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('list')}
                                className={`rounded-lg p-2 transition-all ${
                                    viewMode === 'list'
                                        ? 'bg-background shadow-lg'
                                        : 'hover:bg-background/50'
                                }`}
                            >
                                <List className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Products Grid/List */}
                {products.data.length === 0 ? (
                    <div className="glass-card rounded-3xl p-12 text-center">
                        <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                        <h3 className="mb-2 text-2xl font-bold">
                            No Products Found
                        </h3>
                        <p className="mb-6 text-muted-foreground">
                            {filters.search || filters.category
                                ? 'Try adjusting your filters'
                                : 'Get started by adding your first product'}
                        </p>
                        <Link
                            href="/products/create"
                            className="bg-gradient-primary hover-glow inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105"
                        >
                            <Plus className="h-5 w-5" />
                            Add Product
                        </Link>
                    </div>
                ) : (
                    <>
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                    : 'flex flex-col gap-4'
                            }
                        >
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className={`glass-card group overflow-hidden rounded-2xl transition-all hover:scale-105 ${
                                        viewMode === 'list'
                                            ? 'flex flex-row'
                                            : ''
                                    }`}
                                >
                                    {/* Image */}
                                    <div
                                        className={`relative ${
                                            viewMode === 'grid'
                                                ? 'aspect-square'
                                                : 'h-32 w-32 flex-shrink-0'
                                        }`}
                                    >
                                        {product.featured_image ? (
                                            <img
                                                src={product.featured_image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="bg-gradient-primary flex h-full w-full items-center justify-center">
                                                <Package className="h-12 w-12 text-white" />
                                            </div>
                                        )}

                                        {/* Stock Badge */}
                                        {product.stock !== undefined && (
                                            <div
                                                className={`absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-bold ${
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
                                    <div
                                        className={`flex flex-col p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}
                                    >
                                        {/* Category */}
                                        {product.category && (
                                            <span className="mb-2 inline-block w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                                                {product.category}
                                            </span>
                                        )}

                                        {/* Name */}
                                        <h3 className="mb-1 line-clamp-2 text-lg font-bold">
                                            {product.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                            {product.description}
                                        </p>

                                        {/* SKU */}
                                        {product.sku && (
                                            <p className="mb-2 text-xs text-muted-foreground">
                                                SKU: {product.sku}
                                            </p>
                                        )}

                                        {/* Price */}
                                        <div className="text-gradient-primary mb-4 text-2xl font-black">
                                            ${product.price}
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-auto flex gap-2">
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="bg-gradient-primary hover-glow flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold text-white transition-all hover:scale-105"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        product.id,
                                                        product.name,
                                                    )
                                                }
                                                className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 font-semibold text-red-600 transition-all hover:scale-105 hover:bg-red-500/20 dark:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="mt-6 flex justify-center gap-2">
                                {products.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            link.url && router.visit(link.url)
                                        }
                                        disabled={!link.url}
                                        className={`rounded-xl px-4 py-2 font-semibold transition-all ${
                                            link.active
                                                ? 'bg-gradient-primary hover-glow text-white'
                                                : link.url
                                                  ? 'glass hover:scale-105'
                                                  : 'cursor-not-allowed opacity-50'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
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
