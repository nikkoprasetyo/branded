// import frieren from "../assets/frieren.jpeg";
import { Link } from "react-router";

export default function Card({ product }) {
  return (
    <>
      <div className="m-2 w-[220px] h-[380px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
        <Link to={`/products/${product.id}`}>
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={product.imgUrl}
            alt=""
          />
        </Link>
        <div className="p-5">
          <Link to={`/products/${product.id}`}>
            <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </Link>
          <p className="truncate text-xs line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Details
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
