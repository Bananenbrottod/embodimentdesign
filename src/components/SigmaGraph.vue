<!-- Graph.vue -->
<template>
    <div ref="sigma" class="sigma-container"></div>
</template>
  
<script setup lang="ts">
import Graph from 'graphology';
import Sigma from 'sigma';
import { onMounted, ref } from 'vue';

const sigma = ref<HTMLElement|null>(null);

onMounted(() => {
    initializeGraph();
});

function initializeGraph() {
    const graph = new Graph();
    
    // Add nodes
    const nodes = [
        { id: 'n1', label: 'Node 1', x: 0, y: 0, size: 5 },
        { id: 'n2', label: 'Node 2', x: 50, y: 50, size: 10 },
        { id: 'n3', label: 'Node 3', x: 100, y: 0, size: 15 },
        { id: 'n4', label: 'Node 4', x: 150, y: 50, size: 20 },
        { id: 'n5', label: 'Node 5', x: 200, y: 0, size: 25 },
    ];
    
    nodes.forEach((node) => graph.addNode(node.id, node));
    
    // Add edges with different lengths
    const edges = [
        { id: 'e1', source: 'n1', target: 'n2', size: 1 },
        { id: 'e2', source: 'n2', target: 'n3', size: 2 },
        { id: 'e3', source: 'n3', target: 'n4', size: 3 },
        { id: 'e4', source: 'n4', target: 'n5', size: 4 },
        { id: 'e5', source: 'n5', target: 'n1', size: 5 },
    ];
    
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
  