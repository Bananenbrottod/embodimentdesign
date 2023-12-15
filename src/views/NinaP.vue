<template>
    Hallo Nina :)
    <div v-for="name in texte" v-bind:key="name">{{ name }}</div>
</template>
<script setup lang="ts">

    const texte = [
        "Peter", "Klaus", "Sandra"
    ];

</script>