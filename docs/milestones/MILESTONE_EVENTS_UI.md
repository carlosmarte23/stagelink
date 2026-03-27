# Milestone: Events UI (Explore)

Target screen

- Stitch Events (Explore): filters sidebar + results toolbar + events grid + pagination

Goal
Build the Events page UI so it visually matches the design and behaves like a real app using mock data, basic client-side filtering, sorting, and pagination.

Non-goals (not in this milestone)

- No real backend
- No server-side filtering or pagination
- No URL query param sync yet
- No favorites or auth-gated behavior unless already present and easy to reuse
- No advanced search engine behavior

## Stitch Design

[![Events Design](/docs/design/event-listings.png "Events Page")](./design/event-listings.png "Open full size")
_Events Page_

[Full Design Prototype (Stitch)](https://stitch.withgoogle.com/preview/7174623962662235921?node-id=1c024802bcfb400cb2263751852f1207)

## Delivery Strategy

This milestone will live as one complete document, but implementation will be split into **3 logical PRs** so the page is built in clean stages that lead to the final design.

### PR 1: Foundations

Purpose

Build the full static visual structure of the page so `/events` already looks close to the final screen.

Includes

- Events page main layout
- Filters sidebar UI
- Results toolbar UI
- Events grid rendered from mock data
- Static pagination UI
- Base responsive structure for the page layout
- Card-only explore presentation for this iteration, with no view toggle yet

Suggested branch

- `feat/events-page-foundation`

### PR 2: Interactions

Purpose

Turn the static page into a usable explore experience with real client-side behavior.

Includes

- Filter state and filtering logic
- Clear all filters action
- Sort behavior
- Real results count
- Client-side pagination
- Reset pagination when filters change

Suggested branch

- `feat/events-page-interactions`

### PR 3: Polish

Purpose

Finish the page so it feels complete, resilient, and portfolio-ready.

Includes

- Empty state
- Loading state
- Responsive refinements
- Accessibility polish
- Visual cleanup and consistency pass

Suggested branch

- `fix/events-page-polish`

## Step-by-step Plan

### Part 1) Foundations

Build the static UI structure first.

Scope

- Create the main `/events` page layout with a left sidebar and right content area
- Add the page title and results count area
- Add toolbar controls for sorting UI with a card-only explore view
- Render event cards from mock data in a grid
- Add a pagination section visually, even if not functional yet
- Show the total catalog count in the toolbar while rendering only the first paginated slice of cards
- Keep the static filters representative rather than exhaustive; venue filters can be added later when interactions are wired
- Match the general spacing, alignment, and proportions of the design

Suggested commits

- `feat(events): create explore page layout structure`
- `feat(events): add filters sidebar ui`
- `feat(events): render events grid with mock cards`
- `feat(events): add results toolbar and static pagination ui`
- `style(events): polish base spacing and layout alignment`

Acceptance check

- Visiting `/events` shows a page that visually reads as the final explore screen
- The sidebar, toolbar, grid, and pagination area are all present
- Event cards are rendered from mock data
- The toolbar can show the total catalog count even if only the first page slice of cards is rendered
- The filters sidebar establishes the visual foundation even if some future sections such as venue are not present yet
- The page feels structurally complete even before interactions are wired

Implementation notes

- PR1 intentionally ships with a single card view, so a list/grid toggle is out of scope unless later design needs change
- The initial results count may represent the full mock catalog before filters, while the visible cards represent the first paginated slice
- The mobile filters modal may keep part of the underlying page visible as an intentional presentation choice as long as the panel remains readable and dismissible

### Part 2) Interactions

Add the main explore behavior using derived client-side state.

Scope

- Add filter state for genres, date range, venues, and price range based on your mock data
- Compute a derived filtered list from the source events array
- Make the clear all filters action reset the full page state
- Make the results count reflect the filtered list
- Add sort behavior for the toolbar control
- Add client-side pagination after filtering and sorting
- Reset to page 1 when filters or sorting change

Suggested commits

- `feat(events): add genre and venue filter state`
- `feat(events): add date and price filter logic`
- `feat(events): connect results count to filtered events`
- `feat(events): add client-side sorting`
- `feat(events): add client-side pagination for filtered results`
- `fix(events): reset pagination when filters change`

Acceptance check

- Changing filters updates the visible cards correctly
- Clear all filters restores the full catalog
- Sorting changes the visible order predictably
- Pagination reflects the filtered result set and never lands on an empty stale page

### Part 3) Polish

Finish the page with resilient states and final cleanup.

Scope

- Add an empty state when filters return no matching events
- Add a loading state if you want to simulate fetch behavior for realism
- Improve the responsive layout for tablet and mobile widths
- Verify focus states, labels, button clarity, and keyboard usability
- Refine spacing, overflow behavior, and alignment details across sidebar, toolbar, cards, and pagination

Suggested commits

- `feat(events): add empty state for no matching results`
- `feat(events): add loading state for explore page`
- `fix(events): improve responsive layout for filters and grid`
- `fix(events): refine accessibility and focus states`
- `style(events): polish cards toolbar and pagination details`

Acceptance check

- The page does not feel broken when no results are found
- The layout remains usable on smaller screens
- Keyboard navigation works cleanly across controls and pagination
- The page feels visually finished and consistent with the rest of StageLink

## Recommended file/component direction

This is not mandatory, but a clean structure could be:

- `src/pages/EventListings.jsx`
- `src/components/events/FiltersSidebar.jsx`
- `src/components/events/EventsToolbar.jsx`
- `src/components/events/EventsGrid.jsx`
- `src/components/events/Pagination.jsx`
- `src/components/events/EmptyState.jsx`
- Reuse `EventCard` if possible, or create a small explore-specific variation only if the layout truly needs it

## Definition of Done

- `/events` renders a complete explore page UI
- Event cards are rendered from mock data in a clean grid
- Basic filters work client-side
- Sorting works client-side
- Pagination works with filtered results
- Empty and loading states are handled
- Clicking an event navigates to Event Detail
- No console errors
- Layout is responsive and reasonably accessible

