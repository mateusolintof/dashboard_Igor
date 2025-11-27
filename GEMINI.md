# CLAUDE.md - Instruções para Assistente de IA

Este arquivo contém instruções e contexto para assistentes de IA (como Claude, Cursor AI, etc.) que trabalham neste projeto.

---

## 📋 Visão Geral do Projeto

**Dashboard Clínica Dr. Igor** é um sistema de analytics e gestão para clínica médica de estética, composto por:

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI + SQLAlchemy (async) + PostgreSQL + Redis
- **Integrações**: Kommo CRM, Meta Ads, Google Ads, Instagram Graph API
- **IA**: Claude (Anthropic) e Gemini (Google) para análises e geração de conteúdo

---

## 🏗️ Arquitetura

### Frontend (`/frontend`)

```
src/
├── app/                    # Next.js App Router (páginas)
├── components/
│   ├── ui/                 # Componentes Shadcn/UI (não modificar diretamente)
│   ├── layout/             # Sidebar, Header, DashboardLayout
│   └── dashboard/          # KPICard, Charts, etc.
├── lib/
│   ├── api.ts              # Cliente API (axios)
│   └── utils.ts            # Utilitários (cn, formatters)
└── store/
    └── dashboard.ts        # Estado global (Zustand)
```

### Backend (`/backend`)

```
app/
├── api/routes/             # Endpoints FastAPI
├── models/                 # SQLAlchemy models
├── schemas/                # Pydantic schemas (validação)
├── services/               # Lógica de negócio
├── integrations/           # Clientes de APIs externas
├── agents/                 # Agentes de IA
└── tasks/                  # Tarefas Celery (background)
```

---

## 📐 Convenções de Código

### TypeScript/React (Frontend)

```typescript
// ✅ Use 'use client' apenas quando necessário
"use client";

// ✅ Tipos explícitos em props
interface ComponentProps {
  title: string;
  value: number;
  onChange?: (value: number) => void;
}

// ✅ Componentes funcionais com arrow functions
export function MyComponent({ title, value }: ComponentProps) {
  return <div>{title}: {value}</div>;
}

// ✅ Use cn() para classes condicionais
import { cn } from "@/lib/utils";
<div className={cn("base-class", isActive && "active-class")} />

// ✅ Formatação de valores
new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
```

### Python (Backend)

```python
# ✅ Type hints em todas as funções
async def get_leads(
    pipeline_id: Optional[int] = None,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
) -> List[Lead]:
    pass

# ✅ Docstrings em português
async def analyze_campaign(data: dict) -> dict:
    """
    Analisa performance de uma campanha usando IA.
    
    Args:
        data: Dados da campanha incluindo métricas
        
    Returns:
        Análise com insights e recomendações
    """
    pass

# ✅ Tratamento de erros com HTTPException
from fastapi import HTTPException

if not lead:
    raise HTTPException(status_code=404, detail="Lead não encontrado")
```

---

## 🎨 Design System

### Cores (Tailwind)

| Uso | Classe | Descrição |
|-----|--------|-----------|
| Primária | `blue-600` | Ações principais, links ativos |
| Sucesso | `emerald-500/600` | Métricas positivas, conversões |
| Alerta | `amber-500/600` | Avisos, métricas neutras |
| Erro | `red-500/600` | Erros, métricas negativas |
| Texto | `slate-900` | Texto principal |
| Texto secundário | `slate-500` | Labels, descrições |
| Background | `slate-50` | Fundo da aplicação |
| Cards | `white` | Fundo de cards |

### Componentes Shadcn

Já instalados e disponíveis:
- `Button`, `Card`, `Input`, `Select`
- `Tabs`, `Table`, `Badge`
- `Dialog`, `Sheet`, `Tooltip`
- `DropdownMenu`, `Separator`

Para adicionar novos:
```bash
cd frontend && npx shadcn@latest add [component-name]
```

---

## 🔌 Integrações

### Kommo CRM (`integrations/kommo.py`)

```python
from app.integrations.kommo import kommo_client

# Buscar leads
leads = await kommo_client.get_leads(pipeline_id=123)

# Buscar pipelines
pipelines = await kommo_client.get_pipelines()

# Resumo para analytics
summary = await kommo_client.get_leads_summary(date_from=date, date_to=date)
```

