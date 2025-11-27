# 🎯 COMECE AQUI - Dashboard Clínica Dr. Igor

**Bem-vindo ao projeto!** Este é seu ponto de partida.

---

## 🚀 Início Ultra-Rápido (3 minutos)

```bash
# 1. Clone o projeto (se ainda não fez)
git clone https://github.com/mateusolintof/dashboard_Igor.git
cd dashboard-igor

# 2. Configure o backend
cd backend && ./setup.sh

# 3. Inicie o servidor
source venv/bin/activate
uvicorn app.main:app --reload
```

✅ **Pronto!** Acesse: http://localhost:8000/docs

---

## 📚 Documentação Completa

Temos **11 guias** para você:

### 🟢 Para Iniciantes

| Guia | O que é | Tempo |
|------|---------|-------|
| **[backend/INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md)** | Setup rápido com 3 opções | 5 min |
| **[backend/CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md)** | Checklist visual passo a passo | 15 min |
| **[backend/GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md)** | Guia completo e detalhado | 30 min |

### 🟡 Para Desenvolvimento

| Guia | O que é |
|------|---------|
| **[backend/README.md](./backend/README.md)** | Visão geral do backend |
| **[backend/COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md)** | Comandos para uso diário |
| **[CLAUDE.md](./CLAUDE.md)** | Convenções e arquitetura |

### 🔴 Para Suporte

| Guia | O que é |
|------|---------|
| **[backend/TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md)** | Soluções para problemas |
| **[backend/FLUXO_CONFIGURACAO.md](./backend/FLUXO_CONFIGURACAO.md)** | Fluxogramas visuais |
| **[backend/RESUMO_EXECUTIVO.md](./backend/RESUMO_EXECUTIVO.md)** | Resumo para impressão |

### 🗺️ Índices

| Guia | O que é |
|------|---------|
| **[GUIA_NAVEGACAO.md](./GUIA_NAVEGACAO.md)** | Índice completo do projeto |
| **[SUMARIO_DOCUMENTACAO.md](./SUMARIO_DOCUMENTACAO.md)** | Sumário da documentação |
| **[backend/INDICE.md](./backend/INDICE.md)** | Índice do backend |

---

## 🎯 Escolha Seu Caminho

### Caminho 1: Quero Rapidez ⚡ (5 minutos)

```
1. Leia: backend/INICIO_RAPIDO.md
2. Execute: backend/setup.sh
3. Pronto!
```

### Caminho 2: Quero Entender 📖 (30 minutos)

```
1. Leia: README.md (raiz)
2. Leia: backend/GUIA_CONFIGURACAO_BACKEND.md
3. Execute: backend/setup.sh
4. Valide: backend/CHECKLIST_SETUP.md
```

### Caminho 3: Quero Acompanhar ✅ (15 minutos)

```
1. Abra: backend/CHECKLIST_SETUP.md
2. Siga: passo a passo
3. Marque: cada item concluído
```

---

## 🆘 Precisa de Ajuda?

### Está com erro?

👉 **[backend/TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md)**

### Está perdido?

👉 **[GUIA_NAVEGACAO.md](./GUIA_NAVEGACAO.md)**

### Quer comandos rápidos?

👉 **[backend/COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md)**

### Quer resumo?

👉 **[backend/RESUMO_EXECUTIVO.md](./backend/RESUMO_EXECUTIVO.md)**

---

## 📊 Visão Geral do Projeto

### O que é?

Dashboard analítico para clínica médica com:
- 📊 KPIs em tempo real
- 👥 Gestão de leads (Kommo CRM)
- 📈 Analytics de campanhas (Meta Ads, Google Ads)
- 📱 Métricas do Instagram
- 🤖 Agentes de IA (Claude, Gemini)

### Tecnologias

**Frontend:** Next.js 14 + TypeScript + Tailwind + Shadcn/UI  
**Backend:** FastAPI + PostgreSQL + Redis + SQLAlchemy  
**IA:** Claude (Anthropic) + Gemini (Google)

---

## 🔑 Pré-requisitos

Antes de começar, instale:

