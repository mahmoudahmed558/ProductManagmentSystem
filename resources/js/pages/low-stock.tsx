import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Package, TrendingDown, RefreshCcw } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Low Stock', href: '/low-stock' },
];

interface LowStockProduct {
    id: number;
    name: string;
    stock: number;
    threshold: number;
    category: string;
    image: string | null;
}

interface LowStockProps {
    lowStockProducts: LowStockProduct[];
    stats: {
        lowStockCount: number;
        outOfStockCount: number;
        totalUnitsLeft: number;
    };
}

export default function LowStock({ lowStockProducts, stats }: LowStockProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Low Stock Products" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="mb-2 text-4xl font-black">
                            Low Stock
                            <span className="text-gradient-secondary">
                                {' '}
                                Alert
                            </span>
                        </h1>
                        <p className="text-muted-foreground">
                            Products that need restocking soon
                        </p>
                    </div>

                    <button className="bg-gradient-secondary hover-glow inline-flex w-fit items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white transition-all hover:scale-105">
                        <RefreshCcw className="h-5 w-5" />
                        Reorder All
                    </button>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="glass-card rounded-2xl border-2 border-orange-500/20 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-500">
                                <AlertTriangle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-orange-600">
                                    {stats.lowStockCount}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Low Stock Items
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl border-2 border-red-500/20 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700">
                                <TrendingDown className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-red-600">
                                    {stats.outOfStockCount}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Out of Stock
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-xl">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">
                                    {stats.totalUnitsLeft}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Total Units Left
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="glass-card rounded-3xl p-6">
                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                        <div className="h-8 w-2 rounded-full bg-gradient-to-b from-orange-400 to-red-500"></div>
                        Products Requiring Attention
                    </h2>

                    <div className="space-y-4">
                        {lowStockProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-red-500/5 p-4 transition-all hover:scale-[1.02]"
                            >
                                {/* Product Image */}
                                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-500">
                                    <Package className="h-10 w-10 text-white" />
                                </div>

                                {/* Product Info */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="mb-1 text-lg font-bold">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Category: {product.category}
                                    </p>
                                </div>

                                {/* Stock Status */}
                                <div className="px-6 text-center">
                                    <div className="mb-1 text-4xl font-black text-orange-600">
                                        {product.stock}
                                    </div>
                                    <div className="text-xs whitespace-nowrap text-muted-foreground">
                                        {product.stock === 0
                                            ? 'Out of Stock'
                                            : 'Units Left'}
                                    </div>
                                </div>

                                {/* Threshold */}
                                <div className="border-l border-border px-6 text-center">
                                    <div className="mb-1 text-2xl font-bold text-muted-foreground">
                                        {product.threshold}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Threshold
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        href={`/products/${product.id}/edit`}
                                        className="hover-glow rounded-xl bg-gradient-to-br from-orange-400 to-red-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105"
                                    >
                                        Restock
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {lowStockProducts.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                                <Package className="h-10 w-10 text-emerald-500" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">
                                All Good! ✅
                            </h3>
                            <p className="text-muted-foreground">
                                All products are well stocked
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
