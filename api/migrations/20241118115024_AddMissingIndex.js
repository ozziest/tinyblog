export const up = function (knex) {
  // Add compound index on `user_id` and `reshare_id`
  return knex.schema.alterTable("posts", (table) => {
    table.index(["user_id", "reshare_id"], "idx_user_id_reshare_id");
  });
};

export const down = function (knex) {
  // Remove the compound index
  return knex.schema.alterTable("posts", (table) => {
    table.dropIndex(["user_id", "reshare_id"], "idx_user_id_reshare_id");
  });
};
