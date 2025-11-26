"""
Integração com Meta Marketing API (Facebook/Instagram Ads)
Documentação: https://developers.facebook.com/docs/marketing-apis/
"""

import httpx
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from app.config import get_settings

settings = get_settings()


class MetaAdsClient:
    """Cliente para Meta Marketing API"""
    
    def __init__(self):
        self.base_url = "https://graph.facebook.com/v18.0"
        self.access_token = settings.META_ACCESS_TOKEN
        self.ad_account_id = settings.META_AD_ACCOUNT_ID
    
    async def _make_request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Faz requisição para a API do Meta"""
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url}/{endpoint}"
            
            # Adiciona access token aos parâmetros
            if params is None:
                params = {}
            params["access_token"] = self.access_token
            
            response = await client.request(
                method=method,
                url=url,
                params=params,
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    
    # ===== CAMPANHAS =====
    async def get_campaigns(
        self,
        status: Optional[List[str]] = None,
        date_preset: str = "last_30d"
    ) -> List[Dict]:
        """Retorna campanhas da conta de anúncios"""
        fields = [
            "id", "name", "status", "objective", "created_time",
            "start_time", "stop_time", "daily_budget", "lifetime_budget",
            "budget_remaining"
        ]
        
        params = {
            "fields": ",".join(fields),
            "date_preset": date_preset
        }
        
        if status:
            params["filtering"] = f'[{{"field":"effective_status","operator":"IN","value":{status}}}]'
        
        result = await self._make_request(
            "GET",
            f"{self.ad_account_id}/campaigns",
            params=params
        )
        
        return result.get("data", [])
    
    async def get_campaign_insights(
        self,
        campaign_id: str,
        date_preset: str = "last_30d",
        breakdown: Optional[str] = None
    ) -> List[Dict]:
        """Retorna insights de uma campanha específica"""
        fields = [
            "impressions", "reach", "frequency", "clicks", "ctr",
            "spend", "cpc", "cpm", "conversions", "cost_per_conversion",
            "actions", "action_values"
        ]
        
        params = {
            "fields": ",".join(fields),
            "date_preset": date_preset
        }
        
        if breakdown:
            params["breakdowns"] = breakdown
        
        result = await self._make_request(
            "GET",
            f"{campaign_id}/insights",
            params=params
        )
        
        return result.get("data", [])
    
    # ===== AD SETS =====
    async def get_ad_sets(
        self,
        campaign_id: Optional[str] = None
    ) -> List[Dict]:
        """Retorna conjuntos de anúncios"""
        fields = [
            "id", "name", "status", "campaign_id", "daily_budget",
            "targeting", "optimization_goal", "bid_strategy"
        ]
        
        params = {"fields": ",".join(fields)}
        
        endpoint = f"{self.ad_account_id}/adsets"
        if campaign_id:
            params["filtering"] = f'[{{"field":"campaign_id","operator":"EQUAL","value":"{campaign_id}"}}]'
        
        result = await self._make_request("GET", endpoint, params=params)
        return result.get("data", [])
    
    # ===== ADS =====
    async def get_ads(
        self,
        ad_set_id: Optional[str] = None
    ) -> List[Dict]:
        """Retorna anúncios"""
        fields = [
            "id", "name", "status", "adset_id", "creative",
            "tracking_specs", "conversion_specs"
        ]
        
        params = {"fields": ",".join(fields)}
        
        endpoint = f"{self.ad_account_id}/ads"
        if ad_set_id:
            params["filtering"] = f'[{{"field":"adset_id","operator":"EQUAL","value":"{ad_set_id}"}}]'
        
        result = await self._make_request("GET", endpoint, params=params)
        return result.get("data", [])
    
    # ===== INSIGHTS AGREGADOS =====
    async def get_account_insights(
        self,
        date_preset: str = "last_30d",
        time_increment: Optional[int] = None
    ) -> List[Dict]:
        """Retorna insights agregados da conta"""
        fields = [
            "impressions", "reach", "frequency", "clicks", "ctr",
            "spend", "cpc", "cpm", "actions", "cost_per_action_type",
            "conversions", "cost_per_conversion"
        ]
        
        params = {
            "fields": ",".join(fields),
            "date_preset": date_preset
        }
        
        if time_increment:
            params["time_increment"] = time_increment
        
        result = await self._make_request(
            "GET",
            f"{self.ad_account_id}/insights",
            params=params
        )
        
        return result.get("data", [])
    
    async def get_daily_insights(
        self,
        date_start: datetime,
        date_end: datetime
    ) -> List[Dict]:
        """Retorna insights diários para período específico"""
        fields = [
            "date_start", "date_stop", "impressions", "reach",
            "clicks", "ctr", "spend", "cpc", "cpm",
            "actions", "conversions"
        ]
        
        params = {
            "fields": ",".join(fields),
            "time_range": f'{{"since":"{date_start.strftime("%Y-%m-%d")}","until":"{date_end.strftime("%Y-%m-%d")}"}}',
            "time_increment": 1
        }
        
        result = await self._make_request(
            "GET",
            f"{self.ad_account_id}/insights",
            params=params
        )
        
        return result.get("data", [])
    
    # ===== MÉTRICAS DE LEADS =====
    async def get_lead_forms(self) -> List[Dict]:
        """Retorna formulários de lead"""
        result = await self._make_request(
            "GET",
            f"{self.ad_account_id}/leadgen_forms",
            params={"fields": "id,name,status,leads_count,created_time"}
        )
        return result.get("data", [])
    
    async def get_form_leads(
        self,
        form_id: str,
        limit: int = 50
    ) -> List[Dict]:
        """Retorna leads de um formulário específico"""
        result = await self._make_request(
            "GET",
            f"{form_id}/leads",
            params={"limit": limit}
        )
        return result.get("data", [])
    
    # ===== ANALYTICS HELPERS =====
    async def get_performance_summary(
        self,
        date_preset: str = "last_30d"
    ) -> Dict:
        """Retorna resumo de performance da conta"""
        insights = await self.get_account_insights(date_preset)
        
        if not insights:
            return {
                "impressoes": 0,
                "alcance": 0,
                "cliques": 0,
                "ctr": 0,
                "investimento": 0,
                "cpc": 0,
                "conversoes": 0,
                "custo_por_conversao": 0
            }
        
        data = insights[0]
        
        # Extrai conversões das actions
        conversoes = 0
        actions = data.get("actions", [])
        for action in actions:
            if action.get("action_type") in ["lead", "complete_registration", "purchase"]:
                conversoes += int(action.get("value", 0))
        
        investimento = float(data.get("spend", 0))
        
        return {
            "impressoes": int(data.get("impressions", 0)),
            "alcance": int(data.get("reach", 0)),
            "cliques": int(data.get("clicks", 0)),
            "ctr": float(data.get("ctr", 0)),
            "investimento": investimento,
            "cpc": float(data.get("cpc", 0)),
            "conversoes": conversoes,
            "custo_por_conversao": investimento / conversoes if conversoes > 0 else 0
        }


# Instância global do cliente
meta_ads_client = MetaAdsClient()

