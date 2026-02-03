import CustomSidebar from '@/components/custom-sidebar';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background">
            <CustomSidebar />
            
            <main className="flex-1 flex flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}
