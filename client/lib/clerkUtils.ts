import { Clerk } from "@clerk/clerk-js";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const obtainToken = async (): Promise<string | null> => {
  if (!PUBLISHABLE_KEY) {
    return null;
  }
  try {
    const clerk = new Clerk(PUBLISHABLE_KEY);
    await clerk.load();
    const session = clerk.session;
    if (session) {
      const newToken = await session.getToken();
      if (!newToken) {
        return null;
      }
      //toast.success(getTranslation("apiResponses.tokenRefreshed"));
      localStorage.setItem("clerkFetchedToken", newToken);
      return newToken;
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed", error);
    return null;
  }
};
