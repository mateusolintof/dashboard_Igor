# Agentes IA - Clínica Dr. Igor

Aplicação independente de Agentes de IA para a Clínica Dr. Igor.

## 🚀 Funcionalidades

- **Gerador de Copies**: Cria copies otimizadas para anúncios e redes sociais usando Gemini
- **Analista de Campanhas**: Analisa performance de campanhas usando Claude
- **Histórico de Conversas**: Integração com chat history (em desenvolvimento)

## 🛠️ Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS v4
- **UI Components**: Shadcn/UI + Framer Motion
- **Backend**: Compartilhado com o Dashboard (FastAPI na porta 8000)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp env.example .env.local
```

## 🏃 Executando

```bash
# Desenvolvimento (porta 3001)
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm run start
```

## 🔗 Integração com Backend

Este app utiliza o mesmo backend do Dashboard principal. Certifique-se de que:

1. O backend está rodando na porta 8000
2. As variáveis de ambiente do backend estão configuradas:
   - `ANTHROPIC_API_KEY` - Para análises com Claude
   - `GOOGLE_AI_API_KEY` - Para geração de copies com Gemini

## 📁 Estrutura

```
agentes-ia/
├── src/
│   ├── app/
│   │   ├── globals.css    # Estilos e variáveis CSS
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Página de Agentes IA
│   ├── components/
│   │   ├── providers/     # Query Provider
│   │   └── ui/            # Componentes Shadcn
│   └── lib/
│       ├── api.ts         # Cliente API
│       └── utils.ts       # Utilitários
├── package.json
└── README.md
```

## 🎨 Design

O app usa um tema dark moderno com gradientes em roxo/magenta, diferente do dashboard principal para criar uma identidade visual única para a ferramenta de IA.

## 📝 Notas

- Roda na porta **3001** para não conflitar com o dashboard (porta 3000)
- Usa o mesmo backend/API do dashboard principal
- Tema escuro por padrão para uma experiência focada
