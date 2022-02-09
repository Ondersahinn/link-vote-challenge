import { combineReducers } from "redux";

import linkList from "redux/slices/linkList";

const rootReducer = combineReducers({ linkList });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
