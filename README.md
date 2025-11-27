# 🏥 Dashboard Clínica Dr. Igor

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)

**Dashboard analítico completo com integração de IA para gestão de clínica médica**

**🎯 [COMECE AQUI](./COMECE_AQUI.md)** •
[Documentação](#-documentação) •
[Instalação](#-instalação) •
[Funcionalidades](#-funcionalidades) •
[Tecnologias](#-tecnologias)

</div>

---

## 📋 Sobre o Projeto

Sistema de dashboard analítico desenvolvido para a **Clínica Dr. Igor (Nutrologia)**, oferecendo:

- 📊 **Visualização de KPIs** em tempo real
- 👥 **Gestão de Leads** integrada com Kommo CRM
- 📈 **Analytics de Campanhas** Meta Ads e Google Ads
- 🤖 **Automação IA**: Funil de conversão, triagem automática e análise de objetivos dos pacientes

---

## 🚀 Tecnologias

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Next.js | 14 | Framework React com App Router |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | 4.x | Framework de estilização |
| Shadcn/UI | latest | Componentes UI acessíveis |
| Recharts | 2.x | Biblioteca de gráficos |
| Zustand | 5.x | Gerenciamento de estado |
| React Query | 5.x | Cache e sincronização de dados |

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| FastAPI | 0.115+ | Framework Python assíncrono |
| SQLAlchemy | 2.0+ | ORM com suporte async |
| PostgreSQL | 16 | Banco de dados relacional |
| Redis | 7 | Cache e filas |
| Celery | 5.4+ | Tarefas em background |
| Alembic | 1.14+ | Migrações de banco de dados |

### Integrações
| Serviço | Descrição |
|---------|-----------|
| Kommo CRM | Gestão de leads e pipelines |
| Meta Ads API | Campanhas Facebook/Instagram |
| Google Ads API | Campanhas Google Search/Display |
| Instagram Graph API | Métricas e posts |
| Claude (Anthropic) | IA para análise de campanhas |
| Gemini (Google) | IA para geração de copies |

---

## 📁 Estrutura do Projeto

```
dashboard-clinica/
├── 📂 frontend/                # Next.js App
│   ├── src/
│   │   ├── app/               # Páginas (App Router)
│   │   │   ├── page.tsx       # Dashboard principal
│   │   │   ├── leads/         # Página de leads
│   │   │   ├── trafego-pago/  # Analytics de campanhas
│   │   │   ├── instagram/     # Métricas Instagram
│   │   │   ├── agentes/       # Agentes de IA
│   │   │   └── configuracoes/ # Configurações
│   │   ├── components/        # Componentes React
│   │   │   ├── ui/            # Componentes Shadcn
│   │   │   ├── layout/        # Layout (Sidebar, Header)
│   │   │   └── dashboard/     # Componentes do dashboard
│   │   ├── lib/               # Utilitários e API client
│   │   └── store/             # Estado global (Zustand)
│   └── ...
│
├── 📂 backend/                 # FastAPI App
│   ├── app/
│   │   ├── api/routes/        # Endpoints da API
│   │   ├── models/            # Modelos SQLAlchemy
│   │   ├── schemas/           # Schemas Pydantic
│   │   ├── services/          # Lógica de negócio
│   │   ├── integrations/      # APIs externas
│   │   │   ├── kommo.py       # Cliente Kommo CRM
│   │   │   ├── meta_ads.py    # Cliente Meta Ads
│   │   │   └── instagram_api.py # Cliente Instagram
│   │   ├── agents/            # Agentes de IA
│   │   └── tasks/             # Tarefas Celery
│   ├── alembic/               # Migrações
│   └── requirements.txt
│
├── 📂 docker/                  # Dockerfiles
├── 📂 docs/                    # Documentação
├── 📄 docker-compose.yml       # Orquestração
├── 📄 README.md
└── 📄 CLAUDE.md               # Instruções para IA
```

---

## 🛠️ Instalação

### 📚 Documentação Completa

**Novo na equipe?** Temos guias detalhados para você:

| Guia | Descrição | Tempo |
|------|-----------|-------|
| **[GUIA_NAVEGACAO.md](./GUIA_NAVEGACAO.md)** | 🗺️ Índice completo da documentação | - |
| **[backend/INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md)** | ⚡ Setup em 5 minutos | 5 min |
| **[backend/CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md)** | ✅ Checklist passo a passo | 15 min |
| **[backend/GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md)** | 📖 Guia completo e detalhado | 30 min |
| **[backend/COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md)** | 📝 Referência de comandos | - |
| **[backend/TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md)** | 🔧 Solução de problemas | - |

### 🚀 Início Rápido

#### Opção 1: Setup Automático (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/mateusolintof/dashboard_Igor.git
cd dashboard-clinica

# 2. Configure o backend automaticamente
cd backend
./setup.sh

# 3. Inicie o servidor
source venv/bin/activate
uvicorn app.main:app --reload
```

✅ Backend rodando em: http://localhost:8000/docs

#### Opção 2: Docker (Mais Rápido)

```bash
# 1. Clone o repositório
git clone https://github.com/mateusolintof/dashboard_Igor.git
cd dashboard-clinica

# 2. Configure variáveis
cp docs/env-example.txt .env
nano .env  # Edite com suas credenciais

# 3. Inicie tudo
docker-compose up -d
docker-compose exec backend alembic upgrade head
```

✅ Serviços rodando:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 📋 Pré-requisitos

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Python 3.11+** ([Download](https://www.python.org/downloads/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop)) - Opcional
- **PostgreSQL 16+** ([Download](https://www.postgresql.org/download/)) - Ou usar Docker
- **Redis 7+** ([Download](https://redis.io/download)) - Ou usar Docker

### 🔐 Variáveis de Ambiente

Crie um arquivo `.env` com base no exemplo:

```bash
cp docs/env-example.txt .env
```

**Variáveis obrigatórias:**

```env
# Database
DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@localhost:5432/dashboard_clinica
REDIS_URL=redis://localhost:6379/0

# Kommo CRM
KOMMO_DOMAIN=seu-dominio.kommo.com
KOMMO_ACCESS_TOKEN=seu_token

# Meta Ads
META_ACCESS_TOKEN=seu_token
META_AD_ACCOUNT_ID=act_123456789

# Instagram
INSTAGRAM_BUSINESS_ID=seu_business_id
INSTAGRAM_ACCESS_TOKEN=seu_token

# IA
ANTHROPIC_API_KEY=sk-ant-xxxxx
GOOGLE_AI_API_KEY=AIzaSyxxxxx
```

📖 **Guia completo de configuração:** [backend/GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md)

---

## 📚 Documentação da API

Após iniciar o backend, acesse:

| URL | Descrição |
|-----|-----------|
| http://localhost:8000/docs | Swagger UI (interativo) |
| http://localhost:8000/redoc | ReDoc (documentação) |
| http://localhost:8000/health | Health check |

### Endpoints Principais

```
GET  /api/dashboard/overview    # Visão geral
GET  /api/dashboard/kpis        # KPIs do período

GET  /api/leads                 # Lista de leads
GET  /api/leads/pipelines       # Pipelines do Kommo
GET  /api/leads/summary         # Resumo de leads

GET  /api/campaigns             # Lista de campanhas
GET  /api/campaigns/stats       # Estatísticas agregadas

GET  /api/instagram/metrics     # Métricas do Instagram
GET  /api/instagram/posts       # Posts recentes

POST /api/agents/campaign-analysis  # Análise de campanha
POST /api/agents/generate-copy      # Geração de copies
```

---

## ✨ Funcionalidades

### 📊 Dashboard
- KPIs em tempo real (leads, receita, conversão, agendamentos)
- Gráficos de evolução temporal
- Performance por campanha
- Distribuição por pipeline

### 👥 Gestão de Leads
- Listagem com filtros avançados
- Detalhes do lead com histórico
- Integração bidirecional com Kommo CRM
- Métricas por pipeline e etapa

### 📈 Tráfego Pago
- Métricas Meta Ads (Facebook/Instagram)
- Métricas Google Ads
- ROI e CPL por campanha
- Insights diários e comparativos

### 📱 Instagram Analytics
- Métricas do perfil Business
- Performance de posts e stories
- Dados demográficos da audiência
- Taxa de engajamento

### 🤖 Agentes de IA & Automação
- **Dashboard Dedicado**: Métricas exclusivas de automação e conversas
- **Analista de Campanhas**: Análise detalhada com insights acionáveis
- **Copywriter**: Geração de copies otimizadas por plataforma
- **Comparador**: Análise comparativa entre campanhas

---

## 🚀 Deploy

### Backend (VPS/Hostinger)

1. Configure Docker na VPS
2. Clone o repositório
3. Configure o arquivo `.env`
4. Execute: `docker-compose up -d`
5. Configure domínio e SSL

### Frontend (Vercel)

1. Conecte o repositório na [Vercel](https://vercel.com)
2. Configure Root Directory: `frontend`
3. Adicione variável: `NEXT_PUBLIC_API_URL`
4. Deploy automático em cada push

---

## 🔧 Comandos Úteis

```bash
# Frontend
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run lint         # Verificar lint

# Backend
uvicorn app.main:app --reload  # Desenvolvimento
alembic upgrade head           # Aplicar migrações
alembic revision --autogenerate -m "msg"  # Nova migração

# Docker
docker-compose up -d           # Iniciar serviços
docker-compose down            # Parar serviços
docker-compose logs -f backend # Ver logs
```

---

## 📝 Licença

Projeto privado - **Convert Digital** © 2024

---

<div align="center">

Desenvolvido com ❤️ para **Clínica Dr. Igor**

</div>

