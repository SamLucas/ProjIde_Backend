import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("Post", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("text").notNullable();
    table.boolean("visible");
    table.boolean("deleted");
    table.boolean("aproved");

    table.integer("user_id").unsigned()
    table.foreign("user_id").references("User.id")

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Post");
}

