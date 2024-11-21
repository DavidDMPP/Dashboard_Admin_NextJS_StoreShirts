import React, { useState, useEffect } from 'react';
import { LayoutGrid, ShoppingBag, DollarSign, Settings, LogOut, ArrowLeft } from 'lucide-react';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image_url: string;
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

export default function OrderDetailPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const id = window.location.pathname.split('/').pop();
        const token = localStorage.getItem('token');
        
        const response = await fetch(`https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch order details');

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError('Gagal memuat detail pesanan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/admin/orders/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update order status');

      setOrder({ ...order, status: newStatus });
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <div className="flex items-center space-x-4">
              <a 
                href="/pesanan"
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </a>
              <h2 className="text-xl font-semibold text-white">Detail Pesanan #{order?.id}</h2>
            </div>
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
          {error && (
            <div className="mb-4 bg-red-900/50 border border-red-900 text-red-300 p-3 rounded-lg">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : order ? (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Status Pesanan</h3>
                    <div className="mt-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Tanggal Pesanan</h3>
                    <p className="mt-2 text-white">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Total Pembayaran</h3>
                    <p className="mt-2 text-white">Rp{order.total_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Pembeli</h3>
                    <p className="mt-2 text-white">{order.user?.name}</p>
                    <p className="text-gray-400 text-sm">{order.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">Item Pesanan</h2>
                </div>
                <div className="divide-y divide-gray-700">
                  {order.items?.map((item) => (
                    <div key={item.id} className="p-6 flex items-center space-x-4">
                      <img
                        src={item.product?.image_url || '/api/placeholder/100/100'}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.product?.name}</h3>
                        <p className="text-gray-400">Jumlah: {item.quantity}</p>
                        <p className="text-gray-400">Harga: Rp{item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-white font-medium">
                        Rp{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info if available */}
              {order.payment_id && (
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Informasi Pembayaran</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">ID Pembayaran</h3>
                      <p className="mt-2 text-white">{order.payment_id}</p>
                    </div>
                    {order.payment_url && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Link Pembayaran</h3>
                        <a
                          href={order.payment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-blue-400 hover:text-blue-300"
                        >
                          Buka Link Pembayaran
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">Pesanan tidak ditemukan</div>
          )}
        </main>
      </div>
    </div>
  );
}