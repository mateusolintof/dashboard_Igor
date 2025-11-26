"""
Agente de IA para análise de campanhas de marketing
Utiliza Claude (Anthropic) ou Gemini (Google) para análises
"""

from typing import Dict, List, Optional
import anthropic
import google.generativeai as genai
from app.config import get_settings

settings = get_settings()

# Configura APIs
anthropic_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
genai.configure(api_key=settings.GOOGLE_AI_API_KEY)


class CampaignAnalystAgent:
    """Agente especializado em análise de campanhas de marketing"""
    
    def __init__(self, use_claude: bool = True):
        self.use_claude = use_claude
        self.system_prompt = """Você é um especialista em marketing digital e análise de campanhas.
Sua função é analisar dados de campanhas e fornecer insights acionáveis.

Ao analisar campanhas, você deve:
1. Identificar padrões de performance
2. Detectar problemas e oportunidades
3. Sugerir otimizações específicas
4. Comparar com benchmarks do mercado
5. Recomendar próximos passos

Seja objetivo, use dados para fundamentar suas análises e forneça
recomendações práticas que podem ser implementadas imediatamente.

Responda sempre em português brasileiro."""
    
    async def analyze_campaign(
        self,
        campaign_data: Dict,
        metrics: Optional[List[str]] = None,
        context: Optional[str] = None
    ) -> Dict:
        """
        Analisa uma campanha e retorna insights
        
        Args:
            campaign_data: Dados da campanha (métricas, configurações, etc)
            metrics: Lista de métricas para focar
            context: Contexto adicional sobre a campanha
        """
        # Prepara o prompt com os dados
        prompt = self._build_analysis_prompt(campaign_data, metrics, context)
        
        # Gera análise usando LLM
        if self.use_claude:
            analysis = await self._analyze_with_claude(prompt)
        else:
            analysis = await self._analyze_with_gemini(prompt)
        
        return {
            "analysis": analysis,
            "campaign_id": campaign_data.get("id"),
            "metrics_analyzed": metrics or ["all"],
        }
    
    def _build_analysis_prompt(
        self,
        data: Dict,
        metrics: Optional[List[str]],
        context: Optional[str]
    ) -> str:
        """Constrói prompt para análise"""
        prompt = f"""Analise os seguintes dados de campanha:

## Dados da Campanha
{self._format_data(data)}

## Métricas a Focar
{', '.join(metrics) if metrics else 'Todas as métricas disponíveis'}

{f'## Contexto Adicional\n{context}' if context else ''}

Por favor, forneça:
1. **Resumo da Performance**: Como a campanha está performando em geral
2. **Pontos Fortes**: O que está funcionando bem
3. **Áreas de Melhoria**: Onde há oportunidades de otimização
4. **Insights Principais**: 3-5 insights acionáveis
5. **Recomendações**: Ações específicas para melhorar a performance"""
        
        return prompt
    
    def _format_data(self, data: Dict) -> str:
        """Formata dados para o prompt"""
        lines = []
        for key, value in data.items():
            if isinstance(value, dict):
                lines.append(f"- {key}:")
                for k, v in value.items():
                    lines.append(f"  - {k}: {v}")
            elif isinstance(value, list):
                lines.append(f"- {key}: {', '.join(str(v) for v in value)}")
            else:
                lines.append(f"- {key}: {value}")
        return "\n".join(lines)
    
    async def _analyze_with_claude(self, prompt: str) -> str:
        """Gera análise usando Claude"""
        message = anthropic_client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=2000,
            system=self.system_prompt,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return message.content[0].text
    
    async def _analyze_with_gemini(self, prompt: str) -> str:
        """Gera análise usando Gemini"""
        model = genai.GenerativeModel(
            "gemini-pro",
            system_instruction=self.system_prompt
        )
        response = model.generate_content(prompt)
        return response.text
    
    async def compare_campaigns(
        self,
        campaigns: List[Dict]
    ) -> Dict:
        """Compara múltiplas campanhas"""
        prompt = f"""Compare as seguintes campanhas de marketing:

{self._format_campaigns_comparison(campaigns)}

Por favor, forneça:
1. **Ranking de Performance**: Qual campanha está performando melhor e por quê
2. **Análise Comparativa**: Pontos fortes e fracos de cada uma
3. **Padrões Identificados**: O que as campanhas bem-sucedidas têm em comum
4. **Recomendações**: Como aplicar os aprendizados das melhores campanhas nas outras"""
        
        if self.use_claude:
            analysis = await self._analyze_with_claude(prompt)
        else:
            analysis = await self._analyze_with_gemini(prompt)
        
        return {
            "comparison": analysis,
            "campaigns_compared": len(campaigns)
        }
    
    def _format_campaigns_comparison(self, campaigns: List[Dict]) -> str:
        """Formata campanhas para comparação"""
        formatted = []
        for i, camp in enumerate(campaigns, 1):
            formatted.append(f"### Campanha {i}: {camp.get('nome', 'Sem nome')}")
            formatted.append(self._format_data(camp))
            formatted.append("")
        return "\n".join(formatted)


