import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/api/v1`;
axios.defaults.withCredentials = true;

export default axios;
