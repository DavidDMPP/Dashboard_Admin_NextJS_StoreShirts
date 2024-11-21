import React, { useState, useEffect } from 'react';
import { LayoutGrid, ShoppingBag, DollarSign, Settings, LogOut, Plus, Pencil, Trash2, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);  // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      // Ensure we're setting an array
      setProducts(Array.isArray(data.data) ? data.data : []);
      
      // Log the response for debugging
      console.log('Products response:', data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Gagal memuat data produk');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete product');

      // Refresh products list
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Gagal menghapus produk');
    }
  };

  // Safe filtering with null check
  const filteredProducts = products?.filter(product =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
            className="flex items-center px-4 py-3 text-white bg-gray-700"
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
            <h2 className="text-xl font-semibold text-white">Produk</h2>
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
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <a
              href="/produk/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Produk
            </a>
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
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={product.image_url || '/api/placeholder/400/300'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white font-bold">
                        Rp{product.price.toLocaleString()}
                      </span>
                      <span className="text-gray-400">
                        Stok: {product.stock}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/produk/${product.id}`}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-8">
              {searchTerm ? 'Tidak ada produk yang sesuai dengan pencarian' : 'Belum ada produk'}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}