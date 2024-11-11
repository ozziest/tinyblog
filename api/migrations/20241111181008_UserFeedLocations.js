export const up = function (knex) {
  return knex.schema.createTable("user_feed_locations", function (table) {
    table.bigIncrements();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("location", 2).notNullable();
    table.timestamps();

    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("user_feed_locations");
};
