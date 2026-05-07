// src/components/layouts/admin/products/ProductsTable.tsx

'use client';

import Image from 'next/image';
import { IProduct } from '@/types/products.type';

type Props = {
  products: IProduct[];
  loading: boolean;
  handleDelete: (id: string) => void;
  handleView: (p: IProduct) => void;
  handleUpdate: (p: IProduct) => void;
};

const ProductsTable = ({
  products,
  loading,
  handleDelete,
  handleView,
  handleUpdate,
}: Props) => {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Featured</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center p-10">
                <div className="flex justify-center">
                  <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                </div>
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-10">
                No Products Found
              </td>
            </tr>
          ) : (
            products.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <Image
                    src={p.thumbnail}
                    alt={p.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </td>

                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>{p.isFeatured ? 'Yes' : 'No'}</td>

                <td className="flex gap-2 p-3">
                  <button
                    onClick={() => handleView(p)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleUpdate(p)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
