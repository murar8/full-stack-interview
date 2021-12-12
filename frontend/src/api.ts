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
  products: { id: number; quantity: number }[];
};

export async function getProduct(id: number) {
  const result = await fetch(`/api/product/${id}`);
  const product = await result.json();
  return product as Product;
}

export async function getProducts(offset: number, count: number) {
  const result = await fetch(`/api/products?offset=${offset}&count=${count}`);
  const products = await result.json();
  return products as Product[];
}

export async function getAllOrders() {
  const result = await fetch("/api/allorders");
  const orders = await result.json();
  // TODO! timestamp to date
  return orders as Order[];
}
