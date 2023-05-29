import React from "react";
import AddPet from "../components/AddPet.jsx";

export default function Home() {
  return(
  <div>
    <br></br>
  <h1>Pet Diary 📖</h1>
      <div className="container-fluid">
        <br></br>
        <h4>Add your pet 🖋️</h4>
        <AddPet/> 
      </div>
  </div>
  )
}