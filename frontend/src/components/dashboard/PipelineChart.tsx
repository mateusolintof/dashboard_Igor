"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

interface PipelineData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface PipelineChartProps {
  data: PipelineData[];
  title?: string;
}

const chartConfig = {
  value: {
    label: "Leads",
  },
  "Agendamento IA": {
    label: "Agendamento IA",
    color: "var(--chart-1)",
  },
  "Triagem Humana": {
    label: "Triagem Humana",
    color: "var(--chart-2)",
  },
  "Consulta Dr. Igor": {
    label: "Consulta Dr. Igor",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PipelineChart({
  data,
  title = "Distribuição por Pipeline",
}: PipelineChartProps) {
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
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              />
            </PieChart>
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
