import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import Toastify from "toastify-js";

export default function BaseLayout() {
  if (!localStorage.access_token) {
    Toastify({
      text: "Please login first",
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
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
