import { IQuestion } from "@/interfaces";

interface Props extends IQuestion {
  onCancel: () => void;
}

const ConfirmationModal = ({ title, message, onConfirm, onCancel }: Props) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
