import React from 'react';
import { 
  LayoutGrid, 
  ShoppingBag, 
  DollarSign, 
  Settings, 
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: LayoutProps) => {
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
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
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
        {/* Top Navigation */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;