import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { getHealth } from './modules/health/health.controller';
import { sortTicket } from './modules/tickets/ticket.controller';

dotenv.config();

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get('/health', getHealth);
  app.post('/sort-ticket', sortTicket);

  app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
  });

  app.use('/api', routes);

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};

export default createApp;
