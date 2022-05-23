import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs"
import { db } from "../services/firebase";
import Button from './../components/Button/index';
import Task from "../components/Task";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import swal from "sweetalert";
import { postTask } from "../models/Task";
import { project } from "../models/Project";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [dataTasks, setDataTasks] = useState<postTask[]>([]);
  const [dataProjects, setDataProjects] = useState<project[]>([]);
  const [showTasks, setShowTasks] = useState(false);

  const getProjects = async () => {
    await getDocs(query(collection(db, "/Projects")))
      .then((projectsData) => {
        let projects = projectsData.docs.map((project) => {
          let projectData: any = project?.data();
          projectData.uid = project?.id;
          return projectData;
        });
        setDataProjects(projects);
        return projects;
      })
  }

  const getTasks = async () => {
    await getDocs(query(collection(db, "/Tasks"), where('priority', '==', 'DoNow')))
      .then((tasksData) => {
        let tasks = tasksData.docs.map((task) => {
          let taskData: any = task?.data();
          taskData.uid = task?.id;
          return taskData;
        });
        setDataTasks(tasks);
        return tasks;
      })
  }

  const PostData = async () => {
    name ?
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
          }))
      :
      swal({
        icon: 'warning',
        title: 'Void name',
        text: 'Add name to your project.',
      })
  };

  const UpdateTask = () => {
    setDataTasks(dataTasks.map((task) => {
      dataProjects.forEach((project, index) => {
        if (task.project === project?.uid) {
          task.project = project?.name;
        }
      });
      return task;
    }))
    setShowTasks(true);
  }

  useEffect(() => {
    const auth = getAuth();

    getProjects()
    getTasks()
  }, []);

  return (
    <div className="d-flex mx-auto justify-content-center flex-column align-items-center mt-5">
      <div className="d-flex p-2 border border-2  border-secondary rounded ">
        <input value={name} onChange={e => setName(e.target.value)} type="text" className="border-0 " placeholder="Create a new project" />
        <Button onClick={() => PostData()} radius="0.5rem" padding="3px"><BsPlus color="white" size={25} /></Button>
      </div>
      <div className="border border-2 border-secondary rounded p-3 my-5">
        {dataProjects.length == 0 ? <h2>Create your first project above ☝</h2> :
          <div className="rounded p-3">
            <div className="align-items-center justify-content-center"></div>
            {!showTasks &&
              <Button onClick={() => UpdateTask()}>See Tasks</Button>
            }
            {showTasks ?
              dataTasks.length == 0 ? <h2>Don't have any task with Priority 'Do Now'</h2> :
                dataTasks.map((item, index) => (
                  <div key={index} className="my-3">
                    <Task NameProjectAndTask={item.project + "/" + item.name} priority={item.priority} />
                  </div>
                )) :
              <span></span>
            }
          </div>}
      </div>
    </div>
  )
}
