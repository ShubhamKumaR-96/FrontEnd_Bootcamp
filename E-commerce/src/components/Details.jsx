import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loding";

const Details = () => {
  const [products, setProducts] = useState();
  const { id } = useParams();
  const getSingleProducts = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProducts(data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getSingleProducts();
  }, []);
  return products ? (
    <div className="W-[50%] h-full flex m-auto p-[10%]   ">
      <img
        className="object-contain h-[70%] w-[50%] "
        src={`${products.image}`}
        alt={products.title}
      />
      <div className="content p-5">
        <h1 className="text-2xl font-bold">{products.title}</h1>
        <h2 className="text-xl pt-2 ">Rs: {products.price}</h2>
        <p className="text-xm py-3 mb-5">{products.description}</p>
        <Link className="py-3 px-5 border border-b-2 border-black text-blue-600 rounded-lg mr-6 hover:bg-blue-800 hover:text-white ">
          Edit
        </Link>
        <Link className="py-3 px-5 border border-b-2 border-black text-red-600 rounded-lg hover:bg-red-800 hover:text-white ">
          Delete
        </Link>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
