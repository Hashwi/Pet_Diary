import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Pet from "./assets/Pages/Pet";
import Pets from "./assets/Pages/Pets";
import AddPet from "./assets/components/AddPet";

import "./App.css";

export default function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<Pet />} />
      </Routes>
      {/* <h1>Pet Diary!</h1>
      <div>
        <h2>Add your pet</h2>
        <AddPet/>
      </div> */}
      <nav>
        <ul>
          <li>
            <Link to="/">Go back to homepage</Link>
          </li>
          <li>
            <Link to="/pets">Go to My Pets</Link>
          </li>
        </ul>
      </nav>
      
    </>
  );
}
