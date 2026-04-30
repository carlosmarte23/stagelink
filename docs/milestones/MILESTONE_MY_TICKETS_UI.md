# Milestone: My Tickets UI

Target screen

- Stitch-inspired My Tickets wallet with ticket cards, search controls, upcoming/past organization, and a focused QR modal

Goal

Build `/my-tickets` as the final public MVP route for StageLink. The page should complete the purchase flow by showing locally generated tickets after checkout and giving users a simple way to present a larger QR code.

Non-goals

- Keep this milestone limited to the local ticket wallet, ticket filtering, and QR modal.
- Do not expand this milestone into additional routes or account-style workflows.

## Design Direction

- Use the accepted Stitch direction as a reference, but keep the current StageLink public header and app shell.
- Avoid extra Stitch navbar elements.
- Cards should feel like a premium ticket wallet: compact, readable, image-led, and focused on the venue-ready ticket.
- The QR modal should stay intentionally small in scope: large QR display, event title, tier, holder name, and ticket ID.

## Data Model

The page reads generated local tickets from `stageLinkTickets` through `getTickets()`.

Each ticket card should use:

- `ticketId`
- `orderId`
- `status`
- `holderName`
- `eventId`
- `qrValue`
- `eventSnapshot.title`
- `eventSnapshot.startsAt`
- `eventSnapshot.timezone`
- `eventSnapshot.imageUrl`
- `eventSnapshot.venue.name`
- `eventSnapshot.venue.city`
- `tierSnapshot.name`

Order records remain local checkout data and are not part of this page UI.

## Page Behavior

- Default to the Upcoming tab.
- Split tickets by `eventSnapshot.startsAt`.
- Search across event title, venue name, venue city, holder name, order ID, ticket ID, and tier name.
- Sort upcoming tickets by closest event date.
- Sort past tickets by most recent event date.
- Show an empty state when no tickets exist.
- Show a no-results state when filters return no visible tickets.
- Link each card to its source event through `/events/:eventId`.

## QR Direction

The compact QR preview and modal should use `qrValue`.

For the current MVP, `qrValue` should be a useful scan target instead of an opaque local string. The temporary destination is:

- `https://stagelink.vercel.app`

The implementation can add query parameters such as `source=stagelink-ticket` and `ticket=<ticketId>`. This can be changed later to a portfolio case-study URL.

## Delivery Strategy

This milestone should be delivered after the documentation scope lock.

Recommended PR:

- My Tickets UI, QR value update, tests, and final polish

Suggested branch:

- `feat/my-tickets-wallet`

Suggested commits:

- `test: define my tickets qr and filtering contracts`
- `feat: generate useful qr values for tickets`
- `feat: add my tickets wallet page`
- `test: cover my tickets wallet flow`

## TDD Delivery Strategy

PR2 should follow a test-first workflow. Each stage starts by writing a focused failing test, then implements the smallest change needed to pass, then refactors while tests stay green.

Recommended sequence:

- QR contract tests, then update `qrValue` generation.
- Ticket wallet helper tests, then implement grouping, searching, sorting, and short ID display.
- Page state tests, then replace the `/my-tickets` placeholder with empty and no-results states.
- Ticket card tests, then render saved tickets from local storage.
- Interaction tests, then wire tabs, search, sorting, and QR modal behavior.
- Checkout handoff test, then update Checkout Done to link to `/my-tickets`.
- Full regression with `pnpm test:run`, `pnpm lint`, and one manual checkout-to-wallet walkthrough.

## Testing Expectations

- Empty ticket storage renders the empty state.
- Saved tickets render as cards.
- Upcoming and Past tabs separate tickets by event date.
- Search filters visible tickets.
- QR modal opens with the selected ticket and closes cleanly.
- Checkout Done links to `/my-tickets`.
- Checkout still persists orders and generated tickets.

## Definition of Done

- `/my-tickets` renders a polished ticket wallet.
- Ticket cards display the required event, holder, order, tier, status, and QR data.
- QR modal is focused and responsive.
- Empty and no-results states are complete.
- Checkout confirmation hands off to My Tickets.
- `pnpm test:run` and `pnpm lint` pass.
- No console errors.
