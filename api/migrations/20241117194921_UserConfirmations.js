export const up = function (knex) {
  return knex.schema.createTable("user_confirmations", function (table) {
    table.bigIncrements();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("version").notNullable();
    table.string("ip_address", 39).notNullable();
    table.text("user_agent").notNullable();
    table.timestamps();

    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("user_confirmations");
};
