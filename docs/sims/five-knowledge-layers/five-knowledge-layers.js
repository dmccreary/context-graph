// Five Knowledge Layers — vertical stack
// CANVAS_HEIGHT: 600

const LAYERS = [
    { id: 'llm',  label: 'LLM Reasoning Layer',  y: -200, shape: 'box', group: 'llm',
      desc: '<strong>LLM Reasoning Layer.</strong><br><br>Q: <em>How do we answer the user\'s question with current context?</em><br><br>Provides: natural-language reasoning, plan execution, tool calls. <em>Covered in this book\'s LLM-integration chapters.</em>' },
    { id: 'cg',   label: 'Context Graph Layer',  y: -100, shape: 'ellipse', group: 'cg', size: 42,
      desc: '<strong>Context Graph Layer — this book\'s focus.</strong><br><br>Q: <em>What decisions, approvals, precedents, and exceptions are relevant?</em><br><br>The bridge between what the organization knows (knowledge graph, semantic layer) and what the organization has decided (decision traces, lineage, precedents). Covered Chapters 8-22.' },
    { id: 'sem',  label: 'Semantic Layer',       y: 0,    shape: 'box', group: 'sem',
      desc: '<strong>Semantic Layer.</strong><br><br>Q: <em>What does this data mean?</em><br><br>Definitions, metrics, dimensions, business terms. Covered Chapters 2-3.' },
    { id: 'kg',   label: 'Knowledge Graph Layer', y: 100,  shape: 'box', group: 'kg',
      desc: '<strong>Knowledge Graph Layer.</strong><br><br>Q: <em>What entities exist and how are they related?</em><br><br>Customers, products, contracts, processes — as graph nodes and edges. Covered Chapters 1, 4-7.' },
    { id: 'raw',  label: 'Raw Data Layer',       y: 200,  shape: 'box', group: 'raw',
      desc: '<strong>Raw Data Layer.</strong><br><br>Q: <em>Where does the data physically live?</em><br><br>Tables, files, streams, documents. Covered Chapter 1.' }
];

const EDGES = [
    { from: 'llm', to: 'cg',  label: 'queries for decision context' },
    { from: 'cg',  to: 'sem', label: 'uses definitions and governance' },
    { from: 'cg',  to: 'kg',  label: 'anchors decisions to entities' },
    { from: 'kg',  to: 'sem', label: 'provides vocabulary' },
    { from: 'kg',  to: 'raw', label: 'integrates via ETL' }
];

const GROUP_COLORS = {
    llm:  { background: '#fff3c4', border: '#e9c46a' },
    cg:   { background: '#c5cae9', border: '#3949ab' },
    sem:  { background: '#a7e5dc', border: '#00897b' },
    kg:   { background: '#cbd9ee', border: '#5b7fbd' },
    raw:  { background: '#cfd8dc', border: '#666' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;
function init() {
    const nodes = LAYERS.map(l => {
        const c = GROUP_COLORS[l.group];
        return {
            id: l.id, label: l.label, shape: l.shape, size: l.size,
            x: 0, y: l.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 13, color: '#212121', face: 'Arial' },
            borderWidth: l.id === 'cg' ? 4 : 2,
            widthConstraint: 220, heightConstraint: 60
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 10, color: '#546e7a', strokeWidth: 3, strokeColor: '#f5f5f5', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51' },
        arrows: { to: { enabled: false } },
        width: 1.8, smooth: false
    }));
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => {
        network.fit({ animation: false, padding: 35 });
        const pos = network.getViewPosition(); const scale = network.getScale();
        network.moveTo({ position: { x: pos.x + 80 / scale, y: pos.y }, animation: false });
    });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const l = LAYERS.find(x => x.id === p.nodes[0]);
            if (l) document.getElementById('db').innerHTML = l.desc;
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length) reset(); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 35 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click any layer to see what question it answers and which chapters cover it.'; }
document.addEventListener('DOMContentLoaded', init);
