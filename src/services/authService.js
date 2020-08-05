const API_URL = "http://localhost:8000/authentication"
const commonHeaders = { "Content-Type": "application/json" }

async function register(regData) {
  const options = {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify(regData),
  }

  return fetch(`${API_URL}/register`, options)
}

function login(email, password) {
  const options = {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify({ email, password }),
  }

  return fetch(`${API_URL}/login`, options)
}

function logout() {
  const options = {
    method: "POST",
    headers: {
      ...commonHeaders,
      Cookie: `Authentication=${localStorage.getItem("token")}`,
    },
  }

  return fetch(`${API_URL}/logout`, options)
}

const authServices = { register, login, logout }

export default authServices
