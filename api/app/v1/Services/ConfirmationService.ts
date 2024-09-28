export const getConfirmationLink = (secret: string, code: string) => {
  return `${process.env.DOMAIN}/confirm/email/${secret}/${code}`;
};
