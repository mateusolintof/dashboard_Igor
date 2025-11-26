"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  format?: "number" | "currency" | "percent";
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "vs período anterior",
  icon,
  format = "number",
}: KPICardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;

    switch (format) {
      case "currency":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(val);
      case "percent":
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat("pt-BR").format(val);
    }
  };

  const getTrendIcon = () => {
    if (!change) return <Minus className="w-4 h-4 text-slate-400" />;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {formatValue(value)}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {getTrendIcon()}
                <span
                  className={cn(
                    "text-sm font-medium",
                    change > 0
                      ? "text-emerald-600"
                      : change < 0
                      ? "text-red-600"
                      : "text-slate-500"
                  )}
                >
                  {change > 0 ? "+" : ""}
                  {change?.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-400">{changeLabel}</span>
              </div>
            )}
          </div>
          {icon && <div className="p-3 bg-blue-50 rounded-lg">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

