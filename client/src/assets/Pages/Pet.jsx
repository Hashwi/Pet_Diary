import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditPet from "../components/EditPet";

function Pet() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const [editingPetId, setEditingPetId] = useState(null);

  useEffect(() => {
    loadPet();
  }, []);

  async function loadPet() {
    try {
      const response = await fetch(`/api/${id}`);
      const data = await response.json();
      setPet(data);
    } catch (error) {
      console.log(error);
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
      loadPet();
      setEditingPetId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePet = async (id) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      loadPet();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <img
            className="img-fluid rounded-circle border border-5 border-warning"
            src="/rabbit.png"
            alt="Pet Image"
          />
        </div>
        <div className="col-lg-8">
          <div className="card border border-5 border-success">
            <div className="card-body">
              <h1 className="card-title">{pet.name}</h1>
              <p className="card-text">Type: {pet.type}</p>
              <p className="card-text">Birthdate: {pet.birthdate}</p>
              <p className="card-text">Notes: {pet.notes}</p>
              <div className="btn-group" role="group" aria-label="Pet Actions">
                {editingPetId === pet.id ? (
                  <EditPet pet={pet} updatePet={updatePet} />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pet;
