# StageLink Frontend Roadmap

This roadmap covers ONLY the frontend implementation of StageLink, aligned with the Stitch design pack.
It focuses on UI, routing, client-side state, accessibility basics, and a realistic user flow using mock data.

Backend APIs, database design, authentication server, and real payments are intentionally out of scope here and will be planned separately.

## Frontend Goals

- Build a complete, navigable UI that matches the Stitch screens
- Use mock data to simulate a real product experience
- Persist cart and tickets locally (localStorage) for realism
- Keep codebase clean and scalable (pages/components separation, small PRs, reusable UI)

## Routes (Frontend)

Public

- `/` Home (Landing)
- `/events` Events (Explore)
- `/events/:eventId` Event Detail
- `/cart` Checkout flow (can be multi-step inside the route)
- `/my-tickets` My Tickets
- `*` NotFound

Auth (UI only)

- `/login`
- `/register`
- `/forgot-password`

Admin (UI only)

- `/admin`
- `/admin/users`
- `/admin/roles`
- `/admin/venues`
- `/admin/concerts`
- `/admin/events`
- `/admin/prices`
- `/admin/orders`

## Data & Persistence (Frontend)

Mock data (local files)

- Events, Venues, Concerts, Price tiers
- Orders/Tickets (generated client-side)

localStorage

- Cart items
- Orders
- Tickets
- Optional: “fake session” (if you want logged-in UI states)

## Milestones

0. Foundation (done)

- Vite + React + Router
- AppLayout shell (header/main/footer)
- Base pages and NotFound
- Global reset

1. Theme tokens (done)

- CSS variables (colors, surfaces, radii, typography)
- Global background/text styles
- Spline Sans loaded

2. Home UI (Landing)

- Hero banner with CTA
- Featured events preview (cards from mock data)
- CTA navigates to `/events`

3. Events UI (Explore)

- Filters sidebar (UI + basic filtering)
- Events grid (cards from mock data)
- Pagination UI
- Empty and loading states

4. Event Detail UI

- Event header/media section
- Ticket tiers and quantity controls
- “Sold out” state
- Add to cart behavior

5. Checkout UI (Cart)

- Review step (items + totals)
- Payment step (fake payment form)
- Confirmation step (order summary + QR placeholder)
- Persist orders/tickets, clear cart

6. My Tickets UI

- Tabs (Upcoming / Past)
- Search + sorting UI
- Ticket cards and actions (UI + minimal behavior)

7. Auth UI (Login/Register/Forgot)

- Forms and validation
- Fake session state (optional)
- Header reflects auth state (optional)

8. Admin UI (UI-first)

- Admin layout with sidebar
- Dashboard cards (mock data)
- Orders & Tickets management table (mock)
- Basic CRUD screens (UI only): users/roles/venues/concerts/events/prices

9. Polish

- Accessibility pass (focus-visible, labels, keyboard)
- Responsive refinements
- Consistent empty/loading states
- README screenshots + short demo instructions

## Non-Goals (Frontend Roadmap)

- Real backend integration
- Real authentication security
- Stripe live payments
- Webhooks/emails/refunds
- Database constraints and conflict rules (venue/time overlap)

These belong to a separate Backend roadmap.
