import ProductForm from "../components/ProductForm";
import axios from "axios";
import baseUrl from "../constants/constant";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function AddProduct() {
  const navigate = useNavigate();

  async function handleAddSubmit(form) {
    try {
      await axios.post(`${baseUrl}/apis/products/products`, form, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      Toastify({
        text: "Successfully added a product",
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
  return (
    <>
      <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <ProductForm mode="add" onSubmit={handleAddSubmit} />
      </div>
    </>
  );
}
