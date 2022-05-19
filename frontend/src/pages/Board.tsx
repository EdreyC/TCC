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
        var tasksToDoTemp: task[] = [];
        var tasksDoingTemp: task[] = [];
        var tasksReviewTemp: task[] = [];
        var tasksDoneTemp: task[] = [];

        let tasks = (await getDocs(query(collection(db, "/Tasks"), where('project', '==', params.id)))).docs;

        tasks.forEach((task) => {
            var taskData = task.data()

            switch (taskData.status) {
                case "To Do":
                    tasksToDoTemp.push();
                    break;
                case "Doing":
                    tasksDoingTemp.push();
                    break;
                case "Review":
                    tasksReviewTemp.push();
                    break;
                case "Done":
                    tasksDoneTemp.push();
                    break;
                default:
                    break;
            }
        })

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
