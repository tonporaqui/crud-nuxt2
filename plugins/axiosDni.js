export default function ({ $axios }, inject) {
    const axiosDni = $axios.create({
        baseURL: process.env.API_BASE_URL_DNI
    });

    const apiDni = {
        processDniImages(dniImage, userImage) {
            const payload = {
                dni_image: dniImage,
                user_image: userImage
            };
            return axiosDni.post('/process-dni', payload);
        }
    };

    inject('apiDni', apiDni);
}
