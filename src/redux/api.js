import axios from "axios";

export const API_BASE_URL = "https://connections-api.goit.global/";

// One Axios instance for authentication and contacts; the token is scoped to this API.
export const api = axios.create({ baseURL: API_BASE_URL });
