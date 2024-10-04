export const up = function (knex) {
  return knex.schema.createTable("links", function (table) {
    table.increments();
    table.string("code", 30).notNullable().unique();
    table.string("link", 240).notNullable();
    table.timestamps();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("links");
};
