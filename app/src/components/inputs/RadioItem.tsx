import { CheckIcon } from "../Icons";

interface Props {
  value: string;
  description?: string;
  label: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

export const RadioItem = ({
  value,
  checked,
  label,
  description,
  onChange,
}: Props) => {
  return (
    <button
      type="button"
      className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none text-left hover:bg-neutral-50 transition-colors"
      onClick={() => onChange(value)}
    >
      <span className="flex flex-1">
        <span className="flex flex-col">
          <span className="block text-sm font-semibold text-gray-900">
            {label}
          </span>
          <span className="mt-1 flex items-center text-sm text-gray-500">
            {description}
          </span>
        </span>
      </span>
      {checked && (
        <div className="size-5 text-white absolute top-3 right-2 bg-indigo-600 flex justify-center items-center rounded-full">
          <CheckIcon size={12} />
        </div>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-600"
      />
    </button>
  );
};

export default RadioItem;
