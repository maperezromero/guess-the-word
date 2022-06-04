import { useContext } from "react";
import { valuesContext } from "../App";
import close from "../images/close-grey.png"

function ResumePanel(){
    const { values, setValues } = useContext(valuesContext);
    //console.log(values.keys);
    
    //console.log(values);
    //console.log(data);
    if(!values.resume.isRead){
        let data = JSON.parse(window.localStorage.getItem('guess-the-word'));
        //console.log(data);
        data={...data, isRead: true}
        setValues({...values, resume: data})
    }
    
    

    const handleCloseResume = ()=>{
        setValues({...values, showResume: false})
    }
    
    let items=[];
    if(values.resume.rounds){

        let line=[];
        for (let i=0;i<6;i++){
            for (let j=1;j<=values.resume.rounds[i+1];j++){
                line.push('⬛');
            }
            if (values.resume.rounds[i+1] === 0){
                line.push('');
            }
            items.push(line.join(''));
            line.length = 0;
        }
        for (let j=1;j<=values.resume.rounds['X'];j++){
            line.push('⬛');
        }
        items.push(line.join(''));
    }else{
        for(let i = 0;i<7;i++){
            items.push('');
        }
        const data = {
            played: 0,
            won: 0,
            spell: 0,
            bestSpell: 0,
        }
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
            <div className="statistics">
                <span className="values">
                    <h2>{values.resume.played? values.resume.played : 0}</h2>   
                    <h3>Played</h3>
                </span>
                <span className="values">
                    <h2>{values.resume.won? ((values.resume.won/values.resume.played)*100) :0}%</h2>   
                    <h3>Won</h3>

                </span>
                <span className="values">
                    <h2>{values.resume.spell ? values.resume.spell : 0}</h2>   
                    <h3>Current Streak</h3>

                </span>
                <span className="values">
                    <h2>{values.resume.bestSpell ? values.resume.bestSpell : 0}</h2>   
                    <h3>Best Streak</h3>
                </span>
            </div>
            {values.resume.rounds && 
            <div className="details">
                <h3>1: {items[0]}({Number.isNaN(values.resume.rounds[1]/values.resume.played)? 0 : Math.trunc((values.resume.rounds[1]/values.resume.played)*100)}%)</h3>
                <h3>2: {items[1]}({Number.isNaN(values.resume.rounds[2]/values.resume.played)? 0 : Math.trunc((values.resume.rounds[2]/values.resume.played)*100)}%)</h3>
                <h3>3: {items[2]}({Number.isNaN(values.resume.rounds[3]/values.resume.played)? 0 : Math.trunc((values.resume.rounds[3]/values.resume.played)*100)}%)</h3>
                <h3>4: {items[3]}({Number.isNaN(values.resume.rounds[4]/values.resume.played)? 0 : Math.trunc((values.resume.rounds[4]/values.resume.played)*100)}%)</h3>
                <h3>5: {items[4]}({Number.isNaN(values.resume.rounds[5]/values.resume.played)? 0 : Math.trunc((values.resume.rounds[5]/values.resume.played)*100)}%)</h3>
                <h3>6: {items[5]}({Number.isNaN(values.resume.rounds[6]/values.resume.played)? 0 : Math.trunc((values.resume.rounds[6]/values.resume.played)*100)}%)</h3>
                <h3>X: {items[6]}({Number.isNaN(values.resume.rounds["X"]/values.resume.played)? 0 : Math.trunc((values.resume.rounds['X']/values.resume.played)*100)}%)</h3>
            </div>}
        </div>
    )
}

export default ResumePanel;