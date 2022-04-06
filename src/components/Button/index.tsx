import { ButtonHTMLAttributes, ReactNode } from "react";
import './button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:any;
    radius:string
    padding:string;
}
// type Props = {
//     // ButtonProps?: ButtonProps |undefined;
//     padding?:string | number |undefined;
//     radius?:string | undefined
//     children:any
// }

    
export default function Button( propsButton:ButtonProps){
    return(
        <button style={{padding:propsButton.padding,borderRadius:propsButton.radius}} className="button" {...propsButton} ></button>
          
        
    )
}