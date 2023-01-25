import { db } from "./database";
const COUNTER_ID = "0";

const ensureTable = () =>
  db.run("CREATE TABLE IF NOT EXISTS counter (id TEXT, count INT)");

const ensureCounter = () =>
  db.run(
    "INSERT INTO counter(id, count) SELECT ?, 0 WHERE NOT EXISTS (SELECT 1 FROM counter)",
    COUNTER_ID
  );

export function current() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      ensureTable();
      ensureCounter();
      db.get(
        `SELECT count from counter WHERE id = ?`,
        COUNTER_ID,
        (err, row) => {
          if (err) reject(err);
          resolve(row.count);
        }
      );
    });
  });
}

export function increment(): Promise<number> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      ensureTable();
      ensureCounter();
      db.get(
        `UPDATE counter SET count = count + 1 WHERE id = ? RETURNING count`,
        COUNTER_ID,
        (err, row) => {
          if (err) reject(err);
          resolve(row.count);
        }
      );
    });
  });
}

export function decrement() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      ensureTable();
      ensureCounter();
      db.get(
        `UPDATE counter SET count = count - 1 WHERE id = ? RETURNING count`,
        COUNTER_ID,
        (err, row) => {
          if (err) reject(err);
          resolve(row.count);
        }
      );
    });
  });
}

export function reset() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      ensureTable();
      ensureCounter();
      db.get(
        `UPDATE counter SET count = 0 WHERE id = ? RETURNING count`,
        COUNTER_ID,
        (err, row) => {
          if (err) reject(err);
          resolve(row.count);
        }
      );
    });
  });
}
