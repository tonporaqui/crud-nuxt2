<template>
  <v-data-table :headers="headers" :items="items" sort-by="name" class="elevation-1">
    <template #item.perfil="{ item }">
      {{ item.perfil.name }}
    </template>    
    <template #item.actions="{ item }">
      <v-icon small class="mr-2" @click="() => $emit('edit-item', item)"> mdi-pencil </v-icon>
      <v-icon small class="mr-2" @click="() => $emit('delete-item', item)"> mdi-delete </v-icon>
      <v-icon small @click="() => $emit('view-item', item)"> mdi-eye </v-icon>
    </template>
    <!-- <template #no-data>
      <v-btn color="primary" @click="() => $emit('reset')"> Reset </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [] // Valor por defecto como un array vacío
    },
    items: {
      type: Array,
      default: () => [] // Valor por defecto como un array vacío
    },
  },
  emits: ['edit-item', 'delete-item', 'view-item'],
  // emits: ['edit-item', 'delete-item', 'reset'],
};
</script>
