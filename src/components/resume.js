import { useContext } from "react";
import { valuesContext } from "../App";
import close from "../images/close.png"

function ResumePanel(){
    const { values, setValues } = useContext(valuesContext);

    return(
        <div className="resume" id="resume">
            <img src={close} alt="close" className="close"></img>
            <div className="colors">
            {values.keys.map((key,index)=>{
                
                return(
                <div className="row" id={`row${index}`} key={index}>
                    {key.map((subKey, sIndex)=>{
                        return(
                            <div className="cell" id={`cell${index}${sIndex}`} key={sIndex}></div>
                        )
                    })}
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default ResumePanel;