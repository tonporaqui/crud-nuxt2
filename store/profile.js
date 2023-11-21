// store/profiles.js
export const state = () => ({
  profiles: [],
});

export const mutations = {
  SET_PROFILES(state, profiles) {
    state.profiles = profiles;
  },
};

export const actions = {
  fetchProfiles({ commit }) {
    return this.$api.getAllPerfiles()
      .then(response => {
        commit('SET_PROFILES', response.data);
        // console.log('daaaaaa', response.data)
        return response;
      })
      .catch(error => {
        console.error('Error al obtener los perfiles',error);
        throw error;
      });
  },
  // ... otras acciones ...
};

export const getters = {
  allProfiles(state) {
    return state.profiles;
  },
};