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
      navigate("/pets"); // Navigate to Pets page
    });
  };

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

  const addPet = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };
    try {
      const response = await fetch("/api", options);
      if (!response.ok) throw new Error(response.statusText);
    } catch (err) {
      setError(err.message);
    }
  };

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
    <div className="container-fluid">
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
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
}
