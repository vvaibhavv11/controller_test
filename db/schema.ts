import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const layouts = sqliteTable("layout", {
	id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    layoutSchema: text("layout_schema").notNull()
});

export type insertLayouts = typeof layouts.$inferInsert
