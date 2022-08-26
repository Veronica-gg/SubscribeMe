import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./reducer";

export const store = configureStore({ reducer: { data: stateReducer } });
