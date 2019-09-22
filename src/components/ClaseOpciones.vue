<template>
  <div class="clase">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn @click="contenido" text>Contenido</v-btn>
        <v-btn @click="tareas">Tareas</v-btn>
        <v-btn @click="calificaciones" text>Calificaciones</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <div class="contenidoV">
      <v-data-table :headers="headers" :items="actividades" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Contenido {{score}}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }" v-if="$props.conditionUser">
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
                        <!--<v-text-field v-model="editedItem.tipo" label="tipo"></v-text-field>-->
                        Tipo
                        <v-select
                          v-model="select"
                          :hint="`${select.state}, ${select.abbr}`"
                          :items="tipos"
                          item-text="state"
                          item-value="abbr"
                          label="select"
                          persistent-hint
                          return-object
                          single-line
                          @change="cambiar(select.state)"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="4" md="4" v-show="conditionShow">
                        <v-text-field v-model="editedItem.ponderacion" label="ponderacion"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-show="conditionShow">
                        <v-text-field v-model="editedItem.envios" label="envios"></v-text-field>
                      </v-col>
                      <input v-show="true" ref="inputUpload" type="file" />
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.fechaInicio"
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.fechaInicio"
                              label="Fecha Inicio"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="editedItem.fechaInicio" no-title scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(editedItem.fechaInicio)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menuFinal"
                          v-model="menuFinal"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.fechaFinal"
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.fechaFinal"
                              label="Fecha Final"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="editedItem.fechaFinal" no-title scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="menuFinal = false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menuFinal.save(editedItem.fechaFinal)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save1">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }" v-if="$props.conditionUser">
          <v-icon @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:item.action="{ item }" v-else>
          <v-dialog v-model="dialog2" width="500">
            <template v-slot:activator="{on}">
              <v-icon v-on="on">mdi-text</v-icon>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Detalles - {{item.titulo}}</v-card-title>

              <v-card-text>
                <br />
                {{item.descripcion}}
                <br />
                <br />
                <div v-if="item.tipo === 1">
                  <input v-if="setShowAc" ref="inputUpload" type="file" @change="guardar()" />
                  <br />
                  <v-btn v-if="setShowAc" color="warning" @click="enviar(item.id)">Enviar</v-btn>
                  <v-alert
                    v-model="alert"
                    dismissible
                    color="cyan"
                    border="left"
                    elevation="2"
                    colored-border
                  >
                    <strong>Error!!!!</strong> No Enviado!
                  </v-alert>
                  <v-alert
                    v-model="alert2"
                    dismissible
                    color="cyan"
                    border="left"
                    elevation="2"
                    colored-border
                  >
                    <strong>Exito!!!!</strong> Enviado!
                  </v-alert>
                </div>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" text @click="dialog2 = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
