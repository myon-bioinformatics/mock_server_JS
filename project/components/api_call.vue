<template>
  <div>
    <h1>Mock API Calls</h1>
    <div>
      <button @click="fetchData('uuid')">Fetch UUID</button>
      <p>UUID: {{ data.uuid }}</p>
    </div>
    <div>
      <button @click="fetchData('random')">Fetch Random Number</button>
      <p>Random Number: {{ data.random }}</p>
    </div>
    <div>
      <button @click="fetchData('randomSlice8')">Fetch Random Slice 8</button>
      <p>Random Slice 8: {{ data.randomSlice8 }}</p>
    </div>
  </div>
</template>

<script type="module">
  import { config } from '../config.js';

  export default {
    data() {
      return {
        data: {
          uuid: '',
          random: '',
          randomSlice8: '',
        },
      };
    },
    methods: {
      async fetchData(type) {
        try {
          const apiConfig = config[type];
          const response = await fetch(apiConfig.url, {
            method: apiConfig.method,
            headers: config.headers,
            cache: apiConfig.cache,
          });
          const responseData = await response.json();
          this.data[type] = responseData;
        } catch (error) {
          console.error(`Error fetching ${type}:`, error);
        }
      },
    },
  };
</script>

<style scoped>
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
