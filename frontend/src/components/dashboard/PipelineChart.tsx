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
    color: "hsl(var(--chart-1))",
  },
  "Triagem Humana": {
    label: "Triagem Humana",
    color: "hsl(var(--chart-2))",
  },
  "Consulta Dr. Igor": {
    label: "Consulta Dr. Igor",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PipelineChart({
  data,
  title = "Distribuição por Pipeline",
}: PipelineChartProps) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
      </CardContent>
    </Card>
  );
}
