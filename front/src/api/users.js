import axiosInstance from './default';

const usersAPI = {
  login: credentials => axiosInstance.post('/users/login', credentials),
  signup: credentials => axiosInstance.post('/users/signup', credentials),
  getUser: () => axiosInstance.get('/users'),
  logout: () => axiosInstance.get('/users/logout'),
};

export default usersAPI;
