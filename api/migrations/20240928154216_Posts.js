export const up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.bigIncrements();
    table.bigInteger("reshare_id").unsigned().nullable();
    table.bigInteger("parent_id").unsigned().nullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("content", 400).notNullable();
    table.text("lexical").notNullable();
    table.integer("stats_views").notNullable().defaultTo(0);
    table.integer("stats_replies").notNullable().defaultTo(0);
    table.integer("stats_likes").notNullable().defaultTo(0);
    table.integer("stats_shares").notNullable().defaultTo(0);
    table.timestamps();

    table.foreign("reshare_id").references("posts.id");
    table.foreign("parent_id").references("posts.id");
    table.foreign("user_id").references("users.id");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("posts");
};
