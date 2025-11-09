import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import axios from "axios";
import baseUrl from "../constants/constant";
import Toastify from "toastify-js";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/apis/products/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditSubmit(form) {
    try {
      await axios.put(`${baseUrl}/apis/products/products/${id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      Toastify({
        text: "Successfully edited a product",
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

  useEffect(() => {
    fetchProduct();
  });
  return (
    <>
      <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <ProductForm
          onSubmit={handleEditSubmit}
          mode="edit"
          existingData={product}
        />
      </div>
    </>
  );
}
