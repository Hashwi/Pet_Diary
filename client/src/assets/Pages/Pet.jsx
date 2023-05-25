import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import AddPet from "../components/AddPet";
import Pets from "./Pets";



export default function(){
    const [pet, setPet]= useState({});
    const {id} = useParams();

    useEffect(() => {
        loadpet();
      }, [id]);
    
      async function loadpet() {
        const res = await fetch(`/api/${id}`);
        const data = await res.json();
        setPet(data);
      }
    

    return(
        <div>
          
      <h3>
        {pet.name}
      </h3>
      <Outlet />
    </div>

    )
}