import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import AddProduct from "./views/AddProductPage";
import AddUser from "./views/AddUserPage";
import BaseLayout from "./views/BaseLayout";
import EditProduct from "./views/EditProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
