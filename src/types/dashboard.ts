export interface DashboardStats {
  totalFilesProcessed: number;
  totalSpaceSaved: number;
  recentActivity: ProcessingActivity[];
  favoriteTools: FavoriteTool[];
  dailyUsage: DailyUsage[];
  lastUpdated: number;
}

export interface ProcessingActivity {
  id: string;
  toolId: string;
  toolName: string;
  filesProcessed: number;
  spaceSaved: number;
  timestamp: number;
}

export interface FavoriteTool {
  toolId: string;
  useCount: number;
  lastUsed: number;
}

export interface DailyUsage {
  date: string;
  count: number;
}
