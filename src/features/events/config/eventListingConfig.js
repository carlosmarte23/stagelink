// Initial Values
export const INITIAL_FILTERS = {
  genre: "all",
  dateRange: "any-date",
  priceMin: 0,
  priceMax: 250,
};

export const DATE_RANGE_OPTIONS = [
  { value: "any-date", label: "Any date" },
  { value: "this-week", label: "This week" },
  { value: "this-weekend", label: "This weekend" },
  { value: "next-seven-days", label: "Next 7 days" },
  { value: "this-month", label: "This month" },
  { value: "next-month", label: "Next month" },
];

export const ITEMS_PER_PAGE = 10;
