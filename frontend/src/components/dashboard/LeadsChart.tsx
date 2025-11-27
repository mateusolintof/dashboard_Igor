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
    color: "hsl(var(--chart-1))",
  },
  conversoes: {
    label: "Conversões",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LeadsChart({
  data,
  title = "Evolução de Leads",
}: LeadsChartProps) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
      </CardContent>
    </Card>
  );
}

