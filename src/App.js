import { useState, createContext, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import Keyboard from './components/keyboard';
import Notification from './components/notification';
import PanelGame from './components/panel';

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
      showNotification:false,
      notification:{
        position: '',
        color: '',
        text: '',
      }
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
      </div>
      
    </valuesContext.Provider>
  );
}

export default App;
