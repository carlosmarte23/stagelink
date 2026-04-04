# Filter Panel Group Structure

## Goal

Align the `Venue`, `Date Range`, and `Price Range` groups in the events filters panel with the collapsible structure already introduced for `Genres` and `City`.

## Expected Outcome

- Every filter group uses the same header button pattern.
- Every group has its own `aria-expanded` state and `aria-controls` target.
- Group content is wrapped in the same collapsible container structure.
- Existing filter interactions keep working on desktop and mobile.
- No local work already present in the panel files is reverted.

## Checklist

- [ ] Add verification coverage for the collapsible group behavior.
- [ ] Update `EventFiltersPanel.jsx` to reuse the same structure across all groups.
- [ ] Adjust `EventFiltersPanel.module.css` so the shared collapsible layout works for all groups.
- [ ] Run validation commands and fix any regressions found.
