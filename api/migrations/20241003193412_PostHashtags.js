export const up = function (knex) {
  return knex.schema.createTable("post_hashtags", function (table) {
    table.increments();
    table.integer("post_id").unsigned().notNullable();
    table.integer("hashtag_id").unsigned().notNullable();
    table.string("hashtag", 35).notNullable();
    table.timestamps();

    table
      .foreign("post_id")
      .references("posts.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("hashtag_id")
      .references("hashtags.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_hashtags");
};
