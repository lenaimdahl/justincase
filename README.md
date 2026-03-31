# JustInCase

<p align="center">
  <img src="packages/frontend/public/logo.svg" alt="JustInCase logo" width="120"/>
</p>

JustInCase is a lightweight inventory tracker where users manage multiple lists of items with quantities, units, expiry dates, and visual status indicators for freshness.

## Live

| Service     | URL                                                                  |
| ----------- | -------------------------------------------------------------------- |
| Frontend    | [justincase.ffflorian.dev](https://justincase.ffflorian.dev)         |
| Backend API | [justincase-api.ffflorian.dev](https://justincase-api.ffflorian.dev) |

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
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd packages/backend
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create environment configuration:

   ```bash
   cp .env.example .env
   ```

4. Configure MongoDB connection in `.env`:

   ```env
   MONGODB_URI=mongodb://localhost:27017/justincase
   ```

   **MongoDB Connection Options:**
   - **Local Development**: `mongodb://localhost:27017/justincase`
   - **MongoDB Atlas Cloud**: `mongodb+srv://username:password@cluster.mongodb.net/justincase`

5. Start the development server:

   ```bash
   yarn start:dev
   ```

   The API will be available at `http://localhost:3000`

6. Seed the database with example data (optional):

   ```bash
   yarn seed
   ```

   This creates sample lists (Pantry, Fridge, Freezer) with mock items and expiry dates for testing.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd packages/frontend
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure API endpoint in `.env` (optional, defaults to `http://localhost:3000`):

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

   The frontend will be available at `http://localhost:5173`

### Running Both Services

From the root directory, you can start both services in parallel:

```bash
yarn dev
```

This is configured in the monorepo's `package.json`.

### API Endpoints

**Health Check**

- `GET /api/health` - Service health status
- `GET /api/_health` - Vercel health check

**Lists API**

- `GET /api/lists` - Fetch all lists
- `GET /api/lists/:id` - Fetch single list by ID
- `POST /api/lists` - Create new list
- `PATCH /api/lists/:id` - Update list (name, icon, color, fieldConfig)
- `DELETE /api/lists/:id` - Delete list

**Items API**

- `GET /api/lists/:listId/items` - Fetch all items for a list
- `POST /api/lists/:listId/items` - Create item
- `PATCH /api/lists/:listId/items/:itemId` - Update item
- `DELETE /api/lists/:listId/items/:itemId` - Delete item
- `PATCH /api/lists/:listId/items/:itemId/adjust` - Adjust item quantity

**Request/Response Examples**

Create a list:

```bash
curl -X POST http://localhost:3000/api/lists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pantry",
    "icon": "🥫",
    "color": "#FF9800",
    "fieldConfig": {
      "hasExpiryDate": true,
      "hasQuantity": true,
      "hasNotes": true
    }
  }'
```

Create an item:

```bash
curl -X POST http://localhost:3000/api/lists/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pasta",
    "quantity": 2,
    "unit": "packages",
    "expiryDate": "2026-12-31",
    "comment": "Whole wheat"
  }'
```

## Contributing

See [AGENTS.md](./AGENTS.md) for project conventions, branching strategy, commit message style, code review guidelines, and more.

## Authors

- [Florian Imdahl](https://github.com/ffflorian)
- [Lena Imdahl](https://github.com/lenaimdahl)

## License

[GPL-3.0](./LICENSE)
