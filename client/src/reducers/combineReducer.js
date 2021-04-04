import { combineReducers } from "redux";

import authReducer from "./authReducer";
import bookingReducer from "./booking-reducers";

const rootReducer = combineReducers({
    booking: bookingReducer,
    // store: eStoreReducer,
    login: authReducer,
  });
  
  export default rootReducer;