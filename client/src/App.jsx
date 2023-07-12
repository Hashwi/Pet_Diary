import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Pet from "./assets/Pages/Pet";
import Pets from "./assets/Pages/Pets";
import AddPet from "./assets/components/AddPet";
import Login from "./assets/Pages/Login";
import Register from "./assets/Pages/Register";
import Dashboard from "./assets/Pages/Dashboard";
import NavBar from "./assets/components/NavBar";
import AuthContext from "./context/AuthContext";
import RequireAuth from "./assets/components/RequireAuth";

function App() {

  const [user, setUser] = useState(null);
  // const auth = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true)
    }
  }, []);

  function login(email, password) {
    setUser(true)
  }

  const logout = () => {
    setUser(false);
    localStorage.removeItem("token");
  };

  const authObject = {
    user,
    login,
    logout,
  }

  return (
  <AuthContext.Provider value={authObject}>
      <div>
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/private"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/private/pets"
            element={
              <RequireAuth>
                <Pets />
              </RequireAuth>
            }
          />
          <Route
            path="/private/pets/:id"
            element={
              <RequireAuth>
                <Pet />
              </RequireAuth>
            }
          />
          <Route
            path="/private/addpet"
            element={
              <RequireAuth>
                <AddPet />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;