from sqlalchemy import Column, Integer, String, DateTime, Float, Text, Date
from datetime import datetime
from app.database import Base


class InstagramMetrics(Base):
    __tablename__ = "instagram_metrics"
    __table_args__ = {"schema": "social"}
    
    id = Column(Integer, primary_key=True)
    data = Column(Date, nullable=False, unique=True)
    
    # Métricas de Conta
    seguidores = Column(Integer, default=0)
    seguindo = Column(Integer, default=0)
    total_posts = Column(Integer, default=0)
    
    # Métricas de Alcance
    alcance = Column(Integer, default=0)
    impressoes = Column(Integer, default=0)
    
    # Métricas de Engajamento
    curtidas_total = Column(Integer, default=0)
    comentarios_total = Column(Integer, default=0)
    compartilhamentos = Column(Integer, default=0)
    salvamentos = Column(Integer, default=0)
    
    # Taxa de Engajamento
    taxa_engajamento = Column(Float, default=0)
    
    # Perfil
    visitas_perfil = Column(Integer, default=0)
    cliques_site = Column(Integer, default=0)
    cliques_email = Column(Integer, default=0)
    cliques_telefone = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)


class InstagramPost(Base):
    __tablename__ = "instagram_posts"
    __table_args__ = {"schema": "social"}
    
    id = Column(Integer, primary_key=True)
    instagram_id = Column(String(100), unique=True, index=True)
    
    # Tipo de Post
    tipo = Column(String(50))  # IMAGE, VIDEO, CAROUSEL_ALBUM, REELS
    
    # Conteúdo
    legenda = Column(Text)
    url_midia = Column(String(500))
    permalink = Column(String(500))
    
    # Métricas
    curtidas = Column(Integer, default=0)
    comentarios = Column(Integer, default=0)
    compartilhamentos = Column(Integer, default=0)
    salvamentos = Column(Integer, default=0)
    alcance = Column(Integer, default=0)
    impressoes = Column(Integer, default=0)
    
    # Video específico
    visualizacoes = Column(Integer, default=0)
    
    # Engajamento
    taxa_engajamento = Column(Float, default=0)
    
    # Datas
    data_publicacao = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class InstagramStory(Base):
    __tablename__ = "instagram_stories"
    __table_args__ = {"schema": "social"}
    
    id = Column(Integer, primary_key=True)
    instagram_id = Column(String(100), unique=True, index=True)
    
    # Tipo
    tipo = Column(String(50))  # IMAGE, VIDEO
    
    # Mídia
    url_midia = Column(String(500))
    
    # Métricas
    impressoes = Column(Integer, default=0)
    alcance = Column(Integer, default=0)
    respostas = Column(Integer, default=0)
    taps_forward = Column(Integer, default=0)
    taps_back = Column(Integer, default=0)
    exits = Column(Integer, default=0)
    
    # Datas
    data_publicacao = Column(DateTime)
    data_expiracao = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)


class InstagramAudience(Base):
    __tablename__ = "instagram_audience"
    __table_args__ = {"schema": "social"}
    
    id = Column(Integer, primary_key=True)
    data = Column(Date, nullable=False, unique=True)
    
    # Dados demográficos (JSON)
    idade_genero = Column(Text)  # {"18-24": {"M": 10, "F": 15}, ...}
    cidades = Column(Text)  # {"São Paulo": 100, "Rio de Janeiro": 50, ...}
    paises = Column(Text)  # {"BR": 500, "PT": 50, ...}
    
    # Horários ativos (JSON)
    horarios_ativos = Column(Text)  # {"0": 50, "1": 30, ..., "23": 80}
    dias_ativos = Column(Text)  # {"monday": 100, "tuesday": 120, ...}
    
    created_at = Column(DateTime, default=datetime.utcnow)

