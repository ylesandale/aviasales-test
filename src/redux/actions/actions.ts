export const setTickets: any = (payload: Ticket[]) => ({
  type: "SET_TICKETS",
  payload,
});

export const setActiveFilter: any = (name: string) => ({
  type: "SET_ACTIVE_FILTER",
  name,
});

export const setActiveTab: any = (name: string) => ({
  type: "SET_ACTIVE_TAB",
  name,
});

export const setSearchId: any = (id: string) => ({
  type: "SET_SEARCH_ID",
  id,
});
