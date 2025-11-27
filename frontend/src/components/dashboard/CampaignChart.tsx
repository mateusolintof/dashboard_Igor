"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface CampaignData {
  nome: string;
  investimento: number;
  conversoes: number;
  cpl: number;
}

interface CampaignChartProps {
  data: CampaignData[];
  title?: string;
}

const chartConfig = {
  investimento: {
    label: "Investimento",
    color: "var(--chart-1)",
  },
  conversoes: {
    label: "Conversões",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CampaignChart({
  data,
  title = "Performance de Campanhas",
}: CampaignChartProps) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full min-w-0">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nome"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="investimento" fill="var(--color-investimento)" radius={4} />
            <Bar dataKey="conversoes" fill="var(--color-conversoes)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

