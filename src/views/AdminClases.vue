<template>
  <div>
    <v-toolbar dark prominent color="blue-grey darken-4" style="height:200px;">
      <!--v-btn text>
        <v-icon>mdi-home</v-icon>Página Principal
      </v-btn-->
      <v-toolbar-title>Administración de Clases</v-toolbar-title>
    </v-toolbar>
    <v-container id="dropdown-example">
      <v-row>
        <v-col cols="12" sm="12">
          <v-overflow-btn
            v-model="seleccionado"
            @change="showClass()"
            class="my-2"
            label="Clases"
            :items="clases"
            :disabled="dropdownAble == 1 ? true : false"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn
            class="ma-2 text-center"
            tile
            width="30%"
            color=" success"
            @click="agregar()"
            :disabled="agregarAble == 1 ? true : false"
          >
            <v-icon>mdi-plus</v-icon>Agregar
          </v-btn>
          <v-btn
            class="ma-2 text-center"
            tile
            width="30%"
            @click="update()"
            :disabled="editarAble == 1 ? true : false"
            color="warning"
          >
            <v-icon left>mdi-pencil</v-icon>Editar
          </v-btn>
          <v-btn
            class="ma-2 text-center"
            tile
            width="30%"
            @click="eliminar()"
            :disabled="eliminarAble == 1 ? true : false"
            color="error"
          >
            <v-icon>mdi-delete</v-icon>Eliminar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="nombre"
              :rules="nombreRules"
              label="Nombre de la Clase"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="institucion"
              :items="instituciones"
              label="Institución"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="docente"
              :items="docentes"
              label="Docente"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12">
            <v-select
              v-model="alumnos_seleccionados"
              :items="alumnos"
              label="Alumnos"
              chips
              multiple
              :disabled="formAble == 1 ? true : false"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="grado"
              :rules="gradoRules"
              type="number"
              label="Grado"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="seccion"
              :rules="seccionRules"
              label="Sección"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="parcial"
              :rules="parcialRules"
              type="number"
              label="Parcial"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="anio"
              type="number"
              :rules="anioRules"
              label="Año"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      width="100%"
      class="blue-grey darken-4 white--text"
      @click="guardar()"
      :disabled="formAble == 1 ? true : false"
      primary
    >
      <v-icon>mdi-sd</v-icon>Guardar
    </v-btn>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn :color="snackColor" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
    <div>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Eliminar definitivamente la Clase?</v-card-title>
          <v-card-text>Al eliminar la Clase, la misma dejará de existir en la base de datos y ya no estará disponible.</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="deleteClass()">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { firebase, firestore } from "../firebase";
