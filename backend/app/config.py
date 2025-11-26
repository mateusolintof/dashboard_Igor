from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Dashboard Clinica Dr Igor"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Kommo CRM
    KOMMO_DOMAIN: str
    KOMMO_CLIENT_ID: str
    KOMMO_CLIENT_SECRET: str
    KOMMO_ACCESS_TOKEN: str
    KOMMO_REFRESH_TOKEN: str
    
    # Meta Ads
    META_APP_ID: str
    META_APP_SECRET: str
    META_ACCESS_TOKEN: str
    META_AD_ACCOUNT_ID: str
    
    # Google Ads
    GOOGLE_ADS_DEVELOPER_TOKEN: str
    GOOGLE_ADS_CLIENT_ID: str
    GOOGLE_ADS_CLIENT_SECRET: str
    GOOGLE_ADS_REFRESH_TOKEN: str
    GOOGLE_ADS_CUSTOMER_ID: str
    
    # Instagram
    INSTAGRAM_BUSINESS_ID: str
    INSTAGRAM_ACCESS_TOKEN: str
    
    # LLMs
    ANTHROPIC_API_KEY: str
    GOOGLE_AI_API_KEY: str
    PERPLEXITY_API_KEY: str = ""
    
    # Agenda
    AGENDA_API_URL: str = ""
    AGENDA_API_KEY: str = ""
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()

