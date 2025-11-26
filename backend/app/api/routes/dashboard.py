from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

router = APIRouter()


@router.get("/overview")
async def get_overview(db: AsyncSession = Depends(get_db)):
    """
    Retorna visão geral do dashboard com KPIs principais
    """
    # TODO: Implementar lógica de agregação de dados
    return {
        "total_leads": 0,
        "leads_mes": 0,
        "taxa_conversao": 0,
        "consultas_agendadas": 0,
        "receita_estimada": 0
    }


@router.get("/kpis")
async def get_kpis(periodo: str = "30d", db: AsyncSession = Depends(get_db)):
    """
    Retorna KPIs detalhados do período especificado
    """
    return {
        "periodo": periodo,
        "novos_leads": 0,
        "leads_convertidos": 0,
        "taxa_conversao": 0,
        "custo_por_lead": 0,
        "roi": 0
    }

