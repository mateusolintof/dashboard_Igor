"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Copy,
  RefreshCw,
  TrendingUp,
  Megaphone,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";

export default function AgentesPage() {
  const [copyPrompt, setCopyPrompt] = useState({
    objetivo: "",
    publicoAlvo: "",
    tomVoz: "profissional",
    plataforma: "instagram",
  });

  const [generatedCopies, setGeneratedCopies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCopy = async () => {
    setIsLoading(true);
    // Simula chamada à API
    setTimeout(() => {
      setGeneratedCopies([
        "🌟 Transforme sua autoestima com nossos tratamentos exclusivos! Agende sua avaliação gratuita e descubra o melhor para você. Link na bio! #harmonizaçãofacial #estetica",
        "✨ Resultados naturais que realçam sua beleza! Nossa equipe especializada está pronta para cuidar de você. Marque sua consulta hoje! #botox #preenchimento",
        "💫 Você merece se sentir incrível! Conheça nossos procedimentos minimamente invasivos com resultados surpreendentes. Agende agora! #clinicadrigor #beleza",
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Agentes de IA</h1>
        <p className="text-slate-500">
          Ferramentas inteligentes para análise e criação de conteúdo
        </p>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <Card className="border-2 border-blue-200 bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Analista de Campanhas
                </h3>
                <p className="text-sm text-slate-500">Powered by Claude</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Analisa performance de campanhas e sugere otimizações baseadas em
              dados.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Megaphone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Gerador de Copies
                </h3>
                <p className="text-sm text-slate-500">Powered by Gemini</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Cria copies otimizadas para anúncios e posts em redes sociais.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-200 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <ImageIcon className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Criador de Cards
                </h3>
                <p className="text-sm text-slate-500">Em desenvolvimento</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Gera imagens e cards personalizados para redes sociais.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="copy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="copy">
            <Megaphone className="w-4 h-4 mr-2" />
            Gerador de Copy
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <TrendingUp className="w-4 h-4 mr-2" />
            Análise de Campanha
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="w-4 h-4 mr-2" />
            Histórico de Chat
          </TabsTrigger>
        </TabsList>

        {/* Copy Generator Tab */}
        <TabsContent value="copy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Configurar Geração
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Objetivo do Anúncio
                  </label>
                  <Input
                    placeholder="Ex: Atrair novos pacientes para procedimento de botox"
                    value={copyPrompt.objetivo}
                    onChange={(e) =>
                      setCopyPrompt({ ...copyPrompt, objetivo: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Público-Alvo
                  </label>
                  <Input
                    placeholder="Ex: Mulheres 30-50 anos, classe A/B, interessadas em estética"
                    value={copyPrompt.publicoAlvo}
                    onChange={(e) =>
                      setCopyPrompt({
                        ...copyPrompt,
                        publicoAlvo: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Plataforma
                    </label>
                    <Select
                      value={copyPrompt.plataforma}
                      onValueChange={(value) =>
                        setCopyPrompt({ ...copyPrompt, plataforma: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="google_search">
                          Google Search
                        </SelectItem>
                        <SelectItem value="google_display">
                          Google Display
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Tom de Voz
                    </label>
                    <Select
                      value={copyPrompt.tomVoz}
                      onValueChange={(value) =>
                        setCopyPrompt({ ...copyPrompt, tomVoz: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profissional">Profissional</SelectItem>
                        <SelectItem value="amigavel">Amigável</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                        <SelectItem value="inspirador">Inspirador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <Button
                  className="w-full"
                  onClick={handleGenerateCopy}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Gerando..." : "Gerar Copies"}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Copies */}
            <Card>
              <CardHeader>
                <CardTitle>Copies Geradas</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedCopies.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>
                      Configure os parâmetros e clique em &quot;Gerar Copies&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {generatedCopies.map((copy, index) => (
                      <div
                        key={index}
                        className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline">Variação {index + 1}</Badge>
                          <Button variant="ghost" size="icon">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-slate-700">{copy}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaign Analysis Tab */}
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Campanha com IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-500 mb-4">
                  Selecione uma campanha para análise detalhada
                </p>
                <Button variant="outline">Selecionar Campanha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat History Tab */}
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-500">
                  Histórico de conversas dos agentes de IA
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Integração com n8n_chat_history em desenvolvimento
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
