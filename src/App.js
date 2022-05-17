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
      wordToGuess: 'RADIA',      
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
      status: 'playing',
      showNotification: false,
      notification:{
        color: '',
        position: '',
        text: '',
      },
      showResume: false,
    }
  );
  
  //document.body.classList.add('dark');
  
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
