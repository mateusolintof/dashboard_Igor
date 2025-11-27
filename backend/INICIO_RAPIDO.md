# ⚡ Início Rápido - Backend

Guia ultra-resumido para configurar e rodar o backend em minutos.

---

## 🎯 Opção 1: Setup Automático (5 minutos)

```bash
# 1. Navegar até a pasta backend
cd backend

# 2. Executar script de setup
./setup.sh

# 3. Editar .env com suas credenciais
nano .env

# 4. Iniciar servidor
source venv/bin/activate
uvicorn app.main:app --reload
```

✅ **Pronto!** Acesse: http://localhost:8000/docs

---

## 🐳 Opção 2: Docker (3 minutos)

```bash
# 1. Criar .env na raiz do projeto
cd ..
cp docs/env-example.txt .env
nano .env

# 2. Ajustar DATABASE_URL no .env
DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@postgres:5432/dashboard_clinica
REDIS_URL=redis://redis:6379/0

# 3. Iniciar tudo
docker-compose up -d

# 4. Executar migrações
docker-compose exec backend alembic upgrade head
```

✅ **Pronto!** Acesse: http://localhost:8000/docs

---

## 🛠️ Opção 3: Setup Manual (10 minutos)

### Passo 1: Ambiente Python

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Passo 2: Banco de Dados

```bash
# PostgreSQL
brew services start postgresql@16  # macOS
psql postgres -c "CREATE DATABASE dashboard_clinica;"
psql postgres -c "CREATE USER dashboard WITH PASSWORD 'dashboard_password';"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE dashboard_clinica TO dashboard;"

# Redis
brew services start redis
```

### Passo 3: Configuração

```bash
# Criar .env
cp ../docs/env-example.txt .env
nano .env

# Adicionar no mínimo:
DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@localhost:5432/dashboard_clinica
REDIS_URL=redis://localhost:6379/0
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### Passo 4: Migrações

```bash
alembic upgrade head
```

### Passo 5: Iniciar

```bash
uvicorn app.main:app --reload
```

✅ **Pronto!** Acesse: http://localhost:8000/docs

---

## 🧪 Teste Rápido

```bash
# Health check
curl http://localhost:8000/health

# Deve retornar:
# {"status":"healthy"}
```

---

## 📚 Próximos Passos

Agora que o backend está rodando:

1. **Configure as integrações** (Kommo, Meta Ads, Instagram)
2. **Teste os endpoints** na documentação Swagger
3. **Configure o frontend** (veja `../frontend/README.md`)

---

## 🆘 Problemas?

### Erro de conexão com PostgreSQL

```bash
brew services start postgresql@16
```

### Erro de conexão com Redis

```bash
brew services start redis
```

### Porta 8000 já em uso

```bash
lsof -i :8000
kill -9 <PID>
```

### Mais soluções

Consulte: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📖 Documentação Completa

- **Setup Detalhado:** [GUIA_CONFIGURACAO_BACKEND.md](./GUIA_CONFIGURACAO_BACKEND.md)
- **Checklist:** [CHECKLIST_SETUP.md](./CHECKLIST_SETUP.md)
- **Comandos:** [COMANDOS_UTEIS.md](./COMANDOS_UTEIS.md)
- **Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🎉 Tudo Funcionando?

Ótimo! Agora você pode:

- ✅ Acessar a documentação: http://localhost:8000/docs
- ✅ Testar os endpoints
- ✅ Configurar o frontend
- ✅ Começar a desenvolver!

---

**💡 Dica:** Marque esta página nos favoritos para referência rápida!

