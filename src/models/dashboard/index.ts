export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
  }
  
  export interface RecentOrder {
    id: number;
    customerName: string;
    productName: string;
    amount: number;
    status: string;
  }
  
  const API_URL = 'https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api';
  
  export const DashboardModel = {
    async getStats(): Promise<DashboardStats> {
      const token = localStorage.getItem('token');
      const ordersResponse = await fetch(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productsResponse = await fetch(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!ordersResponse.ok || !productsResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
  
      const orders = await ordersResponse.json();
      const products = await productsResponse.json();
  
      return {
        totalRevenue: orders.reduce((sum: number, order: any) => sum + order.total_amount, 0),
        totalOrders: orders.length,
        totalProducts: products.length
      };
    },
  
    async getRecentOrders(): Promise<RecentOrder[]> {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
  
      const orders = await response.json();
      return orders.slice(0, 5).map((order: any) => ({
        id: order.id,
        customerName: order.user?.name || 'Customer',
        productName: order.items?.[0]?.product?.name || 'Product',
        amount: order.total_amount,
        status: order.status
      }));
    }
  };