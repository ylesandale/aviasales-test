const initialState: ReducerState = {
  tickets: [],
  filters: [
    { name: "Все", active: true },
    { name: "Без пересадок", active: false },
    { name: "1 пересадка", active: false },
    { name: "2 пересадки", active: false },
    { name: "3 пересадки", active: false },
  ],
  tabs: [
    { name: "Самый дешёвый", active: false },
    { name: "Самый быстрый", active: false },
    { name: "Оптимальный", active: false },
  ],
  searchId: "",
};

const reducers = (
  state: ReducerState = initialState,
  action: Actions
): ReducerState => {
  switch (action.type) {
    case "SET_TICKETS":
      return { ...state, tickets: action.payload };

    case "SET_ACTIVE_FILTER":
      return {
        ...state,
        filters: state.filters
          .map((filter) => (filter ? { ...filter, active: false } : filter))
          .map((filter) =>
            action.name === filter.name ? { ...filter, active: true } : filter
          ),
        tabs: state.tabs.map((tab) => (tab ? { ...tab, active: false } : tab)),
      };

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        tabs: state.tabs
          .map((tab) => (tab ? { ...tab, active: false } : tab))
          .map((tab) =>
            action.name === tab.name ? { ...tab, active: true } : tab
          ),
        filters: state.filters
          .map((filter) => (filter ? { ...filter, active: false } : filter))
          .map((filter) =>
            "Все" === filter.name ? { ...filter, active: true } : filter
          ),
      };

    case "SET_SEARCH_ID":
      return { ...state, searchId: action.id };

    default:
      return state;
  }
};

export default reducers;
