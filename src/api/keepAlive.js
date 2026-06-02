import appwriteService from "../appwrite/config";

export async function keepAlive() {
  try {
    // Lightweight call to keep Appwrite connection alive
    await appwriteService.getPosts([]);
    return { success: true };
  } catch (error) {
    console.log("Keep alive failed", error);
    return { success: false };
  }
}
