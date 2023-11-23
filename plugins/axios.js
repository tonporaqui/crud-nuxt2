// plugins/axios.js
export default ({ $axios }, inject) => {
  $axios.setBaseURL(process.env.API_BASE_URL);
  
  const api = {
    /**
     * Retrieves all users from the server.
     *
     * @return {Promise} A promise that resolves with the response data.
     */
    getAllUsers() {
      return $axios.get('/app-users');
    },
    /**
     * Creates a new user.
     *
     * @param {Object} userData - The user data.
     * @return {Promise} A promise that resolves to the response data.
     */
    createUser(userData) {
      return $axios.post('/app-users', userData);
    },
    /**
     * Updates a user with the specified ID.
     *
     * @param {string} userId - The ID of the user to be updated.
     * @param {object} updateData - The data to update the user with.
     * @return {Promise} A promise that resolves to the updated user data.
     */
    updateUser(userId, updateData) {
      return $axios.put(`/app-users/${userId}`, updateData);
    },
    /**
     * Deletes a user with the given userId.
     *
     * @param {string} userId - The ID of the user to be deleted.
     * @return {Promise} A Promise that resolves with the result of the deletion.
     */
    deleteUser(userId) {
      return $axios.delete(`/app-users/${userId}`);
    },
    /**
     * Retrieves all perfiles from the server.
     *
     * @return {Promise} A promise that resolves to the response from the server.
     */
    getAllPerfiles() {
      return $axios.get('/perfils');
    },
    /**
     * Retrieves an app user by their ID.
     *
     * @param {number} userId - The ID of the user to retrieve.
     * @return {Promise} A Promise that resolves to the app user object.
     */
    getAppUserById(userId) {
      return $axios.get(`/app-users/${userId}`);
    },
    /**
     * Retrieves a report using the `$axios` library.
     *
     * @return {Promise} A Promise that resolves to the report data.
     */
    getReport() {
      return $axios.get('/report');
    }
    // ...otros métodos...
  };
  inject('api', api);
};
