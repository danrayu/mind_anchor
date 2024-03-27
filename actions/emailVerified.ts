
"use server"
export const getIsEmailVerified = async (email: string) => {
  try {
    const user = await prismadb?.user.findUnique({ where: { email } });
    if (user?.emailVerified) {
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}