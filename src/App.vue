<script setup lang="ts">
import { urlStore } from "./stores/app";
import { onMounted } from "vue";

const urls = urlStore();

onMounted(() => {
  urls.loadUrls();
});
</script>

<template>

  <div v-if="urls.changeScreen === false">
    <h1>Hide any site</h1>
    <div id="form">
      <input v-model="urls.inputUrl">
      <button @click="urls.addHideUrl(urls.inputUrl)">add</button>
      <button @click="urls.confirmHideUrls()">confirm</button>
    </div>
    <div id="divList">
      <div v-for="{ url, id } in urls.hideUrls" :key="id" id="listDiv">
        <li>{{ url }}</li>
        <button @click="urls.removeHideUrl(id)">remove</button>
      </div>
    </div>
    <div>
      <button @click="urls.changeScreenFunc()">change to show</button>
    </div>
  </div>

  <div v-if="urls.changeScreen === true">
    <h1>show specific sites</h1>
    <div id="form">
      <input v-model="urls.inputUrl">
      <button @click="urls.addPickUpUrl(urls.inputUrl)">add</button>
      <button @click="urls.confirmPickUpUrls()">confirm</button>
    </div>
    <div id="divList">
      <div v-for="{ url, id } in urls.pickUpUrls" :key="id" id="listDiv">
        <li>{{ url }}</li>
        <button @click="urls.removePickUpUrl(id)">remove</button>
      </div>
    </div>
    <div>
      <button @click="urls.changeScreenFunc()">change to hide</button>
    </div>
  </div>

</template>

<style scoped>
#divList {
  height: 190px;
  overflow: auto;
  border: solid 2px gray;
}

#form {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

#listDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 0.3px greenyellow;
  padding: 0 3%;
}

h1 {
  font-size: 30px;
}
</style>
