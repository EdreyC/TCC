import { BsArrowLeftRight } from "react-icons/bs";

const theme = {
    DoNow: {
        background: "#DF2B4B",
        title: "DoNow",
        color: "#FFFFFF"
    },
    High: {
        background: "#FF4E6E",
        title: "High",
        color: "#FFFFFF"
    },
    Medium: {
        background: "#FFC56D",
        title: "Medium",
        color: "#FFFFFF"
    },
    Low: {
        background: "#69D26D",
        title: "Low",
        color: "#FFFFFF"
    },
}

type Props = {
    priority: string;
    onClick?: () => void;
}

const Priority = (props: Props) => {
    return (
        <span {...props} className="rounded px-2 py-1 my-auto mx-1 align-middle" style={{ backgroundColor: theme[props.priority].background, fontSize: '12px', colostylesr: theme[props.priority].color, cursor: 'pointer' }}>
            {theme[props.priority].title}
        </span>
    )
}

export default Priority;
