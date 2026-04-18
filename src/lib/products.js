import { query } from "@/lib/db";

export async function getProducts() {
  try {
    const products = await query("SELECT * FROM products");

    const formattedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));

    return {
      success: true,
      products: formattedProducts,
    };
  } catch (err) {
    console.error("[getProducts] error:", err);

    return {
      success: false,
      message: err.message || "Failed to fetch products",
      products: [],
    };
  }
}