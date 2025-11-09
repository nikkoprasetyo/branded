import Card from "../components/Card";
import { useEffect, useState } from "react";
import baseUrl from "../constants/constant";
import axios from "axios";
import loadingGif from "../assets/loadingUpload.svg";
import Toastify from "toastify-js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("DESC");
  const pages = generatePages();

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/apis/pub/products/products?i=${filter}&q=${search}&page=${currentPage}&sort=${sort}`
      );

      setProducts(data.data);
      setCurrentPage(data.meta.page);
      setTotalPage(data.meta.totalPages);
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
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/apis/pub/products/categories`
      );
      console.log(data.data, "ini categories");

      setCategories(data.data);
    } catch (error) {}
  }

  function generatePages() {
    const array = [];
    for (let i = 1; i <= totalPage; i++) {
      array.push(i);
    }
    return array;
  }

  function handlePages(page) {
    setCurrentPage(page);
  }

  function handleCategory(e) {
    setFilter(e.target.value);
  }
  function handleSort(e) {
    setSort(e.target.value);
  }
  useEffect(() => {
    fetchProducts();
  }, [currentPage, search, filter, sort]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Search and Select */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 mb-4 px-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Category Select */}
        <select
          className="w-full sm:w-1/4 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleCategory(e)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          className="w-full sm:w-1/4 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleSort(e)}
        >
          <option>Sort</option>
          <option key="1" value="ASC">
            Ascending
          </option>
          <option key="2" value="DESC">
            Descending
          </option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <img src={loadingGif} alt="Loading..." className="w-1/4" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 justify-items-center">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}

          <nav aria-label="Page navigation example">
            <ul className="flex justify-center  -space-x-px text-base h-10">
              {pages.map((page, index) => {
                return (
                  <li key={index}>
                    <a
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => handlePages(page)}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
