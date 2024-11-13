export const up = function (knex) {
  return knex.schema.alterTable("posts", function (table) {
    table.string("location", 2).nullable().index().after("id");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("posts");
};
