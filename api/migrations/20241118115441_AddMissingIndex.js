export const up = function (knex) {
  return knex.schema.table("post_views", function (table) {
    table.index(["user_id", "post_id"], "post_views_user_post_index");
  });
};

export const down = function (knex) {
  return knex.schema.table("post_views", function (table) {
    table.dropIndex(["user_id", "post_id"], "post_views_user_post_index");
  });
};
