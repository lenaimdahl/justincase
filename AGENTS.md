# AGENTS Guide

This file explains how coding agents should work in this repository.

## General

### Approach

- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.

### Output

- Return code first. Explanation after, only if non-obvious.
- No inline prose. Use comments sparingly - only where logic is unclear.
- No boilerplate unless explicitly requested.

### Code Rules

- Simplest working solution. No over-engineering.
- No abstractions for single-use operations.
- No speculative features or "you might also want..."
- Read the file before modifying it. Never edit blind.
- No docstrings or type annotations on code not being changed.
- No error handling for scenarios that cannot happen.
- Three similar lines is better than a premature abstraction.

### Review Rules

- State the bug. Show the fix. Stop.
- No suggestions beyond the scope of the review.
- No compliments on the code before or after the review.

### Debugging Rules

- Never speculate about a bug without reading the relevant code first.
- State what you found, where, and the fix. One pass.
- If cause is unclear: say so. Do not guess.

### Simple Formatting

- No em dashes, smart quotes, or decorative Unicode symbols.
- Plain hyphens and straight quotes only.
- Natural language characters (accented letters, CJK, etc.) are fine when the content requires them.
- Code output must be copy-paste safe.

## 1. Project structure

```
packages/
  frontend/   # React app
  backend/    # NestJS app with MongoDB
```

- **frontend**: Contains all React components, pages, hooks, and assets.
- **backend**: Contains NestJS modules, controllers, services, schemas, and configuration.

All code is written in **TypeScript**.

---

## 2. Branching and workflow

- **Main branch**: `main` (production-ready)
- **Feature branches**: `feature/<short-description>`
- **Bugfix branches**: `fix/<short-description>`

**Merge strategy**: Pull requests only, reviewed by at least one developer.

---

## 3. Commits

We follow **Conventional Commits**: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

**Format:**

```
<type>(<scope>): <short description>
```

**Types:**

- `feat` – new feature
- `fix` – bug fix
- `docs` – documentation
- `style` – formatting, missing semicolons, etc. (no code changes)
- `refactor` – refactoring without changing functionality
- `test` – adding or fixing tests
- `chore` – build process, dependencies, configs

**Examples:**

```
feat(frontend): add item table component
fix(backend): correct JWT authentication error
docs: update README with setup instructions
```

---

## 4. Code style

**Frontend**

- Language: TypeScript + React
- Linting: Prettier
- Folder structure:

```
packages/frontend/
  components/
  hooks/
  pages/
  styles/
  utils/
```

**if-cases without curly braces** are not allowed. Always use curly braces for clarity:

```typescript
// ✅ CORRECT
if (condition) {
  doSomething();
}

// ❌ WRONG
if (condition) doSomething();
```

**Module path imports (Frontend)**

All imports in the frontend must use absolute `src/` paths instead of relative paths:

```typescript
// ✅ CORRECT
import {ListCard} from 'src/components/lists/ListCard';
import {useFetchLists} from 'src/hooks/useFetchLists';
import type {List} from 'src/types/list';

// ❌ WRONG
import {ListCard} from './ListCard';
import {useFetchLists} from '../../hooks/useFetchLists';
import type {List} from '../types/list';
```

This improves readability, prevents import path issues when moving files, and makes refactoring easier.

**Backend**

- Language: TypeScript + NestJS
- Linting: Prettier
- Folder structure:

```
packages/backend/
  modules/
  controllers/
  services/
  schemas/
  dtos/
  utils/
```

All code must pass linting and type checks before merging.

---

## 5. Comments and documentation

**Use minimal, essential comments only:**

- Only add comments for **non-obvious logic** or **complex algorithms**
- Never comment self-explanatory code
- Remove inline comments that restate what the code already says
- Keep JSDoc blocks for exported functions (valuable for IDE hints)
- Code should be readable without comments through clear naming and structure

**Examples:**

```typescript
// ✅ CORRECT - JSDoc for exported functions, no obvious inline comments
/**
 * Calculate days between two dates
 */
function getDaysBetween(from: Date, to: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((to.getTime() - from.getTime()) / msPerDay);
}

// ❌ WRONG - Redundant comments
/**
 * Get current date
 * @returns Date object representing today
 */
function getCurrentDate(): Date {
  const now = new Date(); // Create new date
  return now; // Return it
}
```

---

## 7. Development setup

### Backend

```bash
cd packages/backend
yarn install
yarn dev
```

### Frontend

```bash
cd packages/frontend
yarn install
yarn dev
```

- MongoDB connection string: `.env` file in `packages/backend/` (example `.env.example` provided)

---

## 8. Testing

- Unit tests are colocated with the source code and have the `.test.ts` extension
- vitest is used for both frontend and backend
- Run all tests before merge:

```bash
yarn test
```

---

## 9. Code review guidelines

- Pull request titles follow conventional commits
- Each PR should describe:
  - What is done
  - Why it is done

- Code must be linted and pass all tests
- Prefer small PRs for easier review

---

## 10. Contributions

- Open issues or tickets first
- Assign yourself to a ticket before work
- Reference tickets in commit messages (`feat(frontend): add item table component #10`)

---

## 11. Deployment

- Frontend and backend are automatically deployed via Vercel on merge to `main`
- Use environment variables for sensitive data
- Avoid committing secrets

---

## 12. Dependency versioning

- All dependencies in **every `package.json` file** must use **exact versions** (no `^`, `~`, or other range specifiers)
- Example: `"react": "18.2.0"` instead of `"react": "^18.2.0"`
- This ensures reproducible builds across all environments
- Only example: `@types/node` – this has to stay at `~24`

---

## 13. Additional notes

- All dates in items must be handled in UTC+1
- Status highlights (yellow/red) are derived from the date logic in frontend
- Use Tailwind or equivalent utility classes for styling (optional, can vary per frontend setup)

---

_This AGENTS.md is the canonical source for coding and workflow standards for the JustInCase project._
