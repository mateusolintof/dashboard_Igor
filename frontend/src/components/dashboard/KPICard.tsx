"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  format?: "number" | "currency" | "percent";
  suffix?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "vs. mês anterior",
  icon,
  format = "number",
  suffix = "",
}: KPICardProps) {
  const formattedValue =
    format === "currency"
      ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value as number)
      : format === "percent"
        ? `${value}%`
        : (value as number).toLocaleString("pt-BR");

  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">
              {formattedValue}
              {suffix}
            </h3>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl ring-1 ring-primary/20">
            {icon}
          </div>
        </div>
        {change !== undefined && (
          <div className="mt-4 flex items-center text-sm">
            <span
              className={cn(
                "font-medium px-2 py-0.5 rounded-full text-xs",
                isPositive
                  ? "text-emerald-600 bg-emerald-500/10"
                  : "text-red-600 bg-red-500/10"
              )}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span className="text-muted-foreground ml-2">{changeLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
