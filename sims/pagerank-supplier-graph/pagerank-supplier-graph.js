// PageRank Supplier Graph — 8-node directed supply chain with size-proportional PageRank
// CANVAS_HEIGHT: 540

const NODES = [
    { id: 'dist', label: 'Tier-1 Distributor', pr: 0.28, color: '#3949ab', shape: 'ellipse',
      desc: 'Highest PageRank because three manufacturers and one logistics partner all supply into this node — it is the critical bridge before final products. Removing it disconnects all product lines.' },
    { id: 'rma', label: 'Raw Material A', pr: 0.19, color: '#00897b',
      desc: 'High PageRank because it feeds two manufacturers (X and Y). A disruption upstream cascades to two downstream manufacturing nodes.' },
    { id: 'rmb', label: 'Raw Material B', pr: 0.14, color: '#00897b',
      desc: 'Medium-high PageRank: feeds only Manufacturer X, but X itself has high downstream importance.' },
    { id: 'mfgx', label: 'Manufacturer X', pr: 0.13, color: '#e9c46a',
      desc: 'Medium PageRank because it receives two raw materials and feeds the distributor. Single-source-of-failure for two upstream materials.' },
    { id: 'mfgy', label: 'Manufacturer Y', pr: 0.10, color: '#e9c46a',
      desc: 'Lower than X because it depends on only one raw material, but still important — without it the distributor loses a parallel feed.' },
    { id: 'pl1', label: 'Product Line 1', pr: 0.07, color: '#f57c00',
      desc: 'Low PageRank — terminal node in the supply chain. PageRank tracks influence, not value; product lines are leaves.' },
    { id: 'pl2', label: 'Product Line 2', pr: 0.06, color: '#f57c00',
      desc: 'Lowest among the products — slightly lower than PL1 due to graph asymmetry. Terminal node has nothing flowing out.' },
    { id: 'log', label: 'Logistics Partner', pr: 0.03, color: '#5b7fbd',
      desc: 'Lowest PageRank: only one outgoing edge into the distributor and no inbound. Important operationally but structurally a single-edge node.' }
];

const EDGES = [
    { from: 'rma', to: 'mfgx' }, { from: 'rma', to: 'mfgy' },
    { from: 'rmb', to: 'mfgx' },
    { from: 'mfgx', to: 'dist' }, { from: 'mfgy', to: 'dist' },
    { from: 'dist', to: 'pl1' }, { from: 'dist', to: 'pl2' },
    { from: 'log', to: 'dist' }
];

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network, nodesDS;
let showScores = false;
let highlightCritical = false;

function init() {
    nodesDS = new vis.DataSet(NODES.map(n => makeNode(n)));
    const edgesDS = new vis.DataSet(EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to,
        color: { color: '#90a4ae', highlight: '#e76f51' },
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        width: 1.8, smooth: { type: 'continuous' }
    })));
    const allowMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: {
            enabled: true, solver: 'barnesHut',
            stabilization: { enabled: true, iterations: 200, fit: true },
            barnesHut: { gravitationalConstant: -2500, centralGravity: 0.4,
                springLength: 100, springConstant: 0.05, avoidOverlap: 0.5 }
        },
        interaction: { hover: true, selectConnectedEdges: false, dragNodes: true,
            zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } }
    };
    network = new vis.Network(document.getElementById('network'),
        { nodes: nodesDS, edges: edgesDS }, options);
    network.on('stabilizationIterationsDone', () => {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: { duration: 400 }, padding: 50 });
    });
    network.on('selectNode', (p) => { if (p.nodes.length) showNode(p.nodes[0]); });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length) reset();
    });
    document.getElementById('scores-btn').addEventListener('click', () => {
        showScores = !showScores;
        document.getElementById('scores-btn').textContent = showScores ? 'Hide Scores' : 'Show Scores';
        refreshLabels();
    });
    document.getElementById('critical-btn').addEventListener('click', () => {
        highlightCritical = !highlightCritical;
        refreshLabels();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 50 });
    });
}

function makeNode(n) {
    const size = 16 + n.pr * 100;  // scale: 0.03 → ~19, 0.28 → ~44
    const isCritical = highlightCritical && n.pr > 0.15;
    return {
        id: n.id,
        label: showScores ? n.label + '\n(PR: ' + n.pr.toFixed(2) + ')' : n.label,
        shape: n.shape || 'dot',
        size: size,
        color: { background: lighten(isCritical ? '#c62828' : n.color),
                 border: isCritical ? '#c62828' : n.color,
                 highlight: { background: n.color, border: '#000' } },
        font: { size: 12, color: '#212121', face: 'Arial', multi: 'md' },
        borderWidth: isCritical ? 3 : 2
    };
}

function lighten(hex) {
    const r = parseInt(hex.substr(1,2),16);
    const g = parseInt(hex.substr(3,2),16);
    const b = parseInt(hex.substr(5,2),16);
    const mix = c => Math.round(c + (255 - c) * 0.55);
    return 'rgb(' + mix(r) + ',' + mix(g) + ',' + mix(b) + ')';
}

function refreshLabels() {
    for (const n of NODES) nodesDS.update(makeNode(n));
}

function showNode(id) {
    const n = NODES.find(x => x.id === id);
    if (!n) return;
    const risk = n.pr > 0.20 ? 'High-PageRank nodes are supply-chain risk concentrators: redundancy and incident playbooks should target them first.' :
                  n.pr > 0.10 ? 'Mid-tier influence: worth monitoring, but a failure here is recoverable via parallel paths.' :
                  'Low structural influence; failure here disrupts only a small downstream area.';
    document.getElementById('db').innerHTML =
        '<strong>' + n.label + '</strong> &nbsp;PR: ' + n.pr.toFixed(2) + '<br><br>' +
        n.desc + '<br><br><em>Risk:</em> ' + risk;
}

function reset() {
    document.getElementById('db').innerHTML =
        'Click any node to see its PageRank score and supply-chain interpretation.';
}

document.addEventListener('DOMContentLoaded', init);
