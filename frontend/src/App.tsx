import { Routes, Route, Link } from "react-router-dom";
import Products from './components/Products.tsx'


  export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </>
  );
}