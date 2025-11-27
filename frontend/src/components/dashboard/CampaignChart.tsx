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
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
            Sem dados disponíveis para este período.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
