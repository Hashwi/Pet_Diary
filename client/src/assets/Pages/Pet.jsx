import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditPet from "../components/EditPet";
import dayjs from "dayjs";
import "./Pet.css";

function Pet() {
  const [pet, setPet] = useState({});
  const [editingPetId, setEditingPetId] = useState(null);
  const shortDateFormat = dayjs(pet.birthdate).format("DD/MM/YYYY");
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    loadPet();
  }, [id]);

  async function loadPet() {
    try {
      const response = await fetch(`/api/pets/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPet(data);
        console.log(pet)
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updatePet = async (editedPet) => {
    try {
      const response = await fetch(`/api/pets/${editedPet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(editedPet),
      });
      if (response.ok) {
        const data = await response.json();
        setEditingPetId(null);
        loadPet();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    };
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/pets/${id}`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        console.log("Pet deleted");
        navigate("/private/pets"); // Navigate to Pets page
        } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div><br></br><br></br><br></br>
    <header> <img src="https://cdn.pixabay.com/photo/2020/12/01/07/04/cats-5793173_1280.jpg"/></header>
    <div className="container">
      <h1>{pet.name}'s Profile🧸</h1>
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
              <h1 className="card-title">Name: {pet.name}</h1>
              <h3 className="card-text">Type: {pet.type}</h3>
              <h5 className="card-text">Birthdate: {shortDateFormat}</h5>
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
