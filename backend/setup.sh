#!/bin/bash

# Script de configuração automática do backend
# Dashboard Clínica Dr. Igor

set -e  # Parar em caso de erro

echo "🚀 Iniciando configuração do backend..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para print colorido
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "ℹ️  $1"
}

# Verificar se está na pasta backend
if [ ! -f "requirements.txt" ]; then
    print_error "Execute este script da pasta backend!"
    exit 1
fi

# 1. Verificar Python
print_info "Verificando Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    print_success "Python $PYTHON_VERSION encontrado"
else
    print_error "Python 3 não encontrado. Instale Python 3.11+"
    exit 1
fi

# 2. Criar ambiente virtual
print_info "Configurando ambiente virtual..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    print_success "Ambiente virtual criado"
else
    print_warning "Ambiente virtual já existe"
fi

# 3. Ativar venv e instalar dependências
print_info "Instalando dependências..."
source venv/bin/activate
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet
print_success "Dependências instaladas"

# 4. Verificar arquivo .env
print_info "Verificando arquivo .env..."
if [ ! -f ".env" ]; then
    if [ -f "../docs/env-example.txt" ]; then
        cp ../docs/env-example.txt .env
        print_warning "Arquivo .env criado a partir do exemplo"
        print_warning "IMPORTANTE: Edite o arquivo .env com suas credenciais!"
        echo ""
        read -p "Pressione Enter para abrir o .env no editor padrão..."
        ${EDITOR:-nano} .env
    else
        print_error "Arquivo env-example.txt não encontrado"
        exit 1
    fi
else
    print_success "Arquivo .env já existe"
fi

# 5. Verificar PostgreSQL
print_info "Verificando PostgreSQL..."
if command -v psql &> /dev/null; then
    print_success "PostgreSQL encontrado"
    
    # Perguntar se quer criar o banco
    echo ""
    read -p "Deseja criar o banco de dados agora? (s/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        print_info "Criando banco de dados..."
        
        # Extrair credenciais do .env (simplificado)
        DB_NAME="dashboard_clinica"
        DB_USER="dashboard"
        DB_PASS="dashboard_password"
        
        # Criar banco
        psql postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || print_warning "Banco já existe"
        psql postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || print_warning "Usuário já existe"
        psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null
        
        print_success "Banco de dados configurado"
    fi
else
    print_warning "PostgreSQL não encontrado. Instale ou use Docker"
fi

# 6. Verificar Redis
print_info "Verificando Redis..."
if command -v redis-cli &> /dev/null; then
    if redis-cli ping &> /dev/null; then
        print_success "Redis está rodando"
    else
        print_warning "Redis instalado mas não está rodando"
        echo "Execute: brew services start redis (macOS) ou sudo systemctl start redis (Linux)"
    fi
else
    print_warning "Redis não encontrado. Instale ou use Docker"
fi

# 7. Executar migrações
echo ""
read -p "Deseja executar as migrações do banco agora? (s/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    print_info "Executando migrações..."
    alembic upgrade head
    print_success "Migrações executadas"
fi

# 8. Resumo final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Configuração concluída!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_info "Próximos passos:"
echo "1. Edite o arquivo .env com suas credenciais reais"
echo "2. Inicie o servidor: uvicorn app.main:app --reload"
echo "3. Acesse a documentação: http://localhost:8000/docs"
echo ""
print_warning "Lembre-se de ativar o ambiente virtual:"
echo "source venv/bin/activate"
echo ""

