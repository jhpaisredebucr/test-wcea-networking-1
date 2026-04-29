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

export async function checkUserBalance(userId, productPrice) {
  try {
    const result = await query(
      "SELECT balance FROM users WHERE id = $1",
      [userId]
    );

    if (result.length === 0) {
      return {
        success: false,
        message: "User not found",
        hasSufficientBalance: false,
      };
    }

    const userBalance = Number(result[0].balance);
    const price = Number(productPrice);

    return {
      success: true,
      hasSufficientBalance: userBalance >= price,
      currentBalance: userBalance,
      requiredAmount: price,
      shortfall: price > userBalance ? price - userBalance : 0,
    };
  } catch (err) {
    console.error("[checkUserBalance] error:", err);

    return {
      success: false,
      message: err.message || "Failed to check user balance",
      hasSufficientBalance: false,
    };
  }
}