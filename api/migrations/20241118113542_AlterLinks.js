export const up = function (knex) {
  return knex.schema.alterTable("links", function (table) {
    table.bigInteger("count").notNullable().default(0);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("links");
};
