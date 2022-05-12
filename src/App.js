import { useState, createContext, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import Keyboard from './components/keyboard';
import PanelGame from './components/panel';

export const valuesContext = createContext(null);

function App() {

  const [values, setValues] = useState(
    {
      wordToGuess: 'RODEA',
      currentWord: [],
      darkMode: true,
      rowIndex: 0,
      letterIndex:0,
      keys:[
          ['','','','',''],
          ['','','','',''],
          ['','','','',''],
          ['','','','',''],
          ['','','','',''],
          ['','','','','']
        ],
      status: 'playing'
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
      </div>
      
    </valuesContext.Provider>
  );
}

export default App;
