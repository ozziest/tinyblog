export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table
      .enu("account_visibility", ["public", "private"])
      .notNullable()
      .defaultTo("public");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};
