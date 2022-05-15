import moon from "../images/moon-night.png"
import sun from "../images/black-sun.png"
import { valuesContext } from "../App";
import { useContext } from "react";

function Header(){
    const { values, setValues } = useContext(valuesContext);

    function handleChangeMode(){
        document.body.removeAttribute('class');
        let element = document.getElementById(`Header`);
        element.removeAttribute('class');

        if(values.darkMode){
            document.body.classList.toggle('light');
            element.className = 'Header light';
            
        }else{
            document.body.classList.toggle('dark');
            element.className = 'Header dark';
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