"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Key,
  Link,
  Bell,
  User,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

const integrations = [
  {
    nome: "Kommo CRM",
    descricao: "Sincronização de leads e pipelines",
    status: "conectado",
    ultimaSync: "Há 5 minutos",
  },
  {
    nome: "Meta Ads",
    descricao: "Campanhas Facebook e Instagram Ads",
    status: "conectado",
    ultimaSync: "Há 15 minutos",
  },
  {
    nome: "Google Ads",
    descricao: "Campanhas Google Search e Display",
    status: "pendente",
    ultimaSync: "Nunca",
  },
  {
    nome: "Instagram Business",
    descricao: "Métricas e posts do Instagram",
    status: "conectado",
    ultimaSync: "Há 10 minutos",
  },
  {
    nome: "n8n Chat History",
    descricao: "Histórico de conversas dos agentes",
    status: "erro",
    ultimaSync: "Erro de conexão",
  },
];

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500">Gerencie integrações e preferências</p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">
            <Link className="w-4 h-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="api-keys">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2" />
            Conta
          </TabsTrigger>
        </TabsList>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Link className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {integration.nome}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {integration.descricao}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge
                            variant={
                              integration.status === "conectado"
                                ? "default"
                                : integration.status === "pendente"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {integration.status === "conectado" && (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {integration.status === "erro" && (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {integration.status}
                          </Badge>
                          <p className="text-xs text-slate-400 mt-1">
                            {integration.ultimaSync}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Sync
                        </Button>
                      </div>
                    </div>
                    {index < integrations.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>Chaves de API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  ⚠️ As chaves de API são sensíveis. Nunca compartilhe com
                  terceiros.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Anthropic API Key
                  </label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="password"
                      value="sk-ant-••••••••••••••••"
                      readOnly
                    />
                    <Button variant="outline">Atualizar</Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Google AI API Key
                  </label>
                  <div className="flex gap-2 mt-1">
                    <Input type="password" value="••••••••••••••••" readOnly />
                    <Button variant="outline">Atualizar</Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Meta Access Token
                  </label>
                  <div className="flex gap-2 mt-1">
                    <Input type="password" value="••••••••••••••••" readOnly />
                    <Button variant="outline">Atualizar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">
                Configurações de notificação em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">
                Configurações de conta em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

