# Testing Foundations

## Overview

This document defines the first practical testing plan for the StageLink SPA.

The goal of this phase is not just to "add tests", but to establish a testing workflow that matches the current codebase, reduces regression risk, and remains easy to maintain as new features are added.

This foundation is tailored to the current project structure:

- React 19 + Vite
- React Router SPA
- Mocked JSON data
- UI-heavy pages with local state
- Shared business logic in utilities and feature libraries

## Why This Phase Matters

StageLink already contains logic that can regress during refactors even without a backend:

- Date calculations
- Event filtering and sorting
- Pagination behavior
- Form validation and submission states
- Page-level interactions such as resetting filters and scroll behavior

Because of that, this phase should focus first on deterministic, high-value tests instead of broad but shallow coverage.

## Goals

The goals of this testing foundation are:

- Set up a reliable testing environment for the current React + Vite project
- Add a repeatable local workflow for running tests
- Start with the logic and behaviors that carry the most regression risk
- Make refactors safer in the event listing flow
- Establish conventions the rest of the project can follow
- Strengthen the portfolio quality of the project by showing realistic testing practices

## Testing Stack

The testing stack for this phase is:

- **Vitest** for the test runner
- **React Testing Library** for rendering and asserting UI behavior
- **jest-dom** for clearer DOM assertions
- **user-event** for realistic interactions
- **jsdom** for the browser-like environment

This stack fits naturally with Vite and encourages tests that reflect real user behavior instead of implementation details.

## Repo-Specific Risks To Cover First

The first wave of tests should target the parts of the app where logic is already concentrated:

- [eventListingUtils.js](/C:/Dev/stagelink/src/features/events/lib/eventListingUtils.js)
- [dates.js](/C:/Dev/stagelink/src/utils/dates.js)
- [NewsletterForm.jsx](/C:/Dev/stagelink/src/components/home/NewsletterForm/NewsletterForm.jsx)
- [Pagination.jsx](/C:/Dev/stagelink/src/components/shared/Pagination/Pagination.jsx)
- [EventListings.jsx](/C:/Dev/stagelink/src/pages/EventListings.jsx)

These files give the best return for the first testing investment because they contain:

- branching logic
- state transitions
- date-sensitive behavior
- browser side effects
- user interactions that are easy to validate from the UI

## Scope of This Phase

This phase covers the testing setup and the first set of meaningful tests for the current app.

Included:

- Testing dependencies and scripts
- Vitest configuration
- Shared test setup
- Unit tests for utilities and event listing logic
- Component tests for small interactive components
- One page-level integration test for the event listing flow

Not included yet:

- End-to-end browser tests
- Visual regression testing
- Snapshot-heavy testing
- Full coverage requirements
- Exhaustive tests for every page

## Testing Strategy

The project will follow a layered approach, but with a clear order of implementation.

### 1. Unit Tests First

Unit tests are the first priority for pure logic because they are:

- fast
- deterministic
- cheap to maintain
- excellent for protecting business rules

Primary targets:

- date helpers
- event filtering
- event sorting
- option generation helpers
- active filter detection

### 2. Component Tests Next

Component tests should focus on user-visible behavior for isolated UI pieces.

Primary targets:

- newsletter validation and submit states
- pagination click behavior

These tests should verify what the user sees and can do, not internal React state.

### 3. Integration Tests After That

Integration tests should be added once the base setup is working and the first component tests are stable.

For this phase, the main integration target should be:

- the `EventListings` page

This page contains meaningful coordination between:

- filters
- sorting
- pagination
- empty states
- modal behavior

That makes it more valuable than adding many small low-signal tests.

### 4. End-to-End Tests Later

End-to-end tests should wait until the main product flows are more complete and stable.

Good later candidates:

- browse events to event detail
- add tickets to cart
- complete mocked checkout
- review purchased tickets

## What This Phase Should Not Try To Do

This phase does not aim to:

- reach 100% coverage
- test every component immediately
- test CSS implementation details
- overuse snapshots
- introduce Playwright or Cypress too early
- block feature work behind a large testing migration

The goal is meaningful confidence, not coverage vanity.

## Test Organization

Tests should live close to the code they cover whenever possible.

Recommended structure:

```txt
src/
  components/
    home/
      NewsletterForm/
        NewsletterForm.jsx
        NewsletterForm.test.jsx
    shared/
      Pagination/
        Pagination.jsx
        Pagination.test.jsx
  features/
    events/
      lib/
        eventListingUtils.js
        eventListingUtils.test.js
  pages/
    EventListings.jsx
    EventListings.test.jsx
  utils/
    dates.js
    dates.test.js
  test/
    setup.js
```

This keeps the test location predictable and makes refactors easier.

## Required Setup Changes

This phase is only complete if the repository includes the following setup work:

### Dependencies

Add these development dependencies:

- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

### Scripts

Add these scripts to `package.json`:

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

### Vite / Vitest Configuration

Update `vite.config.js` to include a `test` section with at least:

- `environment: "jsdom"`
- `setupFiles`
- `globals: true` or a clear decision to use explicit imports

### Shared Test Setup

Create `src/test/setup.js` for:

