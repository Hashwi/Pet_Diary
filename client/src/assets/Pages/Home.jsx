import React from "react";
import {useState} from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import "./Home.css";

function Home() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="container-fluid">
      <div className="content">
        <br></br><br></br>
        <header><img src="https://cdn.pixabay.com/photo/2020/12/01/07/04/cats-5793173_1280.jpg"/></header>
        <h1>Pet Diary 📖</h1>
        <div className="home-container">
            {currentForm === 'login'? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}
        </div>
      </div>
    </div>
  );
}

export default Home;