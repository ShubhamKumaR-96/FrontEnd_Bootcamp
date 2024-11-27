import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";

const App = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/create" element={<Create />} />

      </Routes>
    </div>
  );
};

export default App;
