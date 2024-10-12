export const up = function (knex) {
  return knex.schema.alterTable("post_mentions", function (table) {
    table.integer("user_id").unsigned().nullable().after("post_id");

    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("SET NULL")
      .onUpdate("SET NULL");
  });
};

export const down = function (knex) {};
