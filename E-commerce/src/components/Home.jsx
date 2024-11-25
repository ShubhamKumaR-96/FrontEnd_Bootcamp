import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loding";

const Home = () => {
  const [products] = useContext(ProductContext);
  return products ? (
    <>
      <Navbar />
      <div className=" w-[85%]  bg-slate-200 p-3 flex flex-wrap gap-8 overflow-x-hidden overflow-y-auto ">
        {products.map((product, idx) => (
          <Link key={product.id}
            to={`details/${product.id}`}
            className="shadow w-[20%] h-[35vh] mb-3  border rounded flex flex-col justify-center items-center  "
          >
            <div
              className="w-full h-[80%]  bg-contain bg-no-repeat bg-center hover:scale-110 "
              style={{
                backgroundImage:`url(${product.image})`,
              }}
            ></div>
            <h1 className="hover:text-blue-700">{product.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
