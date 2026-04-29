import { query } from "@/lib/db";

export async function getPackages() {
  try {
    const packages = await query("SELECT * FROM packages");

    const formattedPackages = packages.map((packageItem) => ({
      ...packageItem,
      price: Number(packageItem.price),
    }));

    return {
      success: true,
      packages: formattedPackages,
    };
  } catch (err) {
    console.error("[getPackages] error:", err);

    return {
      success: false,
      message: err.message || "Failed to fetch packages",
      packages: [],
    };
  }
}
