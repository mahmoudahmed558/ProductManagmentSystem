import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Reports', href: '/reports' },
];

export default function Reports() {
    const reports = [
        { id: 1, name: 'Monthly Sales Report', date: '2026-01-31', type: 'Sales', status: 'Ready' },
        { id: 2, name: 'Inventory Summary', date: '2026-02-01', type: 'Inventory', status: 'Ready' },
        { id: 3, name: 'Product Performance', date: '2026-01-28', type: 'Analytics', status: 'Ready' },
        { id: 4, name: 'Low Stock Alert', date: '2026-02-02', type: 'Inventory', status: 'New' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-black mb-2">
                        Business
                        <span className="text-gradient-primary"> Reports</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Generate and download business reports
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-4">
                    <button className="glass-card p-6 rounded-2xl hover:scale-105 transition-all text-left">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="font-bold mb-1">Sales Report</div>
                        <div className="text-sm text-muted-foreground">Revenue & orders</div>
                    </button>

                    <button className="glass-card p-6 rounded-2xl hover:scale-105 transition-all text-left">
                        <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="font-bold mb-1">Performance</div>
                        <div className="text-sm text-muted-foreground">Product insights</div>
                    </button>

                    <button className="glass-card p-6 rounded-2xl hover:scale-105 transition-all text-left">
                        <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="font-bold mb-1">Monthly</div>
                        <div className="text-sm text-muted-foreground">Full summary</div>
                    </button>

                    <button className="glass-card p-6 rounded-2xl hover:scale-105 transition-all text-left">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center mb-4">
                            <Download className="w-6 h-6 text-white" />
                        </div>
                        <div className="font-bold mb-1">Custom</div>
                        <div className="text-sm text-muted-foreground">Build your own</div>
                    </button>
                </div>

                {/* Recent Reports */}
                <div className="glass-card p-6 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
                        Recent Reports
                    </h2>

                    <div className="space-y-4">
                        {reports.map((report) => (
                            <div 
                                key={report.id}
                                className="flex items-center gap-4 p-4 rounded-2xl glass border border-border hover:scale-[1.02] transition-all"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-7 h-7 text-white" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold mb-1">{report.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{report.type}</span>
                                        <span>•</span>
                                        <span>{report.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                                        report.status === 'New' 
                                            ? 'bg-emerald-500/10 text-emerald-600' 
                                            : 'bg-cyan-500/10 text-cyan-600'
                                    }`}>
                                        {report.status}
                                    </span>
                                    
                                    <button className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105 flex items-center gap-2">
                                        <Download className="w-4 h-4" />
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
