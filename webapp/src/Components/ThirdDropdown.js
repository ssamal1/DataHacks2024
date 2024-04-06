import React, { useState } from 'react';

function ThirdDropdown() {
  const options = ["Option 1", "Option 2", "Option 3"];
  
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dropdown">
      <button onClick={() => handleOptionSelect(null)}>Select an option</button>
      
      {}
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionSelect(option)}>
            {option}
          </li>
        ))}
      </ul>

      {}
      {selectedOption && <p>Selected option: {selectedOption}</p>}
    </div>
  );
}

export default ThirdDropdown;