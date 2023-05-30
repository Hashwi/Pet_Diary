import React from "react";
import AddPet from "../components/AddPet.jsx";
import "./Home.css";

export default function Home() {
  return (
    <div  className="container-fluid">
       
      <div className="content">
        <br></br><br></br>
        <header> <img src="https://cdn.pixabay.com/photo/2020/12/01/07/04/cats-5793173_1280.jpg"/></header>
        <h1>Pet Diary 📖</h1>
        <h4>Add your pet 🖋️</h4>
        <div className="home-container">
          
          <AddPet />
        </div>
      </div>
    </div>
  );
}
