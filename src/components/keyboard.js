import { logDOM } from "@testing-library/react";
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
        
        const delay = async ( ms = 1000 ) => new Promise (res => setTimeout(res,ms));
        let letter= e.target.innerHTML;
        
        if (values.status!=='over' && values.status!=='win'){
            //console.log(values.status);
            let copyKeys = [...values.keys];
            let currentWord = [...values.currentWord]
            if( letter !== 'ENTER' && letter !== 'DEL'){
                //console.log(values.letterIndex);
                if(values.letterIndex < 5){
                    copyKeys[values.rowIndex][values.letterIndex][0] = letter;
                    //console.log(copyKeys);
                    setValues({...values, keys: copyKeys, letterIndex: values.letterIndex + 1})
                }else{
                    console.log(values);
                    console.log('You have already entered the five characters, click enter or delete one of them');
                }
            }else if(letter === 'DEL'){
                if(values.letterIndex > 0){
                    copyKeys[values.rowIndex][values.letterIndex-1][0] = '';
                    setValues({...values, keys: copyKeys, letterIndex: values.letterIndex - 1})
                }
                
            }else{
                //ENTER
                if(values.letterIndex === 5){
                    //console.log(values.keys[values.rowIndex]);
                    const enteredWord = values.keys[values.rowIndex].map(key=>key[0]);
                    async function changeFormat(){
                        for (let i = 0; i < enteredWord.length; i++) {
                            if(enteredWord[i]===values.wordToGuess[i]){
                                let element = document.getElementById(`cell${values.rowIndex}${i}`);
                                copyKeys[values.rowIndex][i][1]='g';
                                setValues({...values, keys: copyKeys});
                                element.classList.add("green");
                                element.classList.add("anime");
                                element = document.getElementById(`k${enteredWord[i]}`);
                                element.removeAttribute('class');
                                element.className = 'key green';
                            }else{
                                if(!values.wordToGuess.split("").some(letter => letter===enteredWord[i])){
                                    let element = document.getElementById(`cell${values.rowIndex}${i}`);
                                    copyKeys[values.rowIndex][i][1]='w';
                                    setValues({...values, keys: copyKeys});
                                    element.classList.add("wrong");
                                    element.classList.add("anime");
                                    element = document.getElementById(`k${enteredWord[i]}`);
                                    element.removeAttribute('class');
                                    element.className = 'key wrong';
                                }
                            }
                            await delay(150);
                        }

                    }
                    changeFormat();
                    //console.log(enteredWord.join(''), values.wordToGuess);
                    if( enteredWord.join('') === values.wordToGuess){
                        //console.log('ENTRO EN OKKKK');
                        setValues({...values, status: 'win'});
                        //console.log(values);
                        console.log(`You win at round ${values.rowIndex + 1}`);
                    }else{
                        console.log('aplicoValoresa values');
                        setValues({...values, rowIndex: values.rowIndex + 1, letterIndex: 0});
                        console.log('HA IDO BIEN');
                    }
                }else{
                    //console.log(values.letterIndex);
                    console.log('You not have completed the word!');
                }
            }
        }else if(values.status === 'win'){
            console.log('You have alredy won!');
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