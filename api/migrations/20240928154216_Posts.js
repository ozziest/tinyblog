export const up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments();
    table.integer("user_id").unsigned().notNullable();
    table.string("content", 400).notNullable();
    table.timestamps();

    table.foreign("user_id").references("users.id");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("posts");
};
