// store/report.js

export const actions = {
  /**
   * Fetches the report from the API.
   *
   * @param {Object} commit - The commit object.
   * @return {Promise} The promise that resolves to the report data.
   */
  fetchReport({ commit }) {
    return this.$api.getReport()
      .then(response => {
        // Aquí puedes realizar acciones adicionales si es necesario
        return response.data; // Devuelve los datos del reporte
      })
      .catch(error => {
        console.error('Error al obtener el reporte', error);
        throw error;
      });
  }
};
