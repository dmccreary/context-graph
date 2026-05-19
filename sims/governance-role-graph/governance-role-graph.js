// Governance Role Graph — 7-node accountability chain
// CANVAS_HEIGHT: 540

const NODES = [
    { id: 'dataset', label: 'Revenue Dataset',
      shape: 'ellipse', color: { background: '#c5cae9', border: '#4B4EFC' }, size: 44,
      desc: 'This is the dataset node in the context graph. It carries technical, business, and operational metadata. Click other nodes to see their relationship to this data.' },
    { id: 'steward', label: 'Steward: Maya Chen',
      shape: 'dot', color: { background: '#a7e5dc', border: '#2A9D8F' }, size: 24,
      desc: '<strong>Data Steward</strong> — Maya does the day-to-day quality work: reviewing field definitions, investigating quality alerts, resolving cross-system conflicts. When an LLM flags a suspicious value, the context graph routes the alert here first.' },
    { id: 'owner', label: 'Owner: VP Revenue Ops',
      shape: 'dot', color: { background: '#f6e0a8', border: '#E9C46A' }, size: 24,
      desc: '<strong>Data Owner</strong> — sets policy for what this dataset means and approves definition changes. Escalation path: if Maya cannot resolve a quality problem with the producer, it goes here.' },
    { id: 'producer', label: 'Producer: ERP System',
      shape: 'dot', color: { background: '#cbd9ee', border: '#5B7FBD' }, size: 24,
      desc: '<strong>Data Producer</strong> — the upstream system that generates records. When quality drops, the steward investigates here. The ERP system\'s pipeline metadata is tracked in the context graph.' },
    { id: 'llm', label: 'Consumer: Finance LLM',
      shape: 'dot', color: { background: '#ffd3c3', border: '#E76F51' }, size: 22,
      desc: '<strong>LLM Consumer</strong> — reads revenue data from the context graph for automated analysis. The consumer\'s access rights are controlled by the access control policy attached to this dataset node.' },
    { id: 'dash', label: 'Consumer: Reporting Dashboard',
      shape: 'dot', color: { background: '#ffd3c3', border: '#E76F51' }, size: 22,
      desc: '<strong>Dashboard Consumer</strong> — reads aggregated revenue figures for executive reporting. Receives notifications when the dataset\'s freshness drops or when reconciliation flags appear.' },
    { id: 'board', label: 'Governance Board',
      shape: 'box', color: { background: '#cfd8dc', border: '#666' }, size: 22,
      desc: '<strong>Data Governance Board</strong> — sets enterprise-wide data policy. The owner escalates unresolvable conflicts here. Board decisions are recorded as decision traces in the context graph.' }
];

const EDGES = [
    { from: 'steward', to: 'dataset', label: 'maintains' },
    { from: 'owner', to: 'dataset', label: 'accountable for' },
    { from: 'producer', to: 'dataset', label: 'generates' },
    { from: 'dataset', to: 'llm', label: 'consumed by' },
    { from: 'dataset', to: 'dash', label: 'consumed by' },
    { from: 'owner', to: 'board', label: 'reports to' }
];

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;

function init() {
    const nodes = NODES.map(n => ({
        id: n.id, label: n.label, shape: n.shape, size: n.size,
        color: { background: n.color.background, border: n.color.border,
                 highlight: { background: n.color.border, border: '#000' } },
        font: { size: 12, color: '#212121', face: 'Arial' },
        borderWidth: 2
    }));
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 10, color: '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51', hover: '#e76f51' },
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        width: 1.5, smooth: { type: 'continuous' }
    }));
    const allowMouse = !isInIframe();
    const options = {
        layout: {
            hierarchical: { enabled: true, direction: 'UD', sortMethod: 'directed',
                nodeSpacing: 160, levelSeparation: 110 }
        },
        physics: { enabled: false },
        interaction: { hover: true, selectConnectedEdges: false, dragNodes: true,
            zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } }
    };
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, options);
    network.once('afterDrawing', () => {
        network.fit({ animation: { duration: 400 }, padding: 40 });
    });
    network.on('selectNode', (p) => { if (p.nodes.length) showNode(p.nodes[0]); });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length) reset();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 40 });
    });
}

function showNode(id) {
    const n = NODES.find(x => x.id === id);
    if (!n) return;
    document.getElementById('db').innerHTML = '<div style="font-weight:bold;font-size:13px;margin-bottom:6px;color:#1a237e;">'
        + esc(n.label) + '</div>' + n.desc;
}

function reset() {
    document.getElementById('db').innerHTML = 'Click any node to learn its role in the governance chain.';
}

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

document.addEventListener('DOMContentLoaded', init);
