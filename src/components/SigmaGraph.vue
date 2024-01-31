<!-- Graph.vue -->
<template>
    <div ref="sigma" class="sigma-container"></div>
    <v-dialog v-model="nodeSelected">
        <v-card>
            <v-card-title>
                {{ selectedNode!.label }}
            </v-card-title>
            <v-card-text>
                {{ selectedNode!.attributes.Description }}
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
  
<script setup lang="ts">
import Graph from 'graphology';
import Sigma from 'sigma';
import { onMounted, ref } from 'vue';
import data from "@/data/gephi.json";
import { VDialog } from 'vuetify/components';

const sigma = ref<HTMLElement | null>(null);

const edges = data.edges;
const nodes = data.nodes;

const nodeSelected = ref<boolean>(false);
const selectedNode = ref<Object | undefined>(undefined);

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

    if (sigma.value !== null) {
        const sigmaInstance = new Sigma(graph, sigma.value);
        sigmaInstance.refresh();

        sigmaInstance.on("clickNode", (event) => {
            const node = nodes.find((node) => node.id === event.node);
            nodeSelected.value = true;
            selectedNode.value = node;
        });
    }
}

</script>

<style scoped>
.sigma-container {
    height: 95vh;
    border: 1px solid #ccc;
}
</style>
  