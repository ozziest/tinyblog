import { Link } from "react-router-dom";
import Button from "../components/inputs/Button";
import TextInput from "../components/inputs/TextInput";
import { useState } from "react";
import { IUserPost } from "../interfaces";
import api from "../api";

const RegisterView = () => {
  const [state, setState] = useState<IUserPost>({
    email: "",
    username: "",
    name: "",
    password: "",
    passwordRetry: "",
  });

  const handleCreate = async () => {
    await api.user.createUser(state);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  return (
    <div className="border border-neutral-200 p-8 rounded w-[500px]">
      <h2 className="font-semibold text-lg text-neutral-800 text-center">
        Create a new account
      </h2>

      <form className="py-8 flex flex-col gap-4">
        <TextInput
          label="E-mail"
          placeholder="Type your e-mail address"
          value={state.email}
          onChange={(event) => handleChange(event, "email")}
        />
        <TextInput
          label="Username"
          placeholder="Select a username"
          value={state.username}
          onChange={(event) => handleChange(event, "username")}
        />
        <TextInput
          label="Name"
          placeholder="Select a name"
          value={state.name}
          onChange={(event) => handleChange(event, "name")}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Select a password"
          value={state.password}
          onChange={(event) => handleChange(event, "password")}
        />
        <TextInput
          label="Password (Retry)"
          type="password"
          placeholder="Type the same password here"
          value={state.passwordRetry}
          onChange={(event) => handleChange(event, "passwordRetry")}
        />
        <Button type="button" onClick={handleCreate}>
          Create
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-neutral-600 hover:underline hover:text-neutral-950"
        >
          Login your account
        </Link>
      </div>
    </div>
  );
};

export default RegisterView;
