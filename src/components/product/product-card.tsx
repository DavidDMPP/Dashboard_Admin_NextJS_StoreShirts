import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Product } from '../../models/product';

interface ProductCardProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
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
        <button
          onClick={() => onEdit(product.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Hapus
        </button>
      </div>
    </div>
  </div>
);