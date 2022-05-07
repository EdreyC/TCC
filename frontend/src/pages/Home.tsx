import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs"
import { db } from "../services/firebase";
import Button from './../components/Button/index';
import Task, { NoTask } from "../components/Task";
import { addDoc, arrayUnion, collection, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

type Data = {
  id: string;
  name: string;
  owner: string
}

type Task = {
  name: string;
  description: string
}

export default function Home() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  // const navigate = useNavigate();
  const [dataProjetc, setDataProject] = useState<Data[]>([]);
  const [dataTask, setDataTask] = useState<Task[]>([]);

  const PostData = async () => {
    //  await addDoc(collection(db,"Tasks"),{
    //   name:taskName,
    //   description:taskDescription
    // })
    await addDoc(collection(db, "Projects"), {
      Task:["Tasks/wPavHvNw668LweCBlQe8"], //  NOME DA COLEÇÃO/ID DO DOCUMENTO PRA REFERÊNCIAR
      name: name,
      owner: user?.name,
    });
    // window.location.reload();
  }

  async function getData() {
    const q = query(collection(db, "Projects"));
    const datadocs = await getDocs(q);
    // console.log(datadocs.docs.map((doc) => ({ ...doc.data()})))
    // setData(datadocs.docs.map(item =>{item.data()}))
    // console.log(datadocs.docs);
    setDataProject(datadocs.docs.map((item) => ({ ...item.data() as Data })));

    // console.log(dataProjetc);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="d-flex mx-auto justify-content-center flex-column align-items-center mt-5">
      <div className="d-flex p-2 border border-2  border-secondary rounded ">
        <input value={name} onChange={e => setName(e.target.value)} type="text" className="border-0 " placeholder="Create a new project" />
        <Button onClick={() => PostData()} radius="0.5rem" padding="3px"><BsPlus color="white" size={25} /></Button>
      </div>
      <div className="border border-2 border-secondary rounded p-3 my-5">
        {
          dataProjetc.length == 0 ? <h2>Create your first task above ☝</h2> :
            <div className="rounded p-3">
              {
                dataProjetc.map(item => (
                  <>
                    <p>{item.id}</p>
                    <Task key={item.name} NameProjectAndTask={item.name + "/nomedatask"} time="Expira em algumas horas" />
                  </>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}
