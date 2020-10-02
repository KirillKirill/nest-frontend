const API_URL = 'http://localhost:8000/users';
const headers = { 'Content-Type': 'application/json' };

type UpdatedData = {
  [key: string]: string;
};

function getUserById(id: number) {
  const options = {
    method: 'GET',
    headers,
  };

  return fetch(`${API_URL}/getUser/${id}`, options);
}

function getUsers() {
  const options = {
    method: 'GET',
    headers,
  };

  return fetch(`${API_URL}/getUsers`, options);
}

function deleteUser(id: number) {
  const options = {
    method: 'DELETE',
    headers,
  };

  return fetch(`${API_URL}/user/${id}`, options);
}

function updateUser(id: number, updatedData: UpdatedData) {
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(updatedData),
  };

  return fetch(`${API_URL}/user/${id}`, options);
}

const userServices = {
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
};

export default userServices;
