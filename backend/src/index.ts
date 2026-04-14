import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./prisma";

const app = express();

app.use(cors());
app.use(express.json());

// GET all products
app.get("/products", async (_req, res) => {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  res.json(products);
});

// CREATE product
app.post("/products", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const product = await prisma.product.create({
    data: { name },
  });

  res.status(201).json(product);
});

// UPDATE product
app.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: { name },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});