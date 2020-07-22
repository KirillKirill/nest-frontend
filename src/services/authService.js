const API_URL = "http://localhost:8000/authentication"
const headers = { "Content-Type": "application/json" }

export const authServices = {
  register,
  login,
  logout,
}

async function register(regData) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(regData),
  }

  return fetch(`${API_URL}/register`, options)
}

function login(email, password) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }

  return fetch(`${API_URL}/login`, options)
}

function logout(user) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  }

  return fetch(`${API_URL}/logout`, options)
}
