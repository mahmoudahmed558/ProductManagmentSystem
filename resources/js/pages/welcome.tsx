import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Box, ShoppingBag, TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react';

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
                <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/50 border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gradient-primary">
                                ProductHub
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-6 py-2.5 rounded-xl font-semibold text-foreground hover:text-cyan-500 transition-all"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-primary text-white font-semibold hover-glow transition-all hover:scale-105"
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
                <section className="pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                                    <Zap className="w-4 h-4 text-cyan-500" />
                                    <span className="text-sm font-semibold">Modern Product Management</span>
                                </div>
                                
                                <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                                    Manage Your
                                    <span className="text-gradient-primary"> Products </span>
                                    with Style
                                </h1>
                                
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    A beautiful and powerful platform to manage your inventory, 
                                    track products, and grow your business. Built with modern 
                                    technology for exceptional performance.
                                </p>
                                
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={auth.user ? dashboard() : register()}
                                        className="px-8 py-4 rounded-2xl bg-gradient-primary text-white text-lg font-bold hover-glow transition-all hover:scale-105 shadow-2xl"
                                    >
                                        {auth.user ? 'Go to Dashboard' : 'Start Free Trial'}
                                    </Link>
                                    <button className="px-8 py-4 rounded-2xl glass-card text-lg font-semibold hover:scale-105 transition-all">
                                        Watch Demo
                                    </button>
                                </div>
                                
                                {/* Stats */}
                                <div className="flex gap-8 pt-8">
                                    <div>
                                        <div className="text-4xl font-black text-gradient-primary">99.9%</div>
                                        <div className="text-sm text-muted-foreground">Uptime</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-gradient-secondary">1000+</div>
                                        <div className="text-sm text-muted-foreground">Products</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-gradient-accent">Fast</div>
                                        <div className="text-sm text-muted-foreground">Performance</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Visual */}
                            <div className="relative">
                                <div className="glass-card p-8 rounded-3xl relative z-10">
                                    <div className="space-y-4">
                                        {/* Mock Product Card */}
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-600/10 border border-cyan-400/20">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-primary"></div>
                                            <div className="flex-1">
                                                <div className="h-4 w-32 bg-foreground/10 rounded mb-2"></div>
                                                <div className="h-3 w-20 bg-foreground/10 rounded"></div>
                                            </div>
                                            <div className="text-2xl font-bold text-gradient-primary">$99</div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-secondary"></div>
                                            <div className="flex-1">
                                                <div className="h-4 w-28 bg-foreground/10 rounded mb-2"></div>
                                                <div className="h-3 w-24 bg-foreground/10 rounded"></div>
                                            </div>
                                            <div className="text-2xl font-bold text-gradient-secondary">$149</div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-lime-400/10 to-emerald-500/10 border border-emerald-500/20">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-accent"></div>
                                            <div className="flex-1">
                                                <div className="h-4 w-36 bg-foreground/10 rounded mb-2"></div>
                                                <div className="h-3 w-28 bg-foreground/10 rounded"></div>
                                            </div>
                                            <div className="text-2xl font-bold text-gradient-accent">$79</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-secondary rounded-2xl opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-black mb-4">
                                Everything You Need to
                                <span className="text-gradient-primary"> Succeed</span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Powerful features designed to make product management effortless
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all group">
                                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Box className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Smart Inventory</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Track stock levels, get low-stock alerts, and manage your inventory with ease
                                </p>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all group">
                                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Advanced Analytics</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Visualize your data with beautiful charts and insightful metrics
                                </p>
                            </div>
                            
                            {/* Feature 3 */}
                            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all group">
                                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Built for speed with modern technology and optimized performance
                                </p>
                            </div>
                            
                            {/* Feature 4 */}
                            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all group">
                                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Secure & Reliable</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Enterprise-grade security to keep your data safe and protected
                                </p>
                            </div>
                            
                            {/* Feature 5 */}
                            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all group">
                                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Real-time Updates</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    See changes instantly with live data synchronization
                                </p>
                            </div>
                            
                            {/* Feature 6 */}
                            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all group">
                                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <ShoppingBag className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Easy Management</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Intuitive interface makes product management a breeze
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="glass-card p-12 rounded-3xl text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-600/10 to-pink-500/10"></div>
                            <div className="relative z-10">
                                <h2 className="text-5xl font-black mb-6">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    Join thousands of businesses managing their products with ProductHub
                                </p>
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="inline-block px-10 py-5 rounded-2xl bg-gradient-primary text-white text-xl font-bold hover-glow transition-all hover:scale-105 shadow-2xl"
                                >
                                    {auth.user ? 'Open Dashboard' : 'Start Your Free Trial'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 px-6 border-t border-border">
                    <div className="max-w-7xl mx-auto text-center text-muted-foreground">
                        <p>&copy; 2026 ProductHub. Built with  ❤️ and cutting-edge technology.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
