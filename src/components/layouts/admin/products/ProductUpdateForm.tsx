// src/components/modules/products/ProductUpdateForm.tsx

'use client';

import { useState } from 'react';
import { IProduct } from '@/types/products.type';
import { getToken } from '@/utils/auth';

type Props = {
  product: IProduct | null;
  refetch: () => void;
  closeModal: () => void;
};

const ProductUpdateForm = ({ product, refetch, closeModal }: Props) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    description: product?.description || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = getToken();
      console.log(token);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/products/${product?.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();

      console.log(result);

      refetch();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Brand"
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-3 rounded-lg h-32"
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer"
      >
        {loading ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
};

export default ProductUpdateForm;
