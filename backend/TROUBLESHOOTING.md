# 🔧 Guia de Troubleshooting - Backend

Soluções para os problemas mais comuns durante a configuração e uso do backend.

---

## 🔍 Índice de Problemas

1. [Erros de Instalação](#erros-de-instalação)
2. [Erros de Banco de Dados](#erros-de-banco-de-dados)
3. [Erros de Redis](#erros-de-redis)
4. [Erros de Servidor](#erros-de-servidor)
5. [Erros de Integrações](#erros-de-integrações)
6. [Erros de Docker](#erros-de-docker)
7. [Erros de Migrações](#erros-de-migrações)
8. [Erros de Permissões](#erros-de-permissões)

---

## 1. Erros de Instalação

### ❌ "ModuleNotFoundError: No module named 'X'"

**Causa:** Módulo Python não instalado ou ambiente virtual não ativado.

**Soluções:**

```bash
# 1. Verificar se venv está ativado
which python
# Deve mostrar o caminho do venv: .../backend/venv/bin/python

# 2. Ativar venv se não estiver
source venv/bin/activate

# 3. Reinstalar dependências
pip install -r requirements.txt

# 4. Se o problema persistir, recriar venv
deactivate
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

### ❌ "python3: command not found"

**Causa:** Python não instalado ou não está no PATH.

**Soluções:**

```bash
# macOS (com Homebrew)
brew install python@3.11

# Ubuntu/Debian
sudo apt update
sudo apt install python3.11 python3.11-venv

# Verificar instalação
python3 --version
```

---

### ❌ "pip: command not found"

**Causa:** pip não instalado.

**Soluções:**

```bash
# macOS/Linux
python3 -m ensurepip --upgrade

# Ubuntu/Debian
sudo apt install python3-pip

# Verificar
pip --version
```

---

## 2. Erros de Banco de Dados

### ❌ "Connection refused" ou "could not connect to server"

**Causa:** PostgreSQL não está rodando ou não está acessível.

**Soluções:**

```bash
# 1. Verificar se PostgreSQL está rodando
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# 2. Iniciar PostgreSQL
# macOS
brew services start postgresql@16

# Linux
sudo systemctl start postgresql

# 3. Verificar se a porta 5432 está aberta
lsof -i :5432

# 4. Testar conexão manualmente
psql -h localhost -U dashboard -d dashboard_clinica
```

---

### ❌ "FATAL: database 'dashboard_clinica' does not exist"

**Causa:** Banco de dados não foi criado.

**Solução:**

```bash
# Criar banco de dados
psql postgres -c "CREATE DATABASE dashboard_clinica;"

# Verificar se foi criado
psql postgres -c "\l" | grep dashboard_clinica
```

---

### ❌ "FATAL: role 'dashboard' does not exist"

**Causa:** Usuário do banco não foi criado.

**Solução:**

```bash
# Criar usuário
psql postgres -c "CREATE USER dashboard WITH PASSWORD 'dashboard_password';"

# Conceder privilégios
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE dashboard_clinica TO dashboard;"
```

---

### ❌ "FATAL: password authentication failed"

**Causa:** Senha incorreta no `.env` ou no comando.

**Soluções:**

```bash
# 1. Verificar DATABASE_URL no .env
cat .env | grep DATABASE_URL

# 2. Resetar senha do usuário
psql postgres -c "ALTER USER dashboard WITH PASSWORD 'dashboard_password';"

# 3. Verificar pg_hba.conf (se necessário)
# macOS: /usr/local/var/postgres/pg_hba.conf
# Linux: /etc/postgresql/*/main/pg_hba.conf
```

---

### ❌ "too many connections"

**Causa:** Limite de conexões do PostgreSQL atingido.

**Soluções:**

```bash
# 1. Ver conexões ativas
psql dashboard_clinica -U dashboard -c "SELECT count(*) FROM pg_stat_activity;"

# 2. Matar conexões idle
psql dashboard_clinica -U dashboard -c "
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'dashboard_clinica' 
AND state = 'idle' 
AND pid <> pg_backend_pid();
"

# 3. Aumentar limite (editar postgresql.conf)
# max_connections = 200
```

---

## 3. Erros de Redis

### ❌ "Connection refused" (Redis)

**Causa:** Redis não está rodando.

**Soluções:**

```bash
# 1. Verificar se Redis está rodando
redis-cli ping

# 2. Iniciar Redis
# macOS
brew services start redis

# Linux
sudo systemctl start redis

# 3. Verificar porta
lsof -i :6379

# 4. Ver logs do Redis
# macOS
tail -f /usr/local/var/log/redis.log

# Linux
sudo journalctl -u redis -f
```

---

### ❌ "NOAUTH Authentication required"

**Causa:** Redis configurado com senha mas não fornecida.

**Solução:**

```bash
# Verificar se Redis tem senha configurada
redis-cli CONFIG GET requirepass

# Se tiver senha, adicionar ao .env
REDIS_URL=redis://:senha@localhost:6379/0
```

---

## 4. Erros de Servidor

### ❌ "Address already in use" (porta 8000)

**Causa:** Outro processo está usando a porta 8000.

**Soluções:**

```bash
# 1. Ver o que está usando a porta
lsof -i :8000

# 2. Matar o processo
kill -9 <PID>

# 3. Ou usar outra porta
uvicorn app.main:app --reload --port 8001
```

---

### ❌ "ImportError: cannot import name 'X' from 'app.Y'"

**Causa:** Erro de importação circular ou módulo não encontrado.

**Soluções:**

```bash
# 1. Verificar estrutura de imports
# Evite imports circulares

# 2. Verificar se __init__.py existe nas pastas
ls -la app/
ls -la app/models/
ls -la app/api/

# 3. Limpar cache Python
find . -type d -name "__pycache__" -delete
find . -type f -name "*.pyc" -delete

# 4. Reiniciar servidor
```

---

### ❌ "ValidationError" ao iniciar

**Causa:** Variáveis de ambiente obrigatórias não configuradas.

**Solução:**

```bash
# 1. Verificar quais variáveis estão faltando no erro

# 2. Verificar .env
cat .env

# 3. Adicionar variáveis faltantes
nano .env

# 4. Reiniciar servidor
```

---

### ❌ "CORS error" no frontend

**Causa:** CORS não configurado ou origem bloqueada.

**Solução:**

Editar `app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        # Adicione outras origens se necessário
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 5. Erros de Integrações

### ❌ "Invalid API key" (Kommo, Meta, etc.)

**Causa:** API key inválida, expirada ou não configurada.

**Soluções:**

```bash
# 1. Verificar se a key está no .env
cat .env | grep KOMMO_ACCESS_TOKEN

# 2. Verificar se não há espaços ou quebras de linha
# Deve ser uma linha contínua

# 3. Regenerar token na plataforma
# - Kommo: https://www.kommo.com/developers/
# - Meta: https://developers.facebook.com/

# 4. Atualizar .env e reiniciar servidor
```

---

### ❌ "Token expired"

**Causa:** Token de acesso expirou.

**Solução:**

```bash
# Para APIs OAuth (Kommo, Meta):
# 1. Use o refresh_token para obter novo access_token
# 2. Atualize o .env com o novo token
# 3. Reinicie o servidor

# Para APIs com keys (Anthropic, Google AI):
# 1. Regenere a key no console
# 2. Atualize o .env
# 3. Reinicie o servidor
```

---

### ❌ "Rate limit exceeded"

**Causa:** Muitas requisições para a API em pouco tempo.

**Soluções:**

```bash
# 1. Implementar cache com Redis
# 2. Reduzir frequência de chamadas
# 3. Implementar backoff exponencial
# 4. Verificar se há loops infinitos no código
```

---

## 6. Erros de Docker

### ❌ "Cannot connect to Docker daemon"

**Causa:** Docker não está rodando.

**Solução:**

```bash
# Iniciar Docker Desktop (macOS/Windows)
# ou
sudo systemctl start docker  # Linux
```

---

### ❌ "Port is already allocated"

**Causa:** Porta já está em uso no host.

**Soluções:**

```bash
# 1. Parar serviços locais
brew services stop postgresql
brew services stop redis

# 2. Ou mudar portas no docker-compose.yml
ports:
  - '8001:8000'  # Usar 8001 no host
```

---

### ❌ "No such file or directory: '.env'"

**Causa:** Arquivo `.env` não existe na raiz do projeto.

**Solução:**

```bash
# Criar .env na raiz (não na pasta backend)
cd ..  # Voltar para raiz
cp docs/env-example.txt .env
nano .env
```

---

### ❌ Container reiniciando constantemente

**Causa:** Erro na aplicação fazendo o container crashar.

**Soluções:**

```bash
# 1. Ver logs detalhados
docker-compose logs backend

# 2. Executar bash no container para debug
docker-compose run backend bash

# 3. Verificar variáveis de ambiente
docker-compose exec backend env | grep DATABASE_URL
```

---

## 7. Erros de Migrações

### ❌ "Target database is not up to date"

**Causa:** Migrações pendentes.

**Solução:**

```bash
# Aplicar todas as migrações
alembic upgrade head
```

---

### ❌ "Can't locate revision identified by 'X'"

**Causa:** Histórico de migrações inconsistente.

**Soluções:**

```bash
# 1. Ver histórico
alembic history

# 2. Ver versão atual
alembic current

# 3. Resetar para base e reaplicar
alembic downgrade base
alembic upgrade head

# 4. Se não funcionar, recriar banco
dropdb dashboard_clinica
createdb dashboard_clinica
alembic upgrade head
```

---

### ❌ "Multiple head revisions are present"

**Causa:** Branches no histórico de migrações.

**Solução:**

```bash
# Mesclar heads
alembic merge heads -m "merge heads"
alembic upgrade head
```

---

## 8. Erros de Permissões

### ❌ "Permission denied" ao criar venv

**Causa:** Sem permissão na pasta.

**Solução:**

```bash
# Verificar permissões
ls -la

# Ajustar permissões
chmod -R u+w .

# Ou criar venv em outro local
python3 -m venv ~/venvs/dashboard-backend
source ~/venvs/dashboard-backend/bin/activate
```

---

### ❌ "Permission denied" ao acessar PostgreSQL

**Causa:** Usuário sem privilégios.

**Solução:**

```bash
# Conceder todos os privilégios
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE dashboard_clinica TO dashboard;"

# Se necessário, tornar superuser
psql postgres -c "ALTER USER dashboard WITH SUPERUSER;"
```

---

## 🆘 Comandos de Diagnóstico

Use estes comandos para coletar informações ao pedir ajuda:

```bash
# Versões instaladas
python3 --version
psql --version
redis-cli --version
docker --version

# Status dos serviços
brew services list  # macOS
systemctl status postgresql redis  # Linux

# Portas em uso
lsof -i :8000
lsof -i :5432
lsof -i :6379

# Logs
# Backend local
tail -f nohup.out

# Docker
docker-compose logs --tail=100 backend

# PostgreSQL
tail -f /usr/local/var/log/postgres.log  # macOS
sudo journalctl -u postgresql -n 100  # Linux

# Redis
tail -f /usr/local/var/log/redis.log  # macOS
sudo journalctl -u redis -n 100  # Linux

# Variáveis de ambiente
cat .env

# Conexões no banco
psql dashboard_clinica -U dashboard -c "SELECT * FROM pg_stat_activity;"
```

---

## 🔄 Reset Completo (Último Recurso)

Se nada funcionar, use este procedimento para resetar tudo:

```bash
# ⚠️ ATENÇÃO: Isso apagará todos os dados!

# 1. Parar tudo
docker-compose down -v
brew services stop postgresql redis

# 2. Limpar Docker
docker system prune -a --volumes

# 3. Remover banco de dados
dropdb dashboard_clinica
psql postgres -c "DROP USER IF EXISTS dashboard;"

# 4. Remover venv
cd backend
deactivate
rm -rf venv

# 5. Limpar cache Python
find . -type d -name "__pycache__" -delete
find . -type f -name "*.pyc" -delete

# 6. Recriar tudo do zero
./setup.sh
```

---

## 📞 Onde Buscar Ajuda

Se o problema persistir:

1. **Documentação Oficial:**
   - FastAPI: https://fastapi.tiangolo.com
   - SQLAlchemy: https://docs.sqlalchemy.org
   - Alembic: https://alembic.sqlalchemy.org

2. **Comunidades:**
   - Stack Overflow
   - GitHub Issues dos projetos
   - Discord/Slack das tecnologias

3. **Logs Detalhados:**
   - Sempre inclua logs completos ao pedir ajuda
   - Use `--log-level debug` para mais detalhes

4. **Informações do Sistema:**
   - Sistema operacional e versão
   - Versões das dependências
   - Mensagem de erro completa

---

**💡 Dica:** Mantenha este guia aberto durante o desenvolvimento. A maioria dos problemas tem solução rápida aqui!

