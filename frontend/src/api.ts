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
  return orders as Order[];
}
