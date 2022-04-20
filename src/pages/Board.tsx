import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Card, Container, Dropdown, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { BsPlus, BsTextLeft } from "react-icons/bs"
import { FiSettings } from "react-icons/fi";
import { FaComments } from "react-icons/fa";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

import Button from './../components/Button/index';
import FadeMenu from './../components/menu/index';
import LongMenu from "./../components/menu/index";
import Task from "../components/task";
import { AiOutlinePlus } from "react-icons/ai";
import CardKanban from "../components/CardKanban";
import Priority from "../components/Priority";

type task_type = {
    name: string,
    priority: number,
    description: string,
    comments: { user: string, text: string }[]
}

export default function Board() {

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
        <Container fluid className="mt-5">
            <div className="row justify-content-center align-items-center">
                <CardKanban title="To do" tasks={tasksToDo} />
                <CardKanban title="Doing" tasks={tasksDoing} />
                <CardKanban title="Review" tasks={tasksReview} />
                <CardKanban title="Done" tasks={tasksDone} />
            </div>
            {task &&
                <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h2 className='text-center'>
                                <strong>{task.name}</strong>
                                {/* <Priority number={task.priority} /> */}
                            </h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className='text-primary'>
                            <ListGroup>
                                <ListGroupItem className="bg-transparent text-muted text-start mb-4">
                                    <h4><BsTextLeft /> Description</h4>
                                    <p>{task.description}</p>
                                </ListGroupItem>
                                <ListGroupItem className="border-0">
                                    <h4><FaComments /> Comments</h4>
                                    {task.comments.map((comments) => {
                                        return (
                                            <div key={comments.user}>
                                                <h6><strong>{comments.user}</strong></h6>
                                                <p><small>{comments.text}</small></p>
                                                <hr />
                                            </div>
                                        )
                                    })}
                                </ListGroupItem>
                            </ListGroup>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <textarea name="" id="" cols={30} rows={10} placeholder="Add your comment..."></textarea>
                    </Modal.Footer>
                </Modal>
            }
        </Container>
    )
}


