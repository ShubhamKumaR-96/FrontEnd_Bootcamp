import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loding";

const Details = () => {
  const [products, setProducts] = useState();
  const { id } = useParams();
  const navigate=useNavigate()
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
    <div className=" relative w-full h-full flex flex-col items-center p-4 md:p-10">
      <button
        className="absolute top-4 left-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        
        Back to Home
      </button>
      <div className="flex flex-col md:flex-row md:w-3/4 lg:w-2/3 xl:w-1/2 h-full m-auto bg-white shadow-lg mt-1">
      <img
        className="object-contain h-[55%] w-[40%]"
        src={`${products.image}`}
        alt={products.title}
      />

      <div className=" p-8 flex flex-col justify-between" >
        <div className="py-4">
        <h1 className="text-2xl font-bold">{products.title}</h1>
        <h2 className="text-xl lg:my-8 ">Rs: {products.price}</h2>
        <p className="text-xm py-3 mb-8 lg:mb-12 ">{products.description}</p>
        <Link className=" py-3 px-5 border border-b-2 border-black  rounded-lg mr-6 bg-blue-400 text-white hover:bg-blue-800 hover:text-white  ">
          Edit
        </Link>
        <Link className="py-3 px-5 border border-b-2 border-black text-white bg-red-400 rounded-lg hover:bg-red-800 hover:text-white ">
          Delete
        </Link>
        
        </div>
        
      
      </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
