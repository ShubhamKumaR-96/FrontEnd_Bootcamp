import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loding";

const Home = () => {
  const [products] = useContext(ProductContext);
  const navigate=useNavigate();
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1] || "");
  const filterProducts = products
    ? category
      ? products.filter((item) => item.category === category)
      : products
    : [];
  return (
    <>
      <Navbar />

      {products ? (
        <div className="ml-[15%] w-[85%] h-screen overflow-y-auto bg-gray-100 p-4">
          {/* Button to navigate back to home */}{" "}
          {category && (
            <button
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => navigate("/")}
            >
              
              Back to Home
            </button>
          )}
          {/* Responsive grid */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProducts.map((item) => (
              <Link
                to={`/details/${item.id}`}
                key={item.id}
                className="bg-white shadow-lg border p-4 flex flex-col"
              >
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="object-contain h-full max-w-full hover:scale-110"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="mt-4">
                  <h1 className="text-lg font-bold line-clamp-1 hover:text-blue-600">
                    {item.title}
                  </h1>
                  <h2 className="text-sm text-gray-500 mt-1">
                    {item.category}
                  </h2>
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    Price: ${item.price}
                  </p>
                  <p className="text-xm text-gray-700 mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
