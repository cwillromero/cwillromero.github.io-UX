<template>
  <div class="clase">
    <v-app-bar
      absolute
      color="#37474F"
      dark
      shrink-on-scroll
      fade-img-on-scroll
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-toolbar-title>{{score}}</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn x-small text color="white" @click="cerrarSesion()">Cerrrar Cesión</v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title background-color="transparent">
          <v-tab @click="contenido">Contenido</v-tab>
          <v-tab @click="tareas">Tareas</v-tab>
          <v-tab v-if="$props.conditionUser" @click="calificaciones">Calificar</v-tab>
          <v-tab v-else @click="calificaciones">Calificaciones</v-tab>

          <v-tab @click="calendario">Calendario</v-tab>
          <v-tab v-if="!$props.conditionUser" @click="notificaciones">
            <v-badge color="green" overlap>
              <template v-slot:badge>
                <span v-if="messages > 0">{{ messages }}</span>
              </template>
              <v-icon large>mdi-email</v-icon>
            </v-badge>
          </v-tab>
          <v-tab v-else @click="notificaciones">
            Notificaciones
            <v-badge color="green" overlap>
              <template v-slot:badge>
                <span v-if="messages2 > 0">{{ messages2 }}</span>
              </template>
              <v-icon small large>mdi-email</v-icon>
            </v-badge>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <div class="contenidoV" v-show="contenidoShow">
      <v-data-table :headers="headers" :items="actividades" sort-by="calories" class="elevation-1">
        <template v-slot:top >
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
              <v-icon v-on="on" @click="algo(item)">mdi-text</v-icon>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Detalles - {{tituloTem}}</v-card-title>

              <v-card-text>
                <br />
                {{descripcionTem}}
                <br />
                <br />
                <div v-if="item.tipo === 1">
                  <input v-if="enviosTem>0" ref="inputUpload" type="file" @change="guardar()" />
                  <br />
                  <v-btn
                    v-if="enviosTem>0"
                    class="ma-2"
                    outlined
                    color="indigo"
                    @click="enviar(idTem)"
                  >Enviar</v-btn>
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
                <v-btn color="primary" text @click="cerrarDetalles">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>

    <div v-show="tareasShow" class="contenidoV">
      <div v-for="item in tareasClase" :key="item.titulo">
        <v-card>
          <v-card-text>
            <p class="display-1 text--primary">{{item.titulo}}</p>
            <div class="text--primary">
              Descripcion
              <br />
              {{item.descripcion}}
            </div>
          </v-card-text>
        </v-card>
        <br />
      </div>
    </div>

    <div v-show="calendarioShow" class="contenidoV">
      <br />
      <br /><center>
      <v-sheet max-width="600">
        <v-calendar type="month" now="2019-09-23" value="2019-09-23" :events="events"></v-calendar>
      </v-sheet></center>
    </div>

    <div v-if="conditionUser" v-show="calificacionesShow" class="contenidoV">
      calificaciones
      <v-row  v-for="alumno in alumnosClase" :key="alumno.id">
        <v-col>{{alumno.id}}</v-col>
        <v-col v-for="actividad in actividades" :key="actividad.id">
          {{actividad.titulo}}
          <v-text-field :disabled="!conditionUser" v-model="actividad.ponderacion"></v-text-field>
        </v-col>
      </v-row>

    </div>

    <div v-else v-show="calificacionesShow" class="contenidoV">
      <v-row>
        <v-col> <center>Actividad</center>
        </v-col>

        <v-col> <center>Calificación</center>
        </v-col>
      </v-row>

      <div v-for="actividad in actividades" :key="actividad.id">
        <v-row  v-if="actividad.tipo==1">
          <v-col>
          <center>{{actividad.titulo}}</center>
          </v-col>
          <v-col>
            <center>
          <v-text-field :disabled="!conditionUser" v-model="actividad.ponderacion"></v-text-field>
          </center>
          </v-col>
        </v-row>
      </div>
      
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
    descripcionTem: "",
    tituloTem: "",
    idTem: "",
    enviosTem: 0,
    conditionShow: false,
    tareasShow: false,
    contenidoShow: true,
    tareasClase: [],
    calendarioShow: false,
    events: [],
    messages: 0,
    messages2: 0,
    calificacionesShow: false,
    alumnosClase: [],

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
        /*this.calendario();
        this.tareas();*/
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
      (this.events = []),
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

              this.events.push({
                name: element.data().titulo,
                start: element.data().fechaCreacion,
                end: element.data().fechaLimite
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
      this.tareasShow = false;
      this.calificacionesShow = false;
      this.contenidoShow = true;
      this.calendarioShow = false;
    },
    calendario() {
      this.tareasShow = false;
      this.contenidoShow = false;
      this.calendarioShow = true;
      this.calificacionesShow = false;
    },
    tareas() {
      console.log("nada");
      this.contenidoShow = false;
      this.calificacionesShow = false;
      this.tareasShow = true;
      this.calendarioShow = false;

      firestore
        .collection("Actividad")
        .where("classRoom", "==", firestore.doc("classes/" + localStorage.id))
        .get()
        .then(snap => {
          this.tareasClase = [];
          snap.forEach(element => {
            if (element.data().tipo === 1) {
              this.tareasClase.push({
                titulo: element.data().titulo,
                descripcion: element.data().descripcion
              });

              console.log("esta aqui tareas=??");
            }
          });
        });
    },
    calificaciones() {
      this.contenidoShow = false;
      this.calendarioShow = false;
      this.tareasShow = false;
      this.calificacionesShow = true;

      firestore
        .collection("classes")
        .get()
        .then(snap => {
          this.alumnosClase = [];
          snap.forEach(element => {
            if (element.id === localStorage.id) {
              
              element.data().alumnos.forEach(alum => {
                console.log("hay alumno?");
                firestore
                  .collection("users")
                  .get()
                  .then(element2 => {
                    element2.forEach(name => {
                      console.log("id por alumno ", name.data().email);
                      if (name.id === alum.id) {
                        this.alumnosClase.push({
                          id: name.data().email
                        });
                      }
                    });
                  });
              });
            }
          });
        })
        .catch(error => {
          console.log("que hh ", error);
        });
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
        "archivos/" +
          this.idTem +
          "-" +
          localStorage.idAlumno +
          "-" +
          this.archivo.name
      );

      mountainImagesRef
        .put(this.archivo)
        .then(() => {
          console.log("Uploaded a blob or file!");
          this.setShowAc = false;

          firestore
            .collection("Actividad")
            .doc(this.idTem)
            .update({
              envios: this.enviosTem - 1
            })
            .then(() => {});
          this.alert2 = true;
        })
        .catch(() => {
          this.alert = true;
        });
    },
    cerrarSesion() {
      firebase.auth().signOut();
      this.$router.push("/login");
    },
    algo(item) {
      console.log("aqui que hay??? ", item);
      this.descripcionTem = item.descripcion;
      this.tituloTem = item.titulo;
      this.idTem = item.id;
      this.enviosTem = item.envios;
      console.log("cuantos envios", this.enviosTem);
    },
    cerrarDetalles() {
      this.dialog2 = false;
      this.initialize();
    },
    notificaciones() {
      console.log("notificaciones");
    }
  }
};
</script>

<style scoped>
.clase {
  position: absolute;
  left: 20%;
  width: 80%;
  height: 100% !important;
  top: 0%;
  /*border: solid red 2px;*/
  overflow: auto;
}

.clase v-btn {
  width: 25%;
}

.tab {
  height: 70%;
}

.contenidoV {
  position: relative;
  top: 33.5%;
}
</style>

