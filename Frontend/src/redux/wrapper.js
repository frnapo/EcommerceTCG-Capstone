import { store } from "../redux/store/index";

export async function fetchWrapper(url, options = {}) {
  const state = store.getState();
  const token = state.auth.token;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token.token}`,
  };
  const response = await fetch(url, { ...options, headers });

  return response;
}
