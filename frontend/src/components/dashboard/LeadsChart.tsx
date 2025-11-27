"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartDataPoint {
  date: string;
  leads: number;
  conversoes: number;
}

interface LeadsChartProps {
  data: ChartDataPoint[];
  title?: string;
}

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
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="var(--chart-1)"
                strokeWidth={3}
                dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 4, stroke: "var(--background)" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="Novos Leads"
              />
              <Line
                type="monotone"
                dataKey="conversoes"
                stroke="var(--chart-2)"
                strokeWidth={3}
                dot={{ fill: "var(--chart-2)", strokeWidth: 2, r: 4, stroke: "var(--background)" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="Conversões"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

