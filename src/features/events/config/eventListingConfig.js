// Filters
export const INITIAL_FILTERS = {
  genre: "all",
  venue: "all",
  city: "all",
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

//Sort
export const INITIAL_SORT_OPTION = "date";

export const SORT_OPTIONS = [
  { value: "date", label: "Date" },
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

// Pagination
export const EVENTS_PER_PAGE = 6;
