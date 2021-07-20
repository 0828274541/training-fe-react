import apiHandler from './apiHandler';

export const usersApi = {
  paging: (payload) => apiHandler.post('/apis/users/paging', payload),
  addUser: (payload) => apiHandler.post('/apis/users', payload),
  updateUser: (payload) => apiHandler.put('/apis/users', payload),
  deleteUser: (payload) => apiHandler.post('/apis/users/delete', payload)
};
