import React from "react";
import { CloseIcon } from "../Icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg relative overflow-hidden">
        {title && (
          <div className="relative p-6 border-b border-neutral-100">
            <div className="text-center text-lg font-semibold">{title}</div>
            <button
              onClick={onClose}
              className="absolute top-[24px] right-6 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="p-6 " style={{ maxHeight: "70dvh" }}>
          {children}
        </div>

        {footer && (
          <div className="bg-white p-6 border-t border-neutral-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseModal;
