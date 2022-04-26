import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Card, Container, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import Button from "../Button";

type task_type = {
    name: string,
    priority: number,
    description: string,
    comments: { user: string, text: string }[]
}

type Props = {
    title: string;
    // onClick: Function;
    tasks: task_type[];
}
const CardKanban = (props: Props) => {
    const [task, setTask] = useState<task_type>();
    const [value, setValue] = useState("Add your comment...");

    const [show, setShow] = useState(false);

    const addTask = () => {
        setShow(!show);
        setTask({
            name: "",
            priority: 1,
            description: "",
            comments: [{ user: "", text: "" }]
        });
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
                            <h2 className='text-center'>
                                <strong>{task.name}</strong>
                                {/* <Priority number={task.priority} /> */}
                                <input type="text" />
                            </h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className='text-primary'>
                            <ListGroup>
                                <ListGroupItem className="bg-transparent text-muted text-start mb-4">
                                    <h4><BsTextLeft /> Description</h4>
                                    <input type="text" />
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
                    <Modal.Footer className="justify-content-center" data-color-mode="light">
                        <MDEditor
                            value={value}
                            onChange={setValue}
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
