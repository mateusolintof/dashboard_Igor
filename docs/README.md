# 📚 Documentação - Dashboard Clínica Dr. Igor

Dashboard analítico completo com integração de IA para gestão de clínica médica.

---

## 🗺️ Navegação Rápida

**Novo no projeto?** Acesse nossos guias completos:

| Documento | Descrição |
|-----------|-----------|
| **[SUMARIO_DOCUMENTACAO.md](../SUMARIO_DOCUMENTACAO.md)** | 📋 Sumário completo da documentação |
| **[GUIA_NAVEGACAO.md](../GUIA_NAVEGACAO.md)** | 🗺️ Índice geral do projeto |
| **[backend/INICIO_RAPIDO.md](../backend/INICIO_RAPIDO.md)** | ⚡ Setup do backend em 5 minutos |
| **[backend/INDICE.md](../backend/INDICE.md)** | 📚 Índice da documentação do backend |

---

## 🚀 Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Componentes UI
- **Recharts** - Gráficos
- **Zustand** - Gerenciamento de estado
- **React Query** - Cache e sincronização de dados

### Backend
- **FastAPI** - Framework Python assíncrono
- **SQLAlchemy** - ORM com suporte async
- **PostgreSQL** - Banco de dados
- **Redis** - Cache e filas
- **Celery** - Tarefas em background
- **Alembic** - Migrações de banco

### Integrações
- **Kommo CRM** - Gestão de leads
- **Meta Ads API** - Campanhas Facebook/Instagram
- **Google Ads API** - Campanhas Google
- **Instagram Graph API** - Métricas sociais

### IA
- **Claude (Anthropic)** - Análise de campanhas
- **Gemini (Google)** - Geração de copies

## 📁 Estrutura do Projeto

```
dashboard-clinica/
├── frontend/          # Next.js
│   ├── src/
│   │   ├── app/       # Páginas (App Router)
│   │   ├── components/ # Componentes React
│   │   ├── lib/       # Utilitários e API
│   │   └── store/     # Estado global
│   └── ...
├── backend/           # FastAPI
│   ├── app/
│   │   ├── api/       # Endpoints
│   │   ├── models/    # Modelos SQLAlchemy
│   │   ├── integrations/ # APIs externas
│   │   ├── agents/    # Agentes de IA
│   │   └── ...
│   └── ...
├── docker/            # Dockerfiles
├── docs/              # Documentação
└── docker-compose.yml
```

## 🛠️ Instalação

### Requisitos
- Node.js 18+
- Python 3.12+
- Docker e Docker Compose
- PostgreSQL 16+
- Redis 7+

### Setup Local

1. **Clone o repositório**
```bash
git clone https://github.com/mateusolintof/dashboard_lgor.git
cd dashboard-clinica
```

2. **Configure as variáveis de ambiente**
```bash
cp docs/env-example.txt .env
# Edite o .env com suas credenciais
```

3. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Docker

```bash
docker-compose up -d
```

## 📚 Documentação da API

Acesse a documentação interativa:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔧 Configuração

### Variáveis de Ambiente

Veja o arquivo `docs/env-example.txt` para todas as variáveis necessárias:

- **DATABASE_URL** - String de conexão PostgreSQL
- **KOMMO_*** - Credenciais Kommo CRM
- **META_*** - Credenciais Meta Ads
- **GOOGLE_ADS_*** - Credenciais Google Ads
- **INSTAGRAM_*** - Credenciais Instagram
- **ANTHROPIC_API_KEY** - API Key Claude
- **GOOGLE_AI_API_KEY** - API Key Gemini

## 📊 Funcionalidades

### Dashboard
- KPIs em tempo real
- Gráficos de evolução de leads
- Performance de campanhas
- Distribuição por pipeline

### Leads
- Listagem com filtros
- Detalhes do lead
- Histórico de interações
- Integração com Kommo CRM

### Tráfego Pago
- Métricas Meta Ads
- Métricas Google Ads
- ROI e CPL por campanha
- Insights diários

### Instagram
- Métricas do perfil
- Performance de posts
- Dados demográficos
- Taxa de engajamento

### Agentes IA
- Análise de campanhas
- Geração de copies
- Comparação de campanhas
- (Em desenvolvimento) Criação de cards

## 🚀 Deploy

### Backend (VPS/Hostinger)
1. Configure Docker na VPS
2. Clone o repositório
3. Configure variáveis de ambiente
4. Execute `docker-compose up -d`

### Frontend (Vercel)
1. Conecte o repositório na Vercel
2. Configure `NEXT_PUBLIC_API_URL`
3. Deploy automático

## 📝 Licença

Projeto privado - Convert Digital © 2024

