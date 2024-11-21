import React, { useState, useEffect } from 'react';
import { LayoutGrid, ShoppingBag, DollarSign, Settings, LogOut, Search } from 'lucide-react';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
  };
}

interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  payment_id?: string;
  payment_url?: string;
  created_at: string;
  user?: {
    name: string;
    email: string;
  };
  items?: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      // Ensure orders is always an array
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Gagal memuat data pesanan');
      setOrders([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update order status');

      // Refresh orders list
      fetchOrders();
    } catch (err) {
      setError('Gagal mengupdate status pesanan');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'paid':
        return 'bg-green-900/50 text-green-400';
      case 'shipped':
        return 'bg-blue-900/50 text-blue-400';
      case 'completed':
        return 'bg-green-900/50 text-green-400';
      case 'cancelled':
        return 'bg-red-900/50 text-red-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return dateString; // Return original string if date parsing fails
    }
  };

  // Ensure orders is an array before filtering
  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      (order.user?.name || '').toLowerCase().includes(searchLower) ||
      (order.user?.email || '').toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

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
            className="flex items-center px-4 py-3 text-white bg-gray-700"
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
            <h2 className="text-xl font-semibold text-white">Pesanan</h2>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="flex items-center space-x-2 text-gray-300 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari pesanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-900/50 border border-red-900 text-red-300 p-3 rounded-lg">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              Tidak ada pesanan ditemukan
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="p-4 text-gray-400">ID</th>
                      <th className="p-4 text-gray-400">Pelanggan</th>
                      <th className="p-4 text-gray-400">Total</th>
                      <th className="p-4 text-gray-400">Status</th>
                      <th className="p-4 text-gray-400">Tanggal</th>
                      <th className="p-4 text-gray-400">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-700">
                        <td className="p-4 text-gray-300">#{order.id}</td>
                        <td className="p-4">
                          <div className="text-gray-300">{order.user?.name}</div>
                          <div className="text-gray-500 text-sm">{order.user?.email}</div>
                        </td>
                        <td className="p-4 text-gray-300">
                          Rp{order.total_amount.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-300">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}