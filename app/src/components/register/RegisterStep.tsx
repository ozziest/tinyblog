import React from "react";
import Button from "../inputs/Button";

interface Props {
  children: React.ReactNode;
  onNext: () => void;
}

export const RegisterStep = ({ onNext, children }: Props) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

  return (
    <>
      <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
        <div>{children}</div>
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      </form>
    </>
  );
};

export default RegisterStep;
