<template>
  <v-dialog :value="isVisible" max-width="500px" @input="$emit('update:isVisible', $event)">
    <v-card>
      <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
        <v-btn color="red darken-1" text @click="confirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
  },
  methods: {
    cancel() {
        this.$emit('update:isVisible', false);
    },
    confirm() {
        this.$emit('confirm-delete');
        this.$emit('update:isVisible', false);
    },
  },
};
</script>
