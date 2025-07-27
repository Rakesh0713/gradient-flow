import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./shared/Sidebar";
import { Header } from "./shared/Header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  title?: string;
}

export function Layout({ title = "Dashboard" }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex h-screen w-full">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileOpen={isMobileMenuOpen}
          setIsMobileOpen={setIsMobileMenuOpen}
        />
        
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          "md:ml-0"
        )}>
          <Header
            title={title}
            onMobileMenuClick={() => setIsMobileMenuOpen(true)}
          />
          
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="container mx-auto p-6 max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}