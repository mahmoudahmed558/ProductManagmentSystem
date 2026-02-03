import { Head } from '@inertiajs/react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Reports', href: '/reports' }];

export default function Reports() {
    const reports = [
        {
            id: 1,
            name: 'Monthly Sales Report',
            date: '2026-01-31',
            type: 'Sales',
            status: 'Ready',
        },
        {
            id: 2,
            name: 'Inventory Summary',
            date: '2026-02-01',
            type: 'Inventory',
            status: 'Ready',
        },
        {
            id: 3,
            name: 'Product Performance',
            date: '2026-01-28',
            type: 'Analytics',
            status: 'Ready',
        },
        {
            id: 4,
            name: 'Low Stock Alert',
            date: '2026-02-02',
            type: 'Inventory',
            status: 'New',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div>
                    <h1 className="mb-2 text-4xl font-black">
                        Business
                        <span className="text-gradient-primary"> Reports</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Generate and download business reports
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-4">
                    <button className="glass-card rounded-2xl p-6 text-left transition-all hover:scale-105">
                        <div className="bg-gradient-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div className="mb-1 font-bold">Sales Report</div>
                        <div className="text-sm text-muted-foreground">
                            Revenue & orders
                        </div>
                    </button>

                    <button className="glass-card rounded-2xl p-6 text-left transition-all hover:scale-105">
                        <div className="bg-gradient-secondary mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div className="mb-1 font-bold">Performance</div>
                        <div className="text-sm text-muted-foreground">
                            Product insights
                        </div>
                    </button>

                    <button className="glass-card rounded-2xl p-6 text-left transition-all hover:scale-105">
                        <div className="bg-gradient-accent mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="mb-1 font-bold">Monthly</div>
                        <div className="text-sm text-muted-foreground">
                            Full summary
                        </div>
                    </button>

                    <button className="glass-card rounded-2xl p-6 text-left transition-all hover:scale-105">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-indigo-600">
                            <Download className="h-6 w-6 text-white" />
                        </div>
                        <div className="mb-1 font-bold">Custom</div>
                        <div className="text-sm text-muted-foreground">
                            Build your own
                        </div>
                    </button>
                </div>

                {/* Recent Reports */}
                <div className="glass-card rounded-3xl p-6">
                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                        <div className="bg-gradient-primary h-8 w-2 rounded-full"></div>
                        Recent Reports
                    </h2>

                    <div className="space-y-4">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className="glass flex items-center gap-4 rounded-2xl border border-border p-4 transition-all hover:scale-[1.02]"
                            >
                                <div className="bg-gradient-primary flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl">
                                    <FileText className="h-7 w-7 text-white" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="mb-1 text-lg font-bold">
                                        {report.name}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{report.type}</span>
                                        <span>•</span>
                                        <span>{report.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                                            report.status === 'New'
                                                ? 'bg-emerald-500/10 text-emerald-600'
                                                : 'bg-cyan-500/10 text-cyan-600'
                                        }`}
                                    >
                                        {report.status}
                                    </span>

                                    <button className="bg-gradient-primary hover-glow flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105">
                                        <Download className="h-4 w-4" />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
