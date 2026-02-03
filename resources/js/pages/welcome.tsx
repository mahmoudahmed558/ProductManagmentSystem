import { Head, Link, usePage } from '@inertiajs/react';
import {
    Box,
    ShoppingBag,
    TrendingUp,
    Zap,
    Shield,
    BarChart3,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-black dark:via-zinc-900 dark:to-cyan-950">
                {/* Navigation */}
                <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:bg-black/50">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-gradient-primary text-2xl font-bold">
                                ProductHub
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="bg-gradient-primary hover-glow rounded-xl px-6 py-2.5 font-semibold text-white transition-all hover:scale-105"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-xl px-6 py-2.5 font-semibold text-foreground transition-all hover:text-cyan-500"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="bg-gradient-primary hover-glow rounded-xl px-6 py-2.5 font-semibold text-white transition-all hover:scale-105"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="px-6 pt-32 pb-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2">
                                    <Zap className="h-4 w-4 text-cyan-500" />
                                    <span className="text-sm font-semibold">
                                        Modern Product Management
                                    </span>
                                </div>

                                <h1 className="text-6xl leading-tight font-black lg:text-7xl">
                                    Manage Your
                                    <span className="text-gradient-primary">
                                        {' '}
                                        Products{' '}
                                    </span>
                                    with Style
                                </h1>

                                <p className="text-xl leading-relaxed text-muted-foreground">
                                    A beautiful and powerful platform to manage
                                    your inventory, track products, and grow
                                    your business. Built with modern technology
                                    for exceptional performance.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={
                                            auth.user ? dashboard() : register()
                                        }
                                        className="bg-gradient-primary hover-glow rounded-2xl px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105"
                                    >
                                        {auth.user
                                            ? 'Go to Dashboard'
                                            : 'Start Free Trial'}
                                    </Link>
                                    <button className="glass-card rounded-2xl px-8 py-4 text-lg font-semibold transition-all hover:scale-105">
                                        Watch Demo
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="flex gap-8 pt-8">
                                    <div>
                                        <div className="text-gradient-primary text-4xl font-black">
                                            99.9%
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Uptime
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gradient-secondary text-4xl font-black">
                                            1000+
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Products
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gradient-accent text-4xl font-black">
                                            Fast
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Performance
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="relative">
                                <div className="glass-card relative z-10 rounded-3xl p-8">
                                    <div className="space-y-4">
                                        {/* Mock Product Card */}
                                        <div className="flex items-center gap-4 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 p-4">
                                            <div className="bg-gradient-primary h-16 w-16 rounded-xl"></div>
                                            <div className="flex-1">
                                                <div className="mb-2 h-4 w-32 rounded bg-foreground/10"></div>
                                                <div className="h-3 w-20 rounded bg-foreground/10"></div>
                                            </div>
                                            <div className="text-gradient-primary text-2xl font-bold">
                                                $99
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 rounded-2xl border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-4">
                                            <div className="bg-gradient-secondary h-16 w-16 rounded-xl"></div>
                                            <div className="flex-1">
                                                <div className="mb-2 h-4 w-28 rounded bg-foreground/10"></div>
                                                <div className="h-3 w-24 rounded bg-foreground/10"></div>
                                            </div>
                                            <div className="text-gradient-secondary text-2xl font-bold">
                                                $149
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-lime-400/10 to-emerald-500/10 p-4">
                                            <div className="bg-gradient-accent h-16 w-16 rounded-xl"></div>
                                            <div className="flex-1">
                                                <div className="mb-2 h-4 w-36 rounded bg-foreground/10"></div>
                                                <div className="h-3 w-28 rounded bg-foreground/10"></div>
                                            </div>
                                            <div className="text-gradient-accent text-2xl font-bold">
                                                $79
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="bg-gradient-primary absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-2xl opacity-20 blur-2xl"></div>
                                <div
                                    className="bg-gradient-secondary absolute -bottom-4 -left-4 h-32 w-32 animate-pulse rounded-2xl opacity-20 blur-2xl"
                                    style={{ animationDelay: '1s' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-5xl font-black">
                                Everything You Need to
                                <span className="text-gradient-primary">
                                    {' '}
                                    Succeed
                                </span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                                Powerful features designed to make product
                                management effortless
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="glass-card group rounded-3xl p-8 transition-all hover:scale-105">
                                <div className="bg-gradient-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                                    <Box className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold">
                                    Smart Inventory
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    Track stock levels, get low-stock alerts,
                                    and manage your inventory with ease
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="glass-card group rounded-3xl p-8 transition-all hover:scale-105">
                                <div className="bg-gradient-secondary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                                    <TrendingUp className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold">
                                    Advanced Analytics
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    Visualize your data with beautiful charts
                                    and insightful metrics
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="glass-card group rounded-3xl p-8 transition-all hover:scale-105">
                                <div className="bg-gradient-accent mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold">
                                    Lightning Fast
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    Built for speed with modern technology and
                                    optimized performance
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="glass-card group rounded-3xl p-8 transition-all hover:scale-105">
                                <div className="bg-gradient-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold">
                                    Secure & Reliable
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    Enterprise-grade security to keep your data
                                    safe and protected
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="glass-card group rounded-3xl p-8 transition-all hover:scale-105">
                                <div className="bg-gradient-secondary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                                    <BarChart3 className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold">
                                    Real-time Updates
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    See changes instantly with live data
                                    synchronization
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="glass-card group rounded-3xl p-8 transition-all hover:scale-105">
                                <div className="bg-gradient-accent mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                                    <ShoppingBag className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold">
                                    Easy Management
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">
                                    Intuitive interface makes product management
                                    a breeze
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="glass-card relative overflow-hidden rounded-3xl p-12 text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-600/10 to-pink-500/10"></div>
                            <div className="relative z-10">
                                <h2 className="mb-6 text-5xl font-black">
                                    Ready to Get Started?
                                </h2>
                                <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
                                    Join thousands of businesses managing their
                                    products with ProductHub
                                </p>
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="bg-gradient-primary hover-glow inline-block rounded-2xl px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105"
                                >
                                    {auth.user
                                        ? 'Open Dashboard'
                                        : 'Start Your Free Trial'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-border px-6 py-8">
                    <div className="mx-auto max-w-7xl text-center text-muted-foreground">
                        <p>
                            &copy; 2026 ProductHub. Built with ❤️ and
                            cutting-edge technology.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
