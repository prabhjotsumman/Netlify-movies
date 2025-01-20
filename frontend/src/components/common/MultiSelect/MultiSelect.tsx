import React from "react";
import "./MultiSelect.css";

interface MultiSelectProps {
  options: any[];
  selectedOptions: any[];
  setSelectedOptions: (options: any) => void;
  title?: string;
  multiple?: boolean;
  onItemDelete?: (option: any) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  title = "Select",
  options,
  selectedOptions,
  setSelectedOptions,
  multiple = false,
  onItemDelete,
}) => {
  const handleSelect = (option: (typeof options)[0]) => {
    if (!selectedOptions.includes(option)) {
      if (!multiple) {
        setSelectedOptions([option]);
      } else setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleDelete = (option: (typeof options)[0]) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  return (
    <div className="custom-multi-select">
      {/* Dropdown Section */}
      <p className="dropdown-title">{title}</p>
      <hr className="dropdown-hr" />
      <div className="dropdown">
        {options.map((option) => (
          <div
            key={option._id}
            className={
              "dropdown-item" +
              (selectedOptions.includes(option)
                ? " dropdown-selected-option"
                : "")
            }
            onClick={() => handleSelect(option)}
          >
            <span>{option.name}</span>

            <button
              className="delete-cross"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDelete(option);
                onItemDelete && onItemDelete(option);
              }}
            >
              <div>X</div>
            </button>
          </div>
        ))}
      </div>

      {/* Selected option Section */}
      <div className="selected-options">
        {selectedOptions.map((option) => (
          <div key={option._id + "selected"} className="option-selected">
            <span>{option.name}</span>
            <button
              className="delete-cross"
              onClick={() => handleDelete(option)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MultiSelect);
