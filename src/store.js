import { legacy_createStore as createStore } from "redux";
import { tableReducer } from "./store/tableReducer";

const store = createStore(tableReducer);

export default store;