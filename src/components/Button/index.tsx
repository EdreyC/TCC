import { ButtonHTMLAttributes, ReactNode } from "react";
import './button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
type Props = {
    ButtonProps?: ButtonProps |undefined;
    padding?:string | number |undefined;
    radius?:string | undefined
    children:any
}

    
export default function Button(props: Props){
    return(
        <button {...props} style={{padding:props?.padding,borderRadius:props?.radius}}className="button"/>
          
        
    )
}