class CopywriterAgent:
    """Agente especializado em criação de copies para anúncios"""
    
    def __init__(self, use_claude: bool = True):
        self.use_claude = use_claude
        self.system_prompt = """Você é um copywriter especialista em marketing digital 
e anúncios para redes sociais.

Sua especialidade é criar copies que:
1. Capturam atenção imediatamente
2. Comunicam valor de forma clara
3. Geram desejo e urgência
4. Incluem calls-to-action efetivos
5. São otimizados para cada plataforma

Você conhece as melhores práticas para:
- Instagram (feed, stories, reels)
- Facebook (feed, stories)
- Google Ads (search, display)

Sempre crie múltiplas variações para testes A/B.
Responda sempre em português brasileiro."""
    
    async def generate_copies(
        self,
        objetivo: str,
        publico_alvo: str,
        tom_voz: str = "profissional",
        palavras_chave: Optional[List[str]] = None,
        plataforma: str = "instagram",
        num_variacoes: int = 3
    ) -> Dict:
        """
        Gera copies para anúncios
        
        Args:
            objetivo: Objetivo do anúncio (conversão, awareness, etc)
            publico_alvo: Descrição do público-alvo
            tom_voz: Tom de voz desejado
            palavras_chave: Palavras-chave a incluir
            plataforma: Plataforma de destino
            num_variacoes: Número de variações a gerar
        """
        prompt = f"""Crie {num_variacoes} variações de copy para um anúncio com as seguintes características:

## Briefing
- **Objetivo**: {objetivo}
- **Público-alvo**: {publico_alvo}
- **Tom de voz**: {tom_voz}
- **Plataforma**: {plataforma}
- **Palavras-chave**: {', '.join(palavras_chave) if palavras_chave else 'Nenhuma específica'}

## Requisitos por Plataforma
{self._get_platform_requirements(plataforma)}

Para cada variação, forneça:
1. Headline principal
2. Texto do anúncio
3. Call-to-action
4. Hashtags relevantes (se aplicável)
5. Explicação breve da estratégia usada"""
        
        if self.use_claude:
            copies = await self._generate_with_claude(prompt)
        else:
            copies = await self._generate_with_gemini(prompt)
        
        return {
            "copies": copies,
            "plataforma": plataforma,
            "num_variacoes": num_variacoes
        }
    
    def _get_platform_requirements(self, plataforma: str) -> str:
        """Retorna requisitos específicos da plataforma"""
        requirements = {
            "instagram": """- Headline: máximo 125 caracteres
- Texto: máximo 2.200 caracteres (ideal: 125-150)
- CTA: claro e direto
- Hashtags: 5-10 relevantes
- Emojis: use com moderação para aumentar engajamento""",
            
            "facebook": """- Headline: máximo 40 caracteres
- Texto principal: máximo 125 caracteres (antes do "ver mais")
- Descrição: máximo 30 caracteres
- CTA: escolha entre opções padrão (Saiba Mais, Comprar, etc)""",
            
            "google_search": """- Headline 1: máximo 30 caracteres
- Headline 2: máximo 30 caracteres
- Headline 3: máximo 30 caracteres
- Descrição 1: máximo 90 caracteres
- Descrição 2: máximo 90 caracteres
- Use palavras-chave no headline""",
            
            "google_display": """- Headline curto: máximo 25 caracteres
- Headline longo: máximo 90 caracteres
- Descrição: máximo 90 caracteres
- Nome da empresa: máximo 25 caracteres"""
        }
        
        return requirements.get(plataforma, requirements["instagram"])
    
    async def _generate_with_claude(self, prompt: str) -> str:
        """Gera copies usando Claude"""
        message = anthropic_client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=2000,
            system=self.system_prompt,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return message.content[0].text
    
    async def _generate_with_gemini(self, prompt: str) -> str:
        """Gera copies usando Gemini"""
        model = genai.GenerativeModel(
            "gemini-pro",
            system_instruction=self.system_prompt
        )
        response = model.generate_content(prompt)
        return response.text


# Instâncias globais dos agentes
campaign_analyst = CampaignAnalystAgent()
copywriter = CopywriterAgent()

