<template>
    <v-dialog :value="dialog" persistent max-width="600px" @input="updateDialog">
        <v-card>
            <v-card-title>
                <span class="headline">Resultado de la Validación</span>
            </v-card-title>
            <v-card-text>
                <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
                <div v-else>
                    <v-list v-if="results" dense>
                        <v-list-item v-if="results.message">
                            <v-list-item-content>
                                <v-list-item-title>Message</v-list-item-title>
                                <v-list-item-subtitle>{{ results.message }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item-group v-if="results.results">
                            <v-list-item v-for="(value, key) in results.results" :key="key">
                                <v-list-item-content>
                                    <v-list-item-title>{{ formatKey(key) }}</v-list-item-title>
                                    <v-list-item-subtitle>
                                        <template v-if="key === 'misma_persona'">
                                            <v-chip :color="value ? 'green' : 'red'" text-color="white">
                                                {{ value ? 'Sí' : 'No' }}
                                            </v-chip>
                                        </template>
                                        <template v-else>
                                            {{ value }}
                                        </template>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-card-text>            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDialog">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        error: Boolean,
        errorMessage: {
            type: String,
            default: ''
        },
        results: {
            type: Object,
            default: () => ({})
        },
        dialog: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        /**
         * Format the given key by replacing underscores with spaces and capitalizing the first letter of each word.
         * 
         * @param {string} key - The key to format.
         * @returns {string} The formatted key.
         */
        formatKey(key)
        {
            // Reemplaza caracteres y capitaliza la primera letra de cada palabra
            return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        },
        /**
         * Update the dialog value.
         * @param {any} value - The new value for the dialog.
         */
        updateDialog(value) {
            // Emit the 'update:dialog' event with the new value.
            this.$emit('update:dialog', value);
        },
        /**
         * Closes the dialog by emitting an event to update the dialog state.
         */
        closeDialog() {
            this.$emit('update:dialog', false); 
        }
    }
};
</script>
