// Ingestion Pipeline Architecture — sources → pipeline → storage
// CANVAS_HEIGHT: 600

const NODES = [
    // Sources (left)
    { id: 'agent', label: 'AI Agents',          x: -400, y: -180, group: 'src', shape: 'ellipse',
      desc: '<strong>AI Agents</strong> emit decision events automatically when they take action. Real-time path; events flow through the event stream.' },
    { id: 'human', label: 'Human Capture UI',   x: -400, y: -70,  group: 'src', shape: 'ellipse',
      desc: '<strong>Human Capture UI</strong> lets users submit decisions with structured context. Real-time path.' },
    { id: 'ops',   label: 'Operational\nSystems (CDC)', x: -400, y: 50,  group: 'src', shape: 'ellipse',
      desc: '<strong>Operational systems</strong> emit change-data-capture events for state transitions. Real-time path.' },
    { id: 'arch',  label: 'Historical\nArchives',  x: -400, y: 170, group: 'src-bg', shape: 'ellipse',
      desc: '<strong>Historical archives</strong> feed the batch path for backfills and bulk loads.' },
    // Pipeline (center)
    { id: 'stream', label: 'Event Stream /\nMessage Queue', x: -100, y: -80, group: 'pipe-rt', shape: 'box',
      desc: '<strong>Message Queue</strong> provides durability and backpressure. Events persist until processed; if ingestion service is down, the queue absorbs the burst.' },
    { id: 'batch',  label: 'Batch ETL\nScheduler',        x: -100, y: 170, group: 'pipe-batch', shape: 'box',
      desc: '<strong>Batch ETL scheduler</strong> handles historical loads. Runs nightly or on demand. Decoupled from real-time path.' },
    { id: 'svc',    label: 'Ingestion\nService',          x: 130,  y: 40,  group: 'svc', shape: 'box',
      desc: '<strong>Ingestion Service</strong> validates schema, resolves canonical entity ids, generates embeddings, and atomically writes to graph + vector index. Target: <3s end-to-end latency.' },
    // Storage (right)
    { id: 'graph',  label: 'Graph DB',          x: 330, y: -60, group: 'store', shape: 'database',
      desc: '<strong>Graph Database</strong> stores decision nodes and edges with bitemporal versioning. Selection criteria: native LPG traversal, ACID writes, point-in-time queries.' },
    { id: 'vec',    label: 'Vector Index',      x: 330, y: 100, group: 'store-vec', shape: 'database',
      desc: '<strong>Vector Index</strong> stores trace embeddings for similarity search. Selection criteria: approximate nearest neighbor, sub-100ms queries at scale.' },
    { id: 'mon',    label: 'Ingestion\nMonitor',      x: 330, y: 240, group: 'mon', shape: 'box',
      desc: '<strong>Monitoring</strong> tracks queue depth (ingestion lag), write error rate, schema validation failure rate, and entity resolution failure rate. Alerts on threshold breach.' }
];

const EDGES = [
    { from: 'agent', to: 'stream', label: 'publishes events' },
    { from: 'human', to: 'stream', label: 'submits traces' },
    { from: 'ops',   to: 'stream', label: 'CDC events' },
    { from: 'arch',  to: 'batch',  label: 'scheduled exports' },
    { from: 'stream', to: 'svc',   label: 'real-time stream' },
    { from: 'batch',  to: 'svc',   label: 'batch loads' },
    { from: 'svc',  to: 'graph',   label: 'writes traces' },
    { from: 'svc',  to: 'vec',     label: 'writes embeddings' },
    { from: 'mon',  to: 'graph',   label: 'monitors', dashed: true },
    { from: 'mon',  to: 'vec',     label: 'monitors', dashed: true }
];

const GROUP_COLORS = {
    src:        { background: '#ffd3c3', border: '#e76f51' },
    'src-bg':   { background: '#cfd8dc', border: '#666' },
    'pipe-rt':  { background: '#fff3c4', border: '#e9c46a' },
    'pipe-batch':{ background: '#cfd8dc', border: '#666' },
    svc:        { background: '#c5cae9', border: '#3949ab' },
    store:      { background: '#a7e5dc', border: '#00897b' },
    'store-vec':{ background: '#cbd9ee', border: '#5b7fbd' },
    mon:        { background: '#ffcdd2', border: '#c62828' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }
let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        return {
            id: n.id, label: n.label, shape: n.shape,
            x: n.x, y: n.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 10, color: '#212121', face: 'Arial' },
            borderWidth: n.id === 'svc' ? 3 : 2,
            widthConstraint: 110, heightConstraint: 50
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: '#546e7a', strokeWidth: 3, strokeColor: '#f8f8f8', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51' },
        dashes: !!e.dashed,
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: 1.5, smooth: { type: 'continuous' }
    }));
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => { network.fit({ animation: false, padding: 40 }); });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const n = NODES.find(x => x.id === p.nodes[0]);
            if (n) document.getElementById('db').innerHTML = n.desc;
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length) reset(); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 40 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click any node to see its role and capacity targets.'; }
document.addEventListener('DOMContentLoaded', init);
