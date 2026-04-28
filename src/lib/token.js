import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return Number(decoded.id);
  } catch {
    return null;
  }
}

export async function getCurrentUserToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
