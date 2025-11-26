from sqlalchemy import Column, Integer, String, DateTime, Float, Enum, Text, Date
from datetime import datetime
import enum
from app.database import Base


class PlataformaAds(enum.Enum):
    META = "meta"
    GOOGLE = "google"


class StatusCampanha(enum.Enum):
    ATIVA = "ativa"
    PAUSADA = "pausada"
    ARQUIVADA = "arquivada"


class Campanha(Base):
    __tablename__ = "campanhas"
    __table_args__ = {"schema": "marketing"}
    
    id = Column(Integer, primary_key=True)
    plataforma_id = Column(String(100), unique=True, index=True)  # ID da plataforma (Meta/Google)
    plataforma = Column(Enum(PlataformaAds), nullable=False)
    
    nome = Column(String(255), nullable=False)
    status = Column(Enum(StatusCampanha), default=StatusCampanha.ATIVA)
    objetivo = Column(String(100))  # CONVERSIONS, TRAFFIC, AWARENESS, etc.
    
    # Orçamento
    orcamento_diario = Column(Float, default=0)
    orcamento_total = Column(Float, default=0)
    
    # Datas
    data_inicio = Column(Date)
    data_fim = Column(Date, nullable=True)
    data_criacao = Column(DateTime, default=datetime.utcnow)
    data_atualizacao = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class MetricaCampanha(Base):
    __tablename__ = "metricas_campanhas"
    __table_args__ = {"schema": "marketing"}
    
    id = Column(Integer, primary_key=True)
    campanha_id = Column(Integer, index=True)
    data = Column(Date, nullable=False)
    
    # Métricas de Alcance
    impressoes = Column(Integer, default=0)
    alcance = Column(Integer, default=0)
    frequencia = Column(Float, default=0)
    
    # Métricas de Engajamento
    cliques = Column(Integer, default=0)
    ctr = Column(Float, default=0)
    
    # Métricas de Custo
    investimento = Column(Float, default=0)
    cpc = Column(Float, default=0)
    cpm = Column(Float, default=0)
    
    # Métricas de Conversão
    conversoes = Column(Integer, default=0)
    custo_por_conversao = Column(Float, default=0)
    leads_gerados = Column(Integer, default=0)
    custo_por_lead = Column(Float, default=0)
    
    # Timestamp
    created_at = Column(DateTime, default=datetime.utcnow)


class AnuncioSet(Base):
    __tablename__ = "anuncio_sets"
    __table_args__ = {"schema": "marketing"}
    
    id = Column(Integer, primary_key=True)
    plataforma_id = Column(String(100), unique=True, index=True)
    campanha_id = Column(Integer, index=True)
    
    nome = Column(String(255))
    status = Column(String(50))
    
    # Segmentação
    idade_min = Column(Integer)
    idade_max = Column(Integer)
    genero = Column(String(50))
    localizacao = Column(Text)  # JSON com localizações
    interesses = Column(Text)  # JSON com interesses
    
    # Orçamento
    orcamento_diario = Column(Float, default=0)
    
    data_criacao = Column(DateTime, default=datetime.utcnow)


class Anuncio(Base):
    __tablename__ = "anuncios"
    __table_args__ = {"schema": "marketing"}
    
    id = Column(Integer, primary_key=True)
    plataforma_id = Column(String(100), unique=True, index=True)
    anuncio_set_id = Column(Integer, index=True)
    
    nome = Column(String(255))
    status = Column(String(50))
    
    # Criativo
    titulo = Column(String(255))
    descricao = Column(Text)
    call_to_action = Column(String(100))
    url_destino = Column(String(500))
    
    # Mídia
    tipo_midia = Column(String(50))  # imagem, video, carrossel
    url_midia = Column(String(500))
    
    data_criacao = Column(DateTime, default=datetime.utcnow)

