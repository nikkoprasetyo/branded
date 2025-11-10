import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../constants/constant";
import loadingGif from "../assets/loadingUpload.svg";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchProductsData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/apis/products/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleUpload(e, id) {
    try {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(
        `${baseUrl}/apis/products/products/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );
      console.log(data, "ini data");
      Toastify({
        text: "Uploaded",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "#000000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: "error",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${baseUrl}/apis/products/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Successfully deleted a product",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "#000000",
        },
      }).showToast();
      fetchProductsData();
      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProductsData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <img src={loadingGif} alt="Loading..." className="w-1/4" />
        </div>
      ) : (
        <>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Product List
            </h2>

            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Stock</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr
                      key={product.id}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                        {product.name}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                        {product.category?.name || "-"}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                        Rp {product.price?.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                        {product.stock}
                      </td>
                      <td className="py-3 px-4 text-center space-x-2">
                        <div className="flex justify-center space-x-2">
                          <label className="px-3 py-2 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition cursor-pointer">
                            Add Image
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleUpload(e, product.id)}
                            />
                          </label>
                          <Link
                            to={`/edit-product/${product.id}`}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
