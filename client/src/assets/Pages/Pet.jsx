import React, { useEffect, useState } from "react";
import { Link, useParams,  } from "react-router-dom";
import EditPet from "../components/EditPet";
import "./Pet.css";

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/${pet.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log("Pet deleted");
      window.location.href = "/pets"; // Route back to the Pets page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div><br></br><br></br><br></br>
    <header> <img src="https://cdn.pixabay.com/photo/2020/12/01/07/04/cats-5793173_1280.jpg"/></header>
    <div className="container">
      
      <h1>Pet Profile🧸</h1>
      <div className="row">
        <div className="col-lg-4">
          <img
            className="img-fluid rounded-circle border border-5 border-warning"
            src="/rabbit.png"
            alt="Pet Image"
          />
        </div>
        <div className="col-lg-8">
          <div className="card border border-5 border-success" >
            <div className="card-body">
              <h1 className="card-title">{pet.name}</h1>
              <h3 className="card-text">Type: {pet.type}</h3>
              <h5 className="card-text">Birthdate: {pet.birthdate}</h5>
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
                      onClick={handleDelete}
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
    </div>
  );
}

export default Pet;
