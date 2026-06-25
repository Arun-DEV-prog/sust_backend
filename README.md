# SUCT Mock Backend

A modular TypeScript backend for ticket classification using Express and Prisma.

## Features

- Health check endpoint: GET /health
- Ticket sorting endpoint: POST /sort-ticket
- Modular structure with controllers, services, and routes
- Prisma setup for future persistence

## Run locally

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Build

```bash
npm run build
```

## Example request

```bash
curl -X POST http://localhost:5000/sort-ticket \
  -H "Content-Type: application/json" \
  -d '{
    "ticket_id": "T-001",
    "channel": "app",
    "locale": "en",
    "message": "I sent 3000 to wrong number"
  }'
```

## Example response

```json
{
  "ticket_id": "T-001",
  "case_type": "wrong_transfer",
  "severity": "high",
  "department": "dispute_resolution",
  "agent_summary": "Customer reports money was sent to an incorrect recipient and requests recovery assistance.",
  "human_review_required": false,
  "confidence": 0.92
}
```
