import { ButtonHTMLAttributes, ReactNode } from "react";
import './button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
    
export default function Button(props: ButtonProps){
    return(
        <button className="button my-2"{...props}/>
    )
}