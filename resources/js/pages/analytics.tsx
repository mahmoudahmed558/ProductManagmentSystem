import { Head } from '@inertiajs/react';
import { TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Analytics', href: '/analytics' },
];

interface AnalyticsProps {
    metrics: {
        totalRevenue: number;
        totalOrders: number;
        productsSold: number;
        avgOrderValue: number;
    };
    monthlyRevenue: Array<{
        month: string;
        value: number;
        percentage: number;
    }>;
    topCategories: Array<{
        name: string;
        value: number;
        count: number;
        color: string;
    }>;
    performance: {
        bestSellingProduct: string;
        bestSellingCount: number;
        peakSalesDay: string;
        peakRevenue: string;
        growthRate: string;
    };
}

export default function Analytics({
    metrics,
    monthlyRevenue,
    topCategories,
    performance,
}: AnalyticsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div>
                    <h1 className="mb-2 text-4xl font-black">
                        Business
                        <span className="text-gradient-primary">
                            {' '}
                            Analytics
                        </span>
                    </h1>
                    <p className="text-muted-foreground">
                        Insights and performance metrics
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="glass-card rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-xl">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                                +24.5%
                            </span>
                        </div>
                        <div className="mb-1 text-3xl font-black">
                            ${metrics.totalRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total Revenue
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="bg-gradient-secondary flex h-12 w-12 items-center justify-center rounded-xl">
                                <ShoppingCart className="h-6 w-6 text-white" />
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                                +18%
                            </span>
                        </div>
                        <div className="mb-1 text-3xl font-black">
                            {metrics.totalOrders.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total Orders
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="bg-gradient-accent flex h-12 w-12 items-center justify-center rounded-xl">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-600">
                                +12%
                            </span>
                        </div>
                        <div className="mb-1 text-3xl font-black">
                            {metrics.productsSold.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Products Sold
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 transition-all hover:scale-105">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-indigo-600">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600">
                                +8.2%
                            </span>
                        </div>
                        <div className="mb-1 text-3xl font-black">
                            ${metrics.avgOrderValue}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Average Order
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Revenue Chart */}
                    <div className="glass-card rounded-3xl p-6">
                        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                            <div className="bg-gradient-primary h-8 w-2 rounded-full"></div>
                            Revenue Overview
                        </h2>

                        <div className="flex h-64 items-end justify-around gap-2">
                            {monthlyRevenue.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-1 flex-col items-center gap-2"
                                >
                                    <div
                                        className="bg-gradient-primary group relative w-full cursor-pointer rounded-t-2xl transition-all hover:scale-105"
                                        style={{
                                            height: `${item.percentage}%`,
                                        }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-black/90 px-3 py-1 text-sm font-semibold whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                                            ${item.value.toLocaleString()}
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {item.month}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Categories */}
                    <div className="glass-card rounded-3xl p-6">
                        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                            <div className="bg-gradient-secondary h-8 w-2 rounded-full"></div>
                            Top Categories
                        </h2>

                        <div className="space-y-4">
                            {topCategories.map((cat, i) => (
                                <div key={i}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-semibold">
                                            {cat.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {cat.value}%
                                        </span>
                                    </div>
                                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-1000`}
                                            style={{ width: `${cat.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card rounded-3xl p-6">
                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                        <div className="bg-gradient-accent h-8 w-2 rounded-full"></div>
                        Performance Summary
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/5 to-purple-600/5 p-4">
                            <div className="mb-2 text-sm text-muted-foreground">
                                Best Selling Product
                            </div>
                            <div className="text-xl font-bold">
                                {performance.bestSellingProduct}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-cyan-600">
                                {performance.bestSellingCount} units sold
                            </div>
                        </div>

                        <div className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-orange-500/5 p-4">
                            <div className="mb-2 text-sm text-muted-foreground">
                                Peak Sales Day
                            </div>
                            <div className="text-xl font-bold">
                                {performance.peakSalesDay}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-pink-600">
                                {performance.peakRevenue} revenue
                            </div>
                        </div>

                        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-lime-400/5 to-emerald-500/5 p-4">
                            <div className="mb-2 text-sm text-muted-foreground">
                                Growth Rate
                            </div>
                            <div className="text-xl font-bold">
                                {performance.growthRate}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-emerald-600">
                                vs last month
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
