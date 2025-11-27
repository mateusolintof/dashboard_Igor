"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Instagram,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Automação IA", href: "/automacao-ia", icon: Sparkles },
  { name: "Leads Gerais", href: "/leads", icon: Users },
  { name: "Tráfego Pago", href: "/trafego-pago", icon: Megaphone },
  { name: "Instagram", href: "/instagram", icon: Instagram },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useDashboardStore();

  useEffect(() => {
    // Close sidebar on mobile by default; keep open on large screens
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    setSidebarOpen(isDesktop);
  }, [setSidebarOpen]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col w-64 lg:static lg:min-h-screen",
        sidebarOpen ? "translate-x-0 lg:w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
      )}
      aria-label="Navegação lateral"
      aria-expanded={sidebarOpen}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className={cn(!sidebarOpen && "hidden")}>
          <h1 className="text-xl font-bold text-white">Clínica Dr. Igor</h1>
          <p className="text-sm text-slate-400">Dashboard Analytics</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-white hover:bg-slate-700"
          aria-label={sidebarOpen ? "Recolher menu lateral" : "Expandir menu lateral"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1 flex-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span
                className={cn("font-medium", !sidebarOpen && "hidden")}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn("p-6 mt-auto", !sidebarOpen && "hidden")}>
        <div className="p-4 bg-sidebar-accent/50 rounded-lg border border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60">Versão 1.0.0</p>
          <p className="text-xs text-sidebar-foreground/40">© 2025 Convert Digital</p>
        </div>
      </div>
    </aside>
  );
}
