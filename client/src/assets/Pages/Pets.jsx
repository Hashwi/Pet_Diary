import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import EditPet from "../components/EditPet";
import "./Pets.css";

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
    <div className="container-fluid">
      <br /><br /><br />
      <header> <img src="https://cdn.pixabay.com/photo/2020/12/01/07/04/cats-5793173_1280.jpg"/></header>
      <h1 className="text-center">My Pets 🐾</h1><br />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {pets.map((pet) => (
          <div key={pet.id} className="col-3">
            <Link to={`/pets/${pet.id}`} className="card text-decoration-none">
              <div className="card-body">
                <div className="pet-image">
                  <img src="/rabbit.png" alt="Pet" className="img-fluid" />
                </div>
                <div className="pet-items">
                  <h2 className="card-title">{pet.name}</h2>
                  <h5>Type: {pet.type}</h5>
                  <h6>Age: {pet.birthdate}</h6>
                  <p>Notes: {pet.notes}</p>
                </div>
              </div>
            </Link>
            <div className="button-group">
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
