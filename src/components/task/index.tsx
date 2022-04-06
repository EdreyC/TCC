type Props = {
    NameProjectAndTask:string;
    time?:string;
}
const Task = (props:Props)=>{
    
    return(
        <div style={{backgroundColor:"#EAEAEA"}} className="d-flex gap-3 py-2 px-4 rounded justify-content-center align-items-center">
            <span style={{fontWeight:500}}>
            {props.NameProjectAndTask}
            </span>
            <span style={{fontWeight:600}}>
            {props.time}
            </span>
            <div className="bg-danger text-white rounded py-1 px-4" style={{fontWeight:600}}>
            Do Now
            </div>
        </div>
    )
}
export default Task