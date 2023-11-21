<template>
  <div>
    <ToolbarComponent @add-item="addItem" />
    <DataTableComponent :headers="headers" :items="users" @edit-item="editItem" @delete-item="deleteItem" />
    <DialogFormComponent
      :is-visible.sync="dialog"
      :edited-item="editedItem"
      :profiles="profiles"
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
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Apellido', value: 'lastname',sortable: false },
      { text: 'Perfil', value: 'perfil',sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      lastname: '',
      perfil: { id: null, name: '' },
    },
    defaultItem: {
      name: '',
      lastname: '',
      perfil: { id: null, name: '' },
    },
    profiles: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    users()
    {
      return this.$store.getters['user/allUsers'];
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

  created()
  {
    this.$store.dispatch('user/fetchUsers')
      .then(response =>
      {
        // console.log("Usuarios cargados:", response);
      })
      .catch(error =>
      {
        console.error("Error al cargar usuarios:", error);
      });

      this.fetchProfiles();
  },


  methods: {
    addItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },

    editItem(item)
    {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item, {
        perfil: item.perfil ? { id: item.perfil.id } : { id: null }
      });
      this.dialog = true;
    },



    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('user/deleteUser', this.editedItem.id);
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

    save(dataToSend)
    {
      if (this.editedIndex > -1)
      {
        // Actualizando un ítem existente
        this.$store.dispatch('user/updateUser', { userId: dataToSend.id, updateData: dataToSend });
      } else
      {
        // Añadiendo un nuevo ítem
        this.$store.dispatch('user/createUser', dataToSend);
      }
      this.close();
    },


    fetchProfiles()
    {
      this.$store.dispatch('profile/fetchProfiles')
        .then(() =>
        {
          this.profiles = this.$store.getters['profile/allProfiles'];
        })
        .catch(error =>
        {
          console.error('Error al cargar perfiles:', error);
        });
    },
  },
}
</script>
