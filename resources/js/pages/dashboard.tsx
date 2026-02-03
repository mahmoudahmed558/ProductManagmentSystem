import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { ShoppingBag, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        totalProducts: number;
        totalValue: number;
        lowStock: number;
        outOfStock: number;
        categories: number;
    };
    recentProducts: number;
    topCategory: string;
    avgValue: number;
    weeklyData: Array<{
        day: string;
        count: number;
        percentage: number;
    }>;
}

export default function Dashboard({ stats, recentProducts, topCategory, avgValue, weeklyData }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Welcome Header */}
                <div className="glass-card p-8 rounded-3xl bg-gradient-to-br from-cyan-400/10 via-purple-600/10 to-pink-500/10">
                    <h1 className="text-4xl font-black mb-2">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Here's what's happening with your products today
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Products */}
                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
                                    Active
                                </span>
                            </div>
                            <div className="text-3xl font-black mb-1">{stats.totalProducts}</div>
                            <div className="text-sm text-muted-foreground">Total Products</div>
                        </div>
                    </div>

                    {/* Total Value */}
                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-secondary rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold">
                                    Value
                                </span>
                            </div>
                            <div className="text-3xl font-black mb-1">
                                ${stats.totalValue.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Inventory Value</div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-accent rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                                    Active
                                </span>
                            </div>
                            <div className="text-3xl font-black mb-1">{stats.categories}</div>
                            <div className="text-sm text-muted-foreground">Categories</div>
                        </div>
                    </div>

                    {/* Low Stock */}
                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold">
                                    Alert
                                </span>
                            </div>
                            <div className="text-3xl font-black mb-1">{stats.lowStock + stats.outOfStock}</div>
                            <div className="text-sm text-muted-foreground">Low Stock Items</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="glass-card p-6 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
                            Quick Actions
                        </h2>
                        
                        <div className="space-y-3">
                            <button
                                onClick={() => router.visit('/products/create')}
                                className="w-full p-4 rounded-2xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105 text-left flex items-center justify-between"
                            >
                                <span>Add New Product</span>
                                <ShoppingBag className="w-5 h-5" />
                            </button>
                            
                            <button
                                onClick={() => router.visit('/products')}
                                className="w-full p-4 rounded-2xl glass border-2 border-cyan-500/20 font-semibold hover:scale-105 transition-all text-left flex items-center justify-between"
                            >
                                <span>View All Products</span>
                                <Package className="w-5 h-5" />
                            </button>
                            
                            <button 
                                onClick={() => router.visit('/low-stock')}
                                className="w-full p-4 rounded-2xl glass border-2 border-orange-500/20 font-semibold hover:scale-105 transition-all text-left flex items-center justify-between"
                            >
                                <span>Check Low Stock</span>
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="glass-card p-6 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <div className="w-2 h-8 bg-gradient-secondary rounded-full"></div>
                            Overview
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-400/5 to-purple-600/5 border border-cyan-400/10">
                                <span className="font-semibold">Products Added This Week</span>
                                <span className="text-xl font-black text-gradient-primary">{recentProducts}</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-500/5 to-orange-500/5 border border-pink-500/10">
                                <span className="font-semibold">Most Popular Category</span>
                                <span className="text-xl font-black text-gradient-secondary">{topCategory}</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-lime-400/5 to-emerald-500/5 border border-emerald-500/10">
                                <span className="font-semibold">Average Product Value</span>
                                <span className="text-xl font-black text-gradient-accent">
                                    ${avgValue}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Chart */}
                <div className="glass-card p-6 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="w-2 h-8 bg-gradient-accent rounded-full"></div>
                        Product Growth (Last 7 Days)
                    </h2>
                    
                    <div className="h-64 flex items-end justify-around gap-2 px-4">
                        {weeklyData.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full rounded-t-2xl bg-gradient-primary relative group hover:scale-105 transition-all cursor-pointer"
                                    style={{ height: `${Math.max(day.percentage, 5)}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                                        {day.count} products
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {day.day}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
