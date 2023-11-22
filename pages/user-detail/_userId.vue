<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        Detalles del Usuario
                    </v-card-title>
                    <v-card-text>
                        <p><strong>Nombre:</strong> {{ userData.name }}</p>
                        <p><strong>Apellido:</strong> {{ userData.lastname }}</p>
                        <p><strong>Perfil:</strong> {{ userData.perfil.name }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'UserDetail',
    async asyncData({ store, params })
    {
        try
        {
            // Obtener los detalles del usuario
            const userData = await store.dispatch('user/fetchUserById', params.userId);
            return { userData }; // userData contiene los detalles del usuario
        } catch (error)
        {
            console.error('Error al obtener los detalles del usuario:', error);
        }

        // NOTA: se puede realizar esto por middleware services y asi usar el req del asyncData.
    }
};
</script>
