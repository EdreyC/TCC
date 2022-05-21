import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs"
import { db } from "../services/firebase";
import Button from './../components/Button/index';
import Task from "../components/Task";
import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import swal from "sweetalert";
import { postTask } from "../models/Task";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateDoc } from "firebase/firestore";

updateDoc
export default function Home() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [dataTasks, setDataTasks] = useState<postTask[]>([]);

  async function getProject(id: string) {
    let project = (await getDoc(doc(db, 'Projects', id)));
    return project.data()?.name;
  }

  async function getTasks() {
    let tasks: postTask[] = (await getDocs(query(collection(db, "/Tasks")))).docs;

    let tasksData: [] = [];
    tasks.forEach((task) => {
      let taskData: postTask = task.data();
      taskData.uid = task.id;

      // taskData.project = await getProject(task.project);
      getProject(taskData?.project).then((project) => {
        taskData.project = project;
      });
      console.log(taskData.project)
      tasksData.push(taskData);
    })
    console.log(tasksData);
    setDataTasks(tasksData);
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
  };

  useEffect(() => {
    const auth = getAuth();
   
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
          dataTasks.length == 0 ? <h2>Create your first project above ☝</h2> :
            <div className="rounded p-3">
              {
                dataTasks.map((item, index) => (
                  <div key={index} className="my-3">
                    <Task NameProjectAndTask={item.project + "/" + item.name} priority='Medium' time="Expira em algumas horas" />
                  </div>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}
