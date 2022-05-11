import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Card, Container, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { task, comment, postTask } from "../../models/Task";
import Button from "../Button";
import { Timestamp, addDoc, collection, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import Priority from "../Priority";
import { db } from "../../services/firebase";
import swal from "sweetalert";

type Props = {
    title: string;
    tasks: task[];
}

const CardKanban = (props: Props) => {
    const [task, setTask] = useState<postTask>();

    const [show, setShow] = useState(false);
    const [showInputTitle, setShowInputTitle] = useState(false);
    const [showInputDescription, setShowInputDescription] = useState(false);

    const [comment, setComment] = useState("");

    const addTask = () => {
        setShowInputTitle(true);
        setShowInputDescription(true);
        setShow(!show);
        setTask({
            name: "",
            priority: "Low",
            description: "",
            comments: [],
            status: props.title,
        });
    }

    const PostTask = async () => {
        await addDoc(collection(db, "Tasks"), {
            name: task?.name,
            priority: task?.priority,
            description: task?.description,
            comments: task?.comments,
            status: task?.status
        })
            .then(() =>
                swal("Parabéns"))
            .catch(() =>
                swal("Error"));
        // window.location.reload();

    }

    const DeleteTask = async () => {
        await deleteDoc(doc(db, "Tasks"))
    }

    const UpdateTask = async () => {
        const taskUpdate = doc(db, "Tasks");

        await updateDoc(taskUpdate, {
            name: task.name,
            priority: true,
            description: task.description,
            status: task.status
        })
    }

    const handleName = () => {
        setShowInputTitle(!showInputTitle);
    }

    const handleDescription = () => {
        setShowInputDescription(!showInputDescription);
    }

    const handlePriority = (oldPriority: string) => {
        if (oldPriority === "Low")
            setTask({
                name: task.name,
                priority: "Medium",
                description: task.description,
                comments: task.comments,
                status: task.status,
            })
        else if (oldPriority === "Medium")
            setTask({
                name: task.name,
                priority: "High",
                description: task.description,
                comments: task.comments,
                status: task.status,
            })
        else if (oldPriority === "High")
            setTask({
                name: task.name,
                priority: "DoNow",
                description: task.description,
                comments: task.comments,
                status: task.status,
            })
        else if (oldPriority === "DoNow")
            setTask({
                name: task.name,
                priority: "Low",
                description: task.description,
                comments: task.comments,
                status: task.status,
            })
        else
            setTask({
                name: task.name,
                priority: "Low",
                description: task.description,
                comments: task.comments,
                status: task.status,
            })
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
                <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {showInputTitle &&
                                <input type="text" value={task.name} onChange={(e) => setTask({
                                    name: e.target.value,
                                    priority: task.priority,
                                    description: task.description,
                                    comments: task.comments,
                                    status: task.status,
                                })} onBlur={(e) => handleName()} />
                            }
                            {!showInputTitle &&
                                <h2 className='text-center align-middle' >
                                    <strong onClick={(e) => setShowInputTitle(!showInputTitle)}>{task.name}</strong>
                                    <Priority priority={task.priority} onClick={() => handlePriority(task.priority)} />
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
                                        <input type="text" value={task.description} onChange={(e) => setTask({
                                            name: task.name,
                                            priority: task.priority,
                                            description: e.target.value,
                                            comments: task.comments,
                                            status: task.status,
                                        })} onBlur={(e) => setShowInputDescription(!showInputDescription)} />
                                    }
                                    {!showInputDescription &&
                                        <p className='text-center' onClick={(e) => setShowInputDescription(!showInputDescription)}>
                                            {task.description}
                                        </p>
                                    }
                                </ListGroupItem>
                                <ListGroupItem className="border-0">
                                    <h4><FaComments /> Comments</h4>
                                    {task.comments?.map((comments) => {
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
                        <Button onClick={() => PostTask()}>Adicionar</Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    )
}

export default CardKanban
