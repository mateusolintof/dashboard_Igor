from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from datetime import datetime
from app.database import get_db
from app.integrations.kommo import kommo_client

router = APIRouter()


@router.get("/")
async def get_leads(
    pipeline_id: Optional[int] = None,
    status_id: Optional[int] = None,
    origem: Optional[str] = None,
    query: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    limit: int = Query(default=50, le=100),
    page: int = 1,
    db: AsyncSession = Depends(get_db)
):
    """
    Lista leads do Kommo CRM com filtros opcionais
    """
    try:
        leads = await kommo_client.get_leads(
            page=page,
            limit=limit,
            pipeline_id=pipeline_id,
            status_id=status_id,
            query=query,
            filter_date_from=date_from,
            filter_date_to=date_to
        )
        
        return {
            "total": len(leads),
            "leads": leads,
            "limit": limit,
            "page": page
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pipelines")
async def get_pipelines(db: AsyncSession = Depends(get_db)):
    """
    Retorna todos os pipelines do Kommo
    """
    try:
        pipelines = await kommo_client.get_pipelines()
        return {"pipelines": pipelines}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/summary")
async def get_leads_summary(
    pipeline_id: Optional[int] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna resumo de leads para analytics
    """
    try:
        summary = await kommo_client.get_leads_summary(
            pipeline_id=pipeline_id,
            date_from=date_from,
            date_to=date_to
        )
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{lead_id}")
async def get_lead(lead_id: int, db: AsyncSession = Depends(get_db)):
    """
    Retorna detalhes de um lead específico
    """
    try:
        lead = await kommo_client.get_lead(lead_id)
        return lead
    except Exception as e:
        raise HTTPException(status_code=404, detail="Lead não encontrado")


@router.get("/{lead_id}/notes")
async def get_lead_notes(lead_id: int, db: AsyncSession = Depends(get_db)):
    """
    Retorna notas/histórico de um lead
    """
    try:
        notes = await kommo_client.get_lead_notes(lead_id)
        return {"notes": notes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
