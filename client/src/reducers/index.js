import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import interaction from "./interaction";
import groups from "./groups";

export default combineReducers({
  alert,
  auth,
  interaction,
  groups,
});
