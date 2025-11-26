"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/KPICard";
import {
  Users,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// Dados de exemplo
const mockPosts = [
  {
    id: "1",
    tipo: "IMAGE",
    thumbnail: "https://via.placeholder.com/300x300",
    legenda: "Resultado incrível de harmonização facial...",
    curtidas: 456,
    comentarios: 32,
    alcance: 12500,
    data: "25/11/2024",
  },
  {
    id: "2",
    tipo: "REELS",
    thumbnail: "https://via.placeholder.com/300x300",
    legenda: "Dicas de cuidados pós-procedimento...",
    curtidas: 1289,
    comentarios: 87,
    alcance: 45000,
    data: "23/11/2024",
  },
  {
    id: "3",
    tipo: "CAROUSEL",
    thumbnail: "https://via.placeholder.com/300x300",
    legenda: "Antes e depois: transformação completa...",
    curtidas: 892,
    comentarios: 54,
    alcance: 28000,
    data: "21/11/2024",
  },
  {
    id: "4",
    tipo: "IMAGE",
    thumbnail: "https://via.placeholder.com/300x300",
    legenda: "Nossa equipe está pronta para atender você...",
    curtidas: 234,
    comentarios: 18,
    alcance: 8500,
    data: "19/11/2024",
  },
];

export default function InstagramPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Instagram</h1>
          <p className="text-slate-500">
            Métricas e performance do Instagram Business
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Abrir Instagram
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Métricas
          </Button>
        </div>
      </div>

      {/* Profile Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
              DI
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                @clinica.drigor
              </h2>
              <p className="text-slate-500">Clínica Dr. Igor - Estética Avançada</p>
            </div>
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900">15.8K</p>
                <p className="text-sm text-slate-500">Seguidores</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">892</p>
                <p className="text-sm text-slate-500">Seguindo</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">234</p>
                <p className="text-sm text-slate-500">Posts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Seguidores"
          value={15800}
          change={3.2}
          icon={<Users className="w-5 h-5 text-blue-600" />}
        />
        <KPICard
          title="Engajamento"
          value={4.8}
          change={0.5}
          format="percent"
          icon={<Heart className="w-5 h-5 text-rose-600" />}
        />
        <KPICard
          title="Alcance (7d)"
          value={125000}
          change={18.5}
          icon={<Eye className="w-5 h-5 text-purple-600" />}
        />
        <KPICard
          title="Comentários (7d)"
          value={312}
          change={12.3}
          icon={<MessageCircle className="w-5 h-5 text-amber-600" />}
        />
        <KPICard
          title="Crescimento"
          value={485}
          change={8.7}
          changeLabel="novos seguidores"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        />
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Posts Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockPosts.map((post) => (
              <div
                key={post.id}
                className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
              >
                <div className="aspect-square bg-slate-200 relative">
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {post.tipo}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {post.legenda}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-rose-500" />
                        {post.curtidas}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        {post.comentarios}
                      </span>
                    </div>
                    <span className="text-slate-400">{post.data}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      Alcance:{" "}
                      {new Intl.NumberFormat("pt-BR").format(post.alcance)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audience Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faixa Etária</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { faixa: "18-24", porcentagem: 15 },
                { faixa: "25-34", porcentagem: 38 },
                { faixa: "35-44", porcentagem: 28 },
                { faixa: "45-54", porcentagem: 14 },
                { faixa: "55+", porcentagem: 5 },
              ].map((item) => (
                <div key={item.faixa} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-slate-600">{item.faixa}</span>
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${item.porcentagem}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-slate-600 text-right">
                    {item.porcentagem}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gênero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-2xl font-bold">
                  72%
                </div>
                <p className="mt-2 text-slate-600">Feminino</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                  28%
                </div>
                <p className="mt-2 text-slate-600">Masculino</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

