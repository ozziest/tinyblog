export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("location", 2).nullable().after("is_email_confirmed");
    table.datetime("block_until_at").nullable().after("is_email_confirmed");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};
