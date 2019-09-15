<template>
    <div class="user miPerfil">
    <v-app id="inspire">
    <v-card
      height=100%
      width=100%
    >
      <v-navigation-drawer permanent heigth=100%>
        <v-list-item>
          <v-list-item-content>
            <v-card
      max-width=100%
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="nombre">Ingrid Dominguez</v-list-item-title>
          <v-list-item-subtitle class="rol">Estudiante</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  
      <img
        src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
        class="imgPerfil"
      />
        </v-card>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</div>
</template>



<script>
export default {
  //vuetify: new Vuetify(),
  data () {
    return {
      items: [
        { title: 'Clase 1', icon: 'mdi-view-dashboard' },
        { title: 'Clase 2', icon: 'mdi-image' },
        { title: 'Clase 3', icon: 'mdi-help-box' },
      ],
      right: null,
    }
  },
};
</script>

<style>
    .miPerfil{
        position: absolute;
        left: 0%;
        top: 0%;
        width: 20%;
    }

    .imgPerfil{
        vertical-align: middle;
        width: 75%;
        height: 100px;
        margin-left: 10%;
        margin-bottom: 5%;
    }

    .nombre{
        font-size: 15px;
    }

    .rol{
        font-size: 10px;
    }
</style>