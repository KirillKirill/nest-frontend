const API_URL = "http://localhost:8000/users"
const headers = { "Content-Type": "application/json" }

export const userServices = {
  getUserById,
}

function getUserById(id) {
  const options = {
    method: "GET",
    headers,
  }

  return fetch(`${API_URL}/getUser/${id}`, options)
}
