import { DashboardModel, DashboardStats, RecentOrder } from '../../models/dashboard';

export interface DashboardView {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setStats: (stats: DashboardStats) => void;
  setRecentOrders: (orders: RecentOrder[]) => void;
}

export class DashboardPresenter {
  constructor(private view: DashboardView) {}

  async loadDashboard() {
    try {
      this.view.setLoading(true);
      const [stats, recentOrders] = await Promise.all([
        DashboardModel.getStats(),
        DashboardModel.getRecentOrders()
      ]);
      
      this.view.setStats(stats);
      this.view.setRecentOrders(recentOrders);
    } catch (error) {
      this.view.setError('Gagal memuat data dashboard');
    } finally {
      this.view.setLoading(false);
    }
  }
}