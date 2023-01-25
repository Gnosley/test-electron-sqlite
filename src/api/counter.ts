import { db } from "./database";
const COUNTER_ID = "0";

const ensureTable = db.exec(
  "CREATE TABLE IF NOT EXISTS counter (id TEXT, count INT)"
);

const ensureCounter = db.prepare(
  "INSERT INTO counter(id, count) SELECT ?, 0 WHERE NOT EXISTS (SELECT 1 FROM counter)"
);

const currentStmt = db.prepare(`SELECT count from counter WHERE id = ?`);

export function current() {
  ensureCounter.run(COUNTER_ID);
  return currentStmt.get(COUNTER_ID).count;
}

const incrementStmt = db.prepare(
  `UPDATE counter SET count = count + 1 WHERE id = ? RETURNING count`
);
export function increment() {
  ensureCounter.run(COUNTER_ID);
  return incrementStmt.get(COUNTER_ID).count;
}

const decrementStmt = db.prepare(
  `UPDATE counter SET count = count - 1 WHERE id = ? RETURNING count`
);
export function decrement() {
  ensureCounter.run(COUNTER_ID);
  return decrementStmt.get(COUNTER_ID).count;
}

const resetStmt = db.prepare(
  `UPDATE counter SET count = 0 WHERE id = ? RETURNING count`
);

export function reset() {
  ensureCounter.run(COUNTER_ID);
  return resetStmt.get(COUNTER_ID).count;
}
