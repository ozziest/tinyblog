export const up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.index(["account_visibility"], "users_account_visibility_index");
  });
};

export const down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropIndex(["account_visibility"], "users_account_visibility_index");
  });
};
