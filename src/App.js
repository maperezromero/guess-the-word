import './App.css';
import Header from './components/header';
import Keyboard from './components/keyboard';
import PanelGame from './components/panel';

function App() {
  return (
    <div className="App">
      <Header/>
      <PanelGame/>
      <Keyboard/>
    </div>
  );
}

export default App;
