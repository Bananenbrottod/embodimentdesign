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
import type { NodeDisplayData } from 'sigma/types';

interface Node {
    id: string;
    label: string;
    size: number;
    x: number;
    y: number;
    attributes: {
        Description: string;
    };
}

const sigma = ref<HTMLElement | null>(null);
const graph = ref<Graph>(new Graph());
const sigmaRenderer = ref<Sigma|undefined>();

const edges = data.edges;
const nodes: Node[] = data.nodes;

const nodeSelected = ref<boolean>(false);
const selectedNode = ref<Node | undefined>(undefined);
const selectedNodeNeighbors = ref<string[] | undefined>(undefined);

onMounted(() => {
    initializeGraph(graph.value);
    initializeSigma(graph.value);
});

function initializeGraph(graph: Graph) {
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
}

function initializeSigma(graph: Graph) {
    if (sigma.value !== null) {
        const renderer = new Sigma(graph, sigma.value);
        
        renderer.on("clickNode", (event) => {
            const node = nodes.find((node) => node.id === event.node);
            selectNode(node);
        });
        
        renderer.on("clickStage", (event) => {
            selectNode(undefined);
        });
        
        renderer.setSetting("nodeReducer", nodeReducer);
        renderer.setSetting("edgeReducer", edgeReducer);

        sigmaRenderer.value = renderer;
    }
}

function selectNode(node: Node | undefined) {
    selectedNode.value = node;
    nodeSelected.value = !!node;
    selectedNodeNeighbors.value = node ? graph.value.neighbors(node.id) : [];
    sigmaRenderer.value?.refresh();
}

function nodeReducer(node: string, data: any) {
    const res: Partial<NodeDisplayData> = { ...data };
                
    if (nodeSelected.value && !selectedNodeNeighbors.value?.includes(node) && selectedNode.value?.id !== node) {
        res.label = "";
        res.color = "#f6f6f6";
    }

    if (selectedNode.value?.id === node) {
        res.highlighted = true;
    }

    return res;
}

function edgeReducer(edge: string, data: any) {
    const res: Partial<NodeDisplayData> = { ...data };

    if (nodeSelected.value && !graph.value.hasExtremity(edge, selectedNode.value?.id)) {
        res.hidden = true;
    }

    return res;
}

</script>

<style scoped>
.sigma-container {
    height: 95vh;
    border: 1px solid #ccc;
}
</style>
  