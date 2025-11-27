# 📝 Comandos Úteis - Backend

Referência rápida de comandos para o dia a dia do desenvolvimento.

---

## 🚀 Inicialização Rápida

### Setup Automático (Primeira vez)

```bash
cd backend
./setup.sh
```

### Setup Manual

```bash
# 1. Criar e ativar venv
python3 -m venv venv
source venv/bin/activate

# 2. Instalar dependências
pip install -r requirements.txt

# 3. Copiar .env
cp ../docs/env-example.txt .env

# 4. Editar .env
nano .env

# 5. Executar migrações
alembic upgrade head

# 6. Iniciar servidor
uvicorn app.main:app --reload
```

---

## 🔄 Desenvolvimento Diário

### Iniciar Servidor

```bash
# Ativar venv
cd backend
source venv/bin/activate

# Modo desenvolvimento (com auto-reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Modo produção (sem reload, múltiplos workers)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Acessar Documentação

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

---

## 🗄️ Banco de Dados

### PostgreSQL Local

```bash
# Iniciar PostgreSQL
brew services start postgresql@16  # macOS
sudo systemctl start postgresql    # Linux

# Parar PostgreSQL
brew services stop postgresql@16   # macOS
sudo systemctl stop postgresql     # Linux

# Conectar ao banco
psql dashboard_clinica -U dashboard

# Criar banco manualmente
psql postgres -c "CREATE DATABASE dashboard_clinica;"
psql postgres -c "CREATE USER dashboard WITH PASSWORD 'dashboard_password';"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE dashboard_clinica TO dashboard;"
```

### Migrações (Alembic)

```bash
# Ver versão atual
alembic current

# Ver histórico
alembic history

# Criar nova migração (auto-detectar mudanças nos models)
alembic revision --autogenerate -m "descrição da mudança"

# Aplicar todas as migrações pendentes
alembic upgrade head

# Aplicar próxima migração
alembic upgrade +1

# Reverter última migração
alembic downgrade -1

# Reverter para versão específica
alembic downgrade <revision_id>

# Reverter todas as migrações
alembic downgrade base
```

---

## 🔴 Redis

```bash
# Iniciar Redis
brew services start redis          # macOS
sudo systemctl start redis         # Linux

# Parar Redis
brew services stop redis           # macOS
sudo systemctl stop redis          # Linux

# Testar conexão
redis-cli ping  # Deve retornar: PONG

# Conectar ao Redis CLI
redis-cli

# Limpar todos os dados do Redis
redis-cli FLUSHALL
```

---

## 🐳 Docker

### Comandos Básicos

```bash
# Construir imagens
docker-compose build

# Iniciar todos os serviços
docker-compose up -d

# Iniciar e ver logs
docker-compose up

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (⚠️ apaga dados)
docker-compose down -v

# Ver status dos containers
docker-compose ps

# Reiniciar serviço específico
docker-compose restart backend
docker-compose restart postgres
docker-compose restart redis
```

### Logs

```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de serviço específico
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f redis
docker-compose logs -f celery_worker

# Ver últimas 100 linhas
docker-compose logs --tail=100 backend
```

### Executar Comandos nos Containers

```bash
# Bash no container do backend
docker-compose exec backend bash

# Executar migrações no container
docker-compose exec backend alembic upgrade head

# Python shell no container
docker-compose exec backend python

# Conectar ao PostgreSQL no container
docker-compose exec postgres psql -U dashboard -d dashboard_clinica

# Redis CLI no container
docker-compose exec redis redis-cli
```

### Limpeza

```bash
# Remover containers parados
docker container prune

# Remover imagens não utilizadas
docker image prune

# Remover volumes não utilizados
docker volume prune

# Limpeza completa (⚠️ cuidado)
docker system prune -a --volumes
```

---

## 📦 Dependências Python

### Instalar/Atualizar

```bash
# Instalar todas as dependências
pip install -r requirements.txt

# Instalar pacote específico
pip install nome-do-pacote

# Instalar e adicionar ao requirements.txt
pip install nome-do-pacote
pip freeze > requirements.txt

# Atualizar pacote específico
pip install --upgrade nome-do-pacote

# Atualizar pip
pip install --upgrade pip
```

### Listar e Verificar

```bash
# Listar pacotes instalados
pip list

# Ver informações de um pacote
pip show nome-do-pacote

# Verificar dependências desatualizadas
pip list --outdated

# Verificar conflitos de dependências
pip check
```

---

## 🧪 Testes

### Testes com cURL

```bash
# Health check
curl http://localhost:8000/health

# Listar leads
curl http://localhost:8000/api/leads

# Dashboard resumo
curl http://localhost:8000/api/dashboard/summary

# Perfil Instagram
curl http://localhost:8000/api/instagram/profile

# Campanhas Meta Ads
curl http://localhost:8000/api/campaigns

