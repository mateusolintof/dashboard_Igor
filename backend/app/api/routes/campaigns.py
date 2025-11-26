from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from datetime import datetime
from app.database import get_db
from app.integrations.meta_ads import meta_ads_client

router = APIRouter()


@router.get("/")
async def get_campaigns(
    plataforma: Optional[str] = None,
    status: Optional[List[str]] = Query(default=None),
    date_preset: str = "last_30d",
    limit: int = Query(default=50, le=100),
    offset: int = 0,
    db: AsyncSession = Depends(get_db)
):
    """
    Lista campanhas de Meta Ads
    """
    try:
        campaigns = await meta_ads_client.get_campaigns(
            status=status,
            date_preset=date_preset
        )
        
        return {
            "total": len(campaigns),
            "campaigns": campaigns,
            "limit": limit,
            "offset": offset
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/meta")
async def get_meta_campaigns(
    date_preset: str = "last_30d",
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna campanhas do Meta Ads
    """
    try:
        campaigns = await meta_ads_client.get_campaigns(date_preset=date_preset)
        return {"campaigns": campaigns}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/meta/{campaign_id}/insights")
async def get_campaign_insights(
    campaign_id: str,
    date_preset: str = "last_30d",
    breakdown: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna insights de uma campanha específica
    """
    try:
        insights = await meta_ads_client.get_campaign_insights(
            campaign_id=campaign_id,
            date_preset=date_preset,
            breakdown=breakdown
        )
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/adsets")
async def get_ad_sets(
    campaign_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna conjuntos de anúncios
    """
    try:
        adsets = await meta_ads_client.get_ad_sets(campaign_id=campaign_id)
        return {"adsets": adsets}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/ads")
async def get_ads(
    ad_set_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna anúncios
    """
    try:
        ads = await meta_ads_client.get_ads(ad_set_id=ad_set_id)
        return {"ads": ads}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_campaign_stats(
    periodo: str = "last_30d",
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna estatísticas agregadas de campanhas
    """
    try:
        summary = await meta_ads_client.get_performance_summary(date_preset=periodo)
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/daily-insights")
async def get_daily_insights(
    date_start: datetime,
    date_end: datetime,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna insights diários para um período específico
    """
    try:
        insights = await meta_ads_client.get_daily_insights(
            date_start=date_start,
            date_end=date_end
        )
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/lead-forms")
async def get_lead_forms(db: AsyncSession = Depends(get_db)):
    """
    Retorna formulários de lead do Meta
    """
    try:
        forms = await meta_ads_client.get_lead_forms()
        return {"forms": forms}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