### Meta Ads (`integrations/meta_ads.py`)

```python
from app.integrations.meta_ads import meta_ads_client

# Campanhas
campaigns = await meta_ads_client.get_campaigns(date_preset="last_30d")

# Insights
insights = await meta_ads_client.get_campaign_insights(campaign_id)

# Resumo de performance
summary = await meta_ads_client.get_performance_summary()
```

### Instagram (`integrations/instagram_api.py`)

```python
from app.integrations.instagram_api import instagram_client

# Perfil
profile = await instagram_client.get_profile()

# Posts
posts = await instagram_client.get_media(limit=20)

# Métricas resumidas
metrics = await instagram_client.get_summary_metrics()
```

---

## 🤖 Agentes de IA

### Analista de Campanhas

```python
from app.agents.campaign_analyst import campaign_analyst

result = await campaign_analyst.analyze_campaign(
    campaign_data={"nome": "Campanha X", "impressoes": 10000, ...},
    metrics=["ctr", "cpl", "conversoes"],
    context="Campanha de botox para público feminino 30-50"
)
```

### Copywriter

```python
from app.agents.campaign_analyst import copywriter

result = await copywriter.generate_copies(
    objetivo="Atrair pacientes para harmonização facial",
    publico_alvo="Mulheres 25-45 anos, classe A/B",
    tom_voz="profissional",
    plataforma="instagram",
    num_variacoes=3
)
```

---

## 📝 Tarefas Comuns

### Adicionar Nova Página

1. Criar pasta em `frontend/src/app/[nome-pagina]/`
2. Criar `page.tsx` com componente
3. Adicionar rota no `Sidebar.tsx`

### Adicionar Novo Endpoint

1. Criar/editar arquivo em `backend/app/api/routes/`
2. Adicionar no `main.py` se novo router
3. Documentar com docstrings

### Adicionar Novo Modelo

1. Criar em `backend/app/models/`
2. Importar em `models/__init__.py`
3. Criar migração: `alembic revision --autogenerate -m "add model"`
4. Aplicar: `alembic upgrade head`

### Adicionar Nova Integração

1. Criar cliente em `backend/app/integrations/`
2. Adicionar variáveis em `config.py`
3. Documentar em `docs/env-example.txt`

---

## ⚠️ Pontos de Atenção

### Não Fazer

- ❌ Modificar arquivos em `components/ui/` diretamente (são do Shadcn)
- ❌ Commitar credenciais ou arquivo `.env`
- ❌ Usar `any` no TypeScript sem necessidade
- ❌ Criar queries SQL raw (usar SQLAlchemy)
- ❌ Ignorar tratamento de erros nas integrações

### Sempre Fazer

- ✅ Usar tipos explícitos no TypeScript
- ✅ Documentar funções complexas
- ✅ Tratar erros de API com try/catch ou HTTPException
- ✅ Formatar valores monetários com `Intl.NumberFormat`
- ✅ Usar português brasileiro em textos de UI
- ✅ Testar build do frontend antes de commit: `npm run build`

---

## 🔧 Variáveis de Ambiente

Todas as variáveis estão documentadas em `docs/env-example.txt`.

Principais:
- `DATABASE_URL` - Conexão PostgreSQL (async)
- `KOMMO_*` - Credenciais Kommo CRM
- `META_*` - Credenciais Meta Ads
- `INSTAGRAM_*` - Credenciais Instagram
- `ANTHROPIC_API_KEY` - API Claude
- `GOOGLE_AI_API_KEY` - API Gemini

---

## 🚀 Comandos de Desenvolvimento

```bash
# Frontend
cd frontend
npm run dev          # Inicia dev server (localhost:3000)
npm run build        # Build de produção
npm run lint         # Verificar erros

# Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload  # Inicia API (localhost:8000)

# Docker
docker-compose up -d           # Inicia todos os serviços
docker-compose logs -f backend # Ver logs do backend
```

---

## 📚 Referências

- [Next.js 14 Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [Shadcn/UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org)
- [Kommo API](https://www.kommo.com/developers/api/)
- [Meta Marketing API](https://developers.facebook.com/docs/marketing-apis/)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)

