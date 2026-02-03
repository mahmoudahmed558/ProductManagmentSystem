import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { ShoppingBag, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

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

export default function Dashboard({
    stats,
    recentProducts,
    topCategory,
    avgValue,
    weeklyData,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Welcome Header */}
                <div className="glass-card rounded-3xl bg-gradient-to-br from-cyan-400/10 via-purple-600/10 to-pink-500/10 p-8">
                    <h1 className="mb-2 text-4xl font-black">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Here's what's happening with your products today
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Products */}
                    <div className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="bg-gradient-primary absolute top-0 right-0 h-32 w-32 rounded-full opacity-10 blur-3xl transition-transform group-hover:scale-150"></div>
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-xl">
                                    <ShoppingBag className="h-6 w-6 text-white" />
                                </div>
                                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                                    Active
                                </span>
                            </div>
                            <div className="mb-1 text-3xl font-black">
                                {stats.totalProducts}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Total Products
                            </div>
                        </div>
                    </div>

                    {/* Total Value */}
                    <div className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="bg-gradient-secondary absolute top-0 right-0 h-32 w-32 rounded-full opacity-10 blur-3xl transition-transform group-hover:scale-150"></div>
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="bg-gradient-secondary flex h-12 w-12 items-center justify-center rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400">
                                    Value
                                </span>
                            </div>
                            <div className="mb-1 text-3xl font-black">
                                ${stats.totalValue.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Total Inventory Value
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="bg-gradient-accent absolute top-0 right-0 h-32 w-32 rounded-full opacity-10 blur-3xl transition-transform group-hover:scale-150"></div>
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="bg-gradient-accent flex h-12 w-12 items-center justify-center rounded-xl">
                                    <Package className="h-6 w-6 text-white" />
                                </div>
                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                    Active
                                </span>
                            </div>
                            <div className="mb-1 text-3xl font-black">
                                {stats.categories}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Categories
                            </div>
                        </div>
                    </div>

                    {/* Low Stock */}
                    <div className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-10 blur-3xl transition-transform group-hover:scale-150"></div>
                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-500">
                                    <AlertTriangle className="h-6 w-6 text-white" />
                                </div>
                                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                                    Alert
                                </span>
                            </div>
                            <div className="mb-1 text-3xl font-black">
                                {stats.lowStock + stats.outOfStock}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Low Stock Items
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="glass-card rounded-3xl p-6">
                        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                            <div className="bg-gradient-primary h-8 w-2 rounded-full"></div>
                            Quick Actions
                        </h2>

                        <div className="space-y-3">
                            <button
                                onClick={() => router.visit('/products/create')}
                                className="bg-gradient-primary hover-glow flex w-full items-center justify-between rounded-2xl p-4 text-left font-semibold text-white transition-all hover:scale-105"
                            >
                                <span>Add New Product</span>
                                <ShoppingBag className="h-5 w-5" />
                            </button>

                            <button
                                onClick={() => router.visit('/products')}
                                className="glass flex w-full items-center justify-between rounded-2xl border-2 border-cyan-500/20 p-4 text-left font-semibold transition-all hover:scale-105"
                            >
                                <span>View All Products</span>
                                <Package className="h-5 w-5" />
                            </button>

                            <button
                                onClick={() => router.visit('/low-stock')}
                                className="glass flex w-full items-center justify-between rounded-2xl border-2 border-orange-500/20 p-4 text-left font-semibold transition-all hover:scale-105"
                            >
                                <span>Check Low Stock</span>
                                <AlertTriangle className="h-5 w-5 text-orange-500" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="glass-card rounded-3xl p-6">
                        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                            <div className="bg-gradient-secondary h-8 w-2 rounded-full"></div>
                            Overview
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/5 to-purple-600/5 p-4">
                                <span className="font-semibold">
                                    Products Added This Week
                                </span>
                                <span className="text-gradient-primary text-xl font-black">
                                    {recentProducts}
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-pink-500/10 bg-gradient-to-r from-pink-500/5 to-orange-500/5 p-4">
                                <span className="font-semibold">
                                    Most Popular Category
                                </span>
                                <span className="text-gradient-secondary text-xl font-black">
                                    {topCategory}
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-emerald-500/10 bg-gradient-to-r from-lime-400/5 to-emerald-500/5 p-4">
                                <span className="font-semibold">
                                    Average Product Value
                                </span>
                                <span className="text-gradient-accent text-xl font-black">
                                    ${avgValue}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Chart */}
                <div className="glass-card rounded-3xl p-6">
                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                        <div className="bg-gradient-accent h-8 w-2 rounded-full"></div>
                        Product Growth (Last 7 Days)
                    </h2>

                    <div className="flex h-64 items-end justify-around gap-2 px-4">
                        {weeklyData.map((day, i) => (
                            <div
                                key={i}
                                className="flex flex-1 flex-col items-center gap-2"
                            >
                                <div
                                    className="bg-gradient-primary group relative w-full cursor-pointer rounded-t-2xl transition-all hover:scale-105"
                                    style={{
                                        height: `${Math.max(day.percentage, 5)}%`,
                                    }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg bg-black/90 px-3 py-1 text-sm font-semibold whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
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
