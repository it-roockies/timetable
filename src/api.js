const BACKEND_URL = "";

async function get(url, token) {
  const response = await fetch(`${BACKEND_URL}/api/${url}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const responseJSON = await response.json();

  return responseJSON;
}

export async function getToken(username, password) {
  const response = await fetch(`${BACKEND_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJSON = await response.json();
  return responseJSON.token;
}

export async function getBookings(token) {
  return await get("booking", token);
}

export async function getGroups(token) {
  return await get("group", token);
}
