import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout.jsx";
import DetailPage from "./pages/DetailPage.jsx";

function App() {
  return (
    <>
      <div className="dark:bg-gray-900">
        <BrowserRouter>
          <Routes>
            <Route element={<BaseLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<DetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
