<template>
  <v-dialog :value="isVisible" max-width="500px" @input="$emit('update:isVisible', $event)">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="localEditedItem.name"
                label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="localEditedItem.lastname"
                label="Apellidos"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="localEditedItem.perfil.id"
                :items="profiles"
                item-value="id"
                item-text="name"
                label="Perfil"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    editedItem: {
      type: Object,
      required: true,
    },
    isVisible: Boolean,
    profiles: {
      type: Array,
      default: () => [] 
    },
  },
  data() {
    return {
      localEditedItem: JSON.parse(JSON.stringify(this.editedItem)), 
    };
  },
  computed: {
    formTitle() {
      return this.editedItem && this.editedItem.name ? 'Edit Item' : 'New Item';
    },
  },
  watch: {
    editedItem(newVal) {
      this.localEditedItem = JSON.parse(JSON.stringify(newVal));
    }
  },
  methods: {
    close() {
      this.$emit('update:isVisible', false);
    },
    save()
    {
      const perfilToSend = this.localEditedItem.perfil && this.localEditedItem.perfil.id
        ? { id: this.localEditedItem.perfil.id }
        : null;

      const dataToSend = {
        ...this.localEditedItem,
        perfil: perfilToSend
      };

      this.$emit('save-item', dataToSend);
      this.$emit('update:isVisible', false);
    },

  },
};
</script>
