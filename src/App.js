import { useState, createContext } from 'react';
import './App.css';
import Header from './components/header';
import Keyboard from './components/keyboard';
import PanelGame from './components/panel';

export const valuesContext = createContext(null);

function App() {

  const [values, setValues] = useState(
    {
      darkMode: true,
      keys:[
          ['','','','',''],
          ['','','','',''],
          ['','','','',''],
          ['','','','',''],
          ['','','','',''],
          ['','','','','']
        ],
      currentWord: [],
      status: 'playing'
    }
  );


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
