"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Eye } from "lucide-react";

// Dados de exemplo
const mockLeads = [
  {
    id: 1,
    nome: "Maria Silva",
    telefone: "(11) 99999-1234",
    email: "maria@email.com",
    origem: "Meta Ads",
    pipeline: "Atendimento IA",
    etapa: "Qualificação",
    data: "25/11/2024",
    valor: 2500,
  },
  {
    id: 2,
    nome: "João Santos",
    telefone: "(11) 98888-5678",
    email: "joao@email.com",
    origem: "Google Ads",
    pipeline: "Atendimento Humano",
    etapa: "Agendamento",
    data: "25/11/2024",
    valor: 3500,
  },
  {
    id: 3,
    nome: "Ana Oliveira",
    telefone: "(11) 97777-9012",
    email: "ana@email.com",
    origem: "Instagram",
    pipeline: "Dr. Igor",
    etapa: "Consulta Marcada",
    data: "24/11/2024",
    valor: 5000,
  },
  {
    id: 4,
    nome: "Carlos Pereira",
    telefone: "(11) 96666-3456",
    email: "carlos@email.com",
    origem: "Meta Ads",
    pipeline: "Atendimento IA",
    etapa: "Primeiro Contato",
    data: "24/11/2024",
    valor: 1800,
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    telefone: "(11) 95555-7890",
    email: "fernanda@email.com",
    origem: "Indicação",
    pipeline: "Dr. Igor",
    etapa: "Consulta Realizada",
    data: "23/11/2024",
    valor: 4500,
  },
];

const getBadgeVariant = (etapa: string) => {
  switch (etapa) {
    case "Primeiro Contato":
      return "secondary";
    case "Qualificação":
      return "outline";
    case "Agendamento":
      return "default";
    case "Consulta Marcada":
      return "default";
    case "Consulta Realizada":
      return "default";
    default:
      return "secondary";
  }
};

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedPipeline]);

  const filteredLeads = useMemo(
    () =>
      mockLeads.filter((lead) => {
        const matchesSearch =
          lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPipeline =
          selectedPipeline === "all" || lead.pipeline === selectedPipeline;
        return matchesSearch && matchesPipeline;
      }),
    [searchTerm, selectedPipeline]
  );

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const paginatedLeads = filteredLeads.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500">Gerencie todos os leads da clínica</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total de Leads</p>
            <p className="text-2xl font-bold text-slate-900">1,247</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Novos Hoje</p>
            <p className="text-2xl font-bold text-blue-600">23</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Em Qualificação</p>
            <p className="text-2xl font-bold text-amber-600">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Convertidos</p>
            <p className="text-2xl font-bold text-emerald-600">89</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar lead por nome ou email"
              />
            </div>
            <Select value={selectedPipeline} onValueChange={setSelectedPipeline}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Pipeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Pipelines</SelectItem>
                <SelectItem value="Atendimento IA">Atendimento IA</SelectItem>
                <SelectItem value="Atendimento Humano">
                  Atendimento Humano
                </SelectItem>
                <SelectItem value="Dr. Igor">Dr. Igor</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[780px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Pipeline</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Valor Est.</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: pageSize }).map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell colSpan={8}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                  : paginatedLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-slate-500">
                        Nenhum lead encontrado para os filtros atuais.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.nome}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{lead.telefone}</p>
                            <p className="text-xs text-slate-500">{lead.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{lead.origem}</TableCell>
                        <TableCell>{lead.pipeline}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(lead.etapa)}>
                            {lead.etapa}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(lead.valor)}
                        </TableCell>
                        <TableCell>{lead.data}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" aria-label="Ver lead">
                            <Eye className="w-4 h-4" />
                          </Button>
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
    </div>
  );
}
