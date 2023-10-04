import React, { KeyboardEvent, useRef, useState } from "react";
import { suggestions } from "./constants";

const PryComponent = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [mathExpression, setMathExpression] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setInputValue(value);

    if (value && value.match(/[+\-/]\s\d+(\.\d+)?$/)) {
      setMathExpression(value);
    } else {
      setMathExpression("");
    }
  };

  const handleMathOperation = () => {
    try {
      const result = eval(mathExpression);
      if (!isNaN(result)) {
        setTags([...tags, result.toString()]);
        setInputValue("");
        setMathExpression("");
      } else {
        console.error("Invalid mathematical expression");
      }
    } catch (error) {
      console.error("Invalid mathematical expression");
    }
  };

  const addTag = (suggestion: string) => {
    setTags([...tags, suggestion]);
    setInputValue("");
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace" && inputValue === "") {
      setTags(tags.slice(0, tags.length - 1));
    }
  };
  return (
    <div className="w-full">
      <div className="autocomplete bg-white rounded-md drop-shadow-lg w-[90vw] md:w-[600px] mx-auto">
        <div
          className={`rounded-md border bg-white flex flex-row flex-wrap items-center min-h-[54px] px-2 overflow-visible md:w-[600px] w-full mx-auto cursor-text`}
        >
          {tags.map((tag, index) => (
            <Block tag={tag} index={index} />
          ))}
          <input
            placeholder={tags?.length === 0 ? "Type here..." : ""}
            type="text"
            onKeyDown={onKeyDown}
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
            className="text-sm mx-1 my-1 w-[20px] flex-grow rounded-md active:border-transparent focus:border-transparent outline-none"
          />
        </div>
        <div className="suggestions bg-white rounded-b-md overflow-hidden flex flex-col">
          {inputValue.split(" ")[0].length >= 2 &&
            suggestions
              .filter((suggestion) =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion hover:bg-gray-100 p-2 text-sm"
                  onClick={() => addTag(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
        </div>
      </div>
      {mathExpression && (
        <button onClick={handleMathOperation}>Calculate</button>
      )}
    </div>
  );
};

export default PryComponent;

interface BlockProps {
  index: number;
  tag: string;
}
const Block: React.FC<BlockProps> = ({ tag, index }) => {
  const [value, setValue] = useState<string | number>("[x]");
  const [current, setCurrent] = useState<string>("review");
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setCurrent("review");
    }
  };
  const currentView = {
    review: (
      <button
        className="hover:font-bold transition-[100ms] text-sm"
        onClick={() => {
          setCurrent("edit");
          if (value === "[x]") {
            setValue("");
          }
        }}
      >
        {value}
      </button>
    ),
    edit: (
      <input
        type="number"
        className="rounded-sm text-xs p-[3px] max-w-[50px] active:border-transparent focus:border-transparent outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
    ),
  }[current];
  return (
    <div key={index} className="tag bg-gray-200 px-2 py-1 rounded-md mx-1 my-1">
      <span className="text-sm font-semibold">{tag}</span> | {currentView}
    </div>
  );
};
