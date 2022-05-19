import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Card, Container, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { task, postTask } from "../../models/Task";
import Button from "../Button";
import Priority from "../Priority";
import { db } from "../../services/firebase";
import swal from "sweetalert";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

type Props = {
    title: string;
    tasks: postTask[];
    project: string;
}

const CardKanban = (props: Props) => {
    const [task, setTask] = useState<postTask>();
    const [dataId, setDataId] = useState("");
    const [show, setShow] = useState(false);
    const [showInputTitle, setShowInputTitle] = useState(false);
    const [showInputDescription, setShowInputDescription] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
    }, [])


    const addTask = () => {
        setShowInputTitle(true);
        setShowInputDescription(true);
        setShow(!show);
        setTask({
            uid: "",
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
            status: task?.status,
            project: props.project
        })
            .then(() =>
                swal({
                    icon: 'success',
                    title: 'Task created',
                    text: 'Congratulations! Your task has been created.',
                }))
            .catch(() =>
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error! Please try again.',
                }));
    }

    const DeleteTask = async () => {
        await deleteDoc(doc(db, "Tasks", dataId))
    }

    const UpdateTask = async () => {
        const taskUpdate = doc(db, "Tasks", dataId);

        await updateDoc(taskUpdate, {
            name: task?.name,
            priority: true,
            description: task?.description,
            status: task?.status
        })
    }

    const handleName = () => {
        setShowInputTitle(!showInputTitle).then(() => {
            document.getElementById("task-title")?.focus();
        });
    }

    const handleDescription = () => {
        setShowInputDescription(!showInputDescription).then(() => {
            document.getElementById("task-description")?.focus();
        });
    }

    const handlePriority = (oldPriority: string) => {

        var ptask: postTask = {
            uid: task?.uid,
            name: task?.name,
            priority: "Low",
            description: task?.description,
            comments: task?.comments,
            status: task?.status,
        };
        if (oldPriority === "Low")
            ptask.priority = "Medium"
        else if (oldPriority === "Medium") {
            ptask.priority = "High";
        }
        else if (oldPriority === "High")
            ptask.priority = "DoNow"
        else if (oldPriority === "DoNow")
            ptask.priority = "Low"
        else
            ptask.priority = "Low"
        setTask(ptask)
    }

    const openTask = async (id: string) => {
        let task = (await getDocs(query(collection(db, "/Tasks/" + id)))).docs;
        console.log(task)
        // let taskData = task[0].data();
        // console.log(taskData)
    }

    return (
        <div className="col-lg-3">
            <Card>
                <Card.Header>{props.title}</Card.Header>
                <Card.Body className="p-2">
                    {props.tasks.map((task) => {
                        return (<Card className="my-2" key={task.uid} onClick={(e) => { openTask(task.uid) }}>
                            <Card.Header>{task.name} <Priority priority={task.priority} /></Card.Header>
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
                                <input id="task-title" className="input-tasks" type="text" placeholder="Add your title..."
                                    value={task.name} onChange={(e) => setTask({
                                        uid: task.uid,
                                        name: e.target.value,
                                        priority: task.priority,
                                        description: task.description,
                                        comments: task.comments,
                                        status: task.status,
                                    })} onBlur={(e) => setShowInputTitle(!showInputTitle)} />
                            }
                            {!showInputTitle &&
                                <h2 className='text-center align-middle' >
                                    <strong onClick={(e) => handleName()}>{task.name}</strong>
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
                                        <input id="task-description" className="input-tasks" type="text" placeholder="Add your description..."
                                            value={task.description} onChange={(e) => setTask({
                                                uid: task.uid,
                                                name: task.name,
                                                priority: task.priority,
                                                description: e.target.value,
                                                comments: task.comments,
                                                status: task.status,
                                            })} onBlur={(e) => setShowInputDescription(!showInputDescription)} />
                                    }
                                    {!showInputDescription &&
                                        <p className='text-center' onClick={(e) => handleDescription()}>
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
