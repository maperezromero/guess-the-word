import { useContext } from "react";
import { valuesContext } from "../App";

function Keyboard(){
    const { values, setValues } = useContext(valuesContext);
    const keys = [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L'],
        ['ENTER','Z','X','C','V','B','N','M','DEL']];
    
    //console.log(keys.map(key=>key));

    function handleClick(e){
        let letter= e.target.innerHTML;
        console.log(e);
        if (values.status!=='OVER'){
            let copyKeys = [...values.keys]
            //console.log(copyKeys);
            if( letter !== 'ENTER' && letter !== 'DEL'){
                loop1:
                for(let i=0; i<copyKeys.length;i++){
                    loop2:
                    //console.log('entra en loop1');
                    for(let j=0; j<copyKeys[i].length;j++){
                        //console.log('En loop 2');
                        //console.log(copyKeys[0,4]);
                        if(copyKeys[i][j]===''){
                            //console.log('entra en el if');
                            copyKeys[i][j]=e.target.innerHTML;
                            setValues({...values, key: copyKeys})
                            break loop1;
                        }
                    }
                }
            }else if(letter === 'DEL'){

            }else{
                
            }
            //console.log(copyKeys);
        }
    }
        return(
            <div className="keys">
                {keys.map((key,index)=>{
                    return(
                        <div className="keys-row" key={index}>
                        {key.map((subkey, sIndex)=>{
                            return (
                                <div key={sIndex} className="key" id={`k${index}${sIndex}`} onClick={(e)=>handleClick(e)}>{subkey}</div>
                            )
                        })}
                        </div>
                    )
                })}
            
            </div>
        );
}

export default Keyboard;