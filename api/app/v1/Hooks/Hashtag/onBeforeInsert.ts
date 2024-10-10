import { IBeforeInsertContext } from "axe-api";

export default async ({ formData, database, res }: IBeforeInsertContext) => {
  formData.hashtag = "#" + formData.hashtag;

  const found = await database
    .table("hashtags")
    .where("hashtag", formData.hashtag)
    .first();

  if (found) {
    res.status(200).json(found);
  }
};
