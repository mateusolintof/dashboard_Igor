# 🏥 Backend - Dashboard Clínica Dr. Igor

Backend da aplicação de analytics e gestão para clínica médica de estética.

---

## 🚀 Início Rápido

### Configuração Automática (Recomendado)

```bash
cd backend
./setup.sh
```

### Iniciar Servidor

```bash
source venv/bin/activate
uvicorn app.main:app --reload
```

Acesse: http://localhost:8000/docs

---

## 📚 Documentação Completa

Escolha o guia apropriado para sua necessidade:

### 📖 Guias Principais

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[GUIA_CONFIGURACAO_BACKEND.md](./GUIA_CONFIGURACAO_BACKEND.md)** | Guia completo passo a passo | Primeira configuração |
| **[CHECKLIST_SETUP.md](./CHECKLIST_SETUP.md)** | Checklist visual de setup | Acompanhar progresso |
| **[COMANDOS_UTEIS.md](./COMANDOS_UTEIS.md)** | Referência rápida de comandos | Desenvolvimento diário |
| **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** | Soluções para problemas comuns | Quando algo der errado |

### 📄 Outros Documentos

- **[../CLAUDE.md](../CLAUDE.md)** - Instruções para assistentes de IA
- **[../docs/env-example.txt](../docs/env-example.txt)** - Exemplo de variáveis de ambiente
- **[../docs/README.md](../docs/README.md)** - Documentação geral do projeto

---

## 🏗️ Arquitetura

```
backend/
├── app/
│   ├── api/routes/          # Endpoints da API
│   │   ├── dashboard.py     # Métricas e KPIs
│   │   ├── leads.py         # Gestão de leads
│   │   ├── campaigns.py     # Campanhas de marketing
│   │   ├── instagram.py     # Dados do Instagram
│   │   └── agents.py        # Agentes de IA
│   │
│   ├── models/              # Modelos SQLAlchemy
│   │   ├── lead.py
│   │   ├── campaign.py
│   │   └── instagram.py
│   │
│   ├── schemas/             # Schemas Pydantic
│   │
│   ├── services/            # Lógica de negócio
│   │
│   ├── integrations/        # Clientes de APIs externas
│   │   ├── kommo.py         # Kommo CRM
│   │   ├── meta_ads.py      # Meta Ads
│   │   └── instagram_api.py # Instagram Graph API
│   │
│   ├── agents/              # Agentes de IA
│   │   └── campaign_analyst.py
│   │
│   ├── tasks/               # Tarefas Celery (background)
│   │
│   ├── config.py            # Configurações
│   ├── database.py          # Setup do banco
│   └── main.py              # Aplicação FastAPI
│
├── alembic/                 # Migrações do banco
├── venv/                    # Ambiente virtual Python
├── requirements.txt         # Dependências
└── .env                     # Variáveis de ambiente (criar)
```

---

## 🛠️ Stack Tecnológica

- **Framework:** FastAPI 0.115+
- **Servidor:** Uvicorn
- **ORM:** SQLAlchemy 2.0 (async)
- **Banco de Dados:** PostgreSQL 14+
- **Cache:** Redis 7+
- **Migrações:** Alembic
- **Validação:** Pydantic 2.0
- **Tasks:** Celery
- **IA:** Anthropic Claude, Google Gemini

---

## 🔌 Integrações

### APIs Externas

- **Kommo CRM** - Gestão de leads e pipeline de vendas
- **Meta Ads** - Métricas de campanhas Facebook/Instagram
- **Instagram Graph API** - Dados de perfil e posts
- **Google Ads** - Métricas de campanhas Google (opcional)
- **Anthropic Claude** - Análise de campanhas e copywriting
- **Google Gemini** - Geração de conteúdo e insights

### Endpoints Principais

| Rota | Método | Descrição |
|------|--------|-----------|
| `/health` | GET | Health check |
| `/api/dashboard/summary` | GET | Resumo geral do dashboard |
| `/api/leads` | GET | Listar leads do Kommo |
| `/api/campaigns` | GET | Campanhas do Meta Ads |
| `/api/instagram/profile` | GET | Perfil do Instagram |
| `/api/agents/analyze-campaign` | POST | Análise de campanha com IA |

Documentação completa: http://localhost:8000/docs

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com base no exemplo:

```bash
cp ../docs/env-example.txt .env
```

### Variáveis Obrigatórias

```env
# Banco de Dados
DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@localhost:5432/dashboard_clinica

# Redis
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

Veja todas as variáveis em: [env-example.txt](../docs/env-example.txt)

---

## 🗄️ Banco de Dados

### Criar Banco Local

```bash
# PostgreSQL
psql postgres -c "CREATE DATABASE dashboard_clinica;"
psql postgres -c "CREATE USER dashboard WITH PASSWORD 'dashboard_password';"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE dashboard_clinica TO dashboard;"

