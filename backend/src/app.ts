import "dotenv/config";
import express from "express";
import { genericErrorHandler, parseNumericQueryParam } from "./middleware";
import { getAllOrders, getProduct, getProducts } from "./queries";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/product/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: `Product id must be a positive integer.`,
    });
  }

  try {
    const product = await getProduct(id);

    if (!product) {
      return res.sendStatus(404);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

app.get(
  "/products",
  parseNumericQueryParam("offset"),
  parseNumericQueryParam("count"),
  async (req, res, next) => {
    try {
      const products = await getProducts(
        req.numericQueryParams.offset,
        req.numericQueryParams.count
      );

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

app.get("/allorders", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

app.use(genericErrorHandler);

app.listen(port, () => {
  console.log(`Web app started at "http://localhost:${port}"`);
});
