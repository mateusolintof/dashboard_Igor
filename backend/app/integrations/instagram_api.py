"""
Integração com Instagram Graph API
Documentação: https://developers.facebook.com/docs/instagram-api/
"""

import httpx
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from app.config import get_settings

settings = get_settings()


class InstagramClient:
    """Cliente para Instagram Graph API"""
    
    def __init__(self):
        self.base_url = "https://graph.facebook.com/v18.0"
        self.access_token = settings.INSTAGRAM_ACCESS_TOKEN
        self.business_id = settings.INSTAGRAM_BUSINESS_ID
    
    async def _make_request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Faz requisição para a Instagram Graph API"""
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url}/{endpoint}"
            
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
    
    # ===== PERFIL =====
    async def get_profile(self) -> Dict:
        """Retorna informações do perfil business"""
        fields = [
            "id", "username", "name", "biography", "website",
            "followers_count", "follows_count", "media_count",
            "profile_picture_url"
        ]
        
        result = await self._make_request(
            "GET",
            self.business_id,
            params={"fields": ",".join(fields)}
        )
        
        return result
    
    # ===== INSIGHTS DO PERFIL =====
    async def get_profile_insights(
        self,
        period: str = "day",
        since: Optional[datetime] = None,
        until: Optional[datetime] = None
    ) -> List[Dict]:
        """Retorna insights do perfil"""
        metrics = [
            "impressions", "reach", "profile_views",
            "website_clicks", "email_contacts", "phone_call_clicks",
            "follower_count"
        ]
        
        params = {
            "metric": ",".join(metrics),
            "period": period
        }
        
        if since and until:
            params["since"] = int(since.timestamp())
            params["until"] = int(until.timestamp())
        
        result = await self._make_request(
            "GET",
            f"{self.business_id}/insights",
            params=params
        )
        
        return result.get("data", [])
    
    async def get_audience_demographics(self) -> Dict:
        """Retorna dados demográficos da audiência"""
        metrics = ["audience_city", "audience_country", "audience_gender_age"]
        
        result = await self._make_request(
            "GET",
            f"{self.business_id}/insights",
            params={
                "metric": ",".join(metrics),
                "period": "lifetime"
            }
        )
        
        demographics = {}
        for item in result.get("data", []):
            demographics[item["name"]] = item.get("values", [{}])[0].get("value", {})
        
        return demographics
    
    # ===== MÍDIA (POSTS) =====
    async def get_media(
        self,
        limit: int = 25,
        after: Optional[str] = None
    ) -> Dict:
        """Retorna posts do perfil"""
        fields = [
            "id", "caption", "media_type", "media_url", "permalink",
            "thumbnail_url", "timestamp", "like_count", "comments_count"
        ]
        
        params = {
            "fields": ",".join(fields),
            "limit": limit
        }
        
        if after:
            params["after"] = after
        
        result = await self._make_request(
            "GET",
            f"{self.business_id}/media",
            params=params
        )
        
        return {
            "data": result.get("data", []),
            "paging": result.get("paging", {})
        }
    
    async def get_media_insights(self, media_id: str) -> Dict:
        """Retorna insights de um post específico"""
        # Métricas variam por tipo de mídia
        metrics = [
            "impressions", "reach", "engagement",
            "saved", "shares", "likes", "comments"
        ]
        
        result = await self._make_request(
            "GET",
            f"{media_id}/insights",
            params={"metric": ",".join(metrics)}
        )
        
        insights = {}
        for item in result.get("data", []):
            insights[item["name"]] = item.get("values", [{}])[0].get("value", 0)
        
        return insights
    
    # ===== STORIES =====
    async def get_stories(self) -> List[Dict]:
        """Retorna stories ativos"""
        fields = ["id", "media_type", "media_url", "timestamp"]
        
        result = await self._make_request(
            "GET",
            f"{self.business_id}/stories",
            params={"fields": ",".join(fields)}
        )
        
        return result.get("data", [])
    
    async def get_story_insights(self, story_id: str) -> Dict:
        """Retorna insights de um story"""
        metrics = ["impressions", "reach", "replies", "taps_forward", "taps_back", "exits"]
        
        result = await self._make_request(
            "GET",
            f"{story_id}/insights",
            params={"metric": ",".join(metrics)}
        )
        
        insights = {}
        for item in result.get("data", []):
            insights[item["name"]] = item.get("values", [{}])[0].get("value", 0)
        
        return insights
    
    # ===== HASHTAGS =====
    async def search_hashtag(self, hashtag: str) -> Optional[str]:
        """Busca ID de uma hashtag"""
        result = await self._make_request(
            "GET",
            "ig_hashtag_search",
            params={
                "user_id": self.business_id,
                "q": hashtag
            }
        )
        
        data = result.get("data", [])
        if data:
            return data[0].get("id")
        return None
    
    async def get_hashtag_media(
        self,
        hashtag_id: str,
        edge: str = "top_media"  # top_media ou recent_media
    ) -> List[Dict]:
        """Retorna posts de uma hashtag"""
        fields = ["id", "caption", "media_type", "permalink", "like_count", "comments_count"]
        
        result = await self._make_request(
            "GET",
            f"{hashtag_id}/{edge}",
            params={
                "user_id": self.business_id,
                "fields": ",".join(fields)
            }
        )
        
        return result.get("data", [])
    
    # ===== ANALYTICS HELPERS =====
    async def get_engagement_rate(self) -> float:
        """Calcula taxa de engajamento média"""
        profile = await self.get_profile()
        followers = profile.get("followers_count", 0)
        
        if followers == 0:
            return 0.0
        
        media = await self.get_media(limit=12)  # Últimos 12 posts
        posts = media.get("data", [])
        
        if not posts:
            return 0.0
        
        total_engagement = sum(
            (post.get("like_count", 0) + post.get("comments_count", 0))
            for post in posts
        )
        
        avg_engagement = total_engagement / len(posts)
        return (avg_engagement / followers) * 100
    
    async def get_summary_metrics(self) -> Dict:
        """Retorna métricas resumidas do Instagram"""
        profile = await self.get_profile()
        engagement_rate = await self.get_engagement_rate()
        
        # Busca insights dos últimos 7 dias
        now = datetime.now()
        week_ago = now - timedelta(days=7)
        
        try:
            insights = await self.get_profile_insights(
                period="day",
                since=week_ago,
                until=now
            )
        except Exception:
            insights = []
        
        # Agrega métricas
        total_impressions = 0
        total_reach = 0
        total_profile_views = 0
        
        for metric in insights:
            name = metric.get("name")
            values = metric.get("values", [])
            
            for value in values:
                val = value.get("value", 0)
                if name == "impressions":
                    total_impressions += val
                elif name == "reach":
                    total_reach += val
                elif name == "profile_views":
                    total_profile_views += val
        
        return {
            "seguidores": profile.get("followers_count", 0),
            "seguindo": profile.get("follows_count", 0),
            "posts": profile.get("media_count", 0),
            "taxa_engajamento": round(engagement_rate, 2),
            "impressoes_semana": total_impressions,
            "alcance_semana": total_reach,
            "visitas_perfil_semana": total_profile_views
        }


# Instância global do cliente
instagram_client = InstagramClient()

