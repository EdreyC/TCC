import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs"
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import Button from './../components/Button/index';
import Task from "../components/task";
import { addDoc, arrayUnion, collection, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";


type Data = {
  name: string;
  owner: string
}

export default function Home() {
  const { user } = useAuth()

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  const PostData = async () => {
    await addDoc(collection(db, "Projects"), {
      name: name,
      owner: user?.name,
    });
    window.location.reload();

  }
  async function getData() {

    const q = query(collection(db, "Projects"));
    const datadocs = await getDocs(q);
    // console.log(datadocs.docs.map((doc) => ({ ...doc.data()})))
    // setData(datadocs.docs.map(item =>{item.data()}))
    // console.log(datadocs.docs);
    setData(datadocs.docs.map(item => item.data() as Data));
    console.log(data);

  }
  useEffect(() => {

    getData();
  }, [])
  return (

    <div>
      <Navbar />
      <div className="d-flex justify-content-center flex-column align-items-center gap-5">
        <div className="d-flex p-2 border border-2  border-secondary rounded ">
          <input value={name} onChange={e => setName(e.target.value)} type="text" className="border-0 " placeholder="Create a new project" />
          <Button onClick={() => PostData()} radius="0.5rem" padding="3px"><BsPlus color="white" size={25} /></Button>
        </div>
        <div className="d-flex justify-content-center align-items-center border border-2 border-secondary flex-column gap-4 rounded p-3">
          {
            data.map(item => (
              <Task NameProjectAndTask={item.name + "/nomedatask"} time="Expira em algumas horas" />
            ))
          }
        </div>
      </div>
    </div>
  )
}
