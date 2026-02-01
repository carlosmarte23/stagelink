# Milestone: Home UI (Discover)

Target screen

- Stitch Home (Discover): hero banner + filters sidebar + featured events grid + pagination + footer

Goal
Build the Home page UI so it visually matches the design and behaves like a real app using mock data.

Non-goals (not in this milestone)

- No header redesign (search/login/avatar can be tackled later)
- No real backend
- No real auth
- No real payments

## Stitch Design

[![Home Design](/docs/design/home.png "Home Page")](./docs/design/home.png "Open full size")
_Home Page_

[Full Design Prototype (Stitch)](https://stitch.withgoogle.com/projects/7174623962662235921)

## Step-by-step Plan

### 1) Add event mock data

Create a small dataset that supports the UI:

- id
- title
- date (ISO)
- venueName
- city
- imageUrl (or local placeholder)
- priceFrom
- genres (array)
- isFeatured (optional)

Acceptance check

- You can render a simple list of event titles from the dataset in Home.

### 2) Home layout skeleton (no polish yet)

Structure Home into clear sections:

- Hero section (title, subtitle, CTA button)
- Content area with:
  - left: Filters panel (placeholder UI)
  - right: “Featured Events” heading + grid placeholder
- Pagination placeholder
- Make sure spacing matches the design proportions (container widths, gaps)

Acceptance check

- The page layout matches the big blocks of the design even with dummy content.

### 3) Build EventCard UI component

Match the event card pattern:

- image (aspect ratio)
- title
- meta line (date + venue)
- price from
- primary button “Get Tickets”
- hover state (subtle scale or elevation)

Important behavior

- Button and/or card links to `/event/:eventId` using the event id

Acceptance check

- With 6 mock events, the grid visually resembles the design.

### 4) Build Filters panel UI

Match sidebar:

- Artist/Event search input (UI only at first)
- Date select (dropdown)
- Genre chips (multi-select UI)
- Venue select
- Buttons: Apply Filters, Clear

Behavior

- Keep state locally in Home for now
- Apply Filters filters the dataset
- Clear resets filters
- You can start with only 1 or 2 filters working (genre + venue), then expand

Acceptance check

- Clicking chips changes selection
- Apply Filters updates the grid
- Clear resets

### 5) Pagination UI

Match bottom pagination:

- prev/next
- page numbers
- active page state

Behavior

- Frontend-only pagination:
  - page size (example 6)
  - compute total pages from filtered results
  - change page updates visible items

Acceptance check

- Pagination changes the visible events.

### 6) States: empty and loading

Add:

- Empty state when filters return 0 results
- Loading skeleton (simple, reusable) that you can re-use later

Acceptance check

- You can simulate loading with a short timeout and show skeletons.

## Definition of Done

- Home matches the Stitch screen layout (hero, sidebar, grid, pagination)
- Clicking “Get Tickets” navigates to Event Detail route
- Filters work for at least 2 dimensions (genre + venue recommended)
- Empty state exists
- No console errors
