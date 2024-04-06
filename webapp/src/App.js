import './App.css';
import FirstDropdown from './Components/FirstDropdown'; 
import SecondDropdown from './Components/SecondDropdown'; 
import ThirdDropdown from './Components/ThirdDropdown'; 

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>This is a test</h1>
      </div>
      <div className="dropdowns">
        <FirstDropdown />
        <SecondDropdown />
        <ThirdDropdown />
      </div>
    </div>
  );
}

export default App;
