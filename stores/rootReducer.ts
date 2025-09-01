import { type Action, combineReducers } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/services";
import authReducer, { resetCredentials } from "@/features/auth/slices/authSlice";

const appReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: Action
) => {
  // make sure root state is cleared once logged out
  if (action.type === resetCredentials.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
