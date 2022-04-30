import { useEffect, useState } from "react";
import { Card, Container, Dropdown, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

import CardKanban from "../components/CardKanban";
import Priority from "../components/Priority";
import { task } from "../models/Task";
import { useParams } from "react-router-dom";

type task_type = {
    name: string,
    priority: number,
    description: string,
    comments: { user: string, text: string }[]
}

export default function Board() {
    const params:any = useParams();

    console.log(params);

    const [tasksToDo, setTasksToDo] = useState<task[]>([]);
    const [tasksDoing, setTasksDoing] = useState<task[]>([]);
    const [tasksReview, setTasksReview] = useState<task[]>([]);
    const [tasksDone, setTasksDone] = useState<task[]>([]);

    return (
        <Container fluid className="" style={{ marginTop: '8rem'}}>
            <div className="row justify-content-center align-items-center">
                <CardKanban title="To do" tasks={tasksToDo} />
                <CardKanban title="Doing" tasks={tasksDoing} />
                <CardKanban title="Review" tasks={tasksReview} />
                <CardKanban title="Done" tasks={tasksDone} />
            </div>
        </Container>
    )
}
