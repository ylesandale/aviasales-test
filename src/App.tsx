import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Filter from "./components/Filter";
import Tickets from "./components/Tickets";

import {
  setActiveFilter,
  setTickets,
  setActiveTab,
  setSearchId,
} from "./redux/actions/actions";

import "./index.scss";
import airplaneSvg from "./assets/img/airplane.svg";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { tickets, filters, tabs, searchId }: any = useSelector(
    (state: ReducerSelector) => ({
      tickets: state.reducers.tickets,
      filters: state.reducers.filters,
      tabs: state.reducers.tabs,
      searchId: state.reducers.searchId,
    })
  );

  function getTickets() {
    axios.get("https://front-test.beta.aviasales.ru/search").then(
      ({ data }) =>
        dispatch(setSearchId(data.searchId)) &&
        axios
          .get(
            "https://front-test.beta.aviasales.ru/tickets?searchId=" +
              data.searchId
          )
          .then((tickets: { data: any }) =>
            dispatch(setTickets(tickets.data.tickets))
          )
          .catch(() => {
            alert(
              "Не удалось загрузить авиабилеты с сервера, после клика ОК произойдёт автоматическая перезагрузка страницы"
            );
            window.location.reload();
          })
    );
  }

  React.useEffect(() => {
    getTickets();
  }, []);

  function sortBy(name: string, tickets: Ticket[]) {
    if (name === "Оптимальный") {
      return tickets.sort((a: Ticket, b: Ticket) =>
        (a.segments[0].duration + a.segments[1].duration) * a.price >
        (b.segments[0].duration + b.segments[1].duration) * b.price
          ? 1
          : -1
      );
    } else if (name === "Самый быстрый") {
      return tickets.sort((a: Ticket, b: Ticket) =>
        a.segments[0].duration + a.segments[1].duration >
        b.segments[0].duration + b.segments[1].duration
          ? 1
          : -1
      );
    } else if (name === "Самый дешёвый") {
      return tickets.sort((a: Ticket, b: Ticket) =>
        a.price > b.price ? 1 : -1
      );
    }
  }

  function filterBy(name: string, tickets: Ticket[]) {
    if (name === "Все") {
      return tickets;
    } else if (name === "Без пересадок") {
      return tickets.filter(
        (item: Ticket) =>
          item.segments[0].stops.length === 0 &&
          item.segments[1].stops.length === 0
      );
    } else if (name === "1 пересадка") {
      return tickets.filter(
        (item: Ticket) =>
          item.segments[0].stops.length === 1 &&
          item.segments[1].stops.length === 1
      );
    } else if (name === "2 пересадки") {
      return tickets.filter(
        (item: Ticket) =>
          item.segments[0].stops.length === 2 &&
          item.segments[1].stops.length === 2
      );
    } else if (name === "3 пересадки") {
      return tickets.filter(
        (item: Ticket) =>
          item.segments[0].stops.length === 3 &&
          item.segments[1].stops.length === 3
      );
    }
  }

  const onSetActiveFilter = (name: string) => {
    axios
      .get("https://front-test.beta.aviasales.ru/tickets?searchId=" + searchId)
      .then(({ data }) => dispatch(setTickets(filterBy(name, data.tickets))))
      .catch(() => {
        alert(
          "Не удалось загрузить авиабилеты с сервера, после клика ОК произойдёт автоматическая перезагрузка страницы"
        );
        window.location.reload();
      });
    dispatch(setActiveFilter(name));
  };
  const onSetActiveTab = (name: string) => {
    axios
      .get("https://front-test.beta.aviasales.ru/tickets?searchId=" + searchId)
      .then(({ data }) => dispatch(setTickets(sortBy(name, data.tickets))))
      .catch(() => {
        alert(
          "Не удалось загрузить авиабилеты с сервера, после клика ОК произойдёт автоматическая перезагрузка страницы"
        );
        window.location.reload();
      });
    dispatch(setActiveTab(name));
  };

  return (
    <div className="app">
      <div className="container">
        <div className="page">
          <div className="page__icon">
            <img src={airplaneSvg} alt="Airplane icon" />
          </div>
          <div className="page__main">
            <Filter onActive={onSetActiveFilter} items={filters} />
            <Tickets tabs={tabs} tickets={tickets} onActive={onSetActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
