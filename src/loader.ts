import DataLoader from "dataloader";
import knexConfig from "../knexfile";

const knex = require("knex")(knexConfig.development);

const authorLoader = new DataLoader(async (keys: number[]) => {
  const rows: any[] = await knex("author")
    .select()
    .whereIn("id", keys);

  let result = keys.map( key => {
    return rows.filter( row => row["id"] === key )[0];
  });

  return result;
})

const postLoader = new DataLoader(async (keys: number[]) => {
  const rows: any[] = await knex("post")
    .select()
    .whereIn("author", keys);

  let result = keys.map( key => {
    return rows.filter( row => row["author"] === key );
  });

  return result;
})

export { authorLoader, postLoader };