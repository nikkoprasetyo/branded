import { useParams, Link } from "react-router";
import baseUrl from "../constants/constant";
import { useEffect, useState } from "react";
import axios from "axios";
import loadingGif from "../assets/loadingUpload.svg";

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/apis/pub/products/products/${id}`
      );

      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error, "ini erorrnya");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  //   if (!product) {
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         <h1 className="text-xl font-semibold text-gray-600">
  //           Product not found
  //         </h1>
  //       </div>
  //     );
  //   }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <img src={loadingGif} alt="Loading..." className="w-1/4" />
        </div>
      ) : (
        <>
          <div className="p-8 max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-block mb-4 text-blue-600 hover:underline"
            >
              ← Back to Products
            </Link>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h1>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-lg font-semibold text-blue-600">
                    Rp{product.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
