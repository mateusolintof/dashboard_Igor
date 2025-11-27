# ✅ Checklist de Configuração do Backend

Use este checklist para garantir que todos os passos foram executados corretamente.

---

## 📦 Fase 1: Pré-requisitos

- [ ] **Python 3.11+** instalado
  ```bash
  python3 --version
  ```

- [ ] **PostgreSQL 14+** instalado
  ```bash
  psql --version
  ```

- [ ] **Redis** instalado
  ```bash
  redis-cli --version
  ```

- [ ] **Git** configurado (opcional)
  ```bash
  git --version
  ```

---

## 🔧 Fase 2: Configuração Inicial

- [ ] **Navegar até a pasta backend**
  ```bash
  cd backend
  ```

- [ ] **Criar ambiente virtual**
  ```bash
  python3 -m venv venv
  ```

- [ ] **Ativar ambiente virtual**
  ```bash
  source venv/bin/activate
  # Você deve ver (venv) no início do prompt
  ```

- [ ] **Atualizar pip**
  ```bash
  pip install --upgrade pip
  ```

- [ ] **Instalar dependências**
  ```bash
  pip install -r requirements.txt
  ```

---

## 🗄️ Fase 3: Banco de Dados

### PostgreSQL

- [ ] **Iniciar PostgreSQL**
  ```bash
  brew services start postgresql@16  # macOS
  # ou
  sudo systemctl start postgresql    # Linux
  ```

- [ ] **Criar banco de dados**
  ```bash
  psql postgres -c "CREATE DATABASE dashboard_clinica;"
  ```

- [ ] **Criar usuário**
  ```bash
  psql postgres -c "CREATE USER dashboard WITH PASSWORD 'dashboard_password';"
  ```

- [ ] **Conceder privilégios**
  ```bash
  psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE dashboard_clinica TO dashboard;"
  ```

- [ ] **Testar conexão**
  ```bash
  psql dashboard_clinica -U dashboard
  # Digite a senha: dashboard_password
  # Digite \q para sair
  ```

### Redis

- [ ] **Iniciar Redis**
  ```bash
  brew services start redis  # macOS
  # ou
  sudo systemctl start redis # Linux
  ```

- [ ] **Testar Redis**
  ```bash
  redis-cli ping
  # Deve retornar: PONG
  ```

---

## 🔐 Fase 4: Variáveis de Ambiente

- [ ] **Copiar arquivo de exemplo**
  ```bash
  cp ../docs/env-example.txt .env
  ```

- [ ] **Editar .env**
  ```bash
  nano .env
  # ou use seu editor preferido
  ```

- [ ] **Configurar DATABASE_URL**
  ```env
  DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@localhost:5432/dashboard_clinica
  ```

- [ ] **Configurar REDIS_URL**
  ```env
  REDIS_URL=redis://localhost:6379/0
  ```

- [ ] **Configurar DEBUG**
  ```env
  DEBUG=True
  ```

---

## 🔌 Fase 5: Credenciais das APIs

### Obrigatórias para Funcionalidade Completa

- [ ] **Kommo CRM**
  - [ ] KOMMO_DOMAIN
  - [ ] KOMMO_CLIENT_ID
  - [ ] KOMMO_CLIENT_SECRET
  - [ ] KOMMO_ACCESS_TOKEN
  - [ ] KOMMO_REFRESH_TOKEN

- [ ] **Meta Ads**
  - [ ] META_APP_ID
  - [ ] META_APP_SECRET
  - [ ] META_ACCESS_TOKEN
  - [ ] META_AD_ACCOUNT_ID

- [ ] **Instagram**
  - [ ] INSTAGRAM_BUSINESS_ID
  - [ ] INSTAGRAM_ACCESS_TOKEN

- [ ] **Anthropic (Claude)**
  - [ ] ANTHROPIC_API_KEY

- [ ] **Google AI (Gemini)**
  - [ ] GOOGLE_AI_API_KEY

### Opcionais

- [ ] **Google Ads** (se usar)
  - [ ] GOOGLE_ADS_DEVELOPER_TOKEN
  - [ ] GOOGLE_ADS_CLIENT_ID
  - [ ] GOOGLE_ADS_CLIENT_SECRET
  - [ ] GOOGLE_ADS_REFRESH_TOKEN
  - [ ] GOOGLE_ADS_CUSTOMER_ID

- [ ] **Perplexity** (se usar)
  - [ ] PERPLEXITY_API_KEY

- [ ] **Agenda** (se usar)
  - [ ] AGENDA_API_URL
  - [ ] AGENDA_API_KEY

---

## 🗃️ Fase 6: Migrações

- [ ] **Verificar conexão com banco**
  ```bash
  alembic current
  ```

- [ ] **Executar migrações**
  ```bash
  alembic upgrade head
  ```

