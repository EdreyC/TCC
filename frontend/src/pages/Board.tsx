import { useEffect, useState } from "react";
import { Card, Container, Dropdown, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

import CardKanban from "../components/CardKanban";
import Priority from "../components/Priority";
import { task } from "../models/Task";

type task_type = {
    name: string,
    priority: number,
    description: string,
    comments: { user: string, text: string }[]
}

export default function Board(props: task) {

    const { user } = useAuth()
    const [show, setShow] = useState(false);
    const [task, setTask] = useState<task_type>({
        name: "NAME",
        priority: 1,
        description: "LOREM IPSUM DSADSFNDSJFBDSHFBDK SNFSKFJSAKBDSAJDNKASLNDKASNDKSAD",
        comments: [{ user: "nomeuser", text: "asfnsjffasdbjada" }]
    });
    const [tasksToDo, setTasksToDo] = useState<task_type[]>([]);
    const [tasksDoing, setTasksDoing] = useState<task_type[]>([]);
    const [tasksReview, setTasksReview] = useState<task_type[]>([]);
    const [tasksDone, setTasksDone] = useState<task_type[]>([]);

    const addTask = (type: number) => {

    }

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
