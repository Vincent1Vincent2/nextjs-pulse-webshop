import {auth} from "@/auth";
import {db} from "@/prisma/db";

export async function authenticateUser() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {id: session.user.id},
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
}