# Análise de campanha com IA
curl -X POST http://localhost:8000/api/agents/analyze-campaign \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_data": {
      "nome": "Campanha Teste",
      "impressoes": 10000,
      "cliques": 500,
      "conversoes": 25
    },
    "metrics": ["ctr", "cpl"],
    "context": "Campanha de botox"
  }'
```

### Testes com HTTPie (alternativa mais amigável)

```bash
# Instalar HTTPie
pip install httpx-cli

# Exemplos
http GET http://localhost:8000/health
http GET http://localhost:8000/api/leads
http POST http://localhost:8000/api/agents/analyze-campaign \
  campaign_data:='{"nome":"Teste"}' \
  metrics:='["ctr"]' \
  context="Teste"
```

---

## 🔍 Debug e Troubleshooting

### Verificar Portas

```bash
# Ver o que está usando a porta 8000
lsof -i :8000

# Ver o que está usando a porta 5432 (PostgreSQL)
lsof -i :5432

# Ver o que está usando a porta 6379 (Redis)
lsof -i :6379

# Matar processo em uma porta específica
kill -9 $(lsof -ti:8000)
```

### Logs e Debugging

```bash
# Executar com logs detalhados
uvicorn app.main:app --reload --log-level debug

# Ver logs do PostgreSQL (macOS)
tail -f /usr/local/var/log/postgres.log

# Ver logs do Redis (macOS)
tail -f /usr/local/var/log/redis.log
```

### Variáveis de Ambiente

```bash
# Ver todas as variáveis de ambiente
env

# Ver variável específica
echo $DATABASE_URL

# Exportar variável temporariamente
export DEBUG=True

# Carregar .env no shell atual
export $(cat .env | xargs)
```

---

## 🔐 Segurança

### Gerar Chaves Secretas

```bash
# Gerar secret key aleatória
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Gerar UUID
python -c "import uuid; print(uuid.uuid4())"
```

---

## 📊 Monitoramento

### Recursos do Sistema

```bash
# Ver uso de CPU e memória dos processos Python
ps aux | grep python

# Ver uso de memória do PostgreSQL
ps aux | grep postgres

# Ver conexões ativas no PostgreSQL
psql dashboard_clinica -U dashboard -c "SELECT count(*) FROM pg_stat_activity;"

# Ver tamanho do banco de dados
psql dashboard_clinica -U dashboard -c "SELECT pg_size_pretty(pg_database_size('dashboard_clinica'));"
```

---

## 🧹 Manutenção

### Limpar Cache Python

```bash
# Remover arquivos .pyc
find . -type f -name "*.pyc" -delete

# Remover pastas __pycache__
find . -type d -name "__pycache__" -delete

# Remover arquivos .DS_Store (macOS)
find . -name ".DS_Store" -delete
```

### Recriar Ambiente Virtual

```bash
# Desativar venv
deactivate

# Remover venv antigo
rm -rf venv

# Criar novo venv
python3 -m venv venv

# Ativar e reinstalar
source venv/bin/activate
pip install -r requirements.txt
```

---

## 🚀 Deploy

### Preparar para Produção

```bash
# Atualizar dependências
pip install --upgrade -r requirements.txt

# Executar migrações
alembic upgrade head

# Coletar arquivos estáticos (se houver)
# python manage.py collectstatic

# Testar build
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Variáveis de Ambiente para Produção

```env
DEBUG=False
DATABASE_URL=postgresql+asyncpg://user:pass@prod-host:5432/db
REDIS_URL=redis://prod-redis:6379/0
```

---

## 📚 Atalhos Úteis

### Aliases para .bashrc ou .zshrc

Adicione ao seu `~/.bashrc` ou `~/.zshrc`:

```bash
# Backend shortcuts
alias backend-start="cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
alias backend-shell="cd backend && source venv/bin/activate && python"
alias backend-db="psql dashboard_clinica -U dashboard"
alias backend-migrate="cd backend && source venv/bin/activate && alembic upgrade head"
alias backend-logs="docker-compose logs -f backend"
```

Depois execute:
```bash
source ~/.bashrc  # ou ~/.zshrc
```

---

## 🆘 Comandos de Emergência

### Resetar Tudo (⚠️ Cuidado!)

```bash
# Parar todos os serviços
docker-compose down -v
brew services stop postgresql
brew services stop redis

# Limpar Docker
docker system prune -a --volumes

# Remover venv
rm -rf venv

# Recriar do zero
./setup.sh
```

### Backup do Banco

```bash
# Criar backup
pg_dump -U dashboard dashboard_clinica > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar backup
psql -U dashboard dashboard_clinica < backup_20231127_120000.sql
```

---

## 📖 Referências Rápidas

- **FastAPI Docs:** https://fastapi.tiangolo.com
- **SQLAlchemy Docs:** https://docs.sqlalchemy.org
- **Alembic Docs:** https://alembic.sqlalchemy.org
- **Uvicorn Docs:** https://www.uvicorn.org
- **Docker Compose Docs:** https://docs.docker.com/compose/

