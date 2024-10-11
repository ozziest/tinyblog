export const up = function (knex) {
  return knex.schema.createTable("hashtags", function (table) {
    table.increments();
    table.string("hashtag", 35).notNullable().unique();
    table.timestamps();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("hashtags");
};
