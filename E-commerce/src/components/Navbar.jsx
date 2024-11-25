import React from "react";

const Navbar = () => {
  return (
    <nav className="w-[15%] bg-gray-100 h-full flex flex-col items-center pt-5">
      <a
        className="py-3 px-5 border border-b-2 border-black text-blue-600 "
        href="/create"
      >
        Add a new Product
      </a>

      <h1 className="text-xl w-[80%] my-3">Category Filter</h1>
      <ul className="w-[80%]">
        <li className="flex items-center mb-3">
          <span className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-400"></span>
          Cat 1
        </li>
        <li className="flex items-center mb-3">
          <span className="rounded-full mr-2 w-[15px] h-[15px] bg-green-400"></span>
          Cat 2
        </li>
        <li className="flex items-center mb-3">
          <span className="rounded-full mr-2 w-[15px] h-[15px] bg-red-400"></span>
          Cat 3
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
