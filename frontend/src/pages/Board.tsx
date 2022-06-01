import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import CardKanban from "../components/CardKanban";
import { postTask } from "../models/Task";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { where } from 'firebase/firestore';
import { Droppable } from 'react-drag-and-drop'


export default function Board() {
    const params: any = useParams();

    const [project, setProject] = useState();
    const [tasksToDo, setTasksToDo] = useState<postTask[]>([]);
    const [tasksDoing, setTasksDoing] = useState<postTask[]>([]);
    const [tasksReview, setTasksReview] = useState<postTask[]>([]);
    const [tasksDone, setTasksDone] = useState<postTask[]>([]);

    async function getTasks() {
        let tasksToDoTemp: postTask[] = [];
        let tasksDoingTemp: postTask[] = [];
        let tasksReviewTemp: postTask[] = [];
        let tasksDoneTemp: postTask[] = [];

        let tasks = (await getDocs(query(collection(db, "/Tasks"), where('project', '==', params.id)))).docs;

        tasks.forEach((task) => {
            var taskData = task.data()
            taskData.uid = task.id;

            switch (taskData.status) {
                case "To do":
                    tasksToDoTemp.push(taskData);
                    break;
                case "Doing":
                    tasksDoingTemp.push(taskData);
                    break;
                case "Review":
                    tasksReviewTemp.push(taskData);
                    break;
                case "Done":
                    tasksDoneTemp.push(taskData);
                    break;
                default:
                    break;
            }
        })

        setTasksToDo(tasksToDoTemp);
        setTasksDoing(tasksDoingTemp);
        setTasksReview(tasksReviewTemp);
        setTasksDone(tasksDoneTemp);
    }

    async function getProject(id: string) {
        let project = (await getDoc(doc(db, 'Projects', id)));
        setProject(project.data()?.name);
    }

    useEffect(() => {
        if (params) {
            getProject(params.id);
            getTasks();
        }
    }, [params])

    return (
        <Container fluid className="mt-5">
            <h1 className="text-center mb-5">{project}</h1>
            <div className="row justify-content-center">
                <Droppable><CardKanban title="To do" reloadTasks={getTasks} tasks={tasksToDo} project={params.id} /></Droppable>
                <Droppable><CardKanban title="Doing" reloadTasks={getTasks} tasks={tasksDoing} project={params.id} /></Droppable>
                <Droppable><CardKanban title="Review" reloadTasks={getTasks} tasks={tasksReview} project={params.id} /></Droppable>
                <Droppable><CardKanban title="Done" reloadTasks={getTasks} tasks={tasksDone} project={params.id} /></Droppable>
            </div>
        </Container>
    )
}
