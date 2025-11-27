"use client";

import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboardStore } from "@/store/dashboard";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  const { periodo, setPeriodo, toggleSidebar } = useDashboardStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Mobile menu */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
          aria-label="Abrir menu lateral"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </Button>

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar leads, campanhas..."
            className="pl-10 bg-slate-50 border-slate-200"
            aria-label="Buscar no dashboard"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <ThemeToggle />
        {/* Period Selector */}
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[130px] sm:w-[160px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 90 dias</SelectItem>
            <SelectItem value="12m">Último ano</SelectItem>
          </SelectContent>
        </Select>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden />
          <span className="sr-only">Notificações</span>
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="icon" aria-label="Abrir menu do usuário">
          <User className="w-5 h-5 text-slate-600" />
        </Button>
      </div>
    </header>
  );
}
