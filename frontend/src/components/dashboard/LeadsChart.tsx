"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

interface ChartDataPoint {
  date: string;
  leads: number;
  conversoes: number;
}

interface LeadsChartProps {
  data: ChartDataPoint[];
  title?: string;
}

const chartConfig = {
  leads: {
    label: "Novos Leads",
    color: "var(--chart-1)",
  },
  conversoes: {
    label: "Conversões",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function LeadsChart({
  data,
  title = "Evolução de Leads",
}: LeadsChartProps) {
  const hasData = data && data.length > 0;

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 sm:pt-2">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="min-h-[240px] sm:h-[280px] lg:h-[320px]"
          >
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey="leads"
                type="monotone"
                stroke="var(--color-leads)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="conversoes"
                type="monotone"
                stroke="var(--color-conversoes)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
            Sem dados disponíveis para este período.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
