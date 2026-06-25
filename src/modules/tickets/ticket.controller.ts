import type { Request, Response } from 'express';
import { classifyTicket } from './ticket.service';

export const sortTicket = (req: Request, res: Response) => {
  const { ticket_id, message, channel, locale } = req.body ?? {};

  if (!ticket_id || !message) {
    return res.status(400).json({ error: 'ticket_id and message are required' });
  }

  const classification = classifyTicket({
    ticket_id,
    channel,
    locale,
    message,
  });

  return res.json(classification);
};
