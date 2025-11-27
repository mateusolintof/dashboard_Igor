"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { KPICard } from "@/components/dashboard/KPICard";
import { CampaignChart } from "@/components/dashboard/CampaignChart";
import {
  DollarSign,
  MousePointer,
  Eye,
  Target,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

// Dados de exemplo
const mockCampaigns = [
  {
    id: "1",
    nome: "Botox - Conversão",
    plataforma: "Meta",
    status: "Ativa",
    investimento: 5000,
    impressoes: 125000,
    cliques: 3200,
    ctr: 2.56,
    conversoes: 45,
    cpl: 111.11,
  },
  {
    id: "2",
    nome: "Preenchimento Labial",
    plataforma: "Meta",
    status: "Ativa",
    investimento: 3500,
    impressoes: 89000,
    cliques: 2100,
    ctr: 2.36,
    conversoes: 32,
    cpl: 109.38,
  },
  {
    id: "3",
    nome: "Harmonização Facial",
    plataforma: "Google",
    status: "Ativa",
    investimento: 4200,
    impressoes: 156000,
    cliques: 4800,
    ctr: 3.08,
    conversoes: 38,
    cpl: 110.53,
  },
  {
    id: "4",
    nome: "Institucional",
    plataforma: "Meta",
    status: "Pausada",
    investimento: 2000,
    impressoes: 67000,
    cliques: 1200,
    ctr: 1.79,
    conversoes: 15,
    cpl: 133.33,
  },
];

const mockChartData = [
  { nome: "Botox", investimento: 5000, conversoes: 45, cpl: 111 },
  { nome: "Preenchimento", investimento: 3500, conversoes: 32, cpl: 109 },
  { nome: "Harmonização", investimento: 4200, conversoes: 38, cpl: 110 },
  { nome: "Institucional", investimento: 2000, conversoes: 15, cpl: 133 },
];

export default function TrafegoPagoPage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const paginatedCampaigns = useMemo(
    () =>
      mockCampaigns.slice((page - 1) * pageSize, page * pageSize),
    [page]
  );

  const totalPages = Math.max(1, Math.ceil(mockCampaigns.length / pageSize));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tráfego Pago</h1>
          <p className="text-slate-500">
            Performance de campanhas Meta Ads e Google Ads
          </p>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Sincronizar Dados
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 sm:gap-4">
        <KPICard
          title="Investimento Total"
          value={14700}
          change={8.5}
          format="currency"
          icon={<DollarSign className="w-5 h-5 text-blue-600" />}
        />
        <KPICard
          title="Impressões"
          value={437000}
          change={12.3}
          icon={<Eye className="w-5 h-5 text-purple-600" />}
        />
        <KPICard
          title="Cliques"
          value={11300}
          change={5.2}
          icon={<MousePointer className="w-5 h-5 text-amber-600" />}
        />
        <KPICard
          title="Conversões"
          value={130}
          change={15.8}
          icon={<Target className="w-5 h-5 text-emerald-600" />}
        />
        <KPICard
          title="CPL Médio"
          value={113.08}
          change={-3.2}
          format="currency"
          icon={<TrendingUp className="w-5 h-5 text-rose-600" />}
        />
      </div>

      {/* Tabs for Platforms */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="meta">Meta Ads</TabsTrigger>
          <TabsTrigger value="google">Google Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Chart */}
          <CampaignChart
            data={mockChartData}
            title="Performance por Campanha"
          />

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <CardTitle>Campanhas Ativas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[860px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campanha</TableHead>
                      <TableHead>Plataforma</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Investimento</TableHead>
                      <TableHead className="text-right">Impressões</TableHead>
                      <TableHead className="text-right">Cliques</TableHead>
                      <TableHead className="text-right">CTR</TableHead>
                      <TableHead className="text-right">Conversões</TableHead>
                      <TableHead className="text-right">CPL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading
                      ? Array.from({ length: pageSize }).map((_, idx) => (
                        <TableRow key={idx}>
                          <TableCell colSpan={9}>
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                        </TableRow>
                      ))
                      : paginatedCampaigns.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center text-slate-500">
                            Nenhuma campanha encontrada para o filtro atual.
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedCampaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">
                              {campaign.nome}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{campaign.plataforma}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  campaign.status === "Ativa" ? "default" : "secondary"
                                }
                              >
                                {campaign.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(campaign.investimento)}
                            </TableCell>
                            <TableCell className="text-right">
                              {new Intl.NumberFormat("pt-BR").format(
                                campaign.impressoes
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {new Intl.NumberFormat("pt-BR").format(campaign.cliques)}
                            </TableCell>
                            <TableCell className="text-right">
                              {campaign.ctr.toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right">
                              {campaign.conversoes}
                            </TableCell>
                            <TableCell className="text-right">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(campaign.cpl)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
              <span>
                Página {page} de {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="meta">
          <Card>
            <CardContent className="p-6">
              <p className="text-slate-500">
                Filtro aplicado: Apenas campanhas Meta Ads
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="google">
          <Card>
            <CardContent className="p-6">
              <p className="text-slate-500">
                Filtro aplicado: Apenas campanhas Google Ads
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
