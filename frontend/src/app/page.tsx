"use client";

import { Users, DollarSign, Target, Calendar } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { LeadsChart } from "@/components/dashboard/LeadsChart";
import { CampaignChart } from "@/components/dashboard/CampaignChart";
import { PipelineChart } from "@/components/dashboard/PipelineChart";

// Dados de exemplo para demonstração
const mockLeadsData = [
  { date: "01/11", leads: 45, conversoes: 12 },
  { date: "02/11", leads: 52, conversoes: 15 },
  { date: "03/11", leads: 48, conversoes: 14 },
  { date: "04/11", leads: 70, conversoes: 22 },
  { date: "05/11", leads: 61, conversoes: 18 },
  { date: "06/11", leads: 55, conversoes: 16 },
  { date: "07/11", leads: 67, conversoes: 20 },
];

const mockCampaignData = [
  { nome: "Emagrecimento", investimento: 5000, conversoes: 45, cpl: 111 },
  { nome: "Performance", investimento: 3500, conversoes: 32, cpl: 109 },
  { nome: "Implantes", investimento: 4200, conversoes: 38, cpl: 110 },
  { nome: "Longevidade", investimento: 2000, conversoes: 15, cpl: 133 },
];

const mockPipelineData = [
  { name: "Agendamento IA", value: 120, color: "var(--chart-1)" },
  { name: "Triagem Humana", value: 85, color: "var(--chart-2)" },
  { name: "Consulta Dr. Igor", value: 45, color: "var(--chart-3)" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bem-vindo ao Dashboard
        </h1>
        <p className="text-slate-500">
          Visão geral da performance da clínica
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total de Leads"
          value={1247}
          change={12.5}
          icon={<Users className="w-6 h-6 text-blue-600" />}
        />
        <KPICard
          title="Receita Estimada"
          value={156000}
          change={8.2}
          format="currency"
          icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
        />
        <KPICard
          title="Taxa de Conversão"
          value={28.5}
          change={-2.1}
          format="percent"
          icon={<Target className="w-6 h-6 text-amber-600" />}
        />
        <KPICard
          title="Consultas Agendadas"
          value={89}
          change={15.3}
          icon={<Calendar className="w-6 h-6 text-purple-600" />}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadsChart data={mockLeadsData} />
        <CampaignChart data={mockCampaignData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PipelineChart data={mockPipelineData} />

        {/* Quick Stats Card */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Resumo do Período
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">R$ 14.700</p>
              <p className="text-sm text-slate-600">Investimento Total</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">130</p>
              <p className="text-sm text-slate-600">Conversões</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-600">R$ 113</p>
              <p className="text-sm text-slate-600">CPL Médio</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">10.6x</p>
              <p className="text-sm text-slate-600">ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
