export const up = function (knex) {
  return knex.schema.alterTable("post_likes", (table) => {
    table.index(["post_id", "user_id"], "idx_post_id_user_id");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("post_likes", (table) => {
    table.dropIndex(["post_id", "user_id"], "idx_post_id_user_id");
  });
};
