"use client";

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
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Tráfego Pago", href: "/trafego-pago", icon: Megaphone },
  { name: "Instagram", href: "/instagram", icon: Instagram },
  { name: "Agentes IA", href: "/agentes", icon: Sparkles },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useDashboardStore();

  return (
    <aside
      className={cn(
        "min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20"
      )}
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
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
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
      <div
        className={cn(
          "absolute bottom-6 left-0 right-0 px-6",
          !sidebarOpen && "hidden"
        )}
      >
        <div className="p-4 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-slate-400">Versão 1.0.0</p>
          <p className="text-xs text-slate-500">© 2024 Convert Digital</p>
        </div>
      </div>
    </aside>
  );
}

