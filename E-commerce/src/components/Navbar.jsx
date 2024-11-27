import React, { useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { ProductContext } from "../utils/Context";

const Navbar = () => {
  const [products]=useContext(ProductContext)
  const navigate=useNavigate();

  let categories=products && products.reduce((acc,cv)=>[...acc,cv.category],[])
  categories=[...new Set(categories)]

  return (
    <nav className="w-[15%] h-screen bg-gray-300 fixed top-0 left-0 ">
      <button onClick={()=>navigate('/create')} className="m-4 p-2 border-2 border-black text-sm font-semibold text-white bg-slate-800 hover:bg-blue-800 hover:text-white rounded-md">
        Add a new Product
      </button>

      <h1 className="text-xl font-semibold px-2 border-b-2 pb-2">
        Category Filter
      </h1>
      <div className="flex flex-col justify-start space-y-3 px-2 mt-6">
       {
        categories.map((category,id)=>(
          <Link to={`?/category=${category}`}  className="hover:text-blue-800 flex items-center space-x-2" key={id}>
          <span className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-400"></span>
          {category}
        </Link>
        ))
       }
      </div>
    </nav>
  );
};

export default Navbar;
