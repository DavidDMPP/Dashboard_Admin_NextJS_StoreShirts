import { Product, ProductModel, CreateProductData } from '../../models/product';

export interface ProductView {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setProducts: (products: Product[]) => void;
  onProductCreated: () => void;
  onProductUpdated: () => void;
  onProductDeleted: () => void;
}

export class ProductPresenter {
  constructor(private view: ProductView) {}

  async loadProducts() {
    try {
      this.view.setLoading(true);
      const products = await ProductModel.getAll();
      this.view.setProducts(products);
    } catch (error) {
      this.view.setError('Gagal memuat produk');
    } finally {
      this.view.setLoading(false);
    }
  }

  async createProduct(data: CreateProductData) {
    try {
      this.view.setLoading(true);
      await ProductModel.create(data);
      this.view.onProductCreated();
    } catch (error) {
      this.view.setError('Gagal membuat produk');
    } finally {
      this.view.setLoading(false);
    }
  }

  async updateProduct(id: number, data: Partial<Product>) {
    try {
      this.view.setLoading(true);
      await ProductModel.update(id, data);
      this.view.onProductUpdated();
    } catch (error) {
      this.view.setError('Gagal mengupdate produk');
    } finally {
      this.view.setLoading(false);
    }
  }

  async deleteProduct(id: number) {
    try {
      this.view.setLoading(true);
      await ProductModel.delete(id);
      this.view.onProductDeleted();
    } catch (error) {
      this.view.setError('Gagal menghapus produk');
    } finally {
      this.view.setLoading(false);
    }
  }
}