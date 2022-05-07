import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import CardKanban from "../components/CardKanban";
import { task } from "../models/Task";
import { useParams } from "react-router-dom";

export default function Board() {
    const params: any = useParams();

    console.log(params.id);

    useEffect(() => {
        
    }, [])

    const [tasksToDo, setTasksToDo] = useState<task[]>([]);
    const [tasksDoing, setTasksDoing] = useState<task[]>([]);
    const [tasksReview, setTasksReview] = useState<task[]>([]);
    const [tasksDone, setTasksDone] = useState<task[]>([]);

    return (
        <Container fluid className="" style={{ marginTop: '8rem' }}>
            <div className="row justify-content-center align-items-center">
                <CardKanban title="To do" tasks={tasksToDo} />
                <CardKanban title="Doing" tasks={tasksDoing} />
                <CardKanban title="Review" tasks={tasksReview} />
                <CardKanban title="Done" tasks={tasksDone} />
            </div>
        </Container>
    )
}
