import xFetch from "utils/fetch";
import { CONFIG_APP } from "./API";

export function getAppConfig() {
  return xFetch(CONFIG_APP);
}
