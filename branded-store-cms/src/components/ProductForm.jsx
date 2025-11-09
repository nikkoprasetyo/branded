import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../constants/constant";

export default function ProductForm({
  onSubmit,
  existingData = null,
  mode = "add",
}) {
  //   const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${baseUrl}/apis/products/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCategories();

    if (existingData) {
      setForm({
        name: existingData.name || "",
        description: existingData.description || "",
        price: existingData.price || "",
        stock: existingData.stock || "",
        imgUrl: existingData.imgUrl || "",
        categoryId: existingData.categoryId || "",
      });
    }
  }, [existingData]);

  function handleChange(fieldName, e) {
    console.log("masuk handle change");
    console.log(e, "ini e");
    console.log(e.target.name, "ini name");

    let { name, value } = e.target;

    if (
      fieldName === "price" ||
      fieldName === "stock" ||
      fieldName === "categoryId"
    ) {
      value = Number(value);
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto my-1 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {mode === "add" ? "Add New Product" : "Edit Product"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => handleChange("name", e)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={(e) => handleChange("description", e)}
            rows="3"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={(e) => handleChange("price", e)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={(e) => handleChange("stock", e)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            name="imgUrl"
            value={form.imgUrl}
            onChange={(e) => handleChange("imgUrl", e)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={(e) => handleChange("categoryId", e)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {mode === "add" ? "Add Product" : "Update Product"}
        </button>
      </div>
    </form>
  );
}
