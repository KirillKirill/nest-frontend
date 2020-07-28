const API_URL = "http://localhost:8000/users"
const headers = { "Content-Type": "application/json" }

export const userServices = {
  getUserById,
  getUsers,
}

function getUserById(id) {
  const options = {
    method: "GET",
    headers,
  }

  return fetch(`${API_URL}/getUser/${id}`, options)
}

function getUsers() {
  const options = {
    method: "GET",
    headers,
  }

  return fetch(`${API_URL}/getUsers`, options)
}
