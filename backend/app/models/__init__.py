# Models package
from app.models.lead import Pipeline, PipelineType, Etapa, Lead, Interacao
from app.models.campaign import (
    Campanha, PlataformaAds, StatusCampanha, 
    MetricaCampanha, AnuncioSet, Anuncio
)
from app.models.instagram import (
    InstagramMetrics, InstagramPost, 
    InstagramStory, InstagramAudience
)

__all__ = [
    # Lead models
    "Pipeline",
    "PipelineType",
    "Etapa",
    "Lead",
    "Interacao",
    # Campaign models
    "Campanha",
    "PlataformaAds",
    "StatusCampanha",
    "MetricaCampanha",
    "AnuncioSet",
    "Anuncio",
    # Instagram models
    "InstagramMetrics",
    "InstagramPost",
    "InstagramStory",
    "InstagramAudience",
]
