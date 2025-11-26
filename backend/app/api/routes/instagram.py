from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from datetime import datetime, timedelta
from app.database import get_db
from app.integrations.instagram_api import instagram_client

router = APIRouter()


@router.get("/profile")
async def get_instagram_profile(db: AsyncSession = Depends(get_db)):
    """
    Retorna informações do perfil do Instagram Business
    """
    try:
        profile = await instagram_client.get_profile()
        return profile
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/metrics")
async def get_instagram_metrics(
    periodo: str = "30d",
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna métricas resumidas do Instagram
    """
    try:
        metrics = await instagram_client.get_summary_metrics()
        return {
            "periodo": periodo,
            **metrics
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/insights")
async def get_instagram_insights(
    period: str = "day",
    days: int = 7,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna insights do perfil para um período
    """
    try:
        now = datetime.now()
        since = now - timedelta(days=days)
        
        insights = await instagram_client.get_profile_insights(
            period=period,
            since=since,
            until=now
        )
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/posts")
async def get_instagram_posts(
    limit: int = 20,
    after: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna últimos posts do Instagram
    """
    try:
        result = await instagram_client.get_media(limit=limit, after=after)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/posts/{post_id}/insights")
async def get_post_insights(
    post_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna insights de um post específico
    """
    try:
        insights = await instagram_client.get_media_insights(post_id)
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stories")
async def get_instagram_stories(db: AsyncSession = Depends(get_db)):
    """
    Retorna stories ativos
    """
    try:
        stories = await instagram_client.get_stories()
        return {"stories": stories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stories/{story_id}/insights")
async def get_story_insights(
    story_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna insights de um story
    """
    try:
        insights = await instagram_client.get_story_insights(story_id)
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/audience")
async def get_instagram_audience(db: AsyncSession = Depends(get_db)):
    """
    Retorna dados demográficos da audiência
    """
    try:
        demographics = await instagram_client.get_audience_demographics()
        return demographics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/engagement-rate")
async def get_engagement_rate(db: AsyncSession = Depends(get_db)):
    """
    Calcula e retorna taxa de engajamento
    """
    try:
        rate = await instagram_client.get_engagement_rate()
        return {"engagement_rate": rate}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/hashtag/{hashtag}")
async def search_hashtag(
    hashtag: str,
    edge: str = "top_media",
    db: AsyncSession = Depends(get_db)
):
    """
    Busca posts de uma hashtag
    """
    try:
        hashtag_id = await instagram_client.search_hashtag(hashtag)
        if not hashtag_id:
            raise HTTPException(status_code=404, detail="Hashtag não encontrada")
        
        posts = await instagram_client.get_hashtag_media(hashtag_id, edge)
        return {"hashtag": hashtag, "posts": posts}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
