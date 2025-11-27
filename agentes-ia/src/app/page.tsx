"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Brain,
  Zap,
  Check,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { agentsApi } from "@/lib/api";

// Componentes do Agent Cards
const agentCards = [
  {
    id: "analyst",
    name: "Analista de Campanhas",
    description: "Analisa performance e sugere otimizações baseadas em dados.",
    provider: "Claude",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-400",
    bgGlow: "bg-blue-500/20",
  },
  {
    id: "copywriter",
    name: "Gerador de Copies",
    description: "Cria copies otimizadas para anúncios e redes sociais.",
    provider: "Gemini",
    icon: Megaphone,
    gradient: "from-purple-500 to-pink-400",
    bgGlow: "bg-purple-500/20",
  },
  {
    id: "cards",
    name: "Criador de Cards",
    description: "Gera imagens e cards personalizados para redes sociais.",
    provider: "Em breve",
    icon: ImageIcon,
    gradient: "from-amber-500 to-orange-400",
    bgGlow: "bg-amber-500/20",
    disabled: true,
  },
];

export default function AgentesIAPage() {
  const [activeTab, setActiveTab] = useState("copy");
  const [copyPrompt, setCopyPrompt] = useState({
    objetivo: "",
    publicoAlvo: "",
    tomVoz: "profissional",
    plataforma: "instagram",
  });
  const [generatedCopies, setGeneratedCopies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Análise de campanha state
  const [campaignData, setCampaignData] = useState({
    nome: "",
    impressoes: "",
    cliques: "",
    conversoes: "",
    gasto: "",
    contexto: "",
  });
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerateCopy = async () => {
    if (!copyPrompt.objetivo || !copyPrompt.publicoAlvo) return;

    setIsLoading(true);
    try {
      const response = await agentsApi.generateCopy({
        objetivo: copyPrompt.objetivo,
        publico_alvo: copyPrompt.publicoAlvo,
        tom_voz: copyPrompt.tomVoz,
        plataforma: copyPrompt.plataforma,
        num_variacoes: 3,
      });

      // O backend retorna as copies em formato texto, vamos dividir
      const copiesText = response.data.copies;
      // Simula parsing das variações (ajustar conforme resposta real do backend)
      if (typeof copiesText === "string") {
        setGeneratedCopies([copiesText]);
      } else {
        setGeneratedCopies(Array.isArray(copiesText) ? copiesText : [copiesText]);
      }
    } catch (error) {
      console.error("Erro ao gerar copies:", error);
      // Fallback para demo
      setGeneratedCopies([
        "🌟 Transforme sua autoestima com nossos tratamentos exclusivos! Agende sua avaliação gratuita e descubra o melhor para você. Link na bio! #harmonizaçãofacial #estetica",
        "✨ Resultados naturais que realçam sua beleza! Nossa equipe especializada está pronta para cuidar de você. Marque sua consulta hoje! #botox #preenchimento",
        "💫 Você merece se sentir incrível! Conheça nossos procedimentos minimamente invasivos com resultados surpreendentes. Agende agora! #clinicadrigor #beleza",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeCampaign = async () => {
    if (!campaignData.nome) return;

    setIsAnalyzing(true);
    try {
      const response = await agentsApi.analyzeCampaign({
        campaign_data: {
          nome: campaignData.nome,
          impressoes: Number(campaignData.impressoes) || 0,
          cliques: Number(campaignData.cliques) || 0,
          conversoes: Number(campaignData.conversoes) || 0,
          gasto: Number(campaignData.gasto) || 0,
          ctr: campaignData.cliques && campaignData.impressoes
            ? ((Number(campaignData.cliques) / Number(campaignData.impressoes)) * 100).toFixed(2) + "%"
            : "N/A",
        },
        context: campaignData.contexto,
      });
      setAnalysisResult(response.data.analysis);
    } catch (error) {
      console.error("Erro ao analisar campanha:", error);
      setAnalysisResult(
        "**Análise Demonstrativa**\n\n" +
        "Esta é uma análise de demonstração. Configure as credenciais da API (Anthropic/Google) para obter análises reais.\n\n" +
        "**Pontos de Atenção:**\n" +
        "- Verifique suas métricas de CTR\n" +
        "- Otimize o público-alvo\n" +
        "- Teste novos criativos"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header com gradiente */}
      <header className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-xs">
                Powered by Claude & Gemini
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Agentes de{" "}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Ferramentas inteligentes para análise de campanhas e criação de conteúdo 
              otimizado para a Clínica Dr. Igor.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Agent Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {agentCards.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: agent.disabled ? 1 : 1.02 }}
              className={agent.disabled ? "opacity-60" : "cursor-pointer"}
              onClick={() => !agent.disabled && setActiveTab(agent.id === "analyst" ? "analysis" : "copy")}
            >
              <Card className="relative overflow-hidden group h-full border-border/50 hover:border-border transition-colors">
                <div className={`absolute inset-0 ${agent.bgGlow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardContent className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${agent.gradient}`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-background/50 backdrop-blur-sm"
                    >
                      {agent.provider}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                  {!agent.disabled && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Usar agente</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card border border-border/50">
              <TabsTrigger value="copy" className="gap-2">
                <Megaphone className="w-4 h-4" />
                Gerador de Copy
              </TabsTrigger>
              <TabsTrigger value="analysis" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Análise de Campanha
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            {/* Copy Generator Tab */}
            <TabsContent value="copy" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Form */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5 text-primary" />
                      Configurar Geração
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Objetivo do Anúncio
                      </label>
                      <Textarea
                        placeholder="Ex: Atrair novos pacientes para procedimento de botox, focando em resultados naturais e equipe especializada..."
                        value={copyPrompt.objetivo}
                        onChange={(e) =>
                          setCopyPrompt({ ...copyPrompt, objetivo: e.target.value })
                        }
                        className="min-h-[100px] bg-input/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
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
                        className="bg-input/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Plataforma</label>
                        <Select
                          value={copyPrompt.plataforma}
                          onValueChange={(value) =>
                            setCopyPrompt({ ...copyPrompt, plataforma: value })
                          }
                        >
                          <SelectTrigger className="bg-input/50 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="google_search">Google Search</SelectItem>
                            <SelectItem value="google_display">Google Display</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tom de Voz</label>
                        <Select
                          value={copyPrompt.tomVoz}
                          onValueChange={(value) =>
                            setCopyPrompt({ ...copyPrompt, tomVoz: value })
                          }
                        >
                          <SelectTrigger className="bg-input/50 w-full">
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

                    <Separator className="my-4" />

                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      onClick={handleGenerateCopy}
                      disabled={isLoading || !copyPrompt.objetivo || !copyPrompt.publicoAlvo}
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
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      Copies Geradas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence mode="wait">
                      {generatedCopies.length === 0 ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-12"
                        >
                          <div className="relative mx-auto w-16 h-16 mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                            <div className="relative flex items-center justify-center w-full h-full">
                              <Sparkles className="w-10 h-10 text-muted-foreground/50" />
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            Configure os parâmetros e clique em &quot;Gerar Copies&quot;
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copies"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                        >
                          {generatedCopies.map((copy, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <Badge variant="secondary" className="shrink-0">
                                  Variação {index + 1}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => handleCopyToClipboard(copy, index)}
                                  className="shrink-0"
                                >
                                  {copiedIndex === index ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{copy}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Campaign Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Analysis Form */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      Dados da Campanha
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome da Campanha</label>
                      <Input
                        placeholder="Ex: Campanha Botox - Junho 2025"
                        value={campaignData.nome}
                        onChange={(e) =>
                          setCampaignData({ ...campaignData, nome: e.target.value })
                        }
                        className="bg-input/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Impressões</label>
                        <Input
                          type="number"
                          placeholder="10000"
                          value={campaignData.impressoes}
                          onChange={(e) =>
                            setCampaignData({ ...campaignData, impressoes: e.target.value })
                          }
                          className="bg-input/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cliques</label>
                        <Input
                          type="number"
                          placeholder="500"
                          value={campaignData.cliques}
                          onChange={(e) =>
                            setCampaignData({ ...campaignData, cliques: e.target.value })
                          }
                          className="bg-input/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Conversões</label>
                        <Input
                          type="number"
                          placeholder="50"
                          value={campaignData.conversoes}
                          onChange={(e) =>
                            setCampaignData({ ...campaignData, conversoes: e.target.value })
                          }
                          className="bg-input/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Gasto (R$)</label>
                        <Input
                          type="number"
                          placeholder="1500"
                          value={campaignData.gasto}
                          onChange={(e) =>
                            setCampaignData({ ...campaignData, gasto: e.target.value })
                          }
                          className="bg-input/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Contexto Adicional (opcional)
                      </label>
                      <Textarea
                        placeholder="Ex: Campanha focada em público feminino, período de promoção..."
                        value={campaignData.contexto}
                        onChange={(e) =>
                          setCampaignData({ ...campaignData, contexto: e.target.value })
                        }
                        className="min-h-[80px] bg-input/50"
                      />
                    </div>

                    <Separator className="my-4" />

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      onClick={handleAnalyzeCampaign}
                      disabled={isAnalyzing || !campaignData.nome}
                    >
                      {isAnalyzing ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Brain className="w-4 h-4 mr-2" />
                      )}
                      {isAnalyzing ? "Analisando..." : "Analisar com IA"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Analysis Result */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Análise da IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence mode="wait">
                      {!analysisResult ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-12"
                        >
                          <div className="relative mx-auto w-16 h-16 mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
                            <div className="relative flex items-center justify-center w-full h-full">
                              <TrendingUp className="w-10 h-10 text-muted-foreground/50" />
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            Preencha os dados da campanha para análise
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="result"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="prose prose-invert prose-sm max-w-none"
                        >
                          <div className="p-4 bg-card/50 rounded-lg border border-border/50 whitespace-pre-wrap text-sm leading-relaxed">
                            {analysisResult}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    Histórico de Conversas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="relative mx-auto w-16 h-16 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl" />
                      <div className="relative flex items-center justify-center w-full h-full">
                        <MessageSquare className="w-10 h-10 text-muted-foreground/50" />
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      Histórico de conversas dos agentes de IA
                    </p>
                    <p className="text-sm text-muted-foreground/60">
                      Integração com n8n_chat_history em desenvolvimento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Agentes IA • Clínica Dr. Igor</p>
            <p>© 2025 Convert Digital</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
