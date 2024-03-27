"use server"
export const getUserById = async (id: string) => {
  return await prismadb?.user.findUnique({ where: { id } });
};
