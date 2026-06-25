import { Router } from 'express';
import healthRoutes from '../modules/health/health.routes';
import userRoutes from '../modules/users/user.routes';
import ticketRoutes from '../modules/tickets/ticket.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/users', userRoutes);
router.use('/', ticketRoutes);

export default router;
