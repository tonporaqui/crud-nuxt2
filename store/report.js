// store/report.js

export const actions = {
  /**
   * Fetches the report from the API.
   *
   * @param {Object} commit - The commit object.
   * @return {Promise} The promise that resolves to the report data.
   */
  fetchPdfReport({ commit }) {
    return this.$api.getPdfReport()
      .then(response => {
        // Aquí puedes realizar acciones adicionales si es necesario
        return response.data; // Devuelve los datos del reporte
      })
      .catch(error => {
        console.error('Error al obtener el reporte PDF', error);
        throw error;
      });
  },
  /**
   * Fetches an Excel report.
   *
   * @param {Object} commit - The commit object.
   * @return {Promise} A promise that resolves to the report data.
   */
  fetchExcelReport({ commit }) {
    return this.$api.getExcelReport().then(response => {
      return response.data;
    }).catch(error => {
      console.error('Error al obtener el reporteExcel', error);
      throw error;
    })
  },
  /**
   * Fetches the word report.
   *
   * @param {Object} commit - the commit object
   * @return {Promise} a promise that resolves with the word report data
   */
  fetchWordReport({ commit }) {
    return this.$api.getWordReport().then(response => {
      return response.data;
    }).catch(error => {
      console.error('Error al obtener el reporteWord', error);
      throw error;
    })
  }
};
