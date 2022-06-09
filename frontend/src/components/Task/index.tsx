import Priority from "../Priority";
import { Draggable } from 'react-drag-and-drop'

type Props = {
    NameProjectAndTask: string;
    time?: string;
    priority?: string;
}

const Task = (props: Props) => {
    return (
        <Draggable>
            <div style={{ backgroundColor: "#EAEAEA" }} className="d-flex gap-3 py-2 px-4 rounded justify-content-center align-items-center">
                <span style={{ fontWeight: 500 }}>
                    {props.NameProjectAndTask}
                </span>
                <span style={{ fontWeight: 600 }}>
                    {props.time}
                </span>
                <Priority priority={props.priority} />
            </div>
        </Draggable>
    )
}

export const NoTask = () => {
    return (
        <div style={{ backgroundColor: "#EAEAEA" }} className="d-flex gap-3 py-2 px-4 rounded justify-content-center align-items-center">
            <span style={{ fontWeight: 500 }}>

            </span>
        </div>
    )
}

export default Task;
