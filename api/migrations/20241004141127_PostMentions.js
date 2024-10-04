export const up = function (knex) {
  return knex.schema.createTable("post_mentions", function (table) {
    table.increments();
    table.integer("post_id").unsigned().notNullable();
    table.string("username", 30).notNullable();
    table.timestamps();

    table
      .foreign("post_id")
      .references("posts.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_mentions");
};
