import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPet.css";
import EditPet from "./EditPet";

const petTypes = ["cat", "dog", "bird", "fish"];

export default function AddPet() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    type: "",
    birthdate: "",
    notes: "",
  });
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPets();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPet().then(() => {
      getPets();
      navigate("/private/pets"); // Navigate to Pets page
    });
  }

  async function getPets() {
    try {
      const response = await fetch(`/api/pets`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
        const data = await response.json();
        if (!response.ok) throw new Error(response.statusText);
        setPets(data);
        // console.log(data);
    } catch (err) {
      setError(err.message);
    }
  }

  const addPet = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(input),
    };
    try {
      const response = await fetch("/api/pets", options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Handle successful response here (e.g., update pet list, reset input form)
      console.log("Pet added successfully");
      // Additional actions can be performed based on the specific requirements of your application
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <br /><br /><br />
      <header> <img src="https://cdn.pixabay.com/photo/2020/12/01/07/04/cats-5793173_1280.jpg"/></header><br/>
      <h1>Add your pet 🖋️</h1>
      <div className="form-container border p-5">
        <div className="container">
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Select Type:
              </label>
              <select
                name="type"
                id="type"
                className="form-control"
                value={input.type}
                onChange={handleInputChange}
              >
                <option value="">Select pet</option>
                {petTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label">
                Date of Birth:
              </label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                className="form-control"
                placeholder="Date of birth"
                value={input.birthdate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="notes" className="form-label">
                Special Notes:
              </label>
              <textarea
                name="notes"
                id="notes"
                className="form-control"
                placeholder="Notes"
                value={input.notes}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className=" btn-outline-primary btn-sm">
              Submit
            </button>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
