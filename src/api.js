import axios from "axios";
import { getAuth } from "./helpers";

const api = {
  authenticated: () => {
    const instance = axios.create();
    instance.defaults.headers.common["Authorization"] = getAuth();
    return instance;
  },
  public: () => {
    const instance = axios.create();
    return instance;
  },
};

export default api;
