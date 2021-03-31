import { createStore } from "redux";

import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  (window as any).devToolsExtension && (window as any).devToolsExtension()
);

export default store;
