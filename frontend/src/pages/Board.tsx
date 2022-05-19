import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import CardKanban from "../components/CardKanban";
import { postTask, task } from "../models/Task";
import { useParams } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { where } from 'firebase/firestore'

export default function Board() {
    const params: any = useParams();

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

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <Container fluid className="mt-5">
            <div className="row justify-content-center align-items-center">
                <CardKanban title="To do" tasks={tasksToDo} project={params.id} />
                <CardKanban title="Doing" tasks={tasksDoing} project={params.id} />
                <CardKanban title="Review" tasks={tasksReview} project={params.id} />
                <CardKanban title="Done" tasks={tasksDone} project={params.id} />
            </div>
        </Container>
    )
}
