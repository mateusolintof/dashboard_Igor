```
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/KPICard";
import { Bot, MessageSquare, UserCheck, Zap, Users, Brain } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Funnel,
  FunnelChart,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const mockFunnelData = [
  {
    value: 1200,
    name: "Leads Totais",
    fill: "var(--color-leads)",
  },
  {
    value: 950,
    name: "Atendimento IA",
    fill: "var(--color-atendimento)",
  },
  {
    value: 450,
    name: "Qualificados",
    fill: "var(--color-qualificados)",
  },
  {
    value: 200,
    name: "Agendados",
    fill: "var(--color-agendados)",
  },
];

const mockObjectivesData = [
  { name: "Emagrecimento", value: 45, fill: "var(--color-emagrecimento)" },
  { name: "Hipertrofia", value: 25, fill: "var(--color-hipertrofia)" },
  { name: "Reposição Hormonal", value: 20, fill: "var(--color-reposicao)" },
  { name: "Longevidade", value: 10, fill: "var(--color-longevidade)" },
];

const funnelConfig = {
  leads: {
    label: "Leads Totais",
    color: "hsl(var(--chart-1))",
  },
  atendimento: {
    label: "Atendimento IA",
    color: "hsl(var(--chart-2))",
  },
  qualificados: {
    label: "Qualificados",
    color: "hsl(var(--chart-3))",
  },
  agendados: {
    label: "Agendados",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const objectivesConfig = {
  emagrecimento: {
    label: "Emagrecimento",
    color: "hsl(var(--chart-1))",
  },
  hipertrofia: {
    label: "Hipertrofia",
    color: "hsl(var(--chart-2))",
  },
  reposicao: {
    label: "Reposição Hormonal",
    color: "hsl(var(--chart-3))",
  },
  longevidade: {
    label: "Longevidade",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function AutomacaoIAPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Automação & IA
        </h1>
        <p className="text-muted-foreground mt-2">
          Performance dos agentes inteligentes na triagem de pacientes.
        </p>
      </div>

      {/* KPIs Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Leads Totais"
          value={1247}
          change={12.5}
          icon={<Users className="w-5 h-5 text-primary" />}
        />
        <KPICard
          title="Leads Qualificados"
          value={450}
          change={18.2}
          icon={<UserCheck className="w-5 h-5 text-emerald-500" />}
        />
        <KPICard
          title="Valor Informado"
          value={380}
          change={5.4}
          icon={<Zap className="w-5 h-5 text-yellow-500" />}
        />
        <KPICard
          title="Atendimento Humano"
          value={120}
          change={-2.5}
          icon={<Brain className="w-5 h-5 text-purple-500" />}
        />
      </div>

      {/* KPIs Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Conversas Ativas"
          value={85}
          change={15.2}
          icon={<MessageSquare className="w-5 h-5 text-blue-500" />}
        />
        <KPICard
          title="Tempo Economizado"
          value={45.5}
          suffix="h"
          change={22.1}
          icon={<Zap className="w-5 h-5 text-yellow-500" />}
        />
        <KPICard
          title="Taxa de Automação"
          value={92.5}
          format="percent"
          change={1.2}
          icon={<Bot className="w-5 h-5 text-emerald-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle>Funnel de Conversão (IA vs Humano)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={funnelConfig} className="h-[350px] w-full">
              <FunnelChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Funnel data={mockFunnelData} dataKey="value">
                  <LabelList
                    position="right"
                    fill="var(--foreground)"
                    stroke="none"
                    dataKey="name"
                  />
                </Funnel>
              </FunnelChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle>Objetivos dos Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={objectivesConfig} className="h-[350px] w-full">
              <BarChart
                accessibilityLayer
                data={mockObjectivesData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={100}
                />
                <XAxis dataKey="value" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" layout="vertical" radius={5}>
                  <LabelList
                    dataKey="value"
                    position="right"
                    fill="var(--foreground)"
                    formatter={(val: any) => `${ val }% `}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```
