<template>
  <div id="nav">
    <router-link to="/home">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopNav extends Vue {}
</script>

<style scoped></style>
