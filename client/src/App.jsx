import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Pet from "./assets/Pages/Pet";
import Pets from "./assets/Pages/Pets";
import AddPet from "./assets/components/AddPet";

import "./App.css";

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Pet Diary📖
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pets">
                  My Pets
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<Pet />} />
        </Routes>
      </div>
    </>
  );
}
