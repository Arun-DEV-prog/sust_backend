import type { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from './user.service';

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await createUser({ name, email });
    return res.status(201).json(user);
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      return res.status(409).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Failed to create user' });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await updateUser(id, req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user' });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteUser(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};