- ✅ **Python 3.11+** ([Download](https://www.python.org/downloads/))
- ✅ **PostgreSQL 16+** ([Download](https://www.postgresql.org/download/))
- ✅ **Redis 7+** ([Download](https://redis.io/download))
- ✅ **Node.js 18+** ([Download](https://nodejs.org/)) - Para o frontend

**Ou use Docker:**
- ✅ **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))

---

## 🎓 Próximos Passos

Depois de configurar o backend:

1. ✅ **Configure o frontend** (veja `frontend/README.md`)
2. ✅ **Teste as integrações** (Kommo, Meta Ads, Instagram)
3. ✅ **Configure as credenciais das APIs**
4. ✅ **Comece a desenvolver!**

---

## 💡 Dicas Importantes

### Marque nos Favoritos

- 📌 [GUIA_NAVEGACAO.md](./GUIA_NAVEGACAO.md) - Para encontrar qualquer coisa
- 📌 [backend/COMANDOS_UTEIS.md](./backend/COMANDOS_UTEIS.md) - Para uso diário
- 📌 [backend/TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md) - Para problemas

### Imprima

- 🖨️ [backend/RESUMO_EXECUTIVO.md](./backend/RESUMO_EXECUTIVO.md) - Referência rápida
- 🖨️ [backend/FLUXO_CONFIGURACAO.md](./backend/FLUXO_CONFIGURACAO.md) - Fluxogramas

### Configure Aliases

```bash
# Adicione ao ~/.bashrc ou ~/.zshrc
alias backend-start="cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
alias backend-docs="open http://localhost:8000/docs"
alias frontend-start="cd frontend && npm run dev"
```

---

## 🎉 Tudo Pronto?

Quando o backend estiver rodando:

- ✅ Acesse a documentação: http://localhost:8000/docs
- ✅ Teste o health check: http://localhost:8000/health
- ✅ Configure o frontend
- ✅ Comece a desenvolver!

---

## 📞 Suporte

### Ordem de Consulta

1. **Busque aqui:** [GUIA_NAVEGACAO.md](./GUIA_NAVEGACAO.md)
2. **Problemas:** [backend/TROUBLESHOOTING.md](./backend/TROUBLESHOOTING.md)
3. **Documentação oficial:** Links nos guias
4. **Comunidade:** Stack Overflow

---

## 🗺️ Mapa da Documentação

```
COMECE_AQUI.md (você está aqui)
    │
    ├─── Iniciante? ──────────────────┐
    │                                 │
    │                                 ▼
    │                    backend/INICIO_RAPIDO.md
    │                                 │
    │                                 ▼
    │                    backend/CHECKLIST_SETUP.md
    │                                 │
    │                                 ▼
    │                    backend/GUIA_CONFIGURACAO_BACKEND.md
    │
    ├─── Desenvolvedor? ──────────────┐
    │                                 │
    │                                 ▼
    │                    backend/COMANDOS_UTEIS.md
    │                                 │
    │                                 ▼
    │                    backend/README.md
    │
    ├─── Problema? ───────────────────┐
    │                                 │
    │                                 ▼
    │                    backend/TROUBLESHOOTING.md
    │
    └─── Perdido? ────────────────────┐
                                      │
                                      ▼
                         GUIA_NAVEGACAO.md
```

---

## 📋 Checklist Rápido

Antes de começar a desenvolver, certifique-se:

- [ ] Python 3.11+ instalado
- [ ] PostgreSQL rodando
- [ ] Redis rodando
- [ ] Repositório clonado
- [ ] Backend configurado
- [ ] Servidor iniciado
- [ ] Documentação acessível (http://localhost:8000/docs)
- [ ] Health check OK (http://localhost:8000/health)

---

## 🎯 Seu Próximo Passo

**Escolha agora:**

1. **[backend/INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md)** - Se quer rapidez
2. **[backend/CHECKLIST_SETUP.md](./backend/CHECKLIST_SETUP.md)** - Se quer acompanhar
3. **[backend/GUIA_CONFIGURACAO_BACKEND.md](./backend/GUIA_CONFIGURACAO_BACKEND.md)** - Se quer entender

---

**🚀 Boa sorte e bom desenvolvimento!**

---

**Versão:** 1.0  
**Última atualização:** Novembro 2024  
**Documentos disponíveis:** 11

