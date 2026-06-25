import { Router } from 'express';
import { sortTicket } from './ticket.controller';

const router = Router();

router.post('/sort-ticket', sortTicket);

export default router;
