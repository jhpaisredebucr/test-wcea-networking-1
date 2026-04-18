import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getCurrentUserToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verifiedToken);
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}