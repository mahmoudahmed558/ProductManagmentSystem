import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { BarChart3, TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';

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

export default function Analytics({ metrics, monthlyRevenue, topCategories, performance }: AnalyticsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-black mb-2">
                        Business
                        <span className="text-gradient-primary"> Analytics</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Insights and performance metrics
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                                +24.5%
                            </span>
                        </div>
                        <div className="text-3xl font-black mb-1">${metrics.totalRevenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                                +18%
                            </span>
                        </div>
                        <div className="text-3xl font-black mb-1">{metrics.totalOrders.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-bold">
                                +12%
                            </span>
                        </div>
                        <div className="text-3xl font-black mb-1">{metrics.productsSold.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Products Sold</div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-bold">
                                +8.2%
                            </span>
                        </div>
                        <div className="text-3xl font-black mb-1">${metrics.avgOrderValue}</div>
                        <div className="text-sm text-muted-foreground">Average Order</div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <div className="glass-card p-6 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
                            Revenue Overview
                        </h2>
                        
                        <div className="h-64 flex items-end justify-around gap-2">
                            {monthlyRevenue.map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full rounded-t-2xl bg-gradient-primary hover:scale-105 transition-all cursor-pointer relative group"
                                        style={{ height: `${item.percentage}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
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
                    <div className="glass-card p-6 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <div className="w-2 h-8 bg-gradient-secondary rounded-full"></div>
                            Top Categories
                        </h2>
                        
                        <div className="space-y-4">
                            {topCategories.map((cat, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">{cat.name}</span>
                                        <span className="text-sm text-muted-foreground">{cat.value}%</span>
                                    </div>
                                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                                        <div 
                                            className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-1000 rounded-full`}
                                            style={{ width: `${cat.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="w-2 h-8 bg-gradient-accent rounded-full"></div>
                        Performance Summary
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-400/5 to-purple-600/5 border border-cyan-400/20">
                            <div className="text-sm text-muted-foreground mb-2">Best Selling Product</div>
                            <div className="text-xl font-bold">{performance.bestSellingProduct}</div>
                            <div className="text-sm text-cyan-600 font-semibold mt-1">{performance.bestSellingCount} units sold</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/5 to-orange-500/5 border border-pink-500/20">
                            <div className="text-sm text-muted-foreground mb-2">Peak Sales Day</div>
                            <div className="text-xl font-bold">{performance.peakSalesDay}</div>
                            <div className="text-sm text-pink-600 font-semibold mt-1">{performance.peakRevenue} revenue</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border border-emerald-500/20">
                            <div className="text-sm text-muted-foreground mb-2">Growth Rate</div>
                            <div className="text-xl font-bold">{performance.growthRate}</div>
                            <div className="text-sm text-emerald-600 font-semibold mt-1">vs last month</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
