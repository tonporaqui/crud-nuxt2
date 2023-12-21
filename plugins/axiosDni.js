// plugins/axiosDni.js
export default ({ $axios }, inject) => {
    // const axiosDni = $axios.create({
    //     baseURL: process.env.API_BASE_URL_DNI
    // });
    $axios.setBaseURL(process.env.API_BASE_URL_DNI);
    const apiDni = {
        processDniImages(dniImage, userImage) {
            const payload = {
                dni_image: dniImage,
                user_image: userImage
            };
            return $axios.post('/process-dni', payload);
        }
    };

    inject('apiDni', apiDni);
}
