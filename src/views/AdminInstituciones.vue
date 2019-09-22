<template>
  <div>
    <v-toolbar dark prominent color="blue-grey darken-4" style="height:200px;">
      <!--v-btn text>
        <v-icon>mdi-home</v-icon>Página Principal
      </v-btn-->
      <v-toolbar-title >Administración de Institituciones</v-toolbar-title>
    </v-toolbar>
    <v-container id="dropdown-example">
      <v-row>
        <v-col cols="12" sm="12">
          <v-overflow-btn
            v-model="seleccionado"
            @change="showInstitucion()"
            class="my-2"
            label="Instituciones"
            :items="instituciones"
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
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nombre"
              :rules="nombreRules"
              label="Nombre de la Institución"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="direccion"
              :rules="direccionRules"
              label="Dirección"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="telefono"
              :rules="telefonoRules"
              :counter="8"
              label="Número Telefónico"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="encargado"
              :rules="encargadoRules"
              type="text"
              label="Encargados (Ej: Persona1,Persona2)"
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
          <v-card-title class="headline">Eliminar definitivamente la Institución?</v-card-title>
          <v-card-text>Al eliminar la Institución, la misma dejará de existir en la base de datos y ya no estará disponible.</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="deleteInstitucion()">Aceptar</v-btn>
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
    direccion: "",
    telefono: "",
    encargados: [],
    encargado: "",
    instituciones: [],
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
    direccionRules: [v => !!v || "La dirección es requerida."],
    telefonoRules: [
      v => !!v || "El número es requerido.",
      v => v.length > 7 || "Ingrese un número telefónico válido"
    ],
    encargadoRules: [v => !!v || "Al menos un encargado es requerido."],

    snackbar: false,
    text: ""
  }),
  mounted: function() {
    this.getInstitutions();
  },
  methods: {
    agregar: function() {
      this.dropdownAble = 1;
      this.formAble = 0;
      this.nombre = "";
      this.direccion = "";
      this.telefono = "";
      this.encargado = "";
      this.encargados = [];
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
        this.agregarAble = 1;
        this.eliminarAble = 1;
        this.opcionSeleccionada="update";
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
        this.direccion === "" ||
        this.telefono === "" ||
        this.encargado === ""
      ) {
        this.text = "No deben haber campos vacíos!";
        this.snackbar = true;
      } else if (this.telefono.length < 8) {
        this.text = "Ingrese un número telefónico válido.";
        this.snackbar = true;
      } else {
        if (this.opcionSeleccionada === "agregar") {
          var existe = false;
          this.instituciones.forEach(element => {
            if (element === this.nombre) {
              existe = true;
            }
          });
          if (existe === true) {
            this.text = "Esa Institución ya existe.";
            this.snackbar = true;
          } else {
            this.addInstitucion();
            this.dropdownAble = 0;
            this.formAble = 1;
          }
        } else {
          this.updateInstitucion();
          this.dropdownAble = 0;
          this.formAble = 1;
        }
      }
    },
    editEncargados: function() {
      this.encargados = this.encargado.split(",");
      console.log(this.encargado);
    },
    getInstitutions: function() {
      this.encargados = [];
      this.base = [];
      this.instituciones = [];
      this.isLoading = true;
      firebase
        .firestore()
        .collection("institutions")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
            this.base.push({ id: doc.id, data: doc.data() });
            this.instituciones.push(doc.data().nombre);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    showInstitucion: function() {
      this.base.forEach(element => {
        if (this.seleccionado === element.data.nombre) {
          this.nombre = element.data.nombre;
          this.direccion = element.data.direccion;
          this.telefono = element.data.telefono + "";
          this.encargados = element.data.encargados;
          this.encargado = "";
          this.encargados.forEach(i => {
            if (i == this.encargados[this.encargados.length - 1]) {
              this.encargado += i;
            } else {
              this.encargado += i + ",";
            }
          });
          this.idseleccionado = element.id;
        }
      });
    },
    updateInstitucion: function() {
      console.log(this.encargado);
      this.editEncargados();
      firestore
        .collection("institutions")
        .doc(this.idseleccionado)
        .update({
          nombre: this.nombre,
          direccion: this.direccion,
          telefono: this.telefono,
          encargados: this.encargados
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.text = "Institución actualizada correctamente.";
          this.snackColor = "green";
          this.snackbar = true;
          this.agregarAble = 0;
          this.eliminarAble = 0;
        })
        .catch(error => {
          console.error("Error updating document: ", error);
          this.text = "Error actualizando Institución.";
          this.snackbar = true;
          this.agregarAble = 0;
          this.eliminarAble = 0;
        });
      this.getInstitutions();
    },
    addInstitucion: function() {
      this.editEncargados();
      firestore
        .collection("institutions")
        .add({
          nombre: this.nombre,
          direccion: this.direccion,
          telefono: this.telefono,
          encargados: this.encargados
        })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.text = "Institución agregada correctamente.";
          this.snackColor = "green";
          this.snackbar = true;
          this.editarAble = 0;
          this.eliminarAble = 0;
        })
        .catch(error => {
          console.error("Error adding document: ", error);
          this.text = "Error agregando Institución.";
          this.snackbar = true;
          this.editarAble = 0;
          this.eliminarAble = 0;
        });
      this.nombre = "";
      this.direccion = "";
      this.telefono = "";
      this.encargado = "";
      this.encargados = [];
      this.getInstitutions();
    },
    deleteInstitucion: function() {
      this.dialog = false;
      firestore
        .collection("institutions")
        .doc(this.idseleccionado)
        .delete()
        .then(error => {
          console.log("Deleted: ", error);
          this.text = "Institución eliminada correctamente.";
          this.snackColor = "green";
          this.snackbar = true;
          this.editarAble = 0;
          this.agregarAble = 0;
        })
        .catch(error => {
          console.error("Error deleting document: ", error);
          this.text = "Error eliminando Institución.";
          this.snackbar = true;
          this.editarAble = 0;
          this.agregarAble = 0;
        });
      this.nombre = "";
      this.direccion = "";
      this.telefono = "";
      this.encargado = "";
      this.encargados = [];
      this.getInstitutions();
    }
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>