import axios from "axios";

const BASEURL = "https://66d0d61d181d059277dfde9c.mockapi.io/react-query-list";

export const api = axios.create({
  baseURL: BASEURL,
});
