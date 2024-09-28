import md5 from "md5";

export const getUserAvatar = (email: string) => {
  const hash = md5(email);
  return `https://gravatar.com/avatar/${hash}`;
};
