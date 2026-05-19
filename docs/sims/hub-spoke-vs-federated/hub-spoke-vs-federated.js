// Hub-and-Spoke vs. Federated Architecture — side-by-side network comparison
// CANVAS_HEIGHT: 580

const NODES = [
    // Left panel (hub-and-spoke) — x from -700 to -100
    { id: 'L-hub',   label: 'Knowledge\nGraph Hub', x: -350, y: 30,
      shape: 'ellipse', size: 50, group: 'hub' },
    { id: 'L-hr',    label: 'HR System',       x: -550, y: -160, shape: 'box', group: 'domain' },
    { id: 'L-fin',   label: 'Finance System',  x: -470, y: -250, shape: 'box', group: 'domain' },
    { id: 'L-crm',   label: 'CRM System',      x: -350, y: -270, shape: 'box', group: 'domain' },
    { id: 'L-erp',   label: 'ERP System',      x: -230, y: -250, shape: 'box', group: 'domain' },
    { id: 'L-prod',  label: 'Product Catalog', x: -150, y: -160, shape: 'box', group: 'domain' },
    { id: 'L-llm',   label: 'LLM Query',       x: -350, y: 230, shape: 'dot', size: 24, group: 'llm' },
    // Header
    { id: 'L-hdr',   label: 'Hub-and-Spoke',   x: -350, y: -340, shape: 'text',
      font: { size: 18, color: '#1a237e', face: 'Arial', bold: true } },

    // Right panel (federated) — x from 100 to 700
    { id: 'R-fed',   label: 'Federation\nLayer', x: 350, y: -160,
      shape: 'box', size: 50, group: 'fed' },
    { id: 'R-hr',    label: 'HR System',       x: 150, y: 30, shape: 'box', group: 'domain' },
    { id: 'R-fin',   label: 'Finance System',  x: 250, y: 80, shape: 'box', group: 'domain' },
    { id: 'R-crm',   label: 'CRM System',      x: 350, y: 100, shape: 'box', group: 'domain' },
    { id: 'R-erp',   label: 'ERP System',      x: 450, y: 80, shape: 'box', group: 'domain' },
    { id: 'R-prod',  label: 'Product Catalog', x: 550, y: 30, shape: 'box', group: 'domain' },
    { id: 'R-llm',   label: 'LLM Query',       x: 350, y: 230, shape: 'dot', size: 24, group: 'llm' },
    { id: 'R-hdr',   label: 'Federated',       x: 350, y: -340, shape: 'text',
      font: { size: 18, color: '#1a237e', face: 'Arial', bold: true } }
];

const EDGES = [
    // Hub-and-spoke: all domains -> hub
    { from: 'L-hr',   to: 'L-hub', label: 'ingests to' },
    { from: 'L-fin',  to: 'L-hub', label: 'ingests to' },
    { from: 'L-crm',  to: 'L-hub', label: 'ingests to' },
    { from: 'L-erp',  to: 'L-hub', label: 'ingests to' },
    { from: 'L-prod', to: 'L-hub', label: 'ingests to' },
    { from: 'L-llm',  to: 'L-hub', label: 'queries' },
    // Federated: federation -> each domain
    { from: 'R-fed', to: 'R-hr',   label: 'routes to' },
    { from: 'R-fed', to: 'R-fin',  label: 'routes to' },
    { from: 'R-fed', to: 'R-crm',  label: 'routes to' },
    { from: 'R-fed', to: 'R-erp',  label: 'routes to' },
    { from: 'R-fed', to: 'R-prod', label: 'routes to' },
    { from: 'R-llm', to: 'R-fed',  label: 'queries' }
];

const GROUP_COLORS = {
    hub:    { background: '#c5cae9', border: '#3949ab' },
    fed:    { background: '#c5cae9', border: '#3949ab' },
    domain: { background: '#b2dfdb', border: '#00897b' },
    llm:    { background: '#ffe0b2', border: '#f57c00' }
};

const DETAILS = {
    hub: '<strong>Hub Trade-offs.</strong><br><br><strong>Pro:</strong> single source of truth, easy governance, consistent schema, one place to harden.<br><br><strong>Con:</strong> ingestion bottleneck, hub schema must evolve carefully, single point of failure.',
    fed: '<strong>Federation Trade-offs.</strong><br><br><strong>Pro:</strong> domain autonomy, no central bottleneck, diverse stacks welcome, partial outages stay local.<br><br><strong>Con:</strong> complex cross-domain queries, heterogeneous schemas, partial failure handling, joins happen at query time.',
    domain: '<strong>Domain System.</strong><br><br>In hub-and-spoke, this system pushes data to the hub via an ETL pipeline — the hub owns the canonical copy.<br><br>In federation, this system exposes its own graph API and the federation layer routes queries to it directly — the source stays the source of truth.',
    llm: '<strong>LLM Query.</strong><br><br>In hub-and-spoke, the query always hits the same hub — predictable latency, uniform results.<br><br>In federated mode, the federation layer must determine which domain graphs to consult, dispatch sub-queries, and join the results — variable latency, fresher reads.'
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;

function init() {
    const nodes = NODES.map(n => {
        const palette = GROUP_COLORS[n.group] || { background: '#eceff1', border: '#90a4ae' };
        const base = {
            id: n.id, label: n.label, shape: n.shape || 'box',
            x: n.x, y: n.y, fixed: { x: true, y: true },
            font: n.font || { size: 12, color: '#212121', face: 'Arial' },
            borderWidth: 2
        };
        if (n.shape !== 'text') {
            base.color = { background: palette.background, border: palette.border,
                            highlight: { background: palette.border, border: '#000' } };
            if (n.size) base.size = n.size;
            if (n.shape === 'ellipse' || n.shape === 'box') {
                base.widthConstraint = 110;
                base.heightConstraint = 50;
            }
        }
        return base;
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 10, color: '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51', hover: '#e76f51' },
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: 1.5, smooth: { type: 'continuous' }
    }));
    const allowMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: { hover: true, selectConnectedEdges: false, dragNodes: false,
            zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } }
    };
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, options);
    network.once('afterDrawing', () => {
        network.fit({ animation: false, padding: 40 });
        // Pan camera right so diagram clears the right panel
        const pos = network.getViewPosition();
        const scale = network.getScale();
        // No pan — fit handles centering; narrow right panel keeps diagram visible.
    });
    network.on('selectNode', (p) => {
        if (p.nodes.length) showNode(p.nodes[0]);
    });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length) reset();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: false, padding: 40 });
        const pos = network.getViewPosition();
        const scale = network.getScale();
        network.moveTo({ position: { x: pos.x + 70 / scale, y: pos.y }, animation: { duration: 300 } });
    });
}

function showNode(id) {
    const n = NODES.find(x => x.id === id);
    if (!n) return;
    let key = n.group;
    if (key === 'hub' || key === 'fed') key = (id === 'L-hub') ? 'hub' : 'fed';
    document.getElementById('db').innerHTML = DETAILS[key] || 'Click a panel node to inspect.';
}

function reset() {
    document.getElementById('db').innerHTML = 'Click any node on either side to compare the architectural trade-offs.';
}

document.addEventListener('DOMContentLoaded', init);
