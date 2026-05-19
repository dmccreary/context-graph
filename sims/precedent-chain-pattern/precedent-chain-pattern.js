// Precedent Chain Pattern — 7 decision traces, node size = in-degree
// CANVAS_HEIGHT: 560

const TRACES = [
    { id: 'DT-1001', label: 'DT-1001\nQ1-2024', x: -350, y: 0,    indeg: 2, desc: 'Earliest in chain. The foundational decision other decisions cite. Cited by 2 traces.' },
    { id: 'DT-1580', label: 'DT-1580\nQ2-2024', x: -200, y: 0,    indeg: 1, desc: 'First derivative case citing DT-1001. Lower in-degree than DT-2204 but still part of the foundation.' },
    { id: 'DT-2204', label: 'DT-2204\nQ4-2024', x: -40,  y: 0,    indeg: 4, desc: 'Most influential precedent in this chain — cited by four later decisions. When an LLM encounters a new invoice exception, this trace should appear in the top-3 context results.' },
    { id: 'DT-2891', label: 'DT-2891\nQ1-2025', x: 130,  y: -120, indeg: 1, desc: 'Cites DT-2204. In-degree 1. A specific derivative case.' },
    { id: 'DT-3105', label: 'DT-3105\nQ2-2025', x: 130,  y: 120,  indeg: 0, desc: 'Cites DT-2204. In-degree 0 — no other decision cites it yet. Recent leaf.' },
    { id: 'DT-3891', label: 'DT-3891\nQ3-2025', x: 280,  y: -60,  indeg: 1, desc: 'Cites DT-2204 and DT-2891. Bridges two earlier precedents.' },
    { id: 'DT-4482', label: 'DT-4482\nQ4-2025', x: 410,  y: 0,    indeg: 0, desc: 'Most recent — cites DT-2204 and DT-3891. New leaf; will accrue citations over time if subsequent similar decisions follow this pattern.' }
];

const CITES = [
    { from: 'DT-1580', to: 'DT-1001' },
    { from: 'DT-2204', to: 'DT-1001' },
    { from: 'DT-2204', to: 'DT-1580' },
    { from: 'DT-2891', to: 'DT-2204' },
    { from: 'DT-3105', to: 'DT-2204' },
    { from: 'DT-3891', to: 'DT-2204' },
    { from: 'DT-3891', to: 'DT-2891' },
    { from: 'DT-4482', to: 'DT-2204' },
    { from: 'DT-4482', to: 'DT-3891' }
];

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network, nodesDS;
let showDegree = false;
let highlightTop = false;

function makeNode(t) {
    const size = 18 + t.indeg * 8;
    const isTop = highlightTop && t.indeg >= 2;
    return {
        id: t.id,
        label: (showDegree ? (t.label + '\n(in-deg ' + t.indeg + ')') : t.label),
        shape: 'ellipse', size: size,
        color: { background: isTop ? '#c5cae9' : '#eceff1',
                 border: isTop ? '#e9c46a' : '#3949ab',
                 highlight: { background: '#3949ab', border: '#000' } },
        font: { size: 10, color: '#212121', face: 'Arial' },
        borderWidth: isTop ? 3 : 2,
        widthConstraint: 100, heightConstraint: 36,
        x: t.x, y: t.y, fixed: { x: true, y: true }
    };
}

function init() {
    nodesDS = new vis.DataSet(TRACES.map(makeNode));
    const edges = CITES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: 'CITES',
        font: { size: 9, color: '#f57c00', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: '#f57c00', highlight: '#bf360c' },
        arrows: { to: { enabled: true, scaleFactor: 0.6 } },
        dashes: true, width: 1.5, smooth: false
    }));
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: nodesDS, edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => { network.fit({ animation: false, padding: 30 }); });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const t = TRACES.find(x => x.id === p.nodes[0]);
            if (t) document.getElementById('db').innerHTML =
                '<strong>' + t.id + '</strong> — in-degree ' + t.indeg + '<br><br>' + t.desc;
        }
    });
    network.on('selectEdge', (p) => {
        if (p.nodes.length === 0 && p.edges.length > 0) {
            document.getElementById('db').innerHTML =
                '<strong>CITES edge.</strong><br><br>Properties on the edge: similarity_score (~0.85), find_method (system_recommendation), favorability (positive — outcome confirmed favorable retroactively).';
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length && !network.getSelectedEdges().length) reset(); });
    document.getElementById('degree-btn').addEventListener('click', () => {
        showDegree = !showDegree;
        document.getElementById('degree-btn').textContent = showDegree ? 'Hide In-Degree Labels' : 'Show In-Degree Labels';
        for (const t of TRACES) nodesDS.update(makeNode(t));
    });
    document.getElementById('highlight-btn').addEventListener('click', () => {
        highlightTop = !highlightTop;
        for (const t of TRACES) nodesDS.update(makeNode(t));
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 30 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click any node to see its citation footprint, or any CITES edge for its match metadata.'; }
document.addEventListener('DOMContentLoaded', init);
