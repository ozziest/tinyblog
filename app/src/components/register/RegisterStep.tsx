import React from "react";
import Button from "../inputs/Button";

interface Props {
  children: React.ReactNode;
  onNext: () => void;
}

export const RegisterStep = ({ onNext, children }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 py-4">
        <div>{children}</div>

        <Button type="button" onClick={onNext}>
          Next
        </Button>
      </div>
    </>
  );
};

export default RegisterStep;
