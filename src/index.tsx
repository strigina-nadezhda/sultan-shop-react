import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RouterElement from "./router";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterElement />
  </Provider>
);
