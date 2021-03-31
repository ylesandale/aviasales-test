import React from "react";

import "../index.scss";

type FilterProps = {
  items: ItemReducer[];
  onActive(name: string): void;
};

const Filter: React.FC<FilterProps> = ({ items, onActive }) => {
  return (
    <div className="filter">
      <h1 className="filter__title">Количество пересадок</h1>
      <div className="filter__wrapper">
        {items.map((item) => (
          <div key={item.name} className="filter__item">
            <input
              onClick={() => onActive(item.name)}
              checked={item.active}
              className="filter__input"
              type="checkbox"
              id={item.name}
            />
            <label htmlFor={item.name}>{item.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
