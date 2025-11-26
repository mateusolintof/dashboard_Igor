"""
Integração com Kommo CRM (antigo amoCRM)
Documentação: https://www.kommo.com/developers/api/
"""

import httpx
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.config import get_settings

settings = get_settings()


class KommoClient:
    """Cliente para API do Kommo CRM"""
    
    def __init__(self):
        self.base_url = f"https://{settings.KOMMO_DOMAIN}/api/v4"
        self.access_token = settings.KOMMO_ACCESS_TOKEN
        self.refresh_token = settings.KOMMO_REFRESH_TOKEN
        self.client_id = settings.KOMMO_CLIENT_ID
        self.client_secret = settings.KOMMO_CLIENT_SECRET
    
    @property
    def headers(self) -> Dict[str, str]:
        return {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
    
    async def _make_request(
        self, 
        method: str, 
        endpoint: str, 
        params: Optional[Dict] = None,
        json_data: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Faz requisição para a API do Kommo"""
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url}/{endpoint}"
            response = await client.request(
                method=method,
                url=url,
                headers=self.headers,
                params=params,
                json=json_data,
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    
    async def refresh_access_token(self) -> Dict[str, str]:
        """Atualiza o access token usando o refresh token"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://{settings.KOMMO_DOMAIN}/oauth2/access_token",
                json={
                    "client_id": self.client_id,
                    "client_secret": self.client_secret,
                    "grant_type": "refresh_token",
                    "refresh_token": self.refresh_token,
                    "redirect_uri": f"https://{settings.KOMMO_DOMAIN}"
                }
            )
            response.raise_for_status()
            tokens = response.json()
            self.access_token = tokens["access_token"]
            self.refresh_token = tokens["refresh_token"]
            return tokens
    
    # ===== PIPELINES =====
    async def get_pipelines(self) -> List[Dict]:
        """Retorna todos os pipelines"""
        result = await self._make_request("GET", "leads/pipelines")
        return result.get("_embedded", {}).get("pipelines", [])
    
    async def get_pipeline(self, pipeline_id: int) -> Dict:
        """Retorna um pipeline específico"""
        result = await self._make_request("GET", f"leads/pipelines/{pipeline_id}")
        return result
    
    # ===== LEADS =====
    async def get_leads(
        self,
        page: int = 1,
        limit: int = 50,
        pipeline_id: Optional[int] = None,
        status_id: Optional[int] = None,
        query: Optional[str] = None,
        filter_date_from: Optional[datetime] = None,
        filter_date_to: Optional[datetime] = None
    ) -> List[Dict]:
        """Retorna leads com filtros"""
        params = {
            "page": page,
            "limit": limit,
            "with": "contacts,companies"  # Inclui contatos e empresas relacionados
        }
        
        if pipeline_id:
            params["filter[pipeline_id]"] = pipeline_id
        if status_id:
            params["filter[status_id]"] = status_id
        if query:
            params["query"] = query
        if filter_date_from:
            params["filter[created_at][from]"] = int(filter_date_from.timestamp())
        if filter_date_to:
            params["filter[created_at][to]"] = int(filter_date_to.timestamp())
        
        result = await self._make_request("GET", "leads", params=params)
        return result.get("_embedded", {}).get("leads", [])
    
    async def get_lead(self, lead_id: int) -> Dict:
        """Retorna um lead específico"""
        params = {"with": "contacts,companies,catalog_elements"}
        result = await self._make_request("GET", f"leads/{lead_id}", params=params)
        return result
    
    async def get_lead_notes(self, lead_id: int) -> List[Dict]:
        """Retorna notas de um lead"""
        result = await self._make_request("GET", f"leads/{lead_id}/notes")
        return result.get("_embedded", {}).get("notes", [])
    
    # ===== CONTACTS =====
    async def get_contacts(
        self,
        page: int = 1,
        limit: int = 50,
        query: Optional[str] = None
    ) -> List[Dict]:
        """Retorna contatos"""
        params = {"page": page, "limit": limit}
        if query:
            params["query"] = query
        
        result = await self._make_request("GET", "contacts", params=params)
        return result.get("_embedded", {}).get("contacts", [])
    
    # ===== EVENTS =====
    async def get_events(
        self,
        page: int = 1,
        limit: int = 50,
        filter_type: Optional[str] = None,
        filter_entity_id: Optional[int] = None
    ) -> List[Dict]:
        """Retorna eventos/atividades"""
        params = {"page": page, "limit": limit}
        if filter_type:
            params["filter[type]"] = filter_type
        if filter_entity_id:
            params["filter[entity_id]"] = filter_entity_id
        
        result = await self._make_request("GET", "events", params=params)
        return result.get("_embedded", {}).get("events", [])
    
    # ===== ANALYTICS =====
    async def get_leads_summary(
        self,
        pipeline_id: Optional[int] = None,
        date_from: Optional[datetime] = None,
        date_to: Optional[datetime] = None
    ) -> Dict:
        """Retorna resumo de leads para analytics"""
        # Busca leads e agrupa por status
        leads = await self.get_leads(
            limit=250,
            pipeline_id=pipeline_id,
            filter_date_from=date_from,
            filter_date_to=date_to
        )
        
        summary = {
            "total": len(leads),
            "por_status": {},
            "por_pipeline": {},
            "valor_total": 0
        }
        
        for lead in leads:
            # Agrupa por status
            status_id = lead.get("status_id")
            if status_id not in summary["por_status"]:
                summary["por_status"][status_id] = 0
            summary["por_status"][status_id] += 1
            
            # Agrupa por pipeline
            pipe_id = lead.get("pipeline_id")
            if pipe_id not in summary["por_pipeline"]:
                summary["por_pipeline"][pipe_id] = 0
            summary["por_pipeline"][pipe_id] += 1
            
            # Soma valores
            summary["valor_total"] += lead.get("price", 0) or 0
        
        return summary


# Instância global do cliente
kommo_client = KommoClient()

