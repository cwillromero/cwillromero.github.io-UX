<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import { firebase } from "./firebase";

export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>

<style>
.full-width {
  width: 100%;
}
.full-height {
  height: 100%;
}
</style>