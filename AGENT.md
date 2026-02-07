# JustInCase - AGENT.md

This document describes the **project conventions, development workflow, and guidelines** for contributors.

---

## 1. Project structure

```
src/
  frontend/   # React app
  backend/    # NestJS app with MongoDB
```

* **frontend**: Contains all React components, pages, hooks, and assets.
* **backend**: Contains NestJS modules, controllers, services, schemas, and configuration.

All code is written in **TypeScript**.

---

## 2. Branching and workflow

* **Main branch**: `main` (production-ready)
* **Feature branches**: `feature/<short-description>`
* **Bugfix branches**: `fix/<short-description>`

**Merge strategy**: Pull requests only, reviewed by at least one developer.

---

## 3. Commits

We follow **Conventional Commits**: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

**Format:**

```
<type>(<scope>): <short description>
```

**Types:**

* `feat` – new feature
* `fix` – bug fix
* `docs` – documentation
* `style` – formatting, missing semicolons, etc. (no code changes)
* `refactor` – refactoring without changing functionality
* `test` – adding or fixing tests
* `chore` – build process, dependencies, configs

**Examples:**

```
feat(frontend): add item table component
fix(backend): correct JWT authentication error
docs: update README with setup instructions
```

---

## 4. Code style

**Frontend**

* Language: TypeScript + React
* Linting: ESLint + Prettier
* Folder structure:

```
src/frontend/
  components/
  hooks/
  pages/
  styles/
  utils/
```

**Backend**

* Language: TypeScript + NestJS
* Linting: ESLint + Prettier
* Folder structure:

```
src/backend/
  modules/
  controllers/
  services/
  schemas/
  dtos/
  utils/
```

All code must pass linting and type checks before merging.

---

## 5. Development setup

### Backend

```bash
cd src/backend
yarn install
yarn dev
```

### Frontend

```bash
cd src/frontend
yarn install
yarn dev
```

* MongoDB connection string: `.env` file in `src/backend/` (example `.env.example` provided)

---

## 6. Testing

* Unit tests are colocated with the source code and have the `.test.ts` extension
* Jest is used for both frontend and backend
* Run all tests before merge:

```bash
yarn test
```

---

## 7. Code review guidelines

* Pull request titles follow conventional commits
* Each PR should describe:

  * What is done
  * Why it is done
* Code must be linted and pass all tests
* Prefer small PRs for easier review

---

## 8. Contributions

* Open issues or tickets first
* Assign yourself to a ticket before work
* Reference tickets in commit messages (`feat(frontend): add item table component #10`)

---

## 9. Deployment

* Frontend and backend are automatically deployed via Vercel on merge to `main`
* Use environment variables for sensitive data
* Avoid committing secrets

---

## 10. Additional notes

* All dates in items must be handled in UTC+1
* Status highlights (yellow/red) are derived from the date logic in frontend
* Use Tailwind or equivalent utility classes for styling (optional, can vary per frontend setup)

---

*This AGENT.md is the canonical source for coding and workflow standards for the JustInCase project.*
