import React from "react";
import classNames from "classnames";

import itemLogo from "../assets/img/itemLogo.png";

interface TicketsProps {
  tickets: Ticket[];
  tabs: ItemReducer[];
  onActive(name: string): void;
}

const Tickets: React.FC<TicketsProps> = ({ tickets, tabs, onActive }) => {
  const items = tickets.slice(0, 5);

  function priceWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function getTime(mins: number) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }
  function getStops(stops: string[]) {
    if (stops.length === 0) {
      return null;
    } else if (stops.length === 1) {
      return <div className="item__label">1 пересадка</div>;
    } else {
      return <div className="item__label">{stops.length} пересадки</div>;
    }
  }
  function getDate(date: string, duration: number) {
    const startTime = date.split("").slice(11, 16).join("");
    const startHours = Number(startTime.split("", 2).join(""));
    const startMinutes = Number(startTime.split("").slice(3).join(""));
    const durationHours = Math.trunc(duration / 60);
    const durationMinutes = duration % 60;
    const transitionHours =
      durationHours + startHours >= 24
        ? durationHours + startHours - 24
        : durationHours + startHours;
    const finalMinutes =
      durationMinutes + startMinutes >= 60
        ? durationMinutes + startMinutes - 60
        : durationMinutes + startMinutes;
    if (durationMinutes + startMinutes >= 60) {
      const finalHours =
        transitionHours + 1 >= 24
          ? transitionHours + 1 - 24
          : transitionHours + 1;
      return (
        startTime +
        " - " +
        (finalHours < 10 ? "0" + String(finalHours) : String(finalHours)) +
        ":" +
        (finalMinutes < 10 ? "0" + String(finalMinutes) : String(finalMinutes))
      );
    } else {
      return (
        startTime +
        " - " +
        (transitionHours < 10
          ? "0" + String(transitionHours)
          : String(transitionHours)) +
        ":" +
        (finalMinutes < 10 ? "0" + String(finalMinutes) : String(finalMinutes))
      );
    }
  }

  return (
    <div className="flights">
      <div className="flights__nav">
        <div className="nav__tabs">
          {tabs.map((tab) => (
            <button
              onClick={() => onActive(tab.name)}
              key={tab.name}
              className={classNames("flights__button", { active: tab.active })}
              type="button"
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {items.map((ticket, i) => (
        <div key={ticket.price + i} className="flights__item">
          <div className="item__header">
            <h1 className="item__price">{priceWithSpaces(ticket.price)} Р</h1>
            <div className="item__logo">
              <img src={itemLogo} alt="airline logo" />
            </div>
          </div>
          <div className="item__info">
            <div className="item__block route">
              <div className="item__label">
                {ticket.segments[0].origin} – {ticket.segments[0].destination}
              </div>
              <div className="item__content">
                {getDate(ticket.segments[0].date, ticket.segments[0].duration)}
              </div>
            </div>
            <div className="item__block length">
              <div className="item__label">В пути</div>
              <div className="item__content">
                {getTime(ticket.segments[0].duration)}
              </div>
            </div>
            <div className="item__block stops">
              {getStops(ticket.segments[0].stops)}
              <div className="item__label"></div>
              <div className="item__content">
                {ticket.segments[0].stops.join(", ")}
              </div>
            </div>
            <div className="item__block route">
              <div className="item__label">
                {ticket.segments[1].origin} – {ticket.segments[1].destination}
              </div>
              <div className="item__content">
                {getDate(ticket.segments[1].date, ticket.segments[1].duration)}
              </div>
            </div>
            <div className="item__block length">
              <div className="item__label">В пути</div>
              <div className="item__content">
                {getTime(ticket.segments[1].duration)}
              </div>
            </div>
            <div className="item__block stops">
              <div className="item__label">
                {getStops(ticket.segments[1].stops)}
              </div>
              <div className="item__content">
                {ticket.segments[1].stops.join(", ")}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
