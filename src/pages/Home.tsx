import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs"
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import Button from './../components/Button/index';
import Task from "../components/task";
import { arrayUnion, collection, getDocs, query, where } from "firebase/firestore";

type Api = {
  teste: string;
}

export default function Home() {
  const api:[] = [];
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  
  useEffect(() => {
    async function getData() {
      const q = query(collection(db, "Teste"));
      const datadocs = await getDocs(q);
      setData(datadocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      api.push(data);
    }
    getData();
  }, [])
  return (

    <div>
      <Navbar />
      {
        api.map(item=>(
          <h1>{item}</h1>
        ))
      }
      <div className="d-flex justify-content-center flex-column align-items-center gap-5">
        <div className="d-flex p-2 border border-2  border-secondary rounded ">
          <input value={name} onChange={e => setName(e.target.value)} type="text" className="border-0 " placeholder="Create a new project" />
          <Button radius="0.5rem" padding="3px"><BsPlus color="white" size={25} /></Button>

        </div>

        <div className="d-flex justify-content-center align-items-center border border-2 border-secondary rounded p-3">

          <Task NameProjectAndTask="Nomedoprojeto/nomedatask" time="Expira em algumas horas" />

        </div>
      </div>


    </div>
  )
}


