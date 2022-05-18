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

    async function getTasks() {
        const q = query(collection(db, "Tasks"), where('project', '==', params.id));
        const tasks = await getDocs(q)
        
        return await getDocs(q);
    }

    useEffect(() => {

    }, [])

    const [tasksToDo, setTasksToDo] = useState<task[]>([]);
    const [tasksDoing, setTasksDoing] = useState<task[]>([]);
    const [tasksReview, setTasksReview] = useState<task[]>([]);
    const [tasksDone, setTasksDone] = useState<task[]>([]);

    return (
        <Container fluid className="" style={{ marginTop: '8rem' }}>
            <div className="row justify-content-center align-items-center">
                <CardKanban title="To do" tasks={tasksToDo} project={params.id} />
                <CardKanban title="Doing" tasks={tasksDoing} project={params.id} />
                <CardKanban title="Review" tasks={tasksReview} project={params.id} />
                <CardKanban title="Done" tasks={tasksDone} project={params.id} />
            </div>
        </Container>
    )
}
