interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета туда
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета обратно
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    }
  ];
}

type ItemReducer = {
  name: sting;
  active: boolean;
};

interface ReducerState {
  tickets: Ticket[] | [];
  filters: ItemReducer[];
  tabs: ItemReducer[];
  searchId: string;
}

interface ReducerSelector {
  reducers: ReducerState;
}

type SetTicketsAction = {
  type: "SET_TICKETS";
  payload: Ticket[];
};

type ActiveFilterAction = {
  type: "SET_ACTIVE_FILTER";
  name: string;
};

type ActiveTabAction = {
  type: "SET_ACTIVE_TAB";
  name: string;
};

type setSearchId = {
  type: "SET_SEARCH_ID";
  id: string;
};

type Actions =
  | SetTicketsAction
  | ActiveFilterAction
  | ActiveTabAction
  | setSearchId;
