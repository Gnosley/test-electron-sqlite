import { Database } from "sqlite3";
const DATABASE_NAME = "test";
const db = new Database(DATABASE_NAME);
export { db, DATABASE_NAME };
