import { db } from "@/config/db";
import { insertLayouts, layouts } from "@/db/schema";

export async function addLayout(data: insertLayouts) {
	return db.insert(layouts).values(data);
}
