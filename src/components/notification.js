import { useContext, useEffect } from "react";
import { valuesContext } from "../App";

function Notification(){
    const { values, setValues } = useContext(valuesContext);
    
    useEffect(() => {
        const element = document.getElementById('notification');
        element.classList.add("green");
        element.classList.add("center");
        element.classList.add("animateOpen");
      });


    return(
        <div className="notification" id="notification">
            {values.notification.text}
        </div>
    )
}

export default Notification;