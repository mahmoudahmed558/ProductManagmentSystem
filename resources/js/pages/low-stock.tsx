import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { AlertTriangle, Package, TrendingDown, RefreshCcw } from 'lucide-react';

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
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-2">
                            Low Stock
                            <span className="text-gradient-secondary"> Alert</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Products that need restocking soon
                        </p>
                    </div>
                    
                    <button className="px-6 py-3 rounded-2xl bg-gradient-secondary text-white font-semibold hover-glow transition-all hover:scale-105 inline-flex items-center gap-2 w-fit">
                        <RefreshCcw className="w-5 h-5" />
                        Reorder All
                    </button>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-2xl border-2 border-orange-500/20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-orange-600">
                                    {stats.lowStockCount}
                                </div>
                                <div className="text-sm text-muted-foreground">Low Stock Items</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border-2 border-red-500/20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                                <TrendingDown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-red-600">
                                    {stats.outOfStockCount}
                                </div>
                                <div className="text-sm text-muted-foreground">Out of Stock</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-black">
                                    {stats.totalUnitsLeft}
                                </div>
                                <div className="text-sm text-muted-foreground">Total Units Left</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="glass-card p-6 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-red-500 rounded-full"></div>
                        Products Requiring Attention
                    </h2>

                    <div className="space-y-4">
                        {lowStockProducts.map((product) => (
                            <div 
                                key={product.id}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-orange-500/5 to-red-500/5 border border-orange-500/20 hover:scale-[1.02] transition-all"
                            >
                                {/* Product Image */}
                                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                                    <Package className="w-10 h-10 text-white" />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Category: {product.category}
                                    </p>
                                </div>

                                {/* Stock Status */}
                                <div className="text-center px-6">
                                    <div className="text-4xl font-black text-orange-600 mb-1">
                                        {product.stock}
                                    </div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                                        {product.stock === 0 ? 'Out of Stock' : 'Units Left'}
                                    </div>
                                </div>

                                {/* Threshold */}
                                <div className="text-center px-6 border-l border-border">
                                    <div className="text-2xl font-bold text-muted-foreground mb-1">
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
                                        className="px-6 py-3 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 text-white font-semibold hover-glow transition-all hover:scale-105"
                                    >
                                        Restock
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {lowStockProducts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                                <Package className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">All Good! ✅</h3>
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
