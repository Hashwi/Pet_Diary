import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import AddPet from "../components/AddPet";
import Pets from "./Pets";

function Pet() {
  const [pet, setPet] = useState({});
  const { id } = useParams();

  useEffect(() => {
    loadPet();
  }, []);

  async function loadPet() {
    const res = await fetch(`/api/${id}`);
    const data = await res.json();
    setPet(data);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <img className="img-fluid rounded-circle border border-5 border-warning" src="/rabbit.png" alt="Pet Image" />
        </div>
        <div className="col-lg-8">
          <div className="card border border-5 border-success">
            <div className="card-body">
              <h1 className="card-title">{pet.name}</h1>
              <p className="card-text">Type: {pet.type}</p>
              <p className="card-text">Birthdate: {pet.birthdate}</p>
              <p className="card-text">Notes: {pet.notes}</p>
              <div className="btn-group" role="group" aria-label="Pet Actions">
                <Link to={`/edit/${pet.id}`} className="btn btn-outline-info btn-sm">
                  <i className="fa-solid fa-trash-can"></i> Edit
                </Link>
                <button className="btn btn-outline-danger btn-sm" onClick={() => deletePet(pet.id)}>
                  <i className="fa-solid fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pet;
