import { useContext } from "react";
import { valuesContext } from "../App";

function PanelGame(){
    const { values, setValues } = useContext(valuesContext);

    return(
        <div className="panel" id="panel">
            {values.keys.map((key,index)=>{
                
                return(
                <div className="row" id={`row${index}`} key={index}>
                    {key.map((subKey, sIndex)=>{
                        return(
                            <div className="cell" id={`cell${index}${sIndex}`} key={sIndex}>{subKey[0]}</div>
                        )
                    })}
                </div>
                )
            })}
        </div>
    )
}

export default PanelGame;