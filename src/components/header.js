import moon from "../images/moon-night.png"
import sun from "../images/black-sun.png"
import { valuesContext } from "../App";
import { useContext } from "react";

function Header(){
    const { values, setValues } = useContext(valuesContext);

    function handleChangeMode(){
        if(values.darkMode){
            document.body.removeAttribute('class');
            //document.body.classList.toggle("theme-1")
            //document.body.classList.remove('dark');
            document.body.classList.toggle('light');
        }else{
            document.body.removeAttribute('class');
            //document.body.classList.remove('light');
            document.body.classList.toggle('dark');
        }
        
        setValues({...values, darkMode: !values.darkMode});
    }

    return(
        <div className="Header" id="Header">
            Guess The Word
                {values.darkMode && <img src={sun} alt="sun" className="image" onClick={handleChangeMode}></img>}
                {!values.darkMode && <img src={moon} alt="sun" className="image" onClick={handleChangeMode}></img>}
            
        </div>
    )
}

export default Header;