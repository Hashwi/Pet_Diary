import React from "react";
import AddPet from "../components/AddPet.jsx";

export default function Home() {
  return(
  <div>
    Home
  <h1>Pet Diary!</h1>
      <div>
        <h2>Add your pet</h2>
        <AddPet/>
      </div>
  </div>
  )
}