/*
import moment from "moment";
import format from "date-fns/format";*/
import { firestore, firebase } from "../firebase";
import store from "../store";
export default {
  props: ["conditionUser"],
  data: () => ({
    bottomNav: 3,
    archivo: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    setShowAc: true,
    alert: false,
    alert2: false,
    dateFinal: new Date().toISOString().substr(0, 10),
    menuFinal: false,
    modalFinal: false,

    conditionShow: false,
    actividades: [],
    select: { state: "1", abbr: "Tarea" },
    tipos: [{ state: "1", abbr: "Tarea" }, { state: "2", abbr: "Anuncio" }],
    dialog: false,
    dialog2: false,
    picker: new Date().toISOString().substr(0, 10),
    headers: [
      { text: "Titulo", value: "titulo" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Tipo", value: "tipo" },
      { text: "Ponderacion", value: "ponderacion" },
      { text: "Envios", value: "envios" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      titulo: "",
      descripcion: "",
      tipo: 0,
      ponderacion: 0,
      envios: 0,
      fechaInicio: "",
      fechaFinal: "",
      id: "",
      estado: ""
    },
    defaultItem: {
      titulo: "",
      descripcion: "",
      tipo: 0,
      ponderacion: 0,
      envios: 0,
      fechaInicio: "",
      fechaFinal: "",
      id: "",
      estado: ""
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
    },
    score() {
      //localStorage.id = store.getters.score;
      //this.initialize();
      if (store.getters.score != localStorage.anterior) {
        console.log("cambio aqui el localS? ", localStorage.id);
        this.initialize();
        localStorage.anterior = localStorage.id;
      }
      return store.getters.getName;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  mounted: function() {
    this.initialize();
  },
  /* teacher */

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
      this.actividades = [];
      firestore
        .collection("Actividad")
        .where("classRoom", "==", firestore.doc("classes/" + localStorage.id))
        .get()
        .then(snap => {
          snap.forEach(element => {
            console.log("descripcion");
            this.actividades.push({
              titulo: element.data().titulo,
              descripcion: element.data().descripcion,
              tipo: element.data().tipo,
              ponderacion: element.data().ponderacion,
              envios: element.data().envios,
              fechaInicio: element.data().fechaCreacion,
              fechaFinal: element.data().fechaLimite,
              id: element.id
            });
          });
        });
    },

    editItem(item) {
      this.conditionShow = true;
      this.editedIndex = this.actividades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log("item?? ", this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.actividades.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.actividades.splice(index, 1);
      firestore
        .collection("Actividad")
        .doc(item.id)
        .delete();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save1() {
      /*var digito = this.editedItem.fechaInicio.split("-");
        console.log("deberia ser ultimo digito ",digito[2]);
        */
      if (this.editedIndex === -1) {
        var adjuntosN = [];
        console.log("agregar");
        //Object.assign(this.actividades[this.editedIndex], this.editedItem);
        //console.log("uno nuevo ", this.editedItem.titulo);
        firestore
          .collection("Actividad")
          .add({
            adjuntos: adjuntosN,
            classRoom: firestore.doc("classes/" + localStorage.id),
            titulo: this.editedItem.titulo,
            descripcion: this.editedItem.descripcion,
            envios: this.editedItem.envios,
            fechaCreacion: this.editedItem.fechaInicio,
            fechaLimite: this.editedItem.fechaFinal,
            tipo: parseInt(this.editedItem.tipo),
            ponderacion: parseInt(this.editedItem.ponderacion)
          })
          .then(() => {
            this.initialize();
          })
          .catch(() => {
            console.log("errror");
          });
      } else {
        firestore
          .collection("Actividad")
          .doc(this.editedItem.id)
          .update({
            titulo: this.editedItem.titulo,
            descripcion: this.editedItem.descripcion,
            envios: this.editedItem.envios,
            fechaCreacion: this.editedItem.fechaInicio,
            fechaLimite: this.editedItem.fechaFinal,
            tipo: parseInt(this.editedItem.tipo),
            ponderacion: parseInt(this.editedItem.ponderacion)
          })
          .then(() => {
            console.log("se actualiza en la base");
            this.initialize();
            this.alert2 = true;
          })
          .catch(function(error) {
            console.log("Error getting docente: ", error);
            this.alert = true;
          });
        console.log("se supone estoy aqui", this.editItem);
      }

      this.close();
    },

    contenido() {
      console.log("estoy en el content");
      this.initialize();
    },
    tareas() {
      console.log("nada");
    },
    calificaciones() {
      console.log("nada2");
    },
    detalles() {},

    cambiar(retVal) {
      this.editedItem.tipo = retVal;
      console.log(this.editedItem.tipo);
      if (this.editedItem.tipo == 1) {
        this.conditionShow = true;
        console.log("entro??? conditoin");
      } else {
        this.conditionShow = false;
      }
    },
    guardar() {
      var file = event.target.files[0]; // use the Blob or File API
      console.log("file??? ", file);
      this.archivo = file;
    },
    enviar(id) {
      // Create a root reference
      var storageRef = firebase.storage().ref();

      // Create a reference to 'mountains.jpg'
      var mountainsRef = storageRef.child(this.archivo.name);

      // Create a reference to 'images/mountains.jpg'
      var mountainImagesRef = storageRef.child(
        "archivos/" + id + "-" + localStorage.idAlumno + "-" + this.archivo.name
      );

      mountainImagesRef
        .put(this.archivo)
        .then(() => {
          console.log("Uploaded a blob or file!");
          this.setShowAc = false;
          this.alert2 = true;
        })
        .catch(() => {
          this.alert = true;
        });
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

