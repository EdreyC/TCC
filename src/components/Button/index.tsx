import { ButtonHTMLAttributes, ReactNode } from "react";
import './button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
type Props = {
    ButtonProps?: ButtonProps 
    padding?:string | number
    radius?:string 
    backgroundColor?:string
    children:any;
    onClick:()=>void;
}


export default function Button(props: Props){
    return(
        <button {...props} style={{padding:props?.padding, backgroundColor:props?.backgroundColor,borderRadius:props?.radius}}className="button">

            {/* {propsChildren.children} */}

        </button>

    )
}