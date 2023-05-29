import React, { useEffect, useState } from "react";

const EditPet = ({ pet, updatePet }) => {
  const [editedPet, setEditedPet] = useState({ ...pet });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPet((petlist) => ({
      ...petlist,
      [name]: value,
    }));
  };

  useEffect(() => {
    let formattedDate;
    if (editedPet && editedPet.birthdate) {
      const dateObject = new Date(editedPet.birthdate);
      const month = parseInt(dateObject.getMonth()) + 1;

      formattedDate = `${dateObject.getFullYear()}-${(
        "0" + month
      ).slice(-2)}-${("0" + dateObject.getDate()).slice(-2)}`;
      setEditedPet((editedPet) => ({
        ...editedPet,
        birthdate: formattedDate,
      }));
    }

    return () => {
      formattedDate;
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePet(editedPet);
  };

  return (
    <form className="EditPet" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={editedPet.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type:
        </label>
        <select
          name="type"
          className="form-control"
          value={editedPet.type}
          onChange={handleInputChange}
        >
          <option value="">Select pet type</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="bird">Bird</option>
          <option value="fish">Fish</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="birthdate" className="form-label">
          Birthdate:
        </label>
        <input
          type="date"
          name="birthdate"
          className="form-control"
          value={editedPet.birthdate}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="notes" className="form-label">
          Notes:
        </label>
        <textarea
          name="notes"
          className="form-control"
          value={editedPet.notes}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default EditPet;
