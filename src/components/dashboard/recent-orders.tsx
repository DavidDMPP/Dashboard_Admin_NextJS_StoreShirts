import React from 'react';
import { RecentOrder } from '../../models/dashboard';

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => (
  <div className="bg-gray-800 rounded-lg border border-gray-700">
    <div className="px-6 py-4 border-b border-gray-700">
      <h2 className="text-lg font-semibold text-white">Pesanan Terbaru</h2>
    </div>
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-4 text-gray-400">ID</th>
              <th className="pb-4 text-gray-400">Pelanggan</th>
              <th className="pb-4 text-gray-400">Produk</th>
              <th className="pb-4 text-gray-400">Total</th>
              <th className="pb-4 text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-700">
                <td className="py-4 text-gray-300">#{order.id}</td>
                <td className="py-4 text-gray-300">{order.customerName}</td>
                <td className="py-4 text-gray-300">{order.productName}</td>
                <td className="py-4 text-gray-300">Rp{order.amount.toLocaleString()}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    order.status === 'completed' 
                      ? 'bg-green-900/50 text-green-400'
                      : order.status === 'pending'
                      ? 'bg-yellow-900/50 text-yellow-400'
                      : 'bg-gray-900/50 text-gray-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);