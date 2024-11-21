import React, { useEffect, useState } from 'react';
import { LayoutGrid, ShoppingBag, DollarSign, Settings, LogOut } from 'lucide-react';
import { DashboardPresenter, DashboardView } from '../src/presenters/dashboard';
import { DashboardStats, RecentOrder } from '../src/models/dashboard';
import { StatsCard } from '../src/components/dashboard/stats-card';
import { RecentOrders } from '../src/components/dashboard/recent-orders';

export default function BerandaPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const view: DashboardView = {
    setLoading: setIsLoading,
    setError: (message: string) => {
      // Only set error if it's a critical error
      if (message.includes('network error') || message.includes('500')) {
        setError(message);
      }
    },
    setStats: setStats,
    setRecentOrders: setRecentOrders
  };

  const presenter = new DashboardPresenter(view);

  useEffect(() => {
    const loadData = async () => {
      try {
        await presenter.loadDashboard();
      } catch (err) {
        // Ignore non-critical errors
        console.log('Non-critical error:', err);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white">Toko Baju</h1>
        </div>
        
        <nav className="mt-4">
          <a 
            href="/beranda" 
            className="flex items-center px-4 py-3 text-white bg-gray-700"
          >
            <LayoutGrid className="w-5 h-5 mr-3" />
            Beranda
          </a>
          <a 
            href="/produk" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            Produk
          </a>
          <a 
            href="/pesanan" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <DollarSign className="w-5 h-5 mr-3" />
            Pesanan
          </a>
          <a 
            href="/pengaturan" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Settings className="w-5 h-5 mr-3" />
            Pengaturan
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Beranda</h2>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          {error && (
            <div className="mb-4 bg-red-900/50 border border-red-900 text-red-300 p-3 rounded-lg">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                <StatsCard
                  title="Total Pendapatan"
                  value={`Rp${stats.totalRevenue.toLocaleString()}`}
                  Icon={DollarSign}
                />
                <StatsCard
                  title="Total Pesanan"
                  value={stats.totalOrders.toString()}
                  Icon={ShoppingBag}
                />
                <StatsCard
                  title="Total Produk"
                  value={stats.totalProducts.toString()}
                  Icon={ShoppingBag}
                />
              </div>

              <RecentOrders orders={recentOrders} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}