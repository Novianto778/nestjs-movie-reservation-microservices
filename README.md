# ✅ Advanced Movie Reservation System – Development Checklist

A complete system using NestJS Monorepo, RabbitMQ, Prisma, BullMQ, Saga, and Event-Driven Architecture.

---

## 🧱 Monorepo Structure

- [ ] Set up NestJS Monorepo (`apps/`, `libs/`)
- [ ] Docker Compose for local dev (PostgreSQL, RabbitMQ, Redis)
- [ ] Centralized `.env` config per service
- [ ] Shared libs:
  - [ ] `common/` for DTOs, events, exceptions
  - [ ] `utils/` for helpers (Cloudinary, JWT, time)
  - [ ] `configs/` for environment/config handling
  - [ ] `decorators/`, `guards/`, `interceptors/`

---

## 🔐 Auth Service (`apps/auth`)

### Features

- [ ] Register user
- [ ] Login user (JWT)
- [ ] User roles: `SUPER_ADMIN`, `ADMIN`, `USER`
- [ ] Promote/demote user role
- [ ] `GET /me` endpoint

### Implementation

- [ ] JWT-based AuthGuard
- [ ] Role-based access (`RolesGuard`)
- [ ] Password hashing (bcrypt)
- [ ] Prisma schema for `User`
- [ ] Listen to `movie.created` to auto-promote user

---

## 🎬 Movie Service (`apps/movie`)

### Features

- [ ] CRUD for movies (admin & super-admin)
- [ ] Upload image/video to Cloudinary
- [ ] Filter movies by name, genre, date, showTime
- [ ] Genres CRUD
- [ ] Pagination support

### Implementation

- [ ] Prisma schema for `Movie` and `Genre`
- [ ] Cloudinary SDK integration
- [ ] Emit `movie.created` event
- [ ] File upload handling (NestJS + Multer)
- [ ] Input validation via DTOs
- [ ] Rate limiting for public routes

---

## 🎟️ Reservation Service (`apps/reservation`)

### Features

- [ ] Create reservation
- [ ] Cancel reservation
- [ ] Refund request on cancellation
- [ ] Status: `PENDING`, `CONFIRMED`, `CANCELLED`, `REFUNDED`

### Implementation

- [ ] Prisma schema for `Reservation`, `Refund`
- [ ] Use BullMQ or Redis lock to prevent race condition
- [ ] Emit events:
  - `reservation.created`
  - `reservation.cancelled`
- [ ] Saga coordinator for create → pay → confirm
- [ ] Dead Letter Queue + retries

---

## 💳 Payment Service (`apps/payment`)

### Features

- [ ] Handle payment from user
- [ ] Link to reservation
- [ ] Webhook to confirm payment
- [ ] Trigger refund
- [ ] Payment logs

### Implementation

- [ ] Prisma schema for `Payment`, `PaymentLog`
- [ ] Listen to `reservation.created`
- [ ] Emit `payment.success` or `payment.failed`
- [ ] Retry failed payment updates
- [ ] Support idempotent payment handling

---

## ✉️ Notification Service (`apps/notification`)

### Features

- [ ] Email user when:
  - [ ] Reservation created
  - [ ] Payment success
  - [ ] Refund triggered
  - [ ] Movie reminder (1hr before)
- [ ] Log email status
- [ ] Retry if sending fails

### Implementation

- [ ] Use BullMQ queues
- [ ] Mailer service (e.g. SendGrid, SMTP)
- [ ] Prisma schema for `EmailLog`
- [ ] Listen to:
  - `reservation.created`
  - `payment.success`
  - `refund.requested`
  - `movie.reminder`

---

## ⏰ Scheduler Service (`apps/scheduler`)

### Features

- [ ] Run cron to check for upcoming movies
- [ ] Emit `movie.reminder` event 1 hour before showTime

### Implementation

- [ ] Stateless service, no DB
- [ ] Use `@Schedule()` or BullMQ repeatable job
- [ ] Communicate with MovieService via TCP or HTTP
- [ ] Emit `movie.reminder` via RabbitMQ

---

## 🚪 API Gateway (`apps/api-gateway`)

### Features

- [ ] Entry point for frontend
- [ ] Proxy to services (TCP or HTTP)
- [ ] Global exception filter
- [ ] JWT & Role Guards
- [ ] Swagger UI setup
- [ ] Rate limiting per IP/route
- [ ] Versioned routing (`v1/`)

### Implementation

- [ ] Custom AuthModule for decoding + passing JWT
- [ ] Dynamic route mapping to microservices
- [ ] Global validation pipe
- [ ] Logging interceptor
- [ ] Exception filter with standard format

---

## 🔁 Shared Libraries (`libs/`)

### `libs/common/`

- [ ] DTOs per service (register, movie create, etc.)
- [ ] Shared Enums (`UserRole`, `PaymentStatus`, etc.)
- [ ] Event contracts with payload types
- [ ] Exception base class & filters
- [ ] Shared guards (`RolesGuard`, `JwtGuard`)

### `libs/utils/`

- [ ] JWT signing/verification helpers
- [ ] Cloudinary uploader
- [ ] Time/date helpers
- [ ] Redis lock utility

### `libs/configs/`

- [ ] Central `ConfigModule` abstraction
- [ ] Env validation using `zod` or `joi`
- [ ] Per-service config loader

---

## 📬 RabbitMQ (Event Bus)

### Setup

- [ ] Declare exchanges & routing keys
- [ ] Global event bus wrapper in `common`
- [ ] Setup retries and DLQ queues
- [ ] Use `@EventPattern()` / `@MessagePattern()` decorators

### Events

- [ ] `movie.created`
- [ ] `reservation.created`
- [ ] `reservation.cancelled`
- [ ] `payment.success`
- [ ] `payment.failed`
- [ ] `refund.requested`
- [ ] `movie.reminder`

---

## 🔄 Saga Pattern (Saga Coordinator)

### Flow: Reservation + Payment Saga

- [ ] Step 1: Create reservation
- [ ] Step 2: Initiate payment
- [ ] Step 3: On `payment.success`, confirm reservation
- [ ] Step 4: On `payment.failed`, cancel reservation (compensating)

### Saga Utilities

- [ ] Saga state tracking (in-memory or persistent)
- [ ] Saga failure logging
- [ ] Retry or rollback path on each step

---

## ⚙️ DevOps & Local Tools

- [ ] Docker Compose for:
  - PostgreSQL
  - RabbitMQ
  - Redis
- [ ] Prisma migrate + seed scripts
- [ ] Swagger per service
- [ ] Postman/Thunder client collections
- [ ] `.env` file for each service

---

## 🧪 Testing (IN THE FUTURE)

- [ ] Unit tests for all core services
- [ ] E2E tests with Supertest
- [ ] Integration tests with SQLite/testcontainers
- [ ] Test retries, compensating logic, and event replay

---

## 📈 Monitoring & Observability (Optional)

- [ ] `/health` endpoint for each service
- [ ] Use Winston or Pino for logging
- [ ] Include correlation/request IDs in logs
- [ ] Optional: Prometheus metrics or APM (e.g. Grafana, Sentry)

---
