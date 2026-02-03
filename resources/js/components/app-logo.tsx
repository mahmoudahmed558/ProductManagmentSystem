import { ShoppingBag } from 'lucide-react';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight">
                    <span className="text-gradient-primary">Product</span>Hub
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                    Smart Inventory System
                </span>
            </div>
        </div>
    );
}
