# Products App

Minimal full-stack CRUD app built with React + Node + Prisma + Postgres.

## Stack
<ul>
<li>Frontend: React (Vite + TypeScript)</li>
<li>Backend: Node.js + Express + TypeScript</li>
<li>ORM: Prisma</li>
<li>DB: PostgreSQL (Docker)</li>
</ul>

## Prerequisites
<ul>
<li>node.js (18+)</li>
<li>npm</li>
<li>Docker</li>
</ul>

## Database Setup

Start Postgres:
```bash
docker-compose up -d
```

DB config:
<ul>
<li>Host: localhost</li>
<li>Port: 5433</li>
<li>DB: products_db</li>
<li>User: postgres</li>
<li>Password: postgres</li>
</ul>

## Backend Setup

Create an .env file in backend dir with the following content:
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/products_db"

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```


Backend runs at:

http://localhost:4000

### API
<ul>
<li>GET /products -> list products</li>
<li>POST /products -> create product { name }</li>
</ul>

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

http://localhost:5173

## How to Run
<ol>
<li>Start DB (Docker)</li>
<li>Start backend (port 4000)</li>
<li>Start frontend (port 5173)</li>
</ol>

## Architecture
React -> Express -> Prisma -> Postgres

## Notes

### Prisma Notes

To create DB from prisma schema:
```bash
npx prisma migrate dev --name init
```

To generate the prisma client:
```bash
npx prisma generate
```

To add a field:
1. Update schema.prisma with new field: price Float @default(0)
2. migrate
3. Update backend
4. Update frontend

Prisma actions:

Create	prisma.product.create({ data })
Read all	prisma.product.findMany()
Read one	prisma.product.findUnique({ where })
Update	prisma.product.update({ where, data })
Delete	prisma.product.delete({ where })


