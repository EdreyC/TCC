import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Card, Container, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { task } from "../../models/Task";
import Button from "../Button";
import { Timestamp } from "firebase/firestore";
import Priority from "../Priority";

type Props = {
    title: string;
    tasks: task[];
}

const CardKanban = (props: Props) => {
    const [task, setTask] = useState<task>();
    const [comment, setComment] = useState("Add your comment...");

    const [show, setShow] = useState(false);
    const [showInputTitle, setShowInputTitle] = useState(false);
    const [showInputDescription, setShowInputDescription] = useState(false);

    const [name, setName] = useState("aa");
    const [description, setDescription] = useState("aa");

    const addTask = () => {
        setShowInputTitle(true);
        setShowInputDescription(true);
        setShow(!show);
        let date = new Date().getUTCSeconds()
        setTask({
            id: "",
            name: "",
            priority: "",
            description: "",
            comments: [{ uid: "", text: "", date: new Timestamp(date, date * 1000) }],
            date: new Timestamp(date, date * 1000),
            uid: "",
            tags: [],
            userAssigned: "",
            status: "",
            project: ""
        });
    }

    const handleName = () => {
        setShowInputTitle(!showInputTitle);
    }

    const handleDescription = () => {
        setShowInputDescription(!showInputDescription);
    }

    return (
        <div className="col-lg-3">
            <Card>
                <Card.Header>{props.title}</Card.Header>
                <Card.Body className="p-2">
                    {props.tasks.map((task) => {
                        return (<Card className="my-2" key={task.name}>
                            <Card.Header>{task.name} {task.priority}</Card.Header>
                        </Card>)
                    })}
                </Card.Body>
                <Card.Footer className="text-center">
                    <button className="btn" onClick={(e) => addTask()}><AiOutlinePlus /> Add Task</button>
                </Card.Footer>
            </Card>
            {task &&
                <Modal show={show} onHide={(e) => setShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {showInputTitle &&
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => handleName()} />
                            }
                            {!showInputTitle &&
                                <h2 className='text-center align-middle' >
                                    <strong>{task.name}</strong>
                                    <Priority priority="High" />
                                </h2>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className='text-primary'>
                            <ListGroup>
                                <ListGroupItem className="bg-transparent text-muted text-start mb-4">
                                    <h4><BsTextLeft /> Description</h4>
                                    {showInputDescription &&
                                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={(e) => setShowInputDescription(!showInputDescription)} />
                                    }
                                    {!showInputDescription &&
                                        <p className='text-center' onClick={(e) => setShowInputDescription(!showInputDescription)}>
                                            {task.description}
                                        </p>
                                    }
                                </ListGroupItem>
                                <ListGroupItem className="border-0">
                                    <h4><FaComments /> Comments</h4>
                                    {task.comments.map((comments) => {
                                        return (
                                            <div key={comments.uid}>
                                                <h6><strong>{comments.uid}</strong></h6>
                                                <p><small>{comments.text}</small></p>
                                                {/* <span>{comments.date}</span> */}
                                                <hr />
                                            </div>
                                        )
                                    })}
                                </ListGroupItem>
                            </ListGroup>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center" data-color-mode="light">
                        <MDEditor
                            value={comment}
                            onChange={setComment}
                            preview={'edit'}
                        />
                        <Button>Adicionar</Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    )
}

export default CardKanban