export default {
  data: () => ({
    isLoading: false,
    nombre: "",
    grado: 0,
    seccion: "",
    institucion: "",
    instituciones: [],
    idInst: [],
    alumnos_seleccionados: [],
    alumnos: [],
    my_alumnos: [],
    docente: "",
    docentes: [],
    parcial: 0,
    anio: 0,
    clases: [],
    base: [],
    seleccionado: "",
    idseleccionado: "",

    formAble: 1,
    dropdownAble: 0,
    opcionSeleccionada: "",

    agregarAble: 0,
    editarAble: 0,
    eliminarAble: 0,

    valid: false,
    snackColor: "red",

    dialog: false,

    nombreRules: [v => !!v || "El nombre es requerido."],
    seccionRules: [v => !!v || "La sección es requerido."],
    gradoRules: [
      v => !!v || "El grado es requerido.",
      v => v != 0 || "El grado no puede ser cero."
    ],
    anioRules: [
      v => !!v || "El año es requerido.",
      v => v >= 2000 || "El año debe ser mayor que 2000."
    ],
    parcialRules: [
      v => !!v || "El parcial es requerido.",
      v => v != 0 || "El parcial no puede ser cero."
    ],
    snackbar: false,
    text: ""
  }),
  mounted: function() {
    this.getClasses();
  },
  methods: {
    agregar: function() {
      this.dropdownAble = 1;
      this.formAble = 0;
      this.nombre = "";
      this.grado = 1;
      this.anio = 2000;
      this.seccion = "";
      this.parcial = 1;
      this.alumnos_seleccionados = [];
      this.institucion = "";
      this.docente = "";
      this.opcionSeleccionada = "agregar";
      this.editarAble = 1;
      this.eliminarAble = 1;
    },
    update() {
      if (this.seleccionado == "") {
        this.text = "Debe seleccionar una Institución.";
        this.snackbar = true;
      } else {
        this.formAble = 0;
        this.dropdownAble = 1;
        this.agregarAble = 1;
        this.eliminarAble = 1;
        this.opcionSeleccionada = "update";
      }
    },
    eliminar: function() {
      this.snackColor = "red";
      if (this.seleccionado == "") {
        this.text = "Debe seleccionar una Institución.";
        this.snackbar = true;
      } else {
        this.dialog = true;
        this.editarAble = 1;
        this.agregarAble = 1;
      }
    },
    guardar: function() {
      this.snackColor = "red";
      if (
        this.nombre === "" ||
        this.grado === "" ||
        this.grado === 0 ||
        this.seccion === "" ||
        this.parcial === "" ||
        this.parcial === 0 ||
        this.anio === "" ||
        this.anio === 0 ||
        this.alumnos_seleccionados.length === 0 ||
        this.institucion === "" ||
        this.docente === ""
      ) {
        this.text = "No deben haber campos vacíos!";
        this.snackbar = true;
      } else {
        if (this.opcionSeleccionada === "agregar") {
          var existe = false;
          var insti = "";
          this.idInst.forEach(el => {
            if (this.institucion === el.data) {
              insti = el.id;
            }
          });
          this.base.forEach(element => {
            if (
              element.data.nombre === this.nombre &&
              String(element.data.institucion.id) === insti &&
              element.data.seccion === this.seccion &&
              element.data.anio === this.anio &&
              element.data.parcial === this.parcial &&
              element.data.grado === this.grado
            ) {
              existe = true;
              console.log("Cumple If");
            }
          });
          if (existe === true) {
            this.text = "Esa Clase ya existe.";
            this.snackbar = true;
          } else {
            console.log("Else");
            this.addClass();
            this.dropdownAble = 0;
            this.formAble = 1;
          }
        } else {
          this.updateClass();
          this.dropdownAble = 0;
          this.formAble = 1;
        }
      }
    },
    getClasses: function() {
      this.alumnos = [];
      this.docentes = [];
      this.my_alumnos = [];
      this.instituciones = [];
      this.alumnos_seleccionados = [];
      this.base = [];
      this.clases = [];
      firebase
        .firestore()
        .collection("classes")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.clases.push(doc.data().nombre + "__________-" + doc.id);
            this.base.push({ id: doc.id, data: doc.data() });
          });
        })
        .catch(function(error) {
          console.log("Error getting Classes: ", error);
        });
      firebase
        .firestore()
        .collection("institutions")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.instituciones.push(doc.data().nombre);
            this.idInst.push({ id: doc.id, data: doc.data().nombre });
          });
        })
        .catch(function(error) {
          console.log("Error getting Institutions: ", error);
        });
      firestore
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().userType == "Profesor") {
              this.docentes.push(doc.data().email);
            } else if (doc.data().userType == "Alumno") {
              this.alumnos.push(doc.data().email);
            }
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    showClass: function() {
      this.alumnos_seleccionados = [];
      this.base.forEach(element => {
        if (element.id === this.seleccionado.split("-")[1]) {
          this.nombre = element.data.nombre;
          this.grado = element.data.grado;
          this.seccion = element.data.seccion;
          this.anio = element.data.anio;
          this.parcial = element.data.parcial;
          this.idseleccionado = element.id;
          firestore
            .collection("institutions")
            .doc(element.data.institucion.id)
            .get()
            .then(doc => {
              this.institucion = doc.data().nombre;
            });
          firestore
            .collection("users")
            .doc(element.data.docente.id)
            .get()
            .then(doc => {
              this.docente = doc.data().email;
            });
          element.data.alumnos.forEach(i => {
            firestore
              .collection("users")
              .doc(i.id)
              .get()
              .then(doc => {
                this.alumnos_seleccionados.push(doc.data().email);
              });
          });
        }
      });
    },
    updateClass: function() {
      var my_i = "institutions/";
      firestore
        .collection("institutions")
        .where("nombre", "==", this.institucion)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            my_i += doc.id;
          });
          var my_docente = "users/";
          firestore
            .collection("users")
            .where("email", "==", this.docente)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doce => {
                my_docente += doce.id;
              });
              var my_all = [];
              this.alumnos_seleccionados.forEach(al => {
                firestore
                  .collection("users")
                  .where("email", "==", al)
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(alu => {
                      my_all.push(firestore.doc("users/" + alu.id));
                      this.my_alumnos = my_all;
                    });
                  })
                  .catch(function(error) {
                    console.log("Error getting alumnos: ", error);
                  });
              });
              firestore
                .collection("classes")
                .doc(this.idseleccionado)
                .update({
                  nombre: this.nombre,
                  grado: parseInt(this.grado),
                  seccion: this.seccion,
                  anio: parseInt(this.anio),
                  parcial: parseInt(this.parcial),
                  institucion: firestore.doc(my_i),
                  docente: firestore.doc(my_docente)
                })
                .then(() => {
                  console.log(this.my_alumnos);
                  console.log("Clase Actualizada!");
                  this.text = "Clase actualizada correctamente.";
                  this.snackColor = "green";
                  this.snackbar = true;
                  this.agregarAble = 0;
                  this.eliminarAble = 0;
                  this.dropdownAble = 0;
                  firestore
                    .collection("classes")
                    .doc(this.idseleccionado)
                    .update({
                      alumnos: this.my_alumnos
                    })
                    .then(() => {
                      this.getClasses();
                      this.showClass();
                    });
                })
                .catch(error => {
                  console.error("Error updating Clase: ", error);
                  this.text = "Error actualizando Clase.";
                  this.snackbar = true;
                  this.agregarAble = 0;
                  this.eliminarAble = 0;
                  this.dropdownAble = 0;
                });
            })
            .catch(function(error) {
              console.log("Error getting docente: ", error);
            });
        })
        .catch(function(error) {
          console.log("Error getting institution: ", error);
        });
    },
    addClass: function() {
      var my_i = "institutions/";
      firestore
        .collection("institutions")
        .where("nombre", "==", this.institucion)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            my_i += doc.id;
          });
          var my_docente = "users/";
          firestore
            .collection("users")
            .where("email", "==", this.docente)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doce => {
                my_docente += doce.id;
              });
              var my_all = [];
              this.alumnos_seleccionados.forEach(al => {
                firestore
                  .collection("users")
                  .where("email", "==", al)
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(alu => {
                      my_all.push(firestore.doc("users/" + alu.id));
                      this.my_alumnos = my_all;
                    });
                  })
                  .catch(function(error) {
                    console.log("Error getting alumnos: ", error);
                  });
              });
              firestore
                .collection("classes")
                .add({
                  nombre: this.nombre,
                  grado: parseInt(this.grado),
                  seccion: this.seccion,
                  parcial: parseInt(this.parcial),
                  anio: parseInt(this.anio),
                  institucion: firestore.doc(my_i),
                  docente: firestore.doc(my_docente),
                  alumnos: this.my_alumnos
                })
                .then(docRef => {
                  console.log("Document written with ID: ", docRef.id);
                  this.seleccionado =
                    this.nombre +
                    "-" +
                    this.grado +
                    "-" +
                    this.seccion +
                    "-" +
                    this.parcial +
                    "-" +
                    this.anio;
                  firestore
                    .collection("classes")
                    .doc(docRef.id)
                    .update({
                      alumnos: this.my_alumnos
                    })
                    .then(() => {
                      this.text = "Institución agregada correctamente.";
                      this.snackColor = "green";
                      this.snackbar = true;
                      this.editarAble = 0;
                      this.eliminarAble = 0;
                      this.dropdownAble = 0;
                      this.nombre = "";
                      this.grado = 1;
                      this.anio = 2000;
                      this.seccion = "";
                      this.parcial = 1;
                      this.alumnos_seleccionados = [];
                      this.institucion = "";
                      this.docente = "";
                      this.opcionSeleccionada = "agregar";
                      this.getClasses();
                    });
                })
                .catch(error => {
                  console.error("Error adding document: ", error);
                  this.text = "Error agregando Clase.";
                  this.snackbar = true;
                  this.editarAble = 0;
                  this.eliminarAble = 0;
                  this.dropdownAble = 0;
                });
            })
            .catch(function(error) {
              console.log("Error getting docente: ", error);
            });
        })
        .catch(function(error) {
          console.log("Error getting institution: ", error);
        });
    },
    deleteClass: function() {
      this.dialog = false;
      firestore
        .collection("classes")
        .doc(this.idseleccionado)
        .delete()
        .then(error => {
          console.log("Deleted: ", error);
          this.text = "Institución eliminada correctamente.";
          this.snackColor = "green";
          this.snackbar = true;
          this.editarAble = 0;
          this.agregarAble = 0;
          this.nombre = "";
          this.grado = 1;
          this.anio = 2000;
          this.seccion = "";
          this.parcial = 1;
          this.alumnos_seleccionados = [];
          this.institucion = "";
          this.docente = "";
          this.opcionSeleccionada = "agregar";
          this.getClasses();
        })
        .catch(error => {
          console.error("Error deleting document: ", error);
          this.text = "Error eliminando Institución.";
          this.snackbar = true;
          this.editarAble = 0;
          this.agregarAble = 0;
        });
    }
  }
};
</script>

