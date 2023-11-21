// plugins/axios.js
export default ({ $axios }, inject) => {
  $axios.setBaseURL(process.env.API_BASE_URL);
  
  const api = {
    getAllUsers() {
      return $axios.get('/app-users');
    },
    createUser(userData) {
      return $axios.post('/app-users', userData);
    },
    updateUser(userId, updateData) {
      return $axios.put(`/app-users/${userId}`, updateData);
    },
    deleteUser(userId) {
      return $axios.delete(`/app-users/${userId}`);
    },
    getAllPerfiles() {
      return $axios.get('/perfils');
    }, 
    // ...otros métodos...
  };
  inject('api', api);
};
