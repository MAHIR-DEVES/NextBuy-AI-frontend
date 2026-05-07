// src/app/dashboard/products/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from '@/services/product.service';

import { IProduct } from '@/types/products.type';
import ProductModal from '@/components/layouts/admin/products/ProductModal';
import ProductView from '@/components/layouts/admin/products/ProductView';
import ProductUpdateForm from '@/components/layouts/admin/products/ProductUpdateForm';
import ProductCreateForm from '@/components/layouts/admin/products/ProductCreateForm';
import ProductsTable from '@/components/layouts/admin/products/ProductsTable';

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // =========================
  // FETCH PRODUCTS (MAIN API)
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts({
        page: 1,
        limit: 10,
        search,
        category,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        sortBy: 'price',
        sortOrder: 'asc',
      });

      setProducts(data?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, minPrice, maxPrice]);

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure?');

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deleteProduct(id);

      if (res.success) {
        await fetchProducts(); // REFRESH AFTER DELETE
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Create Product
        </button>
      </div>

      {/* FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border p-3 rounded-lg"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 rounded-lg"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          className="border p-3 rounded-lg"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-3 rounded-lg"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <ProductsTable
        products={products}
        loading={loading}
        handleDelete={handleDelete}
        handleView={product => {
          setSelectedProduct(product);
          setOpenView(true);
        }}
        handleUpdate={product => {
          setSelectedProduct(product);
          setOpenUpdate(true);
        }}
      />

      {/* VIEW MODAL */}
      <ProductModal
        isOpen={openView}
        onClose={() => setOpenView(false)}
        title="Product Details"
      >
        <ProductView product={selectedProduct} />
      </ProductModal>

      {/* UPDATE MODAL */}
      <ProductModal
        isOpen={openUpdate}
        onClose={() => setOpenUpdate(false)}
        title="Update Product"
      >
        <ProductUpdateForm
          product={selectedProduct}
          refetch={fetchProducts}
          closeModal={() => setOpenUpdate(false)}
        />
      </ProductModal>

      {/* CREATE MODAL */}
      <ProductModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Create Product"
      >
        <ProductCreateForm
          refetch={fetchProducts}
          closeModal={() => setOpenCreate(false)}
        />
      </ProductModal>
    </div>
  );
};

export default ProductsPage;
