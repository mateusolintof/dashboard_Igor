import axios from "axios";

// Usa o mesmo backend do dashboard
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ===== AI Agents =====
export const agentsApi = {
  analyzeCampaign: (data: {
    campaign_data: object;
    metrics?: string[];
    context?: string;
  }) => api.post("/api/agents/campaign-analysis", data),
  
  compareCampaigns: (campaigns: object[]) =>
    api.post("/api/agents/compare-campaigns", { campaigns }),
  
  generateCopy: (data: {
    objetivo: string;
    publico_alvo: string;
    tom_voz?: string;
    palavras_chave?: string[];
    plataforma?: string;
    num_variacoes?: number;
  }) => api.post("/api/agents/generate-copy", data),
  
  generateCard: (data: {
    titulo: string;
    subtitulo?: string;
    estilo?: string;
    cores?: string[];
  }) => api.post("/api/agents/generate-card", data),
  
  getChatHistory: (leadId?: number, limit: number = 50) =>
    api.get("/api/agents/chat-history", { params: { lead_id: leadId, limit } }),
};
