import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import baseUrl from "../constants/constant";
import Toastify from "toastify-js";

export default function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/apis/auth/add-user`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Successfully added a user",
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
      navigate("/");
    } catch (error) {
      console.log(error, "ini error");

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
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Add New User
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
