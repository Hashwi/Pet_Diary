import { useEffect, useState } from 'react'
import './App.css'


  export default function App(){
    const [pet, setPet] = useState([]);

    useEffect(()=>{
        getPets()
    },[])


    const getPets = () => {
        fetch("/api/petlist")
          .then(response => response.json())
          .then(pet => {
            setPet(pet);
          })
          .catch(error => {
            console.log(error);
          });
      };
  
  
  return (
    <>
      <h1 className="read-the-docs">
        Pet Diary
      </h1>
    </>
  )
}