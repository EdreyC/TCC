import { ButtonHTMLAttributes, ReactNode } from "react";
import './button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?:any;
    radius?:string
    padding?:string;
    backgroundColor?:string;
}
    
export default function Button( propsButton:ButtonProps){
    return(
        <button style={{backgroundColor:propsButton?.backgroundColor,padding:propsButton?.padding,borderRadius:propsButton?.radius}} className="button" {...propsButton} ></button>
    )
}