// Event Sourcing Architecture — 7-node L→R flow
// CANVAS_HEIGHT: 600

const NODES = [
    { id: 'event',  label: 'Business\nEvent',          x: -360, y: -40, shape: 'ellipse', group: 'event',
      desc: '<strong>Business Event</strong> — the real-world action, e.g. <em>"Invoice INV-4482 approved by J. Smith at 14:22 UTC."</em> Everything starts here.' },
    { id: 'cmd',    label: 'Command\nHandler',         x: -220, y: -40, shape: 'box', group: 'svc',
      desc: '<strong>Command Handler</strong> — validates the request and converts it into an immutable event. No business logic lives downstream.' },
    { id: 'log',    label: 'Append-Only\nEvent Log',   x: -80,  y: -40, shape: 'box', group: 'log',
      desc: '<strong>Append-Only Log</strong> — stores events immutably. You can replay from any point. Nothing is deleted. This is your tamper-evident audit trail.' },
    { id: 'cdc',    label: 'CDC /\nStream Processor',  x: 60,   y: -40, shape: 'box', group: 'svc',
      desc: '<strong>CDC / Stream Processor</strong> — converts raw events into graph-ready nodes and edges. Handles entity resolution, schema mapping, and temporal versioning.' },
    { id: 'cg',     label: 'Context\nGraph',           x: 220,  y: -40, shape: 'ellipse', group: 'event',
      desc: '<strong>Context Graph</strong> — the read model. Contains the full history of decisions, lineage, and provenance as a queryable graph.' },
    { id: 'llm',    label: 'LLM\nRetrieval API',       x: 360,  y: -120, shape: 'box', group: 'llm',
      desc: '<strong>LLM Retrieval API</strong> — LLM agents query here for grounded context before generating responses.' },
    { id: 'audit',  label: 'Compliance\nAudit Query',  x: 360,  y: 40,  shape: 'box', group: 'audit',
      desc: '<strong>Compliance Audit Query</strong> — answers <em>"what did the system know and do on date X?"</em> using temporal versioning on graph nodes.' }
];

const EDGES = [
    { from: 'event', to: 'cmd', label: 'triggers' },
    { from: 'cmd',   to: 'log', label: 'writes (immutable)' },
    { from: 'log',   to: 'cdc', label: 'streams' },
    { from: 'cdc',   to: 'cg',  label: 'ingests' },
    { from: 'cg',    to: 'llm', label: 'serves grounded context' },
    { from: 'cg',    to: 'audit', label: 'answers temporal queries' }
];

const GROUP_COLORS = {
    event: { background: '#c5cae9', border: '#3949ab' },
    svc:   { background: '#a7e5dc', border: '#00897b' },
    log:   { background: '#fff3c4', border: '#e9c46a' },
    llm:   { background: '#ffd3c3', border: '#e76f51' },
    audit: { background: '#cfd8dc', border: '#666' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        return {
            id: n.id, label: n.label, shape: n.shape, x: n.x, y: n.y,
            fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 11, color: '#212121', face: 'Arial' },
            borderWidth: 2, widthConstraint: 110, heightConstraint: 50
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: '#546e7a', strokeWidth: 3, strokeColor: '#f8f8f8', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51' },
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: 1.5, smooth: { type: 'continuous' }
    }));
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => {
        network.fit({ animation: false, padding: 30 });
        const pos = network.getViewPosition(); const scale = network.getScale();
        network.moveTo({ position: { x: pos.x + 50 / scale, y: pos.y }, animation: false });
    });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const n = NODES.find(x => x.id === p.nodes[0]);
            if (n) document.getElementById('db').innerHTML = n.desc;
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length) reset(); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 30 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click any node to see its role and the type of question it answers.'; }
document.addEventListener('DOMContentLoaded', init);
