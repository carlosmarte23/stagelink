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
  { value: "next-thirty-days", label: "Next 30 days" },
];

export const PRICE_RANGE = { min: 0, max: 250, step: 5 };
