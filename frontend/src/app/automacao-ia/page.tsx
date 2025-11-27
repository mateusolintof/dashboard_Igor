"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/KPICard";
import { Bot, MessageSquare, UserCheck, Zap, Users, Brain } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    FunnelChart,
    Funnel,
    LabelList,
    Cell,
} from "recharts";

const mockFunnelData = [
    {
        value: 1200,
        name: "Leads Totais",
        fill: "var(--chart-1)",
    },
    {
        value: 950,
        name: "Atendimento IA",
        fill: "var(--chart-2)",
    },
    {
        value: 450,
        name: "Qualificados",
        fill: "var(--chart-3)",
    },
    {
        value: 200,
        name: "Agendados",
        fill: "var(--chart-4)",
    },
];

const mockObjectivesData = [
    { name: "Emagrecimento", value: 45 },
    { name: "Hipertrofia", value: 25 },
    { name: "Reposição Hormonal", value: 20 },
    { name: "Longevidade", value: 10 },
];

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
                        <div className="h-[350px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <FunnelChart>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "var(--card)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "var(--radius)",
                                        }}
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
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle>Objetivos dos Pacientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={mockObjectivesData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="var(--muted-foreground)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        width={100}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "var(--muted)" }}
                                        contentStyle={{
                                            backgroundColor: "var(--card)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "var(--radius)",
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                        {mockObjectivesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 5) + 1})`} />
                                        ))}
                                        <LabelList dataKey="value" position="right" fill="var(--foreground)" formatter={(val: any) => `${val}%`} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
