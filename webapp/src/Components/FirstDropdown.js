import React, { useState } from 'react';

function FirstDropdown() {
  const options = ["Option 1", "Option 2", "Option 3"];
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
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
    </div>
  );
}

export default FirstDropdown;