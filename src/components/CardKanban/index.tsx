import { useState } from "react";
import { Card, Container, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTextLeft } from "react-icons/bs";
import { FaComments } from "react-icons/fa";

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
    const [task, setTask] = useState<task_type>({
        name: "NAME",
        priority: 1,
        description: "LOREM IPSUM DSADSFNDSJFBDSHFBDK SNFSKFJSAKBDSAJDNKASLNDKASNDKSAD",
        comments: [{ user: "nomeuser", text: "asfnsjffasdbjada" }]
    });

    const [show, setShow] = useState(false);

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
                    <button className="btn" onClick={(e) => setShow(true)}><AiOutlinePlus /> Add Task</button>
                </Card.Footer>
            </Card>
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
        </div>
    )
}
export default CardKanban
