import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import EditPet from "../components/EditPet";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [editingPetId, setEditingPetId] = useState(null);
  const navigate = useNavigate();

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

  const updatePet = async (editedPet) => {
    try {
      const response = await fetch(`/api/${editedPet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPet),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      getPets();
      setEditingPetId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePet = async (id) => {
    sendRequest("DELETE", id).then(getPets);
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

  const showPetPage = (id) => {
    navigate(`/pets/${id}`);
  };

  return (
    <div>
      <h1>My Pets</h1>
      <br />
      <div className="grid-container">
        {pets.map((pet) => (
          <div key={pet.id} className="grid-item">
            <Link to={`/pets/${pet.id}`}>
              <div>
                <img src="/rabbit.png" alt="image" />
              </div>
              <div className="grid-item">Name: {pet.name}</div>
              <div className="grid-item">Type: {pet.type}</div>
              <div className="grid-item"> Age: {pet.birthdate}</div>
              <div className="grid-item"> Notes: {pet.notes}</div>
            </Link>
            <br></br>
            
            <div className="grid-container-1">
              {editingPetId === pet.id ? (
                <EditPet pet={pet} updatePet={updatePet} />
              ) : (
                <span>
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => setEditingPetId(pet.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deletePet(pet.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => showPetPage(pet.id)}
                  >
                    Go To Profile
                  </button>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
