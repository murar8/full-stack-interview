import { RowDataPacket } from "mysql2";
import db from "./helpers/db";

export type Product = {
  id: number;
  code: string;
  description: string;
  price: number;
  image_uri?: string;
};

export type Order = {
  id: number;
  created_at: Date;
  notes?: string;
  products: number[];
};

async function getProductsInsideOrder(id: number) {
  const [results] = await db
    .promise()
    .query(`SELECT product_id FROM Orders_Products WHERE order_id = ${id};`);

  const ids = (results as RowDataPacket[]).map(({ product_id }) => product_id);

  return ids as number[];
}

export async function getProduct(id: number) {
  const [results] = await db
    .promise()
    .query(`SELECT * FROM Products WHERE id = ${id};`);

  const product = (results as RowDataPacket[]).length ? results[0] : undefined;

  return product as Product | undefined;
}

export async function getProducts(offset: number, count: number) {
  const [results] = await db
    .promise()
    .query(
      `SELECT * FROM Products ORDER BY id LIMIT ${count} OFFSET ${offset};`
    );

  return results as Product[];
}

export async function getAllOrders() {
  const [results] = await db.promise().query("SELECT * FROM Orders;");

  const orders = await Promise.all(
    (results as RowDataPacket[]).map((result) =>
      getProductsInsideOrder(result.id).then((products) => ({
        ...result,
        products,
      }))
    )
  );

  return orders as Order[];
}
