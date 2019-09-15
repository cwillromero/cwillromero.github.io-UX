<template>
  <div class="clase">
    <v-app id="inspire" class="tab">
      <v-tabs fixed-tabs background-color="indigo" dark>
        <v-tab to="/">Contenido</v-tab>
        <v-tab to="/user">Treas</v-tab>
        <v-tab to="/about">Calificaciones</v-tab>
      </v-tabs>
    </v-app>

    <div class="contenidoV"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: 3
    };
  },

  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
      }
    }
  }
};
</script>

<style scoped>
.clase {
  position: absolute;
  left: 20%;
  top: 30%;
  width: 80%;
  height: 12% !important;
  /*border: solid red 2px;*/
}

.clase v-btn {
  width: 25%;
}

.tab {
  height: 70%;
}

.contenidoV {
  position: relative;
  top: 0%;
}
</style>