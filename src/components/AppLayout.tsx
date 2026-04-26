import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function AppLayout({ title, subtitle, action, children }: Props) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border px-4 bg-card/50 backdrop-blur sticky top-0 z-10">
            <SidebarTrigger />
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold truncate">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-md px-2.5 py-1.5 border border-border">
              <Search className="h-3.5 w-3.5" />
              <span>Quick search</span>
              <kbd className="ml-2 rounded bg-background border border-border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </div>
            {action ?? (
              <Button size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" /> New
              </Button>
            )}
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
