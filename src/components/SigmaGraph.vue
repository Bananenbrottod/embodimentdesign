<!-- Graph.vue -->
<template>
    <div ref="sigma" class="sigma-container"></div>
</template>
  
<script setup lang="ts">
import Graph from 'graphology';
import Sigma from 'sigma';
import { onMounted, ref } from 'vue';
import data from "@/data/gephi.json";

const sigma = ref<HTMLElement | null>(null);

const edges = data.edges;
const nodes = data.nodes;

onMounted(() => {
    initializeGraph();
});

function initializeGraph() {
    const graph = new Graph();
    let maxSize = 0;

    nodes.forEach((node) => {
        if (node.size > maxSize) maxSize = node.size;
        node.size -= 10;
        node.size = node.size / 1.5;
        if (node.size < 2) node.size = 5;

        graph.addNode(node.id, node);
    });
    console.log(maxSize);
    edges.forEach((edge) => graph.addEdge(edge.source, edge.target));

    // == === 
    // 0 == false -> TRUE
    // 0 === false -> FALSE
    // if (0) -> if (false)
    // number = Zahl -> Integer
    // boolean = true / false
    // string = Text "asosdgkjjfhdfhdlh"
    // float = zahl mit komma 0.000

    // 12 !== 6
    // 12 === 12

    if (sigma.value !== null) {
        const sigmaInstance = new Sigma(graph, sigma.value);
        sigmaInstance.refresh();
    }
}

</script>

<style scoped>
.sigma-container {
    height: 95vh;
    border: 1px solid #ccc;
}
</style>
  