from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class PipelineType(enum.Enum):
    ATENDIMENTO_IA = "atendimento_ia"
    ATENDIMENTO_HUMANO = "atendimento_humano"
    DR_IGOR = "dr_igor"


class Pipeline(Base):
    __tablename__ = "pipelines"
    __table_args__ = {"schema": "crm"}
    
    id = Column(Integer, primary_key=True)
    kommo_id = Column(Integer, unique=True, index=True)
    nome = Column(String(255), nullable=False)
    tipo = Column(Enum(PipelineType), nullable=False)
    
    etapas = relationship("Etapa", back_populates="pipeline")
    leads = relationship("Lead", back_populates="pipeline")


class Etapa(Base):
    __tablename__ = "etapas"
    __table_args__ = {"schema": "crm"}
    
    id = Column(Integer, primary_key=True)
    kommo_id = Column(Integer, unique=True, index=True)
    pipeline_id = Column(Integer, ForeignKey("crm.pipelines.id"))
    nome = Column(String(255), nullable=False)
    ordem = Column(Integer, default=0)
    
    pipeline = relationship("Pipeline", back_populates="etapas")
    leads = relationship("Lead", back_populates="etapa")


class Lead(Base):
    __tablename__ = "leads"
    __table_args__ = {"schema": "crm"}
    
    id = Column(Integer, primary_key=True)
    kommo_id = Column(Integer, unique=True, index=True)
    pipeline_id = Column(Integer, ForeignKey("crm.pipelines.id"))
    etapa_id = Column(Integer, ForeignKey("crm.etapas.id"))
    
    # Dados do Lead
    nome = Column(String(255))
    telefone = Column(String(50))
    email = Column(String(255))
    
    # Origem e Rastreamento
    origem = Column(String(100))  # meta_ads, google_ads, organico, indicacao
    utm_source = Column(String(100))
    utm_medium = Column(String(100))
    utm_campaign = Column(String(255))
    utm_content = Column(String(255))
    
    # Valores
    valor_estimado = Column(Float, default=0)
    
    # Datas
    data_criacao = Column(DateTime, default=datetime.utcnow)
    data_atualizacao = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    data_conversao = Column(DateTime, nullable=True)
    
    # Relacionamentos
    pipeline = relationship("Pipeline", back_populates="leads")
    etapa = relationship("Etapa", back_populates="leads")
    interacoes = relationship("Interacao", back_populates="lead")


class Interacao(Base):
    __tablename__ = "interacoes"
    __table_args__ = {"schema": "crm"}
    
    id = Column(Integer, primary_key=True)
    lead_id = Column(Integer, ForeignKey("crm.leads.id"))
    
    tipo = Column(String(50))  # mensagem, ligacao, email, nota
    direcao = Column(String(20))  # entrada, saida
    conteudo = Column(Text)
    
    data_criacao = Column(DateTime, default=datetime.utcnow)
    
    lead = relationship("Lead", back_populates="interacoes")

