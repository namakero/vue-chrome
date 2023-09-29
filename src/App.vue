<script setup lang="ts">
import {urlStore} from "./stores/app";
const urls = urlStore();
</script>

<template>
  <div>
    <div>Input here some urls you consider unnecessary</div>
    <div>
      <input v-model="urls.inputUrl">
      <button @click="urls.addUrl(urls.inputUrl)">add</button>
    </div>
    <div>
      <button @click="urls.setUrls()">setUrls</button>
    </div>
    <div v-for="{ url, id } in urls.urls" :key="id" id="listDiv">
      <li>{{ url }}</li>
      <button @click="urls.removeUrl(id)">remove</button>
    </div>
  </div>
</template>

<style scoped>
#listDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
