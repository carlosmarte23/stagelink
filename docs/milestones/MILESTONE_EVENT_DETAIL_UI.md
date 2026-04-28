# Milestone: Event Detail UI

Target screen

- Stitch Event Detail: hero/media section + event summary + ticket selection panel

Goal

Build the `/events/:eventId` page so it matches the design, uses one canonical event contract across the app, and behaves like a realistic ticketing UI with variable tiers, sold-out handling, and local add-to-cart behavior.

Non-goals (not in this milestone)

- No real backend or live inventory reservation
- No seat map or seat selection
- No checkout implementation beyond add-to-cart handoff
- No recommendations or related events section for now

## Stitch Design

[![Event Detail Design](/docs/design/event-detail.png "Event Detail Page")](./design/event-detail.png "Open full size")
_Event Detail Page_

Responsive interpretation

- Mobile first
- Tablet follows the mobile content order with more space and wider blocks
- Desktop switches to a two-column layout with event content on the left and the ticket panel on the right

## Canonical Event Contract

Every event should move to a canonical shape that works for Home, Events, and Event Detail.

Required fields

- `id`
- `title`
- `description`
- `startsAt`
- `doorsAt` (optional)
- `timezone`
- `imageUrl`
- `genres`
- `isFeatured` (optional)
- `venue.name`
- `venue.city`
- `venue.address`
- `ticketTiers[]`

Each ticket tier should support

- `id`
- `name`
- `description`
- `price`
- `remaining`
- `perOrderLimit` (optional)

Derived rules

- `priceFrom` is derived from the cheapest available ticket tier
- `displayDoorsAt` is `doorsAt ?? startsAt - 1 hour`
- `eventSoldOut` is true when all tiers have `remaining <= 0`
- `effectiveTierLimit` is `min(remaining, perOrderLimit ?? 8)`
- Ticket tiers are variable per event and are embedded in the mock event data for now

## Delivery Strategy

This milestone should be delivered in **5 logical stages** so the event contract, existing pages, and the new detail page evolve together.

### Stage 1: Contract + Data Access Layer + Tests + Data Refactor

Purpose

Define the new event contract, add a small shared data-access layer, refactor the mock data early, and protect the new rules with tests before UI work.

Includes

- Event Detail milestone document
- Canonical event mock shape
- Shared event repository as the single access point to the catalog
- Derived helpers for pricing, sold-out state, doors fallback, and tier limits
- Tests for the new contract and helper behavior

### Stage 2: Refactor Home + Events

Purpose

Move the existing Home and Events pages to the new event contract so Event Detail does not introduce a one-off model.

Includes

- Home refactor to use `startsAt`, `venue.*`, and derived pricing
- Events listing/card refactor to use canonical event data
- Consistent sold-out and price-from messaging
- Test updates for existing screens

### Stage 3: Event Detail Foundation

Purpose

Build the structural page and route behavior before ticket interactions.

Includes

- Route lookup by `eventId`
- Fallback for missing or invalid events
- Hero/media section
- Event summary content
- Venue/date blocks
- Mobile-first responsive layout

### Stage 4: Ticket Tiers + Add To Cart

Purpose

Turn the static page into a realistic ticket-selection experience.

Includes

- Variable tier rendering per event
- Disabled sold-out tiers
- Quantity steppers
- Limit enforcement using `effectiveTierLimit`
- CTA disabled when quantity is zero
- Local add-to-cart persistence
- Interaction tests for tier selection and cart payload

### Stage 5: Responsive Polish + QA

Purpose

Finish the page so it feels stable and production-minded across breakpoints.

Includes

- Mobile, tablet, and desktop refinements
- Focus states and accessibility cleanup
- Validation for long content and many tiers
- Full regression pass for Home, Events, and Event Detail

## Step-by-step Plan

### Part 1) Contract + Data Access Layer + Tests + Data Refactor

Scope

- Create the Event Detail milestone doc
- Refactor `events.json` to the canonical event shape
- Create a small event repository that becomes the single access point to the catalog
- Remove `priceFrom` as source-of-truth
- Add shared helpers/selectors for:
  - event lookup by `eventId`
  - derived lowest available price
  - derived sold-out state
  - derived doors time
  - derived effective quantity limit
- Keep new code from importing `events.json` directly when repository/selectors cover the use case
- Add deterministic tests for those helpers and update any broken tests

Acceptance check

- The milestone document, mock data, repository, and tests all agree on one canonical event contract

### Part 2) Refactor Home + Events

Scope

- Update Home to render from the new event shape
- Update Event Listings and EventCard to read `venue.name`, `venue.city`, and derived price info
- Show sold-out state consistently when an event has no available tiers
- Keep navigation to `/events/:eventId` working
- Update affected tests

Acceptance check

- Home and Events render correctly from the new contract without duplicated price logic

### Part 3) Event Detail Foundation

Scope

- Resolve the current event from the route param
- Render a not-found or safe fallback state when the event does not exist
- Build the hero/media section using `imageUrl` and the existing image helper for a higher-resolution source
- Render title, description, starts time, doors time, venue name, and venue address
- Build the mobile-first layout and desktop split layout
- Place the ticket panel below the event summary on mobile/tablet and beside it on desktop

Acceptance check

- `/events/:eventId` renders a complete static detail page structure and handles invalid routes gracefully

### Part 4) Ticket Tiers + Add To Cart

Scope

- Render all tiers defined for the event
- Show each tier name, description, and price
- Keep sold-out tiers visible but disabled
- Add increment/decrement controls with a minimum of `0`
- Enforce the effective maximum using `min(remaining, perOrderLimit ?? 8)`
- Disable the CTA when no tickets are selected
- Persist the selected event and tiers in local storage
- Provide clear feedback after adding to cart
- Add page-level tests for tier interaction and add-to-cart behavior

Acceptance check

- Users can select valid ticket quantities, cannot exceed tier limits, and can add a valid selection to the local cart

### Part 5) Responsive Polish + QA

Scope

- Refine spacing and typography across mobile, tablet, and desktop
- Verify the ticket panel remains usable on smaller screens
- Improve keyboard focus visibility and control labels
- Validate long titles, long descriptions, and events with many tiers
- Run `pnpm test:run`
- Run `pnpm lint`
- Perform manual QA for Home, Events, and Event Detail after the shared data refactor

Acceptance check

- The page is responsive, accessible enough for the current phase, and does not regress existing flows

## Testing Expectations

Required test cases

- Event detail renders correctly for a valid `eventId`
- Invalid `eventId` shows a safe fallback state
- Date, doors time, venue, and description render from canonical event data
- Variable ticket tier counts render correctly
- Sold-out tiers are visible and disabled
- Quantity steppers increment and decrement within valid bounds
- CTA stays disabled when total selected quantity is `0`
- Add-to-cart stores the expected payload in local storage
- Home and Events continue to work after the event contract refactor

## Definition of Done

- `/events/:eventId` matches the intended layout across mobile, tablet, and desktop
- Event data comes from one canonical mock contract
- Home and Events use the same derived pricing rules as Event Detail
- Ticket tiers are variable per event and behave correctly
- Sold-out tiers remain visible and disabled
- Add-to-cart works with local persistence
- Invalid routes are handled gracefully
- `pnpm test:run` and `pnpm lint` pass
- No console errors

## Assumptions

- Tablet follows the mobile-first structure, not the desktop sidebar-first layout
- `doorsAt` is optional and falls back to one hour before `startsAt`
- `perOrderLimit` defaults to `8` when omitted
- Ticket tier counts are simulated through mock data in this milestone

