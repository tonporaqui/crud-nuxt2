<template>
    <v-container>
        <h1>DNI Validación</h1>

        <v-row>
            <v-col cols="12" md="6">
                <h2>Subir imagen del DNI</h2>
                <croppa
                    v-model="dniCroppa" 
                    initial-size="contain"
                    :min-size="{ width: 1345, height: 851 }" :accept="'image/*'" :prevent-white-space="true"
                    placeholder="Haz clic o arrastra una imagen aquí"></croppa>
            </v-col>
            <v-col cols="12" md="6">
                <h2>Subir imagen del usuario</h2>
                <croppa
                    v-model="userCroppa" 
                    initial-size="contain" :accept="'image/*'" placeholder="Haz clic o arrastra una imagen aquí"></croppa>
            </v-col>
        </v-row>
        {{ canSubmit }}
        <v-btn :disabled="!canSubmit" @click="submitImages">Validar</v-btn>
        <v-alert v-if="errorMsg" type="error">{{ errorMsg }}</v-alert>
    </v-container>
</template>

<script>
import 'vue-croppa/dist/vue-croppa.css';

export default {
    data()
    {
        return {
            dniCroppa: {},
            userCroppa: {},
            errorMsg: '',
        };
    },
    computed: {
        canSubmit()
        {
            console.log(this.dniCroppa.imageSet, this.userCroppa.imageSet)
            return this.dniCroppa.imageSet && this.userCroppa.imageSet === true;
        }
    },
    methods: {
        async submitImages()
        {
            this.errorMsg = '';
            try
            {
                const dniBase64 = await this.dniCroppa.generateDataUrl();
                const userBase64 = await this.userCroppa.generateDataUrl();

                const response = await this.$apiDni.processDniImages(dniBase64, userBase64);
                console.log(response);
                // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
            } catch (error)
            {
                this.errorMsg = 'Error al procesar las imágenes. Inténtalo de nuevo.';
                console.error('Error al procesar las imágenes:', error);
            }
        }
    }
};
</script>
