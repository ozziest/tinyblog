import axios from "axios";
import { ILoginPost, IUserPost } from "../interfaces";

const createUser = async (data: IUserPost) => {
  return await axios.post("users", data);
};

const login = async (data: ILoginPost) => {
  return await axios.post("login", data);
};

export default {
  createUser,
  login,
};
