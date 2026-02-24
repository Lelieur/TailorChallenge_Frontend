import "server-only";
import { getCurrentUserId } from "@/server/auth/session";
import { getUserById } from "@/services/server/user";

export async function getCurrentUser() {
  const userId = await getCurrentUserId();
  if (!userId) return null;
  return getUserById(userId);
}
