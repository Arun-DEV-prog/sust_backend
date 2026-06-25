import { Router } from 'express';
import { addUser, editUser, getUser, listUsers, removeUser } from './user.controller';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', editUser);
router.delete('/:id', removeUser);

export default router;
