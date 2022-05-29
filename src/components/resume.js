import { useContext } from "react";
import { valuesContext } from "../App";
import close from "../images/close-grey.png"

function ResumePanel(){
    const { values, setValues } = useContext(valuesContext);
    //console.log(values.keys);

    const handleCloseResume = ()=>{
        setValues({...values, showResume: false})
    }
    
    return(
        <div className="resume" id="resume">
            <img src={close} alt="close" className="close" onClick={handleCloseResume}></img>
            <div className="colors">
            {values.keys.map((key,index)=>{
                
                return(
                <div className="row-color" id={`row${index}`} key={index}>
                    {key.map((subKey, sIndex)=>{
                        return(
                            <div className={`color ${values.keys[index][sIndex][1]}`} id={`cell${index}${sIndex}`} key={sIndex}></div>
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