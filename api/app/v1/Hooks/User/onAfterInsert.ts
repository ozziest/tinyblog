import { IBeforeInsertContext } from "axe-api";
import { nanoid, customAlphabet } from "nanoid";
import { addMinutes } from "date-fns";

export default async ({ database, item }: IBeforeInsertContext) => {
  const codeGenerator = customAlphabet("1234567890", 6);

  const data = {
    user_id: item.id,
    confirmation_type: "email",
    confirmation_secret: nanoid(32),
    confirmation_code: codeGenerator(),
    expires_at: addMinutes(new Date(), 30),
    created_at: new Date(),
    updated_at: new Date(),
  };

  await database.table("confirmations").insert(data);
};
