// Lineage vs. Provenance — clickable pipeline with two layered edge types
// CANVAS_HEIGHT: 560

const NODES = [
    { id: 'src',  label: 'Bank Transactions\nDB',  x: -300, y: -40, shape: 'box', group: 'src' },
    { id: 'etl',  label: 'ETL Pipeline v2.3',      x: -100, y: -40, shape: 'diamond', size: 30, group: 'etl' },
    { id: 'sum',  label: 'Revenue Summary\nTable', x: 100,  y: -40, shape: 'box', group: 'sum' },
    { id: 'dash', label: 'Finance\nDashboard',     x: 300,  y: -40, shape: 'ellipse', group: 'dash' },
    { id: 'p1',   label: 'Provenance:\nHigh Confidence',  x: -300, y: 100, shape: 'triangle', size: 20, group: 'p-green' },
    { id: 'p2',   label: 'Provenance:\nManual Correction',x: -100, y: 100, shape: 'triangle', size: 20, group: 'p-orange' },
    { id: 'p3',   label: 'Provenance:\nNot Reconciled',   x: 100,  y: 100, shape: 'triangle', size: 20, group: 'p-red' }
];

const DESCS = {
    src:  '<strong>Source: Bank Transactions DB</strong> — the upstream system providing raw values. Lineage tells you the dashboard depends on this; provenance tells you it is high-confidence.',
    etl:  '<strong>ETL Pipeline v2.3</strong> — the transformation step. Lineage tells you it reads from Bank Transactions and writes to Revenue Summary. Provenance flags it as carrying a manual correction.',
    sum:  '<strong>Revenue Summary Table</strong> — derived data. Lineage points to ETL as its writer. Provenance flags it as not-yet-reconciled — values may not balance against ledger.',
    dash: '<strong>Finance Dashboard</strong> — final consumer. Lineage reaches all the way back to Bank Transactions. The final value carries the union of upstream provenance — it should be treated with caution.',
    'p-green':  '<strong>Provenance annotation</strong>: high confidence — the source system has tier-1 reliability for this field.',
    'p-orange': '<strong>Provenance annotation</strong>: manual correction applied — a steward modified a value in this stage. Important to know during audits.',
    'p-red':    '<strong>Provenance annotation</strong>: not reconciled — this table has not been balanced against the canonical ledger; values may drift.'
};

const GROUP_COLORS = {
    src:  { background: '#a7e5dc', border: '#00897b' },
    etl:  { background: '#cbd9ee', border: '#5b7fbd' },
    sum:  { background: '#fff3c4', border: '#e9c46a' },
    dash: { background: '#c5cae9', border: '#3949ab' },
    'p-green':  { background: '#c8e6c9', border: '#2e7d32' },
    'p-orange': { background: '#ffe0b2', border: '#f57c00' },
    'p-red':    { background: '#ffcdd2', border: '#c62828' }
};

const LINEAGE_EDGES = [
    { from: 'src', to: 'etl', label: 'reads' },
    { from: 'etl', to: 'sum', label: 'writes' },
    { from: 'sum', to: 'dash', label: 'feeds' }
];

const PROV_EDGES = [
    { from: 'p1', to: 'src', label: 'annotates' },
    { from: 'p2', to: 'etl', label: 'annotates' },
    { from: 'p3', to: 'sum', label: 'annotates' }
];

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network, edgesDS;
let showLineage = true, showProv = true;

function buildEdges() {
    const out = [];
    if (showLineage) {
        LINEAGE_EDGES.forEach((e, i) => out.push({
            id: 'L' + i, from: e.from, to: e.to, label: e.label,
            font: { size: 10, color: '#1a237e', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
            color: { color: '#3949ab', highlight: '#e76f51' },
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            width: 2.5, smooth: false
        }));
    }
    if (showProv) {
        PROV_EDGES.forEach((e, i) => out.push({
            id: 'P' + i, from: e.from, to: e.to, label: e.label,
            font: { size: 10, color: '#e76f51', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
            color: { color: '#e76f51', highlight: '#bf360c' },
            arrows: { to: { enabled: true, scaleFactor: 0.6 } },
            dashes: true, width: 1.5, smooth: false
        }));
    }
    return out;
}

function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        return {
            id: n.id, label: n.label, shape: n.shape, x: n.x, y: n.y, size: n.size,
            fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 10, color: '#212121', face: 'Arial' },
            borderWidth: 2, widthConstraint: 110, heightConstraint: 36
        };
    });
    edgesDS = new vis.DataSet(buildEdges());
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: edgesDS },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => { network.fit({ animation: false, padding: 30 }); });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const n = NODES.find(x => x.id === p.nodes[0]);
            if (n) document.getElementById('db').innerHTML = DESCS[n.group] || '';
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length) reset(); });
    document.getElementById('lineage-btn').addEventListener('click', () => {
        showLineage = !showLineage;
        document.getElementById('lineage-btn').textContent = showLineage ? 'Hide Lineage' : 'Show Lineage';
        edgesDS.clear(); edgesDS.add(buildEdges());
    });
    document.getElementById('prov-btn').addEventListener('click', () => {
        showProv = !showProv;
        document.getElementById('prov-btn').textContent = showProv ? 'Hide Provenance' : 'Show Provenance';
        edgesDS.clear(); edgesDS.add(buildEdges());
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 30 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click a node or toggle a layer to compare lineage and provenance.'; }
document.addEventListener('DOMContentLoaded', init);
