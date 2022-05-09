
function Keyboard(){
    const keys = [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L'],
        ['ENTER','Z','X','C','V','B','N','M','DEL']];
    
    //console.log(keys.map(key=>key));
        return(
            <div className="keys">
                {keys.map((key,index)=>{
                    return(
                        <div className="keys-row" key={index}>
                        {key.map((subkey, sIndex)=>{
                            return (
                                <div key={sIndex} className="key" id={`${index}${sIndex}`}>{subkey}</div>
                            )
                        })}
                        </div>
                    )
                })}

            </div>
        );
}

export default Keyboard;