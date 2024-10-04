export const up = function (knex) {
  return knex.schema.createTable("post_links", function (table) {
    table.increments();
    table.integer("post_id").unsigned().notNullable();
    table.integer("link_id").unsigned().notNullable();
    table.timestamps();

    table
      .foreign("post_id")
      .references("posts.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("link_id")
      .references("links.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_links");
};
