const theme = {
    
    colors: {
        DoNow: "#DF2B4B",
        High: "#FF4E6E",
        Medium: "#FFC56D",
        Low: "#69D26D"
    },
    title: {
        DoNow: "Do Now",
        High: "High",
        Medium: "Medium",
        Low: "Low"
    }
}

type Props = {
    number:number | undefined;
}

export const Priority = (props:Props) => {

    return (
        <div {...props.number} className=" text-white rounded py-1 px-4" style={{ backgroundColor:theme.colors.DoNow,fontWeight: 600 }}>
            {theme.title.DoNow}
        </div>
    )
}

// export const High = ()=>{
//     return (

//     )
// }

