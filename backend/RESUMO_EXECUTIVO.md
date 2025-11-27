# 📋 Resumo Executivo - Configuração do Backend

Guia ultra-compacto para impressão ou referência rápida.

---

## ⚡ Setup em 3 Comandos

```bash
cd backend && ./setup.sh
source venv/bin/activate
uvicorn app.main:app --reload
```

**Acesse:** http://localhost:8000/docs

---

## 🐳 Docker em 3 Comandos

```bash
cp docs/env-example.txt .env && nano .env
docker-compose up -d
docker-compose exec backend alembic upgrade head
```

**Acesse:** http://localhost:8000/docs

---

## 📝 Checklist Mínimo

- [ ] Python 3.11+ instalado
- [ ] PostgreSQL rodando
- [ ] Redis rodando
- [ ] Arquivo `.env` criado e configurado
- [ ] Dependências instaladas (`pip install -r requirements.txt`)
- [ ] Migrações executadas (`alembic upgrade head`)
- [ ] Servidor iniciado (`uvicorn app.main:app --reload`)

---

## 🔑 Variáveis Essenciais (.env)

```env
DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@localhost:5432/dashboard_clinica
REDIS_URL=redis://localhost:6379/0
ANTHROPIC_API_KEY=sk-ant-xxxxx
GOOGLE_AI_API_KEY=AIzaSyxxxxx
KOMMO_ACCESS_TOKEN=seu_token
META_ACCESS_TOKEN=seu_token
INSTAGRAM_ACCESS_TOKEN=seu_token
```

---

## 🚨 Comandos de Emergência

```bash
# Resetar tudo
docker-compose down -v
brew services restart postgresql redis
rm -rf venv && python3 -m venv venv
source venv/bin/activate && pip install -r requirements.txt
alembic upgrade head

# Verificar serviços
brew services list                    # macOS
lsof -i :8000                        # Porta backend
lsof -i :5432                        # PostgreSQL
redis-cli ping                       # Redis
curl http://localhost:8000/health    # Health check
```

---

## 🔧 Troubleshooting Rápido

| Erro | Solução |
|------|---------|
| Connection refused (PostgreSQL) | `brew services start postgresql@16` |
| Connection refused (Redis) | `brew services start redis` |
| Port 8000 in use | `lsof -i :8000` → `kill -9 <PID>` |
| ModuleNotFoundError | `source venv/bin/activate` → `pip install -r requirements.txt` |
| Migration failed | `alembic downgrade -1` → `alembic upgrade head` |

---

## 📚 Documentação Completa

- **Setup Rápido:** [INICIO_RAPIDO.md](./INICIO_RAPIDO.md)
- **Checklist:** [CHECKLIST_SETUP.md](./CHECKLIST_SETUP.md)
- **Guia Completo:** [GUIA_CONFIGURACAO_BACKEND.md](./GUIA_CONFIGURACAO_BACKEND.md)
- **Comandos:** [COMANDOS_UTEIS.md](./COMANDOS_UTEIS.md)
- **Problemas:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🎯 Endpoints Principais

```
GET  /health                           # Health check
GET  /docs                             # Swagger UI
GET  /api/dashboard/summary            # Dashboard
GET  /api/leads                        # Leads do Kommo
GET  /api/campaigns                    # Campanhas Meta Ads
GET  /api/instagram/profile            # Instagram
POST /api/agents/analyze-campaign      # Análise com IA
```

---

## 💾 Backup Rápido

```bash
# Backup do banco
pg_dump -U dashboard dashboard_clinica > backup_$(date +%Y%m%d).sql

# Backup do .env
cp .env .env.backup

# Restaurar banco
psql -U dashboard dashboard_clinica < backup_20231127.sql
```

---

## 📞 Suporte

1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. [GUIA_CONFIGURACAO_BACKEND.md](./GUIA_CONFIGURACAO_BACKEND.md)
3. Documentação oficial das tecnologias
4. Stack Overflow

---

**Versão:** 1.0 | **Última atualização:** Nov 2024

