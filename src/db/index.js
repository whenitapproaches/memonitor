import low from "lowdb";

import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("database.json");

const db = low(adapter);

db.defaults({
  settings: {
    updateInterval: 1000,
    theme: 'dark'
  }
}).write();

export default db;
