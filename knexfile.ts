const knexConfig = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/app.db",
    },
    useNullAsDefault: true,
    debug: ['knex:query']
  }
};

export default knexConfig