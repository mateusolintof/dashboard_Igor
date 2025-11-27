# 🚀 Guia Completo de Configuração do Backend

Este guia irá te orientar passo a passo na configuração completa do backend do Dashboard Clínica Dr. Igor.

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração do Ambiente Local](#configuração-do-ambiente-local)
3. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
4. [Configuração das Integrações](#configuração-das-integrações)
5. [Executando o Backend](#executando-o-backend)
6. [Configuração com Docker](#configuração-com-docker)
7. [Testes e Verificação](#testes-e-verificação)
8. [Troubleshooting](#troubleshooting)

---

## 1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatórios:
- **Python 3.11+** ([Download](https://www.python.org/downloads/))
- **PostgreSQL 14+** ([Download](https://www.postgresql.org/download/))
- **Redis** ([Download](https://redis.io/download))

### Opcionais (para Docker):
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
- **Docker Compose** (já incluído no Docker Desktop)

### Verificar instalações:

```bash
# Python
python3 --version  # Deve mostrar 3.11 ou superior

# PostgreSQL
psql --version

# Redis
redis-cli --version

# Docker (opcional)
docker --version
docker-compose --version
```

---

## 2. Configuração do Ambiente Local

### Passo 1: Navegar até a pasta do backend

```bash
cd "/Users/mateusolinto/Developer Projects/Projetos Convert/INSTITUTO AGUIAR NERI/dashboard-clinica/backend"
```

### Passo 2: Criar ambiente virtual Python

```bash
# Criar venv (se ainda não existir)
python3 -m venv venv

# Ativar venv
source venv/bin/activate  # macOS/Linux
# ou
.\venv\Scripts\activate  # Windows
```

**✅ Confirmação:** Seu terminal deve mostrar `(venv)` no início da linha.

### Passo 3: Instalar dependências

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**⏱️ Tempo estimado:** 2-3 minutos

### Passo 4: Criar arquivo `.env`

```bash
# Copiar exemplo
cp ../docs/env-example.txt .env

# Editar o arquivo
nano .env  # ou use seu editor preferido (code .env, vim .env, etc.)
```

---

## 3. Configuração do Banco de Dados

### Opção A: PostgreSQL Local (Recomendado para desenvolvimento)

#### Passo 1: Iniciar PostgreSQL

```bash
# macOS (com Homebrew)
brew services start postgresql@16

# Linux (systemd)
sudo systemctl start postgresql

# Windows
# Inicie o serviço pelo Services.msc ou pgAdmin
```

#### Passo 2: Criar banco de dados

```bash
# Conectar ao PostgreSQL
psql postgres

# Dentro do psql, executar:
CREATE DATABASE dashboard_clinica;
CREATE USER dashboard WITH PASSWORD 'dashboard_password';
GRANT ALL PRIVILEGES ON DATABASE dashboard_clinica TO dashboard;

# Sair do psql
\q
```

#### Passo 3: Configurar URL no `.env`

Edite o arquivo `.env` e configure:

```env
DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@localhost:5432/dashboard_clinica
```

### Opção B: PostgreSQL com Docker

```bash
# Iniciar apenas o PostgreSQL
docker run -d \
  --name dashboard-postgres \
  -e POSTGRES_USER=dashboard \
  -e POSTGRES_PASSWORD=dashboard_password \
  -e POSTGRES_DB=dashboard_clinica \
  -p 5432:5432 \
  postgres:16-alpine
```

### Passo 4: Executar migrações

```bash
# Certifique-se de estar na pasta backend com venv ativado
cd backend
source venv/bin/activate

# Executar migrações do Alembic
alembic upgrade head
```

**✅ Confirmação:** Você deve ver mensagens de sucesso das migrações.

### Passo 5: Configurar Redis

#### Redis Local:

```bash
# macOS (com Homebrew)
brew services start redis

# Linux
sudo systemctl start redis

# Windows
# Baixe o Redis para Windows ou use WSL
```

#### Redis com Docker:

```bash
docker run -d \
  --name dashboard-redis \
  -p 6379:6379 \
  redis:7-alpine
```

#### Configurar no `.env`:

```env
REDIS_URL=redis://localhost:6379/0
```

---

## 4. Configuração das Integrações

Agora vamos configurar as credenciais das APIs externas. Edite o arquivo `.env`:

### 4.1 Kommo CRM

1. Acesse [Kommo Developers](https://www.kommo.com/developers/)
2. Crie uma integração OAuth
3. Obtenha as credenciais e tokens

```env
KOMMO_DOMAIN=seudominioaqui.kommo.com
KOMMO_CLIENT_ID=seu_client_id
KOMMO_CLIENT_SECRET=seu_client_secret
KOMMO_ACCESS_TOKEN=seu_access_token
KOMMO_REFRESH_TOKEN=seu_refresh_token
```

**📝 Nota:** Os tokens podem ser obtidos através do fluxo OAuth. Consulte a [documentação do Kommo](https://www.kommo.com/developers/api/).

### 4.2 Meta Ads (Facebook/Instagram Ads)

1. Acesse [Meta for Developers](https://developers.facebook.com/)
2. Crie um app e configure Marketing API
3. Obtenha o token de acesso de longa duração

```env
META_APP_ID=seu_app_id
META_APP_SECRET=seu_app_secret
META_ACCESS_TOKEN=seu_access_token_longa_duracao
META_AD_ACCOUNT_ID=act_123456789
```

**🔗 Tutorial:** [Como obter token do Meta Ads](https://developers.facebook.com/docs/marketing-api/get-started)

### 4.3 Instagram Graph API

1. Use o mesmo app do Meta for Developers
2. Configure Instagram Graph API
3. Conecte sua conta Business do Instagram

```env
INSTAGRAM_BUSINESS_ID=seu_business_id
INSTAGRAM_ACCESS_TOKEN=seu_access_token
```

**📝 Nota:** O `INSTAGRAM_BUSINESS_ID` pode ser obtido através da Graph API Explorer.

### 4.4 Google Ads (Opcional)

```env
GOOGLE_ADS_DEVELOPER_TOKEN=seu_developer_token
GOOGLE_ADS_CLIENT_ID=seu_client_id
GOOGLE_ADS_CLIENT_SECRET=seu_client_secret
GOOGLE_ADS_REFRESH_TOKEN=seu_refresh_token
GOOGLE_ADS_CUSTOMER_ID=123-456-7890
```

### 4.5 APIs de IA

#### Anthropic (Claude):

1. Acesse [Anthropic Console](https://console.anthropic.com/)
2. Crie uma API Key

```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

#### Google AI (Gemini):

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma API Key

```env
GOOGLE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxx
```

#### Perplexity (Opcional):

```env
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxx
```

### 4.6 Configurações Gerais

```env
APP_NAME=Dashboard Clinica Dr Igor
DEBUG=True  # Deixe True em desenvolvimento, False em produção
```

---

## 5. Executando o Backend

### Método 1: Desenvolvimento Local (Recomendado)

```bash
# Certifique-se de estar na pasta backend
cd backend

# Ativar ambiente virtual
source venv/bin/activate

# Executar servidor de desenvolvimento
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**✅ Sucesso:** Você verá:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Método 2: Produção (sem reload)

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Acessar documentação da API:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

---

## 6. Configuração com Docker

### Opção Completa: Todos os serviços

#### Passo 1: Criar arquivo `.env` na raiz do projeto

```bash
# Voltar para a raiz do projeto
cd ..

# Copiar exemplo
cp docs/env-example.txt .env

# Editar com suas credenciais
nano .env
```

**⚠️ Importante:** Ajuste a `DATABASE_URL` para usar o hostname do Docker:

```env
DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@postgres:5432/dashboard_clinica
REDIS_URL=redis://redis:6379/0
```

#### Passo 2: Construir e iniciar todos os serviços

```bash
# Construir imagens
docker-compose build

# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f backend
```

#### Passo 3: Executar migrações no container

```bash
docker-compose exec backend alembic upgrade head
```

### Comandos úteis do Docker:

```bash
# Ver status dos containers
docker-compose ps

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (⚠️ apaga dados)
docker-compose down -v

# Reiniciar apenas o backend
docker-compose restart backend

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f redis

# Executar comandos dentro do container
docker-compose exec backend bash
```

---

## 7. Testes e Verificação

### 7.1 Verificar Health Check

```bash
curl http://localhost:8000/health
```

**Resposta esperada:**
```json
{"status": "healthy"}
```

### 7.2 Testar conexão com banco de dados

Acesse http://localhost:8000/docs e teste qualquer endpoint que faça query no banco.

### 7.3 Testar integrações

#### Kommo:

```bash
curl http://localhost:8000/api/leads
```

#### Instagram:

```bash
curl http://localhost:8000/api/instagram/profile
```

#### Meta Ads:

```bash
curl http://localhost:8000/api/campaigns
```

### 7.4 Testar agentes de IA

```bash
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

---

## 8. Troubleshooting

### Problema: "ModuleNotFoundError"

**Solução:**
```bash
# Certifique-se de que o venv está ativado
source venv/bin/activate

# Reinstale as dependências
pip install -r requirements.txt
```

### Problema: "Connection refused" ao conectar no PostgreSQL

**Soluções:**

1. Verificar se o PostgreSQL está rodando:
```bash
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql
```

2. Verificar se a porta 5432 está aberta:
```bash
lsof -i :5432
```

3. Verificar credenciais no `.env`

### Problema: "Redis connection error"

**Soluções:**

1. Verificar se o Redis está rodando:
```bash
redis-cli ping
# Deve retornar: PONG
```

2. Iniciar Redis:
```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis

# Docker
docker start dashboard-redis
```

### Problema: "Alembic migration failed"

**Solução:**
```bash
# Verificar versão atual
alembic current

# Reverter última migração
alembic downgrade -1

# Aplicar novamente
alembic upgrade head
```

### Problema: "CORS error" no frontend

**Solução:**

Verifique se o CORS está configurado corretamente no `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problema: "API key invalid" nas integrações

**Soluções:**

1. Verificar se as variáveis estão no `.env`
2. Reiniciar o servidor após alterar `.env`
3. Verificar se os tokens não expiraram
4. Regenerar tokens se necessário

### Problema: Docker não inicia

**Soluções:**

1. Verificar se as portas estão disponíveis:
```bash
lsof -i :8000  # Backend
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
```

2. Parar serviços locais que usam as mesmas portas:
```bash
brew services stop postgresql
brew services stop redis
```

3. Limpar containers antigos:
```bash
docker-compose down -v
docker system prune -a
```

---

## 📚 Próximos Passos

Após configurar o backend com sucesso:

1. ✅ Configure o frontend (veja `frontend/README.md`)
2. ✅ Teste todas as integrações
3. ✅ Configure variáveis de ambiente de produção
4. ✅ Configure CI/CD (GitHub Actions, etc.)
5. ✅ Configure monitoramento (Sentry, etc.)

---

## 🆘 Precisa de Ajuda?

- 📖 **Documentação FastAPI:** https://fastapi.tiangolo.com
- 📖 **Documentação SQLAlchemy:** https://docs.sqlalchemy.org
- 📖 **Documentação Alembic:** https://alembic.sqlalchemy.org
- 📖 **Kommo API Docs:** https://www.kommo.com/developers/api/
- 📖 **Meta Marketing API:** https://developers.facebook.com/docs/marketing-apis/

---

## ✅ Checklist Final

Antes de considerar a configuração completa, verifique:

- [ ] Python 3.11+ instalado
- [ ] PostgreSQL rodando e banco criado
- [ ] Redis rodando
- [ ] Arquivo `.env` criado e preenchido
- [ ] Dependências Python instaladas (`pip install -r requirements.txt`)
- [ ] Migrações executadas (`alembic upgrade head`)
- [ ] Servidor iniciado sem erros (`uvicorn app.main:app --reload`)
- [ ] Health check respondendo (http://localhost:8000/health)
- [ ] Documentação acessível (http://localhost:8000/docs)
- [ ] Pelo menos uma integração testada e funcionando

---

**🎉 Parabéns! Seu backend está configurado e pronto para uso!**

