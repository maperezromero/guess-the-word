import axios from "axios";
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
        //console.log( values.wordToGuess);
        const delay = async ( ms = 1000 ) => new Promise (res => setTimeout(res,ms));

        let letter= e.target.innerHTML;
        
        if (values.status!=='over' && values.status!=='win'){
            //console.log(values);
            let copyKeys = [...values.keys];
            //let currentWord = [...values.currentWord]
            if( letter !== 'ENTER' && letter !== 'DEL'){
                //console.log(values.letterIndex);
                if(values.letterIndex < 5){
                    if(!values.darkMode){
                        let element = document.getElementById(`cell${values.rowIndex}${values.letterIndex}`);
                        element.removeAttribute('class');
                        element.className = 'cell light';
                    }
                    copyKeys[values.rowIndex][values.letterIndex][0] = letter;
                    //console.log(copyKeys);
                    setValues({...values, keys: copyKeys, letterIndex: values.letterIndex + 1})
                }else{
                    //console.log(values);
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
                                element.removeAttribute('class');
                                element.className = 'cell green anime';
                                element = document.getElementById(`k${enteredWord[i]}`);
                                element.removeAttribute('class');
                                element.className = 'key green';
                            }else{
                                //No Match
                                if(!values.wordToGuess.split("").some(letter => letter===enteredWord[i])){
                                    let element = document.getElementById(`cell${values.rowIndex}${i}`);
                                    copyKeys[values.rowIndex][i][1]='w';
                                    setValues({...values, keys: copyKeys});
                                    element.removeAttribute('class');
                                    element.className = 'cell wrong';
                                    element = document.getElementById(`k${enteredWord[i]}`);
                                    element.removeAttribute('class');
                                    element.className = 'key wrong';
                                }else{
                                    //some match
                                    //console.log(enteredWord[i]);
                                    const numMatchesWordToGuess = values.wordToGuess.split("").filter(letter=> letter === enteredWord[i]).length;
                                    const numMatchesEnteredWord = enteredWord.filter(letter=> letter === enteredWord[i]).length;
                                    if(numMatchesWordToGuess>=numMatchesEnteredWord){
                                        let element = document.getElementById(`cell${values.rowIndex}${i}`);
                                        copyKeys[values.rowIndex][i][1]='y';
                                        setValues({...values, keys: copyKeys});
                                        element.removeAttribute('class');
                                        element.className = 'cell yellow anime';
                                        element = document.getElementById(`k${enteredWord[i]}`);
                                        element.removeAttribute('class');
                                        element.className = 'key yellow';
                                    }
                                }

                            }
                            await delay(150);
                          
                        }
                        if( enteredWord.join('') === values.wordToGuess){
                            const notificationsParams={
                                color: 'green',
                                position: 'center',
                                text: `You win at round ${values.rowIndex + 1}!`
                            }
                            setValues({...values, notification: notificationsParams, showNotification: true});
                            setTimeout(() => {
                                setValues({...values, status: 'win', showNotification: false, showResume: true})
                            }, 3000);
                            

                        }else{
                            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${enteredWord.join('')}`)
                                .then(function (response){
                                    //console.log(response);
                                })
                                .catch(function (error){
                                    const notificationsParams={
                                        color: 'red',
                                        position: 'center',
                                        text: `The word doesn't exist!`
                                    }
                                    setValues({...values, notification: notificationsParams, showNotification: true});
                                    setTimeout(() => {
                                        setValues({...values, showNotification: false})
                                    }, 1000);
                                })
                                .then(function (){
                                    //console.log('HA ido bien');
                                })
                            if(values.rowIndex===5){
                                const notificationsParams={
                                    color: 'red',
                                    position: 'center',
                                    text: `You lost`
                                }
                                setValues({...values, notification: notificationsParams, showNotification: true});
                            setTimeout(() => {
                                setValues({...values, status: 'over', showNotification: false, showResume: true})
                            }, 3000);
                            }else{

                                setValues({...values, rowIndex: values.rowIndex + 1, letterIndex: 0});
                            }
                        }

                    }
                    changeFormat();
                }else{
                    console.log('You not have completed the word!');
                }
            }
        }else if(values.status === 'win'){
            //console.log('You have alredy won!');
            const notificationsParams={
                color: 'green',
                position: 'center',
                text: `You have already won at round ${values.rowIndex + 1}!`
            }
            setValues({...values, notification: notificationsParams, showNotification: true});
        }else if(values.status === 'over'){
            const notificationsParams={
                color: 'red',
                position: 'center',
                text: `You lost`
            }
            setValues({...values, notification: notificationsParams, showNotification: true});
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