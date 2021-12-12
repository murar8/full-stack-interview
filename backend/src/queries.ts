import { RowDataPacket } from "mysql2";
import db from "./helpers/db";

export type Product = {
  id: number;
  code: string;
  description: string;
  price: number;
  imageURI: string | null;
};

export type Order = {
  id: number;
  createdAt: number;
  price: number;
  notes: string | null;
  products: { id: number; quantity: number }[];
};

async function getProductsInsideOrder(id: number) {
  const [results] = await db.promise().query(
    `SELECT product_id AS id, quantity\
     FROM Orders_Products\
     WHERE order_id = ${id};`
  );

  return results as { id: number; quantity: number }[];
}

async function getOrderPrice(id: number) {
  const [results] = await db.promise().query(
    `SELECT SUM(Orders_Products.quantity * Products.price) AS price\
     FROM Orders_Products\
     LEFT JOIN Products ON Products.id = Orders_Products.product_id\
     WHERE order_id = ${id};`
  );

  const price = results[0].price;

  return (Math.round((price + Number.EPSILON) * 100) / 100) as number;
}

export async function getProduct(id: number) {
  const [results] = await db.promise().query(
    `SELECT id, code, description, price, image_uri AS imageURI\
     FROM Products WHERE id = ${id};`
  );

  const product = (results as RowDataPacket[]).length ? results[0] : undefined;

  return product as Product | undefined;
}

export async function getProducts(offset: number, count: number) {
  const [results] = await db.promise().query(
    `SELECT id, code, description, price, image_uri AS imageURI\
     FROM Products ORDER BY id LIMIT ${count} OFFSET ${offset};`
  );

  return results as Product[];
}

export async function getAllOrders() {
  const [results] = await db
    .promise()
    .query(
      "SELECT id, notes, UNIX_TIMESTAMP(created_at) AS createdAt FROM Orders;"
    );

  const orders = await Promise.all(
    (results as RowDataPacket[]).map(async (result) => {
      const products = await getProductsInsideOrder(result.id);
      const price = await getOrderPrice(result.id);
      return { ...result, price, products };
    })
  );

  return orders as Order[];
}
