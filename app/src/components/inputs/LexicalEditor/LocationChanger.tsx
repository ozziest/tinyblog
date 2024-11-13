import { LocationIcon } from "@/components/Icons";
import { SUPPORTED_LOCATIONS } from "@/consts";
import { IOption } from "@/interfaces";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

interface Props {
  currentLocation?: IOption;
  setLocation: (value: string) => void;
}

const LocationChanger = ({ currentLocation, setLocation }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleSelect = (location: IOption) => {
    setOpen(false);
    setLocation(location.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="no-editor grow flex justify-end items-center relative text-sm z-40">
      <button
        type="button"
        className={classNames(
          "flex gap-1 items-center opacity-40 transition-all text-neutral-800 hover:opacity-100",
          { "opacity-100": isOpen },
        )}
        onClick={() => setOpen(true)}
      >
        <LocationIcon size={16} />
        {currentLocation?.label}
      </button>
      {isOpen && (
        <div
          className="no-editor absolute top-6 bg-white border rounded border-neutral-100 py-1 shadow flex flex-col z-40"
          ref={menuRef}
        >
          {SUPPORTED_LOCATIONS.map((location) => (
            <button
              key={location.value}
              type="button"
              className={classNames(
                "w-full text-left px-4 py-2 pr-5 hover:bg-neutral-100 transition-all duration-300 text-sm",
                { "bg-indigo-100": location.value === currentLocation?.value },
              )}
              onClick={() => handleSelect(location)}
            >
              {location.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationChanger;
