<template>
  <div class="clase">
    <v-app id="inspire" class="tab">
      <v-tabs fixed-tabs background-color="indigo" dark>
        <v-tab @change="contenido()">Contenido</v-tab>
        <v-tab @change="tareas()">Treas</v-tab>
        <v-tab @change="calificaciones()">Calificaciones</v-tab>
      </v-tabs>
    </v-app>

    <div class="contenidoV">
      <v-data-table :headers="headers" :items="actividades" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Contenido</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.titulo" label="titulo"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.descripcion" label="descripcion"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field v-model="editedItem.tipo" label="tipo"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field v-model="editedItem.ponderacion" label="ponderacion"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.envios" label="envios"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }" v-if="$props.conditionUser">
          <v-icon small class="ma-2" @click="editItem(item)">edit</v-icon>
          <v-icon small class="ma-2" @click="deleteItem(item)">delete</v-icon>
        </template>
        <template v-slot:item.action="{ item }" v-else>
          pendiente
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { firestore } from "../firebase";
export default {
  props : ['conditionUser'],
  data: () => ({
    bottomNav: 3,
    actividades: [],
    dialog: false,
    headers: [
      { text: "Titulo", value: "titulo" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Tipo", value: "tipo" },
      { text: "Ponderacion", value: "ponderacion" },
      { text: "Envios", value: "envios"},
      {text: 'Actions', value: 'action', sortable: false} 
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      titulo: "",
      descripcion: "",
      tipo: 0,
      ponderacion: 0,
      envios: 0
    },
    defaultItem: {
      titulo: "",
      descripcion: "",
      tipo: 0,
      ponderacion: 0,
      envios: 0
    }
  }),

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
  },
  mounted: function() {

    if (localStorage.id != localStorage.anterior) {
      console.log("cambio aqui el localS? ", localStorage.id);
      //this.initialize();
      this.contenido();
      localStorage.anterior = localStorage.id;
    }else{
      console.log("paso por aqui?");
      //this.initialize();
      this.contenido();
    }
  },
  /* teacher */
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
/*
  created() {
    this.initialize();
  },*/

  methods: {
    /*teacher*/
    initialize() {
      this.actividades =[];
      firestore
        .collection("Actividad")
        .where("classRoom", "==", firestore.doc("classes/" + localStorage.id))
        .get()
        .then(snap => {
          snap.forEach(element => {
            console.log("descripcion : ", element.data().classRoom.id);
            this.actividades.push({
              titulo: element.data().titulo,
              descripcion: element.data().descripcion,
              tipo: element.data().tipo,
              ponderacion: element.data().ponderacion,
              envios: element.data().envios
            });
          });
        });
    },

    editItem(item) {
      this.editedIndex = this.actividades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.actividades.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.actividades.splice(index, 1);
        
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.actividades[this.editedIndex], this.editedItem);
      } else {
        this.actividades.push(this.editedItem);
        console.log("se supone estoy aqui",this.editItem);
      }
      this.close();
    },

    contenido(){
      console.log("estoy en el content");
      this.initialize();
    },
    tareas(){
      
    },
    calificacione(){

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

