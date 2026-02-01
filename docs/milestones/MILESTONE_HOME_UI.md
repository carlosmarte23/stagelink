# Milestone: Home UI (Landing)

Target screen

- Stitch Home (Landing): hero banner + featured events grid + newsletter signup

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
- Content area with “Featured Events” heading + grid placeholder
- Newsletter signup form placeholder
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

## Definition of Done

- Home matches the Stitch screen layout (hero, featured grid, newsletter)
- Clicking hero CTA navigates to Events route
- EventCard UI matches the design
- Clicking “Get Tickets” navigates to Event Detail route
- Newsletter form is functional (valdate email and log at least log to console and toast notification)
- No console errors
