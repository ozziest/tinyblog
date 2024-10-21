export const up = function (knex) {
  return knex.schema.createTable("post_mentions", function (table) {
    table.bigIncrements();
    table.bigInteger("post_id").unsigned().notNullable();
    table.bigInteger("user_id").unsigned().nullable();
    table.string("username", 30).notNullable();
    table.timestamps();

    table
      .foreign("post_id")
      .references("posts.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("SET NULL")
      .onUpdate("SET NULL");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("post_mentions");
};
