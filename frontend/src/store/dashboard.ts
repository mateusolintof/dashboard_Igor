import { create } from "zustand";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DashboardState {
  // Período selecionado
  periodo: string;
  setPeriodo: (periodo: string) => void;

  // Range de datas customizado
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;

  // Pipeline selecionado
  selectedPipeline: number | null;
  setSelectedPipeline: (id: number | null) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Período padrão: últimos 30 dias
  periodo: "30d",
  setPeriodo: (periodo) => set({ periodo }),

  // Date range
  dateRange: { from: undefined, to: undefined },
  setDateRange: (range) => set({ dateRange: range }),

  // Pipeline
  selectedPipeline: null,
  setSelectedPipeline: (id) => set({ selectedPipeline: id }),

  // Loading
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Sidebar
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

