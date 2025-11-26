from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional, List
from app.database import get_db
from app.agents.campaign_analyst import campaign_analyst, copywriter

router = APIRouter()


class CampaignAnalysisRequest(BaseModel):
    campaign_data: dict
    metrics: Optional[List[str]] = None
    context: Optional[str] = None


class CampaignComparisonRequest(BaseModel):
    campaigns: List[dict]


class CopyGenerationRequest(BaseModel):
    objetivo: str
    publico_alvo: str
    tom_voz: str = "profissional"
    palavras_chave: Optional[List[str]] = None
    plataforma: str = "instagram"
    num_variacoes: int = 3


class CardGenerationRequest(BaseModel):
    titulo: str
    subtitulo: Optional[str] = None
    estilo: str = "moderno"
    cores: Optional[List[str]] = None


@router.post("/campaign-analysis")
async def analyze_campaign(
    request: CampaignAnalysisRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Analisa performance de campanhas usando IA
    """
    try:
        result = await campaign_analyst.analyze_campaign(
            campaign_data=request.campaign_data,
            metrics=request.metrics,
            context=request.context
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare-campaigns")
async def compare_campaigns(
    request: CampaignComparisonRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Compara múltiplas campanhas usando IA
    """
    try:
        result = await campaign_analyst.compare_campaigns(request.campaigns)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate-copy")
async def generate_copy(
    request: CopyGenerationRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Gera copies para anúncios e posts usando IA
    """
    try:
        result = await copywriter.generate_copies(
            objetivo=request.objetivo,
            publico_alvo=request.publico_alvo,
            tom_voz=request.tom_voz,
            palavras_chave=request.palavras_chave,
            plataforma=request.plataforma,
            num_variacoes=request.num_variacoes
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate-card")
async def generate_card(
    request: CardGenerationRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Gera cards/imagens para redes sociais
    TODO: Implementar geração de imagem com DALL-E ou similar
    """
    return {
        "message": "Funcionalidade de geração de cards em desenvolvimento",
        "titulo": request.titulo,
        "subtitulo": request.subtitulo,
        "estilo": request.estilo
    }


@router.get("/chat-history")
async def get_chat_history(
    lead_id: Optional[int] = None,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna histórico de conversas dos agentes IA
    Integração com n8n_chat_history
    """
    # TODO: Implementar conexão com banco n8n_chat_history
    return {
        "conversations": [],
        "message": "Integração com chat history em desenvolvimento"
    }
