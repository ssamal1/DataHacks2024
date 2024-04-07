import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Components/Home'
import FirstDropdown from './Components/FirstDropdown'; 
import SecondDropdown from './Components/SecondDropdown'; 
import ThirdDropdown from './Components/ThirdDropdown'; 
import logo from './Assets/DinoLogo.png';



function App() {
  const [firstResult, setFirstResult] = useState(null);
  const [secondResult, setSecondResult] = useState(null);
  const [thirdResult, setThirdResult] = useState(null);
  const [results, setResults] = useState([]);

  // Function to handle result change from dropdowns
  const handleResultChange = (result, index) => {
    // Add the new result to the results array
    setResults(prevResults => {
      const updatedResults = [...prevResults];
      updatedResults[index] = result;
      return updatedResults;
    });
  };

  // Calculate the sum of all results
  const [totalResult, setTotalResult] = useState(0);
  useEffect(() => {
    const sum = results.reduce((acc, cur) => acc + cur, 0);
    setTotalResult(sum);
  }, [results]);


  return (
    <div className="App">
      <Home /> {/* Render Home component */}

      <img src={logo} alt="Logo" className="logo" />
      <div className="header">
        
      </div>
      <div className="dropdowns">
      <FirstDropdown index={0} onResultChange={(result) => handleResultChange(result, 0)} />
      <SecondDropdown index={1} onResultChange={(result) => handleResultChange(result, 1)} />
      <ThirdDropdown index={2} onResultChange={(result) => handleResultChange(result, 2)} />
      </div>
      <div>Total Result: {totalResult}</div>
    </div>
  );
}

export default App;
