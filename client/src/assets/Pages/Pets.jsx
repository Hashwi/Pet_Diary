import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddPet from "../components/AddPet";

export default function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    loadPets();
  }, []);

  async function loadPets() {
    const res = await fetch("/api/id");
    const data = await res.json();
    setPets(data);
  }

  const updatePet = async (id) => {
    sendRequest("PUT", id);
  };

  const deletePet = async (id) => {
    sendRequest("DELETE", id);
  };

  const sendRequest = async (method, id = "", options = {}) => {
    try {
      const response = await fetch(`/api/${id}`, { method, ...options });
      if (!response.ok) throw new Error(response.statusText);
      await getPets();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
   
    <div>
      <h1>My Pets</h1><br></br>
    <div className="grid-container">
        {pets.map((pet) => (
          <div key={pet.id} className="grid-item">
             <Link to={`/api/${pet.id}`}>
            <div>
              <img src="/rabbit.png" alt="image" />
            </div>
            <div>{pet.name}</div>
            <div>{pet.type}</div>
            <div>{pet.birthdate}</div>
            <div>{pet.notes}</div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => updatePet(pet.id)}
            >
              <i className="fa-solid fa-trash-can"></i> Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deletePet(pet.id)}
            >
              <i className="fa-solid fa-trash-can"></i> Delete
            </button>
            </Link>
          </div>
        ))}
      </div>

      <div>
       <Outlet />
      </div>
    </div>
  );
}
