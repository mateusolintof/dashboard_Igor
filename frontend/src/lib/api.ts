import axios from "axios";

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

// ===== Dashboard =====
export const dashboardApi = {
  getOverview: () => api.get("/api/dashboard/overview"),
  getKPIs: (periodo: string = "30d") =>
    api.get(`/api/dashboard/kpis?periodo=${periodo}`),
};

// ===== Leads =====
export const leadsApi = {
  getLeads: (params?: {
    pipeline_id?: number;
    status_id?: number;
    limit?: number;
    page?: number;
  }) => api.get("/api/leads", { params }),
  getLead: (id: number) => api.get(`/api/leads/${id}`),
  getPipelines: () => api.get("/api/leads/pipelines"),
  getSummary: (params?: {
    pipeline_id?: number;
    date_from?: string;
    date_to?: string;
  }) => api.get("/api/leads/summary", { params }),
};

// ===== Campaigns =====
export const campaignsApi = {
  getCampaigns: (params?: { date_preset?: string }) =>
    api.get("/api/campaigns", { params }),
  getMetaCampaigns: () => api.get("/api/campaigns/meta"),
  getCampaignInsights: (campaignId: string, datePreset: string = "last_30d") =>
    api.get(`/api/campaigns/meta/${campaignId}/insights`, {
      params: { date_preset: datePreset },
    }),
  getStats: (periodo: string = "last_30d") =>
    api.get(`/api/campaigns/stats?periodo=${periodo}`),
  getDailyInsights: (dateStart: string, dateEnd: string) =>
    api.get("/api/campaigns/daily-insights", {
      params: { date_start: dateStart, date_end: dateEnd },
    }),
};

// ===== Instagram =====
export const instagramApi = {
  getProfile: () => api.get("/api/instagram/profile"),
  getMetrics: (periodo: string = "30d") =>
    api.get(`/api/instagram/metrics?periodo=${periodo}`),
  getPosts: (limit: number = 20) =>
    api.get(`/api/instagram/posts?limit=${limit}`),
  getPostInsights: (postId: string) =>
    api.get(`/api/instagram/posts/${postId}/insights`),
  getStories: () => api.get("/api/instagram/stories"),
  getAudience: () => api.get("/api/instagram/audience"),
  getEngagementRate: () => api.get("/api/instagram/engagement-rate"),
};

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
};

