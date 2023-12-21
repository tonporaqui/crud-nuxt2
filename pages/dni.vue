<template>
    <v-container>
        <h1>DNI Validación</h1>
        <v-row>
            <v-col cols="12" md="6">
                <h2>Subir imagen del DNI</h2>
                <input type="file" @change="onDniImageChange">
            </v-col>
            <v-col cols="12" md="6">
                <h2>Subir imagen del usuario</h2>
                <croppa
                    v-model="userCroppa" 
                    initial-size="contain" 
                    :accept="'image/*'"
                    placeholder="Haz clic o arrastra una imagen aquí"></croppa>
            </v-col>
        </v-row>
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
            dniImageBase64: '',
            userCroppa: {},
            errorMsg: '',
        };
    },
    computed: {
        canSubmit()
        {
            return this.dniImageBase64 && this.userCroppa.imageSet;
        }
    },
    methods: {
        onDniImageChange(e)
        {
            const file = e.target.files[0];
            if (file)
            {
                const reader = new FileReader();
                reader.onload = (e) =>
                {
                    this.dniImageBase64 = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async submitImages()
        {
            this.errorMsg = '';
            try
            {
                const userBase64 = await this.userCroppa.generateDataUrl();
                console.log(this.dniImageBase64);
                const response = await this.$apiDni.processDniImages(this.dniImageBase64, userBase64);
                console.log(response.data);
                // Manejo de respuesta
            } catch (error)
            {
                this.errorMsg = 'Error al procesar las imágenes. Inténtalo de nuevo.';
                console.error('Error al procesar las imágenes:', error);
            }
        }
    }
};
</script>
