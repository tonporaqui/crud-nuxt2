<template>
  <v-toolbar flat>
    <v-toolbar-title>My CRUD</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-btn color="primary" dark class="mb-2" @click="() => $emit('add-item')"> New Item </v-btn>
    <slot></slot> <!-- For additional dialogues or elements -->
  </v-toolbar>
</template>

<script>
export default {
  emits: ['add-item'],
};
</script>
