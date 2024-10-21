export const up = function (knex) {
  return knex.schema.createTable("user_followers", function (table) {
    table.bigIncrements();
    table.bigInteger("user_id").unsigned().notNullable();
    table.bigInteger("follower_id").unsigned().notNullable();
    table.timestamps();

    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("follower_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("user_followers");
};
