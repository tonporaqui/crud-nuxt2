<template>
  <div>
    <ToolbarComponent @add-item="addItem" />
    <DataTableComponent :headers="headers" :items="desserts" @edit-item="editItem" @delete-item="deleteItem" @reset="initialize" />
    <DialogFormComponent
      :is-visible.sync="dialog"
      :edited-item="editedItem"
      @close-dialog="close"
      @save-item="save"
    />
    <DeleteConfirmDialogComponent :is-visible="dialogDelete" @cancel-delete="closeDelete" @confirm-delete="deleteItemConfirm" />
  </div>
</template>
<script>
import DataTableComponent from '@/components/DataTableComponent.vue';
import DeleteConfirmDialogComponent from '@/components/DeleteConfirmDialogComponent.vue';
import DialogFormComponent from '@/components/DialogFormComponent.vue';
import ToolbarComponent from '@/components/ToolbarComponent.vue';
export default {
  components: {
    DataTableComponent,
    ToolbarComponent,
    DialogFormComponent,
    DeleteConfirmDialogComponent,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Apellidos', value: 'apellidos',sortable: false },
      { text: 'Perfil', value: 'perfil',sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      apellidos: '',
      perfil: '',
    },
    defaultItem: {
      name: '',
      apellidos: '',
      perfil: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: 'nombre',
          apellidos: 'nose',
          perfil: 'bankai',
        },
      ]
    },
    addItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save(newItem) {
      if (this.editedIndex > -1) {
        // Actualizando un ítem existente
        this.$set(this.desserts, this.editedIndex, newItem);
      } else {
        // Añadiendo un nuevo ítem
        this.desserts.push(newItem);
      }
      this.close();
    },

  },
}
</script>
