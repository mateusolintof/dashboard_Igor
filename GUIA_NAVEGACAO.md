# 🗺️ Guia de Navegação - Dashboard Clínica Dr. Igor

Índice completo da documentação do projeto.

---

## 🚀 Começando

### Para Desenvolvedores Iniciantes

1. **[backend/INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md)** ⚡
   - Configuração em 5 minutos
   - Guia ultra-resumido

2. **[backend/CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md)** ✅
   - Checklist visual passo a passo
   - Acompanhe seu progresso

3. **[backend/GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md)** 📖
   - Guia completo e detalhado
   - Todas as opções explicadas

### Para Desenvolvedores Experientes

1. **[backend/README.md](./backend/README.md)** 📄
   - Visão geral do backend
   - Arquitetura e stack

2. **[backend/COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md)** 📝
   - Referência rápida de comandos
   - Uso diário

3. **[CLAUDE.md](./CLAUDE.md)** 🤖
   - Instruções para assistentes de IA
   - Convenções de código

---

## 📚 Documentação por Categoria

### 🏗️ Backend

| Documento | Descrição | Nível |
|-----------|-----------|-------|
| [INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md) | Setup em 5 minutos | Iniciante |
| [CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md) | Checklist visual | Iniciante |
| [GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md) | Guia completo | Iniciante/Intermediário |
| [README.md](./backend/README.md) | Visão geral | Todos |
| [COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) | Referência de comandos | Intermediário |
| [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) | Solução de problemas | Todos |

### 🎨 Frontend

| Documento | Descrição |
|-----------|-----------|
| [frontend/README.md](./frontend/README.md) | Documentação do frontend |
| [frontend/env.example](./frontend/env.example) | Variáveis de ambiente |

### 🐳 Docker

| Documento | Descrição |
|-----------|-----------|
| [docker-compose.yml](./docker-compose.yml) | Configuração dos serviços |
| [docker/backend.Dockerfile](./docker/backend.Dockerfile) | Dockerfile do backend |
| [docker/frontend.Dockerfile](./docker/frontend.Dockerfile) | Dockerfile do frontend |

### 📋 Geral

| Documento | Descrição |
|-----------|-----------|
| [README.md](./README.md) | Visão geral do projeto |
| [CLAUDE.md](./CLAUDE.md) | Instruções para IA |
| [docs/env-example.txt](./docs/env-example.txt) | Exemplo de variáveis |
| [docs/README.md](./docs/README.md) | Documentação adicional |

---

## 🎯 Fluxo de Trabalho Recomendado

### 1️⃣ Primeira Vez no Projeto

```
1. Leia: README.md (raiz)
2. Siga: backend/INICIO_RAPIDO.md
3. Use: backend/CHECKLIST_SETUP.md
4. Configure: frontend/README.md
5. Teste: Acesse http://localhost:3000
```

### 2️⃣ Desenvolvimento Diário

```
1. Consulte: backend/COMANDOS_UTEIS.md
2. Referência: CLAUDE.md (convenções)
3. Problemas: backend/TROUBLESHOOTING.md
```

### 3️⃣ Adicionando Features

```
1. Arquitetura: backend/README.md
2. Convenções: CLAUDE.md
3. Exemplos: Código existente em app/
```

---

## 🔍 Busca Rápida

### "Como faço para..."

| Pergunta | Documento |
|----------|-----------|
| ...configurar o backend pela primeira vez? | [INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md) |
| ...resolver erro de conexão com banco? | [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) |
| ...executar migrações? | [COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) |
| ...adicionar nova integração? | [CLAUDE.md](./CLAUDE.md) |
| ...usar Docker? | [GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md) |
| ...obter credenciais das APIs? | [GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md) |
| ...adicionar novo endpoint? | [CLAUDE.md](./CLAUDE.md) |
| ...criar nova migração? | [COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) |

### "Estou com erro..."

| Erro | Documento |
|------|-----------|
| ModuleNotFoundError | [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) |
| Connection refused | [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) |
| Port already in use | [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) |
| Migration failed | [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) |
| CORS error | [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) |
| Invalid API key | [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) |

---

## 📊 Estrutura do Projeto

