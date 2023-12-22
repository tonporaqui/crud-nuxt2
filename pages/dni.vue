<template>
    <v-container>
        <h1>DNI Validación</h1>
        <v-row>
            <v-col cols="12" md="8">
                <h2>Subir imagen del DNI</h2>
                <croppa
                    v-model="dniCroppa"
                    :width="673"
                    :height="426"
                    :accept="'image/*'" 
                    :prevent-white-space="true" 
                    placeholder="Haz clic o arrastra una imagen aquí">
                </croppa>
            </v-col>            

            <v-col cols="12" md="4">
                <h2>Subir imagen del usuario</h2>
                <croppa
                    v-model="userCroppa" initial-size="contain" 
                    :accept="'image/*'"
                    placeholder="Haz clic o arrastra una imagen aquí"></croppa>
            </v-col>
        </v-row>
        <v-btn :disabled="!canSubmit" @click="submitImages">Validar</v-btn>
        <result-component
            :dialog="showResultsDialog"
            :error="error"
            :error-message="errorMsg"
            :results="response.data"
            @update:dialog="showResultsDialog = $event">
        </result-component>
    </v-container>
</template>

<script>
import ResultComponent from '@/components/ResultComponent.vue';
import 'vue-croppa/dist/vue-croppa.css';

export default {
    components: {
        ResultComponent
    },
    data()
    {
        return {
            dniCroppa: {},
            userCroppa: {},
            errorMsg: '',
            response: {
                type: Object,
                default: () => ({})
            },
            error: false,
            showResultsDialog: false,
        };
    },
    computed: {
        canSubmit()
        {
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
                this.response  = response;
                this.showResultsDialog = true;
            } catch (error)
            {
                this.error = true;
                this.errorMsg = 'Error al procesar las imágenes. Inténtalo de nuevo.';
                console.error('Error al procesar las imágenes:', error);
            }
        }
    }
};
</script>