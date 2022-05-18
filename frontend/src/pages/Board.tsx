import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import CardKanban from "../components/CardKanban";
import { task } from "../models/Task";
import { useParams } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { where } from 'firebase/firestore'

export default function Board() {
    const params: any = useParams();

    console.log(params.id);

    useEffect(() => {

    }, [])

    const [tasksToDo, setTasksToDo] = useState<task[]>([]);
    const [tasksDoing, setTasksDoing] = useState<task[]>([]);
    const [tasksReview, setTasksReview] = useState<task[]>([]);
    const [tasksDone, setTasksDone] = useState<task[]>([]);

    async function getTasks() {
        let tasksToDoTemp: task[];
        let tasksDoingTemp: task[];
        let tasksReviewTemp: task[];
        let tasksDoneTemp: task[];
        
        const q = await query(collection(db, "/Tasks"), where('project', '==', params.id));
        let tasks = (await getDocs(q)).docs;

        if (tasks.status === "To Do") {
            tasksToDoTemp.push();
        }
        else if (tasks.status === "Doing") {
            tasksDoingTemp.push();
        }
        else if (tasks.status === "Review") {
            tasksReviewTemp.push();
        }
        else if (tasks.status === "Done") {
            tasksDoneTemp.push();
        }
        // return 
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
