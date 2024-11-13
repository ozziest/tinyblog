export const up = function (knex) {
  return knex.schema.createTable("registrations", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("agent_id", 40).notNullable().index();
    table.string("email").notNullable().index();
    table.string("confirmation_code", 6).nullable();
    table.string("username").index();
    table.string("password");
    table.string("name");
    table.text("bio");
    table.string("location", 2);
    table.timestamps();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("registrations");
};
