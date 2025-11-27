"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useDashboardStore } from "@/store/dashboard";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useDashboardStore();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div
          className={cn(
            "fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden",
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        />
        <Header />
        <main
          id="conteudo-principal"
          className="flex-1 px-4 sm:px-6 py-6 overflow-auto min-w-0"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
