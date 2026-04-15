import { useEffect, useState } from "react";
import { API_URL } from "../constants/api";

type Product = {
  id: number;
  name: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");

  const loadProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (!name.trim()) return;

    await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    loadProducts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      <div style={{ marginBottom: 12 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
        <button disabled={!name.trim()} onClick={addProduct}>Add</button>
      </div>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> (ID: {p.id})
          </li>
        ))}
      </ul>
    </div>
  );
}