import axios from "axios";
import { useState, createContext, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import Keyboard from './components/keyboard';
import Notification from './components/notification';
import PanelGame from './components/panel';
import ResumePanel from './components/resume';

export const valuesContext = createContext(null);

function App() {

  const [values, setValues] = useState(
    {
      wordToGuess: '',      
      darkMode: true,
      rowIndex: 0,
      letterIndex:0,
      keys:[
          [['',''],['',''],['',''],['',''],['','']],
          [['',''],['',''],['',''],['',''],['','']],
          [['',''],['',''],['',''],['',''],['','']],
          [['',''],['',''],['',''],['',''],['','']],
          [['',''],['',''],['',''],['',''],['','']],
          [['',''],['',''],['',''],['',''],['','']]
        ],
      status: 'start',
      showNotification: false,
      notification:{
        color: '',
        position: '',
        text: '',
      },
      showResume: false,
      resume : {
        played: 0,
        won: 0,
        spell: 0,
        bestSpell: 0,
        isRead: false,
    }
    }
  );
  
  if(values.wordToGuess ===''){
    //console.log('PRUEBAS');
    setValues({...values, wordToGuess: 'loading'})

    const options = {
      method: 'GET',
      url: 'https://random-words5.p.rapidapi.com/getRandom',
      params: {wordLength: '5'},
      headers: {
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
        'X-RapidAPI-Key': '7627f88adfmshf8321309b67139cp15cb16jsn03f28a8c5942'
      }
    };
    
    axios.request(options).then(function (response) {
      //console.log(response.data);
      setValues({...values, wordToGuess: response.data.toUpperCase()})
    }).catch(function (error) {
      console.error(error);
    });
  
    
  }
  /* if(!values.resume.isRead){
    let data = JSON.parse(window.localStorage.getItem('guess-the-word'));
    //console.log(data);
    data={...data, isRead: true}
    setValues({...values, resume: data})
  } */

  useEffect(() => {
  
  });

  return (
    <valuesContext.Provider value ={{values, setValues}}>
      <div className="App">
        <Header/>
        <PanelGame/>
        <Keyboard/>
        {values.showNotification && <Notification/>}
        {values.showResume && <ResumePanel/>}
      </div>
      
    </valuesContext.Provider>
  );
}

export default App;
