import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Package,
    BarChart3,
    Tags,
    AlertTriangle,
    FileText,
    Settings,
    ShoppingBag,
    ChevronRight,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import type { SharedData } from '@/types';

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
}

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Products',
        href: '/products',
        icon: Package,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: Tags,
    },
    {
        title: 'Low Stock',
        href: '/low-stock',
        icon: AlertTriangle,
        badge: '5',
    },
    {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

export default function CustomSidebar() {
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(true);
    const currentPath = window.location.pathname;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`glass-card fixed top-0 left-0 z-50 h-screen border-r border-border transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-0 lg:w-20'} lg:relative`}
            >
                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b border-border px-6">
                    {isOpen && (
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3"
                        >
                            <div className="bg-gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tight">
                                    <span className="text-gradient-primary">
                                        Product
                                    </span>
                                    Hub
                                </span>
                                <span className="text-[10px] font-medium text-muted-foreground">
                                    Smart Inventory
                                </span>
                            </div>
                        </Link>
                    )}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-foreground/5 lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                    {navItems.map((item) => {
                        const isActive =
                            currentPath === item.href ||
                            currentPath.startsWith(item.href + '/');
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 font-semibold transition-all ${
                                    isActive
                                        ? 'bg-gradient-primary text-white shadow-lg'
                                        : 'text-foreground hover:bg-foreground/5'
                                } ${!isOpen && 'lg:justify-center lg:px-2'} `}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 animate-pulse bg-white/20" />
                                )}

                                <Icon
                                    className={`relative z-10 h-5 w-5 flex-shrink-0 ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-muted-foreground group-hover:text-foreground'
                                    }`}
                                />

                                {isOpen && (
                                    <>
                                        <span className="relative z-10 flex-1">
                                            {item.title}
                                        </span>

                                        {item.badge && (
                                            <span
                                                className={`relative z-10 rounded-full px-2 py-1 text-xs font-bold ${
                                                    isActive
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-orange-500/10 text-orange-600'
                                                } `}
                                            >
                                                {item.badge}
                                            </span>
                                        )}

                                        {isActive && (
                                            <ChevronRight className="relative z-10 h-4 w-4 text-white" />
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                {isOpen && auth.user && (
                    <div className="border-t border-border p-4">
                        <Link
                            href="/settings/profile"
                            className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-foreground/5"
                        >
                            <div className="bg-gradient-primary flex h-10 w-10 items-center justify-center rounded-full font-bold text-white">
                                {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="truncate font-semibold">
                                    {auth.user.name}
                                </div>
                                <div className="truncate text-xs text-muted-foreground">
                                    {auth.user.email}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </aside>

            {/* Toggle Button for Desktop */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="glass fixed top-4 left-4 z-40 hidden h-10 w-10 rounded-xl shadow-lg transition-all hover:scale-110 lg:block"
                >
                    <ShoppingBag className="mx-auto h-5 w-5 text-cyan-500" />
                </button>
            )}
        </>
    );
}
