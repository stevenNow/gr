import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
};

const API = "http://localhost:4000";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const loadProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditName(p.name);
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Are you sure you want to delete this product?");

    if (!ok) return;

    await fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
};

  const saveEdit = async (id: number) => {
    await fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });

    setEditingId(null);
    setEditName("");
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (!name.trim()) return;

    await fetch(`${API}/products`, {
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
            {editingId === p.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={() => saveEdit(p.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {p.id}: {p.name}
                <button style={{ marginLeft: 12 }} onClick={() => startEdit(p)}>Edit</button>
                <button style={{ marginLeft: 12 }} onClick={() => handleDelete(p.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}