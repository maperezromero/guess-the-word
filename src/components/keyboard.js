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
        //console.log(e);
        if (values.status!=='OVER'){
            let copyKeys = [...values.keys];
            let currentWord = [...values.currentWord]

            //console.log(copyKeys);
            if( letter !== 'ENTER' && letter !== 'DEL'){
                console.log(values.letterIndex);
                if(values.letterIndex < 5){
                    copyKeys[values.rowIndex][values.letterIndex] = letter;
                    console.log(copyKeys);
                    //const index = values.letterIndex ===4 ? 4
                    setValues({...values, keys: copyKeys, letterIndex: values.letterIndex + 1})
                }else{
                    console.log('You have already entered the five characters, click enter or delete one of them');
                }
            }else if(letter === 'DEL'){
                if(values.letterIndex > 0){
                    copyKeys[values.rowIndex][values.letterIndex-1] = '';
                    setValues({...values, keys: copyKeys, letterIndex: values.letterIndex - 1})
                }
                /* let element = document.getElementById(`cell${values.rowIndex}${values.letterIndex-1}`);
                element.classList.remove("cell-green"); */

            }else{
                //ENTER
                if(values.letterIndex === 5){
                    const enteredWord = values.keys[values.rowIndex];
                    for (let i = 0; i < enteredWord.length; i++) {
                        if(enteredWord[i]===values.wordToGuess[i]){
                            let element = document.getElementById(`cell${values.rowIndex}${i}`);
                            element.classList.add("green");
                            element = document.getElementById(`k${enteredWord[i]}`);
                            element.removeAttribute('class');
                            element.className = 'key green';
                        }else{
                            if(!values.wordToGuess.split("").some(letter => letter===enteredWord[i])){
                                let element = document.getElementById(`cell${values.rowIndex}${i}`);
                                element.classList.add("wrong");
                                element = document.getElementById(`k${enteredWord[i]}`);
                                element.removeAttribute('class');
                                element.className = 'key wrong';
                            }
                        }
                    }
                }else{
                    console.log(values.letterIndex);
                    console.log('You not have completed the word!');
                }
            }
        }
    }
        return(
            <div className="keys">
                {keys.map((key,index)=>{
                    return(
                        <div className="keys-row" key={index}>
                        {key.map((subkey, sIndex)=>{
                            return (
                                <div key={sIndex} className="key normal" id={`k${subkey}`} onClick={(e)=>handleClick(e)}>{subkey}</div>
                            )
                        })}
                        </div>
                    )
                })}
            
            </div>
        );
}

export default Keyboard;