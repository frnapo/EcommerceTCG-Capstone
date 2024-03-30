export default async function fetchWithToken(url, token, options = {}) {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, { ...options, headers });
}
