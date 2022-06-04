
function setData(result, round){
    //console.log(result);
    let data = JSON.parse(window.localStorage.getItem('guess-the-word'));
    //console.log(data);
    let rounds ={
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        X: 0,
    };
    rounds={...rounds, [round]: rounds[round]+1};
    
    if (data){
        //console.log('Hay datos');
        let bestSpell;
        if(data.spell < data.bestSpell){
            bestSpell = data.bestSpell;
        }else{
            bestSpell = result === 1 ? data.spell + 1 : data.bestSpell;
        }
        data = {
            played: data.played + 1,
            won: data.won + result,
            spell: result ===1? data.spell + 1 : 0,
            bestSpell: bestSpell,
            rounds: rounds,
        }
        //setValues({...values, resume: data});
        window.localStorage.setItem('guess-the-word', JSON.stringify(data))
    }else{
        //console.log('No hay datos');
        data = {
            played: 1,
            won: result,
            spell: result,
            bestSpell: result,
            rounds: rounds,
        }
        //setValues({...values, resume: data});
        window.localStorage.setItem('guess-the-word', JSON.stringify(data))
    }

}

export default setData;