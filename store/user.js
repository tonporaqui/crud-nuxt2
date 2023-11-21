// store/user.js
export const state = () => ({
  users: [],
});

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  ADD_USER(state, user) {
    state.users.push(user);
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  REMOVE_USER(state, userId) {
    state.users = state.users.filter(user => user.id !== userId);
  }
};

export const actions = {
fetchUsers({ commit }) {
    return this.$api.getAllUsers()
      .then(response => {
        commit('SET_USERS', response.data); // Asegúrate de que `response.data` contiene los usuarios
        return response; // Devuelve la respuesta para su uso posterior
      })
      .catch(error => {
        console.error('Error al obtener los usuarios', error);
        throw error; // Propaga el error para manejarlo en el `.catch()` de `created()`
      });
  },
  createUser({ commit }, userData) {
    return this.$api.createUser(userData)
      .then(response => {
        commit('ADD_USER', response.data);
      })
      .catch(error => {
        console.error('Error al crear el usuario', error);
      });
  },
  updateUser({ commit }, { userId, updateData }) {
    return this.$api.updateUser(userId, updateData)
      .then(response => {
        commit('UPDATE_USER', response.data);
      })
      .catch(error => {
        console.error('Error al actualizar el usuario', error);
      });
  },
  deleteUser({ commit }, userId) {
    return this.$api.deleteUser(userId)
      .then(() => {
        commit('REMOVE_USER', userId);
      })
      .catch(error => {
        console.error('Error al eliminar el usuario', error);
      });
  }
};

export const getters = {
  allUsers(state) {
    return state.users;
  },
};
