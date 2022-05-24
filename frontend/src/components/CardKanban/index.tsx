import { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { postTask } from "../../models/Task";
// import Button from "../Button";
import Priority from "../Priority";
import { db } from "../../services/firebase";
import swal from "sweetalert";
import { addDoc, collection, deleteDoc, getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

type Props = {
    title: string;
    tasks: postTask[];
    project: string;
    reloadTasks: () => {};
}

const CardKanban = (props: Props) => {
    const { user } = useAuth();
    const [task, setTask] = useState<postTask>();
    const [show, setShow] = useState(false);
    const [showInputTitle, setShowInputTitle] = useState(false);
    const [showInputDescription, setShowInputDescription] = useState(false);
    const [comment, setComment] = useState("");

    const [showButtonAddTask, setShowButtonAddTask] = useState(true);

    useEffect(() => {
    }, [])

    const addTask = () => {
        setTask({
            uid: "",
            name: "",
            priority: "Low",
            description: "",
            comments: [],
            status: props.title,
        });
        setShowInputTitle(true);
        setShowInputDescription(true);
        setShow(!show);
        setShowButtonAddTask(true);
    }

    const PostTask = async () => {
        task.name ?
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
                    }))
                .finally(() =>
                    props.reloadTasks()
                )
            :
            swal({
                icon: 'warning',
                title: 'Void name',
                text: 'Add name to your task.',
            })
    }

    const DeleteTask = async () => {
        await deleteDoc(doc(db, "Tasks", task.uid))
            .finally(() =>
                props.reloadTasks()
            );
    }

    const confirmRemove = async () => {
        swal("Are you sure?", {
            dangerMode: true,
            buttons: true,
        }).then((value) => {
            if (value)
                DeleteTask();
        });
    }

    const UpdateTask = async () => {
        const taskUpdate = doc(db, "Tasks", task.uid);

        await updateDoc(taskUpdate, {
            name: task?.name,
            priority: task?.priority,
            description: task?.description,
            status: task?.status
        })
            .then(() =>
                swal({
                    icon: 'success',
                    title: 'Task Updated',
                    text: 'Congratulations! Your task has been updated.',
                }))
            .catch(() =>
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error! Please try again.',
                }))
            .finally(() =>
                props.reloadTasks()
            );
    }

    const CommentTask = async () => {
        const taskComment = doc(db, "Tasks", task.uid);

        await updateDoc(taskComment, {
            comments: arrayUnion({ text: comment, owner: user?.name })
        })
            .then(() =>
                swal({
                    icon: 'success',
                    title: 'Comment created',
                    text: 'Congratulations! Yourcomment has been created.',
                }))
            .catch(() =>
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error! Please try again.',
                }))
            .finally(() => {
                setComment('');
                props.reloadTasks();
                openTask(task.uid);
            });
    }

    const handleName = () => {
        setShowInputTitle(!showInputTitle);
        document.getElementById("task-title")?.focus();
    }

    const handleDescription = () => {
        setShowInputDescription(!showInputDescription);
        document.getElementById("task-description")?.focus();
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
        else if (oldPriority === "Medium")
            ptask.priority = "High";
        else if (oldPriority === "High")
            ptask.priority = "DoNow"
        else if (oldPriority === "DoNow")
            ptask.priority = "Low"
        else
            ptask.priority = "Low"
        setTask(ptask)
    }

    const openTask = async (id: string) => {
        let task = (await getDoc(doc(db, 'Tasks', id)));
        let tasksData: postTask[] = task?.data();
        tasksData.uid = task.id;
        setTask(tasksData);
        setShowInputTitle(false);
        setShowInputDescription(false);
        setShow(!show);
        setShowButtonAddTask(false);
    }

    return (
        <div className="col-lg-3">
            <Card>
                <Card.Header>{props.title}</Card.Header>
                <Card.Body className="p-2">
                    {props.tasks.map((task) => {
                        return (<Card className="my-2" key={task.uid} onClick={(e) => { openTask(task.uid) }} style={{ cursor: 'pointer' }}>
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
                            <select className="form-select" value={props.title} onChange={(e) => setTask({
                                uid: task.uid,
                                name: task.name,
                                priority: task.priority,
                                description: task.description,
                                comments: task.comments,
                                status: e.target.value,
                            })}>
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Review">Review</option>
                                <option value="Done">Done</option>
                            </select>
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
                                    {task.comments?.map((comment, index) => {
                                        return (
                                            <div key={index}>
                                                <small>{comment?.owner}</small>
                                                <p>{comment?.text}</p>
                                                <hr />
                                            </div>
                                        )
                                    })}
                                </ListGroupItem>
                            </ListGroup>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center" data-color-mode="light">
                        {!showButtonAddTask &&
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add your comment..."
                                value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        }
                        {showButtonAddTask &&
                            <Button onClick={(e) => PostTask()}>Adicionar</Button>
                        }
                        {!showButtonAddTask &&
                            <>
                                <Button onClick={(e) => CommentTask()}>Comentar</Button>
                                <Button onClick={(e) => UpdateTask()}>Atualizar</Button>
                            </>
                        }
                        <Button variant="danger" onClick={(e) => confirmRemove()}>Remover</Button>
                    </Modal.Footer>
                </Modal>
            }
        </div >
    )
}

export default CardKanban
