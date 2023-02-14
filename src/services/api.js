import axios from "axios";
import getEnv from "@/utils/env";
import unNestData from "@/utils/unnest";

console.log("Backend API URL is ", getEnv("VUE_APP_API"));
const instance = axios.create({
  baseURL: getEnv("VUE_APP_API"),
  headers: {
    "Content-Type": "application/json",
  },
});

instance.postData = (url, data, config) => {
  return instance.post(url, data, config).then(unNestData);
};

instance.getData = (url, config) => {
  return instance.get(url, config).then(unNestData);
};

export default instance;