- [ ] **Verificar se aplicou corretamente**
  ```bash
  alembic current
  # Deve mostrar a versão atual
  ```

---

## 🚀 Fase 7: Iniciar Servidor

- [ ] **Iniciar servidor de desenvolvimento**
  ```bash
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  ```

- [ ] **Verificar se iniciou sem erros**
  - Você deve ver: "Application startup complete."

- [ ] **Testar health check**
  ```bash
  curl http://localhost:8000/health
  # Deve retornar: {"status":"healthy"}
  ```

---

## 🧪 Fase 8: Testes

- [ ] **Acessar documentação Swagger**
  - Abrir no navegador: http://localhost:8000/docs
  - Deve carregar a interface do Swagger UI

- [ ] **Acessar documentação ReDoc**
  - Abrir no navegador: http://localhost:8000/redoc
  - Deve carregar a interface do ReDoc

- [ ] **Testar endpoint de leads**
  ```bash
  curl http://localhost:8000/api/leads
  ```

- [ ] **Testar endpoint de dashboard**
  ```bash
  curl http://localhost:8000/api/dashboard/summary
  ```

- [ ] **Testar endpoint de Instagram**
  ```bash
  curl http://localhost:8000/api/instagram/profile
  ```

- [ ] **Testar endpoint de campanhas**
  ```bash
  curl http://localhost:8000/api/campaigns
  ```

- [ ] **Testar agente de IA**
  ```bash
  curl -X POST http://localhost:8000/api/agents/analyze-campaign \
    -H "Content-Type: application/json" \
    -d '{"campaign_data":{"nome":"Teste"},"metrics":["ctr"],"context":"Teste"}'
  ```

---

## 🐳 Fase 9: Docker (Opcional)

Se preferir usar Docker:

- [ ] **Criar .env na raiz do projeto**
  ```bash
  cd ..
  cp docs/env-example.txt .env
  ```

- [ ] **Ajustar DATABASE_URL para Docker**
  ```env
  DATABASE_URL=postgresql+asyncpg://dashboard:dashboard_password@postgres:5432/dashboard_clinica
  REDIS_URL=redis://redis:6379/0
  ```

- [ ] **Construir imagens**
  ```bash
  docker-compose build
  ```

- [ ] **Iniciar serviços**
  ```bash
  docker-compose up -d
  ```

- [ ] **Executar migrações no container**
  ```bash
  docker-compose exec backend alembic upgrade head
  ```

- [ ] **Verificar logs**
  ```bash
  docker-compose logs -f backend
  ```

- [ ] **Testar health check**
  ```bash
  curl http://localhost:8000/health
  ```

---

## 📊 Fase 10: Verificação Final

- [ ] **Servidor rodando sem erros**
- [ ] **Banco de dados conectado**
- [ ] **Redis conectado**
- [ ] **Pelo menos uma integração funcionando**
- [ ] **Documentação acessível**
- [ ] **Health check respondendo**
- [ ] **Logs sem erros críticos**

---

## 🎯 Próximos Passos

Após completar todas as fases:

- [ ] Configurar frontend
- [ ] Testar integração frontend-backend
- [ ] Configurar variáveis de produção
- [ ] Configurar CI/CD
- [ ] Configurar monitoramento

---

## 📝 Notas Importantes

### Comandos para Lembrar

**Ativar ambiente virtual:**
```bash
cd backend
source venv/bin/activate
```

**Iniciar servidor:**
```bash
uvicorn app.main:app --reload
```

**Executar migrações:**
```bash
alembic upgrade head
```

**Ver logs do Docker:**
```bash
docker-compose logs -f backend
```

### Troubleshooting Rápido

**Erro de conexão com PostgreSQL:**
```bash
brew services restart postgresql@16
```

**Erro de conexão com Redis:**
```bash
brew services restart redis
```

**Erro de módulo não encontrado:**
```bash
source venv/bin/activate
pip install -r requirements.txt
```

**Porta 8000 já em uso:**
```bash
lsof -i :8000
kill -9 <PID>
```

---

## ✅ Status da Configuração

Marque conforme completa:

- [ ] ✅ Todos os pré-requisitos instalados
- [ ] ✅ Ambiente virtual configurado
- [ ] ✅ Banco de dados criado e conectado
- [ ] ✅ Redis rodando
- [ ] ✅ Arquivo .env configurado
- [ ] ✅ Credenciais das APIs adicionadas
- [ ] ✅ Migrações executadas
- [ ] ✅ Servidor iniciado com sucesso
- [ ] ✅ Testes básicos passando
- [ ] ✅ Documentação acessível

---

**🎉 Quando todos os itens estiverem marcados, seu backend está 100% configurado!**

Para suporte adicional, consulte:
- `GUIA_CONFIGURACAO_BACKEND.md` - Guia detalhado
- `COMANDOS_UTEIS.md` - Referência de comandos
- `../CLAUDE.md` - Documentação do projeto

