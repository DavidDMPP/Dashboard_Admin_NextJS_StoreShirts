export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
  }
  
  export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
  }
  
  const API_URL = 'https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api';
  
  export const ProductModel = {
    async getAll(): Promise<Product[]> {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  
    async create(data: CreateProductData): Promise<Product> {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
  
    async update(id: number, data: Partial<Product>): Promise<Product> {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    },
  
    async delete(id: number): Promise<void> {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!response.ok) throw new Error('Failed to delete product');
    },
  
    async getById(id: number): Promise<Product> {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    }
  };