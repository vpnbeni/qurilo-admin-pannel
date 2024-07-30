// ViewButton.js
import { GoArrowDown } from "react-icons/go";

const ViewButton = ({ text, onClick, color, type }) => {
  return (
    <button
      onClick={onClick}
      className={`border border-solid text-${color} hover:text-black flex justify-between font-medium gap-x-3 items-center px-8 rounded-full py-3 border-${color} hover:bg-${color}`}
    >
      {text}
      <GoArrowDown className={`font-bold text-lg ${type === "less" ? "rotate-180" : "rotate-0"}`} />
    </button>
  );
};

export default ViewButton;
