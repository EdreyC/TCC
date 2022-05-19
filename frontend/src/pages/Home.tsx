import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs"
import { db } from "../services/firebase";
import Button from './../components/Button/index';
import Task from "../components/Task";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import swal from "sweetalert";
import { postTask } from "../models/Task";

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
  const [dataProjetc, setDataProject] = useState<Data[]>([]);
  const [dataTask, setDataTask] = useState<postTask[]>([]);

  async function getData() {
    const q = query(collection(db, "Projects"));
    const datadocs = await getDocs(q);
    // console.log(datadocs.docs.map((doc) => ({ ...doc.data()})))
    // setData(datadocs.docs.map(item =>{item.data()}))
    // console.log(datadocs.docs);
    setDataProject(datadocs.docs.map((item) => ({ ...item.data() as Data })));

    // console.log(dataProjetc);
  }

  async function getTasks() {
    let tasks: postTask[] = (await getDocs(query(collection(db, "/Tasks")))).docs;

    tasks.forEach((task) => {
      var taskData = task.data()
      taskData.uid = task.id;
      console.log(taskData);

      getProject(taskData.project);
    })
  }

  async function getProject(project: string) {
    let projects = (await getDocs(query(collection(db, "/Projects"), where('project', '==', project)))).docs;
    projects.forEach((project) => {
      console.log(project.data());
    })
    return "nameproject";
  }

  const PostData = async () => {
    await addDoc(collection(db, "Projects"), {
      Task: [],
      name: name,
      owner: user?.name,
    })
      .then(() =>
        swal({
          icon: 'success',
          title: 'Task created',
          text: 'Congratulations! Your task has been created.',
        }))
      .catch(() =>
        swal({
          icon: 'error',
          title: 'Error',
          text: 'Error! Please try again.',
        }));
    getData();
  };

  useEffect(() => {
    getData();
    getTasks();
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
                dataProjetc.map((item, index) => (
                  <div key={index}>
                    <p>{item.id}</p>
                    <Task NameProjectAndTask={item.name + "/nomedatask"} priority='Medium' time="Expira em algumas horas" />
                  </div>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}
