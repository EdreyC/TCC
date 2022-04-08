import { Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
    title: string;
    tasks: {nome: string, priority: number}[];
}
const CardKanban = (props: Props) => {

    return (
        <div className="col-lg-3">
            <Card>
                <Card.Header>{props.title}</Card.Header>
                <Card.Body className="p-2">
                    {props.tasks.map((task) => {
                        return (<Card className="my-2" key={task.nome}>
                            <Card.Header>{task.nome} {task.priority}</Card.Header>
                        </Card>)
                    })}
                </Card.Body>
                <Card.Footer className="text-center">
                    <a><AiOutlinePlus /> Add Task</a>
                </Card.Footer>
            </Card>
        </div>
    )
}
export default CardKanban
