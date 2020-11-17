const knexConfig = {
<<<<<<< HEAD
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/app.db",
    },
    useNullAsDefault: true,
    // debug: ['knex:query']
  }
=======
  client: "sqlite3",
  connection: {
    filename: "./data/app.db",
  },
  useNullAsDefault: true,
  debug: ['knex:query']
>>>>>>> d09c3d860fdb44b0d30ea323cdd1adb678c37744
};

export default knexConfig