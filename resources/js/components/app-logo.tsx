import { ShoppingBag } from 'lucide-react';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight">
                    <span className="text-gradient-primary">Product</span>Hub
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                    Smart Inventory System
                </span>
            </div>
        </div>
    );
}
