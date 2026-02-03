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
    X
} from 'lucide-react';
import { useState } from 'react';
import type { SharedData } from '@/types';

interface NavItem {
    title: string;
    href: string;
    icon: any;
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
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-screen z-50 
                glass-card border-r border-border
                transition-all duration-300 ease-in-out
                ${isOpen ? 'w-72' : 'w-0 lg:w-20'}
                lg:relative
            `}>
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                    {isOpen && (
                        <Link href="/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tight">
                                    <span className="text-gradient-primary">Product</span>Hub
                                </span>
                                <span className="text-[10px] text-muted-foreground font-medium">
                                    Smart Inventory
                                </span>
                            </div>
                        </Link>
                    )}
                    
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-8 h-8 rounded-lg hover:bg-foreground/5 flex items-center justify-center"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                        const Icon = item.icon;
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
                                    transition-all group relative overflow-hidden
                                    ${isActive 
                                        ? 'bg-gradient-primary text-white shadow-lg' 
                                        : 'hover:bg-foreground/5 text-foreground'
                                    }
                                    ${!isOpen && 'lg:justify-center lg:px-2'}
                                `}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                )}
                                
                                <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${
                                    isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                                }`} />
                                
                                {isOpen && (
                                    <>
                                        <span className="flex-1 relative z-10">{item.title}</span>
                                        
                                        {item.badge && (
                                            <span className={`
                                                px-2 py-1 rounded-full text-xs font-bold relative z-10
                                                ${isActive 
                                                    ? 'bg-white/20 text-white' 
                                                    : 'bg-orange-500/10 text-orange-600'
                                                }
                                            `}>
                                                {item.badge}
                                            </span>
                                        )}
                                        
                                        {isActive && (
                                            <ChevronRight className="w-4 h-4 text-white relative z-10" />
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                {isOpen && auth.user && (
                    <div className="p-4 border-t border-border">
                        <Link
                            href="/settings/profile"
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                                {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold truncate">{auth.user.name}</div>
                                <div className="text-xs text-muted-foreground truncate">
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
                    className="hidden lg:block fixed top-4 left-4 z-40 w-10 h-10 rounded-xl glass shadow-lg hover:scale-110 transition-all"
                >
                    <ShoppingBag className="w-5 h-5 mx-auto text-cyan-500" />
                </button>
            )}
        </>
    );
}
