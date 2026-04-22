# StageLink Frontend Roadmap

This roadmap covers the frontend implementation of StageLink, aligned with the Stitch design pack.

The scope includes UI, routing, client-side state, local persistence, accessibility basics, and a realistic ticketing flow using mock data. Backend APIs, database design, authentication services, and real payments are outside this roadmap and will be planned separately.

## Frontend Goals

- Build a complete, navigable ticketing SPA that matches the Stitch screens
- Use canonical mock data to simulate a realistic product catalog
- Persist cart, orders, and tickets locally through `localStorage`
- Keep feature work organized through page/component separation and milestone documents
- Protect shared logic and core user flows with deterministic tests

## Current Implementation Status

Completed

- Vite + React + React Router SPA foundation
- Public app layout with header, main content, footer, and scroll restoration
- Theme tokens, global styles, typography, and base layout styles
- Home UI with hero, featured events, newsletter form, and event navigation
- Events UI with filters, sorting, pagination, empty state, and responsive behavior
- Canonical event data contract with repository/selectors
- Event Detail UI with event lookup, responsive detail layout, ticket tiers, sold-out handling, and add-to-cart behavior
- Local cart storage helpers with tests
- Checkout Review step with multi-event cart contents, selected tier rows, quantity/removal actions, shared fee model, and recalculated totals
- Testing foundation with Vitest, React Testing Library, jest-dom, user-event, and jsdom
- Unit, component, and page-level tests for event logic, date helpers, pagination, newsletter, Home, Events, Event Detail, Ticket Purchase Panel, and cart storage

In progress

- Checkout Details step with guest/contact data collection and step-state progression

Planned

- Checkout Pay step with frontend-only payment validation
- Checkout Done step with simulated backend payload, local order/ticket persistence, and cart clearing
- My Tickets UI
- Auth UI
- Admin UI
- Final frontend polish pass

## Routes

Public

- `/` Home
- `/events` Events
- `/events/:eventId` Event Detail
- `/cart` Checkout
- `/my-tickets` My Tickets
- `*` NotFound

Auth UI

- `/login`
- `/register`
- `/forgot-password`

Admin UI

- `/admin`
- `/admin/users`
- `/admin/roles`
- `/admin/venues`
- `/admin/concerts`
- `/admin/events`
- `/admin/prices`
- `/admin/orders`

## Data & Persistence

Mock data

- Events
- Venues embedded in the event contract
- Ticket tiers embedded in each event
- Orders and tickets generated client-side during checkout

Local persistence

- Cart items
- Orders
- Tickets
- Future fake session state for auth UI

## Milestones

### 0. Foundation (done)

- Vite + React + Router
- AppLayout shell
- Base pages and NotFound
- Global reset and layout styles

Milestone document

- [Testing Foundations](./milestones/TESTING_FOUNDATIONS.md)

### 1. Theme Tokens (done)

- CSS variables for colors, surfaces, radii, and typography
- Global background and text styles
- Spline Sans loaded
- Shared button and layout primitives

### 2. Home UI (done)

- Hero banner with CTA
- Featured events preview from canonical mock data
- Newsletter form validation and feedback
- CTA navigation to `/events`
- Event card navigation to `/events/:eventId`

Milestone document

- [Home UI](./milestones/MILESTONE_HOME_UI.md)

### 3. Events UI (done)

- Filters panel
- Events grid
- Sorting controls
- Client-side pagination
- Empty state
- Responsive mobile filter behavior

Milestone document

- [Events UI](./milestones/MILESTONE_EVENTS_UI.md)

### 4. Event Detail UI (done)

- Event header/media section
- Event summary, date, doors, and venue details
- Variable ticket tiers
- Sold-out tier state
- Quantity controls with per-tier limits
- Local add-to-cart persistence

Milestone document

- [Event Detail UI](./milestones/MILESTONE_EVENT_DETAIL_UI.md)

### 5. Checkout UI (in progress)

- New Stitch design for a premium single-page checkout
- Multi-event cart review built around a visual progress timeline
- Event-grouped cart rows with every purchased tier visible under its event
- Centered step panel for Review, Details, Pay, and Done
- Inline cart totals with subtotal, fees, facility charge, and total
- Shared per-ticket service fee model for Event Detail and Checkout
- Facility charge applied once per checkout order
- Dedicated checkout state by concern: cart contents, buyer details, and payment details
- Buyer details collected before payment with required field validation
- Fake payment details stored only as safe simulated data
- Backend-like checkout payload assembled at confirmation time, not as a mutable object throughout the flow
- Local confirmation handoff to My Tickets

Milestone document

- [Cart / Checkout UI](./milestones/MILESTONE_CART_CHECKOUT_UI.md)

### 6. My Tickets UI (planned)

- Tabs for upcoming and past tickets
- Search and sorting controls
- Ticket cards
- QR placeholder display
- Empty states

### 7. Auth UI (planned)

- Login form
- Register form
- Forgot password form
- Optional fake session state
- Header state for signed-in and signed-out UI

### 8. Admin UI (planned)

- Admin layout with sidebar
- Dashboard cards from mock data
- Orders and tickets management table
- UI-only CRUD screens for users, roles, venues, concerts, events, and prices

### 9. Polish (planned)

- Accessibility pass
- Responsive refinements
- Consistent empty/loading states
- README screenshots and demo instructions
- Final regression testing for the MVP frontend flow

## Non-Goals

- Real backend integration
- Real authentication security
- Live Stripe payments
- Webhooks, emails, and refunds
- Database constraints and conflict rules
- Production-grade inventory locking

These concerns belong to the backend and systems roadmap.
