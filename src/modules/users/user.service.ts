import prisma from '../../lib/prisma';

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export const getUsers = () => prisma.user.findMany({ orderBy: { createdAt: 'desc' } });

export const getUserById = (id: number) => prisma.user.findUnique({ where: { id } });

export const createUser = async (data: CreateUserInput) => {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });

  if (exists) {
    throw new Error('User with this email already exists');
  }

  return prisma.user.create({ data });
};

export const updateUser = async (id: number, data: UpdateUserInput) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};
