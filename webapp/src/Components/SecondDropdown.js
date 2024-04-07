import React, { useState } from 'react';

function SecondDropdown() {
    const options = ["Option 1", "Option 2", "Option 3"];
    
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
      let calculatedResult;
      switch (option) {
        case "Option 1":
          calculatedResult = 10; // Example calculation for Option 1
          break;
        case "Option 2":
          calculatedResult = 20; // Example calculation for Option 2
          break;
        case "Option 3":
          calculatedResult = 30; // Example calculation for Option 3
          break;
        default:
          calculatedResult = null;
      }
  
      // Set the result in state
      setResult(calculatedResult);
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <div className="dropdown">
        <button onClick={toggleDropdown}>
          {selectedOption || "Select an option"}
        </button>
  
        
        
        {isDropdownOpen && (
          <ul>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
        {result && <p>Result: {result}</p>} {/* Display the result if it exists */}
      </div>
    );
  }

export default SecondDropdown;