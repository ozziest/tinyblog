export const up = function (knex) {
  return knex.schema.createTable("news", function (table) {
    table.bigIncrements();
    table.string("link").notNullable().unique().index();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.datetime("published_at").notNullable();
    table.text("ai_summary", 240).nullable();
    table.text("ai_tag", 100).nullable();
    table.timestamps();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("news");
};