```
dashboard-clinica/
│
├── 📄 README.md                    # Visão geral do projeto
├── 📄 CLAUDE.md                    # Instruções para IA
├── 📄 GUIA_NAVEGACAO.md           # Este arquivo
│
├── 📁 backend/                     # Backend FastAPI
│   ├── 📄 README.md               # Visão geral do backend
│   ├── ⚡ INICIO_RAPIDO.md        # Setup rápido
│   ├── ✅ CHECKLIST_SETUP.md      # Checklist visual
│   ├── 📖 GUIA_CONFIGURACAO_BACKEND.md  # Guia completo
│   ├── 📝 COMANDOS_UTEIS.md       # Comandos úteis
│   ├── 🔧 TROUBLESHOOTING.md      # Solução de problemas
│   ├── 🔨 setup.sh                # Script de setup
│   ├── 📦 requirements.txt        # Dependências Python
│   ├── ⚙️ .env                    # Variáveis (criar)
│   └── 📁 app/                    # Código da aplicação
│       ├── main.py                # Aplicação FastAPI
│       ├── config.py              # Configurações
│       ├── database.py            # Setup do banco
│       ├── 📁 api/routes/         # Endpoints
│       ├── 📁 models/             # Models SQLAlchemy
│       ├── 📁 schemas/            # Schemas Pydantic
│       ├── 📁 services/           # Lógica de negócio
│       ├── 📁 integrations/       # APIs externas
│       ├── 📁 agents/             # Agentes de IA
│       └── 📁 tasks/              # Tarefas Celery
│
├── 📁 frontend/                    # Frontend Next.js
│   ├── 📄 README.md               # Documentação frontend
│   ├── 📦 package.json            # Dependências Node
│   ├── ⚙️ .env.local              # Variáveis (criar)
│   └── 📁 src/                    # Código da aplicação
│       ├── 📁 app/                # Next.js App Router
│       ├── 📁 components/         # Componentes React
│       ├── 📁 lib/                # Utilitários
│       └── 📁 store/              # Estado global
│
├── 📁 docs/                        # Documentação adicional
│   ├── 📄 README.md               # Docs gerais
│   └── 📄 env-example.txt         # Exemplo de .env
│
├── 📁 docker/                      # Dockerfiles
│   ├── backend.Dockerfile
│   └── frontend.Dockerfile
│
└── 🐳 docker-compose.yml          # Orquestração Docker
```

---

## 🎓 Níveis de Conhecimento

### 🟢 Iniciante

Comece por aqui se é sua primeira vez:

1. [README.md](./README.md) - Visão geral
2. [backend/INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md) - Setup rápido
3. [backend/CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md) - Passo a passo

### 🟡 Intermediário

Já configurou e quer desenvolver:

1. [backend/README.md](./backend/README.md) - Arquitetura
2. [backend/COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) - Comandos
3. [CLAUDE.md](./CLAUDE.md) - Convenções

### 🔴 Avançado

Conhece o projeto e quer otimizar:

1. [CLAUDE.md](./CLAUDE.md) - Arquitetura completa
2. Código fonte em `backend/app/`
3. [backend/COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) - Otimizações

---

## 🛠️ Por Tarefa

### Configuração Inicial

```
1. backend/INICIO_RAPIDO.md
2. backend/CHECKLIST_SETUP.md
3. frontend/README.md
```

### Desenvolvimento

```
1. CLAUDE.md (convenções)
2. backend/COMANDOS_UTEIS.md (comandos)
3. backend/README.md (arquitetura)
```

### Troubleshooting

```
1. backend/TROUBLESHOOTING.md
2. backend/COMANDOS_UTEIS.md (diagnóstico)
3. Issues no GitHub
```

### Deploy

```
1. backend/GUIA_CONFIGURACAO_BACKEND.md (seção Deploy)
2. docker-compose.yml
3. Variáveis de produção
```

---

## 🔗 Links Externos Úteis

### Documentação Oficial

- **FastAPI:** https://fastapi.tiangolo.com
- **Next.js:** https://nextjs.org/docs
- **SQLAlchemy:** https://docs.sqlalchemy.org
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Shadcn/UI:** https://ui.shadcn.com

### APIs Integradas

- **Kommo API:** https://www.kommo.com/developers/api/
- **Meta Marketing API:** https://developers.facebook.com/docs/marketing-apis/
- **Instagram Graph API:** https://developers.facebook.com/docs/instagram-api/
- **Anthropic Claude:** https://docs.anthropic.com/
- **Google AI:** https://ai.google.dev/docs

---

## 📞 Suporte

### Ordem de Consulta

1. **Busque neste guia** - Provavelmente tem a resposta
2. **[TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md)** - Problemas comuns
3. **Documentação oficial** - Links acima
4. **Stack Overflow** - Comunidade
5. **Issues do GitHub** - Reporte bugs

---

## 💡 Dicas

### Para Novos Desenvolvedores

- ✅ Siga o [CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md) linha por linha
- ✅ Não pule etapas do guia
- ✅ Teste cada passo antes de prosseguir
- ✅ Mantenha o [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) aberto

### Para Desenvolvedores Experientes

- ✅ Use [COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) como referência
- ✅ Consulte [CLAUDE.md](./CLAUDE.md) para convenções
- ✅ Explore o código em `backend/app/`
- ✅ Configure aliases no shell

### Para Todos

- ✅ Mantenha a documentação atualizada
- ✅ Documente problemas novos no TROUBLESHOOTING
- ✅ Compartilhe soluções com o time
- ✅ Faça backup do `.env`

---

## 🗂️ Índice Alfabético

- [CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md) - Checklist de configuração
- [CLAUDE.md](./CLAUDE.md) - Instruções para IA
- [COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) - Comandos úteis
- [docker-compose.yml](./docker-compose.yml) - Docker Compose
- [env-example.txt](./docs/env-example.txt) - Exemplo de variáveis
- [GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md) - Guia completo
- [GUIA_NAVEGACAO.md](./GUIA_NAVEGACAO.md) - Este arquivo
- [INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md) - Setup rápido
- [README.md](./README.md) - Visão geral do projeto
- [README.md (backend)](./backend/README.md) - Visão geral do backend
- [README.md (frontend)](./frontend/README.md) - Visão geral do frontend
- [TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) - Solução de problemas

---

**📌 Marque esta página nos favoritos para acesso rápido à documentação!**

**🎯 Sugestão:** Comece pelo [INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md) se é sua primeira vez!

