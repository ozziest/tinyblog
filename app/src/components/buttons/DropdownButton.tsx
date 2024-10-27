import { useEffect, useRef, useState } from "react";

export interface IDropdownItem {
  value: string;
  title: string;
}

interface Props {
  icon?: React.ReactNode;
  buttonText?: string;
  items: IDropdownItem[];
  onSelect: (item: IDropdownItem) => void;
}

const DropdownButton = ({ buttonText, icon, items, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: IDropdownItem) => {
    onSelect(item);
    setIsOpen(false); // close dropdown on selection
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleButtonClick}
        className="inline-flex items-center gap-1 justify-center px-3 py-2 w-full rounded border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {icon && <>{icon}</>}
        {buttonText && <>{buttonText}</>}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item) => (
              <button
                key={item.value}
                onClick={() => handleItemClick(item)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                role="menuitem"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
