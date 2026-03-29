# JustInCase

JustInCase is a lightweight inventory tracker where users manage multiple lists of items with quantities, units, expiry dates, and visual status indicators for freshness.

## Live

| Service      | URL                                                              |
| ------------ | ---------------------------------------------------------------- |
| Frontend     | [justincase.ffflorian.dev](https://justincase.ffflorian.dev)     |
| Backend API  | [justincase-api.ffflorian.dev](https://justincase-api.ffflorian.dev) |

## Tech Stack

**Frontend**

- React 19 + TypeScript
- Vite
- Material UI (MUI)
- i18next (internationalization)
- React Router
- Deployed on [Vercel](https://vercel.com)

**Backend**

- NestJS + TypeScript
- MongoDB via Mongoose
- Deployed on [Render](https://render.com)

## Development

### Prerequisites

- Node.js >= 20
- Yarn 4

### Backend

```bash
cd packages/backend
yarn install
yarn start:dev
```

Copy `packages/backend/.env.example` to `packages/backend/.env` and configure your MongoDB connection string.

### Frontend

```bash
cd packages/frontend
yarn install
yarn dev
```

## Contributing

See [AGENTS.md](./AGENTS.md) for project conventions, branching strategy, commit message style, code review guidelines, and more.

## Authors

- [Florian Imdahl](https://github.com/ffflorian)
- [Lena Imdahl](https://github.com/lenaimdahl)

## License

[GPL-3.0](./LICENSE)
