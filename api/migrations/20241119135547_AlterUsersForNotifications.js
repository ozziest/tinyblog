export const up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.boolean("is_push_notification_on").notNullable().default(false);
    table.string("push_notification_endpoint", 500).nullable();
    table.string("push_notification_p256dh", 100).nullable();
    table.string("push_notification_auth", 30).nullable();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};
