<script lang="ts" setup>
const items = [
        { title: 'Item #1', value: 1, },
        { title: 'Item #2', value: 2, },
        { title: 'Item #3', value: 3, }, ]
</script>

<template>
  <h1>Home</h1>
  <v-card class="mx-auto" max-width="300">
    <v-list :items="items"></v-list>
  </v-card>
</template>

<style scoped></style>
