import { Link, useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    Toastify({
      text: "You've logged out",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#F87171",
        color: "#000000",
      },
    }).showToast();
    navigate("/login");
  }
  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/">
        <h1 className="text-xl font-bold">Branded Store</h1>
      </Link>

      <div className="space-x-4 flex items-center">
        <Link
          to="/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Add Product
        </Link>
        <Link
          to="/add-user"
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Add User
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
