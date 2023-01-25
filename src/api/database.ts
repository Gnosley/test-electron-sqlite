import Database from "better-sqlite3";
const DATABASE_NAME = "test.db";
// const db = new Database(DATABASE_NAME);
const db = new Database(DATABASE_NAME);
db.pragma("journal_mode = WAL");
export { db, DATABASE_NAME };
