# BankingTransactions — Backend

A simple Node.js/Express backend for managing bank accounts and transactions.

## Features

- User authentication (register / login)
- Account management
- Transaction creation and ledger entries
- Email notifications (via `email.service.js`)

## Tech stack

- Node.js
- Express
- MongoDB (Mongoose)

## Repository layout

- `server.js` — application entry
- `src/app.js` — Express app setup
- `src/controllers/` — request handlers (e.g. `auth.controller.js`)
- `src/routes/` — route definitions (e.g. `auth.route.js`)
- `src/models/` — Mongoose models
- `src/middleware/` — auth middleware
- `src/services/` — helper services (e.g. email)

Key files:
- [server.js](server.js)
- [src/app.js](src/app.js)
- [src/controllers/auth.controller.js](src/controllers/auth.controller.js)
- [src/controllers/account.controller.js](src/controllers/account.controller.js)
- [src/controllers/transaction.controller.js](src/controllers/transaction.controller.js)
- [src/routes/auth.route.js](src/routes/auth.route.js)
- [src/routes/account.route.js](src/routes/account.route.js)
- [src/routes/transaction.route.js](src/routes/transaction.route.js)

## Prerequisites

- Node.js 18+ (recommended)
- npm or yarn
- MongoDB instance (local or cloud)

## Environment variables

Create a `.env` file in the project root with values for:

- `PORT` — server port (default: 3000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` — for email notifications

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
# or
node server.js
```

Add a `dev` script in `package.json` if you use `nodemon`:

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

## API (overview)

Note: routes are mounted under `/api` by default in this project structure.

Authentication

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive JWT

Accounts

- `GET /api/accounts` — list accounts (protected)
- `POST /api/accounts` — create account (protected)
- `GET /api/accounts/:id` — get account details (protected)

Transactions

- `GET /api/transactions` — list transactions (protected)
- `POST /api/transactions` — create a transaction (protected)
- `GET /api/transactions/:id` — transaction details (protected)

See the route files for exact payloads and validation:
- [src/routes/auth.route.js](src/routes/auth.route.js)
- [src/routes/account.route.js](src/routes/account.route.js)
- [src/routes/transaction.route.js](src/routes/transaction.route.js)

## Tests

Add tests with your preferred framework (Jest, Mocha). Example:

```bash
npm test
```

## Linting & Formatting

Add `eslint` and `prettier` as needed and configure scripts.

## Notes

- Check `src/middleware/auth.middleware.js` for JWT verification.
- Email sending is implemented in `src/services/email.service.js`.

## Contributing

Feel free to open issues or submit PRs.

---

Created by project maintainer — update sections as needed.
