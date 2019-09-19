<template>
  <div class="admin">
    <h1>Contenido del admin</h1>
    <v-btn
      width="100%"
      class="blue-grey darken-4 white--text"
      @click="adminClases()"
      primary
    >
      <v-icon>mdi-sd</v-icon>Administrar Clases
    </v-btn>
    <v-btn
      width="100%"
      class="blue-grey darken-4 white--text"
      @click="adminUsuarios()"
      primary
    >
      <v-icon>mdi-sd</v-icon>Administrar Usuarios
    </v-btn>
    <v-btn
      width="100%"
      class="blue-grey darken-4 white--text"
      @click="adminInstituciones()"
      
      primary
    >
      <v-icon>mdi-sd</v-icon>Administrar Instituciones
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    adminInstituciones() {
      this.$router.push("/admin-instituciones");
    },
    adminClases() {
      this.$router.push("/admin-clases");
    },
    adminUsuarios() {
      this.$router.push("/admin-usuarios");
    }
  }
};
</script>