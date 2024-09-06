import axios from "axios";
const customFetch = axios.create({
  baseURL: "https://pharmacy-management-4omz.vercel.app/",
});

export default customFetch;
