<template>
    Hallo Nina :)
    <div v-for="name in texte">{{ name }}</div>
</template>
<script setup lang="ts">

    const texte = [
        "Peter", "Klaus", "Sandra"
    ];

</script>