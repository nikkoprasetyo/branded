import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: fetch products from API
    setProducts([
      {
        id: 1,
        name: "Product A",
        description: "Sample description",
        category: "Category 1",
        price: 100000,
        stock: 10,
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Products
        </h2>

        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.description}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">Rp {p.price.toLocaleString()}</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/edit-product/${p.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
