<template>
  <div class="home">
    <h1>Contenido</h1>

    <v-app id="inspire">
      <v-data-table :headers="headers" 
      :items="temas" 
      :items-per-page="5" 
      class="elevation-1"></v-data-table>
    </v-app>
  </div>
</template>



<script>

import Componente from '../components/Componente';

export default {
    data () {
    return {
      headers: [
        { text: 'Semana', value: 'numero'  },
        { text: 'Tema', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
      ],
      temas: [
        {
          numero: '1',
          nombre: 'Programación Paralela',
          descripcion: 'Implementación de Programación Paralela',
        }
      ],
    }
  },
}
</script>