- `@testing-library/jest-dom`
- shared mocks when needed
- cleanup conventions if required by the stack

### ESLint Alignment

Update ESLint so test files do not fail on Vitest globals such as:

- `describe`
- `it`
- `expect`
- `vi`

If globals are not enabled in Vitest, use explicit imports consistently and document that decision.

## Deterministic Testing Rules

This project already contains time-based and browser-dependent behavior, so the test strategy must define how to keep tests stable.

### Dates

When testing date logic:

- pass explicit `now` values to pure helpers whenever possible
- avoid relying on the system clock
- use fixed dates in tests

This is especially important for:

- `getThisWeekRange`
- `getThisWeekendRange`
- `getNextSevenDays`
- `getThisMonthRange`
- `getNextThirtyDays`
- event filtering by date range

### Timers

When testing the newsletter form:

- use fake timers for the simulated async submission
- assert loading and success states explicitly

### Browser APIs

When testing pagination or page-level interactions:

- mock `window.scrollTo`
- assert it was called with expected values

### DOM Side Effects

When testing `EventListings` modal behavior:

- assert body style changes when the mobile filter modal opens
- assert cleanup restores body styles on close

## Initial Test Plan

The first implementation pass should happen in this order.

### Stage 1. Tooling Smoke Check

Goal:

- prove the environment works before writing many tests

Deliverables:

- dependencies installed
- scripts added
- Vitest configured
- shared setup created
- one smoke test passing

Suggested smoke test:

- render a small component and assert visible text

### Stage 2. Unit Tests For Utility Functions

Goal:

- protect pure logic first

Files:

- `src/utils/dates.test.js`
- `src/features/events/lib/eventListingUtils.test.js`

Priority cases for `dates.js`:

- start and end of day behavior
- adding days without mutating the original value
- week range boundaries
- weekend range boundaries for weekday, Saturday, and Sunday
- next 7 and next 30 day ranges
- inclusive date range matching
- null date handling

Priority cases for `eventListingUtils.js`:

- upcoming events are filtered and sorted correctly
- filters combine correctly
- date range filters honor explicit `now`
- price range filters work correctly
- recommended sorting prioritizes featured events
- option helpers return counts and disabled states correctly
- `hasActiveFilters` detects changes correctly
- `getPriceRangeLabel` formats all supported states correctly

### Stage 3. Component Tests

Goal:

- validate the most meaningful isolated interactions

Files:

- `src/components/home/NewsletterForm/NewsletterForm.test.jsx`
- `src/components/shared/Pagination/Pagination.test.jsx`

Priority cases for `NewsletterForm`:

- empty email shows validation error
- invalid email shows validation error
- valid email enters submitting state
- success message appears after timer finishes
- input clears on success
- changing the input clears previous error or success state

Priority cases for `Pagination`:

- current page is rendered
- page click calls `onPageChange`
- previous button does nothing on the first page
- next button does nothing on the last page
- valid navigation triggers `window.scrollTo`

### Stage 4. One Integration Test For `EventListings`

Goal:

- prove the core event discovery flow works as a connected experience

File:

- `src/pages/EventListings.test.jsx`

Priority cases:

- page renders event results from mocked data
- changing a filter updates visible results
- changing sort resets pagination to page 1
- changing filters resets pagination to page 1
- clearing filters restores initial results
- empty state appears when filters remove all results

If the mobile filter modal is stable enough to test without excessive setup, add:

- opening the modal locks body scroll
- closing the modal restores body styles

## Definition of Done For This Milestone

This milestone should be considered complete only when all of the following are true:

- `pnpm test` works in watch mode
- `pnpm test:run` completes successfully
- `pnpm lint` still passes
- the shared test setup is committed
- the first unit tests are committed
- the first component tests are committed
- at least one page-level integration test is committed
- the test suite is deterministic and does not depend on the current date or uncontrolled timers
- the document stays aligned with the actual project setup

## Suggested Implementation Order For Commits

To keep history clean and reviewable, the work should be grouped into small logical commits:

1. `docs(testing): refine testing foundations milestone`
2. `test(setup): add vitest and testing library configuration`
3. `test(utils): cover date and event listing helpers`
4. `test(ui): cover newsletter form and pagination`
5. `test(events): add event listings integration coverage`

## Future Phases

Future feature work should ship with its own relevant tests in the same implementation cycle.

Examples:

- `EventDetail` should bring tests for event-specific rendering and ticket selection behavior
- `Cart` should bring tests for quantity updates, totals, and persistence behavior
- `MyTickets` should bring tests for rendering purchased ticket states

Later, when user flows are more complete, a separate milestone can introduce:

- end-to-end coverage
- coverage reporting thresholds if they become useful
- CI enforcement beyond local workflow

## Running Tests

Once this milestone is implemented, the repository should support:

```bash
pnpm test
pnpm test:run
pnpm test:coverage
```

## Final Notes

This is a good milestone only if it remains practical.

The right outcome for this phase is:

- a working test environment
- a small but meaningful test suite
- clear conventions for future work
- confidence in the event discovery flow

If a proposed test does not reduce risk, improve confidence, or document behavior clearly, it should not be prioritized in this phase.
