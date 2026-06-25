export type CaseType =
  | 'wrong_transfer'
  | 'payment_failed'
  | 'refund_request'
  | 'phishing_or_social_engineering'
  | 'other';

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Department =
  | 'customer_support'
  | 'dispute_resolution'
  | 'payments_ops'
  | 'fraud_risk';

export interface TicketClassification {
  ticket_id: string;
  case_type: CaseType;
  severity: Severity;
  department: Department;
  agent_summary: string;
  human_review_required: boolean;
  confidence: number;
}

export interface SortTicketInput {
  ticket_id: string;
  channel?: string;
  locale?: string;
  message: string;
}

const normalizeMessage = (message: string) => message.toLowerCase();

const containsAny = (message: string, phrases: string[]) => phrases.some((phrase) => message.includes(phrase));

export const classifyTicket = (input: SortTicketInput): TicketClassification => {
  const message = normalizeMessage(input.message);
  const isPhishing = containsAny(message, [
    'otp',
    'pin',
    'password',
    'card number',
    'full card',
    'verification code',
    'call asking',
    'sms asking',
    'someone called',
    'scam',
    'fraud',
    'banking details',
  ]);

  if (isPhishing) {
    return {
      ticket_id: input.ticket_id,
      case_type: 'phishing_or_social_engineering',
      severity: 'critical',
      department: 'fraud_risk',
      agent_summary:
        'Customer reports a suspicious message or call requesting sensitive account details and needs immediate review.',
      human_review_required: true,
      confidence: 0.96,
    };
  }

  if (containsAny(message, ['wrong number', 'wrong recipient', 'sent to wrong', 'wrong transfer', 'wrong account'])) {
    return {
      ticket_id: input.ticket_id,
      case_type: 'wrong_transfer',
      severity: 'high',
      department: 'dispute_resolution',
      agent_summary:
        'Customer reports money was sent to an incorrect recipient and requests recovery assistance.',
      human_review_required: false,
      confidence: 0.92,
    };
  }

  if (containsAny(message, ['payment failed', 'failed payment', 'transaction failed', 'balance deducted', 'deducted'])) {
    return {
      ticket_id: input.ticket_id,
      case_type: 'payment_failed',
      severity: 'high',
      department: 'payments_ops',
      agent_summary:
        'Customer reports a payment failure and a possible deduction, requiring payment team review.',
      human_review_required: false,
      confidence: 0.9,
    };
  }

  if (containsAny(message, ['refund', 'refund request', 'refund my', 'return my money', 'change my mind'])) {
    return {
      ticket_id: input.ticket_id,
      case_type: 'refund_request',
      severity: 'low',
      department: 'customer_support',
      agent_summary:
        'Customer is requesting a refund for a recent transaction and needs follow-up.',
      human_review_required: false,
      confidence: 0.89,
    };
  }

  return {
    ticket_id: input.ticket_id,
    case_type: 'other',
    severity: 'low',
    department: 'customer_support',
    agent_summary:
      'Customer reports a general issue that does not match the common payment or security categories.',
    human_review_required: false,
    confidence: 0.75,
  };
};