# Redis
brew services start redis  # macOS
```

### Executar Migrações

```bash
alembic upgrade head
```

### Criar Nova Migração

```bash
alembic revision --autogenerate -m "descrição da mudança"
alembic upgrade head
```

---

## 🐳 Docker

### Iniciar com Docker Compose

```bash
# Na raiz do projeto
docker-compose up -d

# Executar migrações
docker-compose exec backend alembic upgrade head

# Ver logs
docker-compose logs -f backend
```

### Serviços Docker

- **backend** - API FastAPI (porta 8000)
- **postgres** - PostgreSQL (porta 5432)
- **redis** - Redis (porta 6379)
- **celery_worker** - Worker Celery

---

## 🧪 Testes

### Health Check

```bash
curl http://localhost:8000/health
```

### Testar Endpoints

```bash
# Dashboard
curl http://localhost:8000/api/dashboard/summary

# Leads
curl http://localhost:8000/api/leads

# Instagram
curl http://localhost:8000/api/instagram/profile

# Análise com IA
curl -X POST http://localhost:8000/api/agents/analyze-campaign \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_data": {"nome": "Teste", "impressoes": 10000},
    "metrics": ["ctr"],
    "context": "Campanha de teste"
  }'
```

---

## 📊 Desenvolvimento

### Comandos Úteis

```bash
# Ativar ambiente virtual
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Adicionar nova dependência
pip install nome-pacote
pip freeze > requirements.txt

# Iniciar servidor de desenvolvimento
uvicorn app.main:app --reload

# Iniciar com logs detalhados
uvicorn app.main:app --reload --log-level debug

# Executar migrações
alembic upgrade head

# Criar nova migração
alembic revision --autogenerate -m "descrição"
```

### Estrutura de Código

```python
# Exemplo de endpoint
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

router = APIRouter()

@router.get("/exemplo")
async def exemplo(db: AsyncSession = Depends(get_db)):
    """Endpoint de exemplo."""
    return {"mensagem": "Olá!"}
```

---

## 🔧 Troubleshooting

Problemas comuns e soluções:

### Erro de conexão com PostgreSQL

```bash
brew services start postgresql@16
psql dashboard_clinica -U dashboard
```

### Erro de conexão com Redis

```bash
brew services start redis
redis-cli ping
```

### Porta 8000 já em uso

```bash
lsof -i :8000
kill -9 <PID>
```

### ModuleNotFoundError

```bash
source venv/bin/activate
pip install -r requirements.txt
```

**📖 Para mais soluções, consulte:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📈 Performance

### Otimizações Implementadas

- ✅ Conexões assíncronas com banco de dados
- ✅ Pool de conexões configurado (20 + 10 overflow)
- ✅ Cache com Redis
- ✅ Queries otimizadas com SQLAlchemy
- ✅ Background tasks com Celery

### Monitoramento

```bash
# Ver conexões ativas no PostgreSQL
psql dashboard_clinica -U dashboard -c "SELECT count(*) FROM pg_stat_activity;"

# Ver uso de memória do Redis
redis-cli INFO memory

# Ver processos Python
ps aux | grep python
```

---

## 🚀 Deploy

### Preparação para Produção

1. **Atualizar variáveis de ambiente:**
   ```env
   DEBUG=False
   DATABASE_URL=postgresql+asyncpg://user:pass@prod-host/db
   ```

2. **Executar migrações:**
   ```bash
   alembic upgrade head
   ```

3. **Iniciar com múltiplos workers:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

### Docker em Produção

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📝 Convenções de Código

### Python

- ✅ Type hints em todas as funções
- ✅ Docstrings em português
- ✅ Async/await para operações I/O
- ✅ Tratamento de erros com HTTPException
- ✅ Validação com Pydantic

### Exemplo

```python
async def get_leads(
    pipeline_id: Optional[int] = None,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
) -> List[Lead]:
    """
    Busca leads do Kommo CRM.
    
    Args:
        pipeline_id: ID do pipeline (opcional)
        limit: Número máximo de resultados
        db: Sessão do banco de dados
        
    Returns:
        Lista de leads
    """
    # Implementação
    pass
```

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/nova-feature`
2. Faça suas alterações
3. Execute os testes
4. Commit: `git commit -m 'Adiciona nova feature'`
5. Push: `git push origin feature/nova-feature`
6. Abra um Pull Request

---

## 📞 Suporte

- **Documentação Completa:** [GUIA_CONFIGURACAO_BACKEND.md](./GUIA_CONFIGURACAO_BACKEND.md)
- **Problemas Comuns:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Comandos Úteis:** [COMANDOS_UTEIS.md](./COMANDOS_UTEIS.md)
- **Checklist:** [CHECKLIST_SETUP.md](./CHECKLIST_SETUP.md)

---

## 📄 Licença

Este projeto é proprietário e confidencial.

---

**Desenvolvido com ❤️ para Clínica Dr. Igor**

