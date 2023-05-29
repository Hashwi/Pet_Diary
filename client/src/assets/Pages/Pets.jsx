import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddPet from "../components/AddPet";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    getPets();
  }, []);

  async function getPets() {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      setPets(data);
    } catch (err) {
      setError(err.message);
    }
  }

  const updatePet = async (id) => {
    sendRequest("PUT", id)
    .then(getPets)
  };

  const deletePet = async (id) => {
    sendRequest("DELETE", id)
    .then(getPets)
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
             <Link to={`/pets/${pet.id}`}>
            <div>
              <img src="/rabbit.png" alt="image" />
            </div>
            <div>{pet.name}</div>
            <div>{pet.type}</div>
            <div>{pet.birthdate}</div>
            <div>{pet.notes}</div>
            </Link>
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
           
          </div>
        ))}
      </div>

      <div>
       <Outlet />
      </div>
    </div>
  );
}
