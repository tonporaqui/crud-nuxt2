// plugins/axiosDni.js
export default ({ $axios }, inject) => {
    $axios.setBaseURL(process.env.API_BASE_URL_DNI);

    const apiDni = {
        processDniImages(dniImage, userImage) {
            const payload = {
                dni_image: dniImage,
                user_image: userImage
            };
            return $axios.post('/process-dni', payload)
                .then(response => response)  // En caso de éxito, simplemente devuelve la respuesta
                .catch(error => {
                    // Aquí manejas el error
                    if (error.response && error.response.status === 400) {
                        // Lanza un error específico si el estado es 400
                        throw new Error(error.response.data.message || 'Error al procesar las imágenes.');
                    }
                    throw error;
                });
        }
    };

    inject('apiDni', apiDni);
};

