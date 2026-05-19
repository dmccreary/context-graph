// Three Metadata Layers — radial layout, center + 3 outer nodes
// CANVAS_HEIGHT: 540

const NODES = [
    { id: 'center', label: 'Customer Table', shape: 'ellipse', size: 40,
      color: { background: '#c5cae9', border: '#4B4EFC' },
      x: 0, y: 0, fixed: true,
      desc: 'A single database table can have all three metadata types attached simultaneously. A context graph node for this table stores all three, enabling an LLM to answer: <em>What is this data, what does it mean, and can I trust it right now?</em>' },
    { id: 'tech', label: 'Technical\nMetadata', shape: 'box', size: 28,
      color: { background: '#cbd9ee', border: '#5B7FBD' },
      x: -180, y: -120, fixed: true,
      desc: '<strong>Technical Metadata</strong> answers: <em>How is this data stored?</em><br><br>Examples: field type (VARCHAR 36), nullable (false), primary key (yes), schema version (v4.2). Generated automatically by schema crawlers.' },
    { id: 'biz', label: 'Business\nMetadata', shape: 'box', size: 28,
      color: { background: '#a7e5dc', border: '#2A9D8F' },
      x: 180, y: -120, fixed: true,
      desc: '<strong>Business Metadata</strong> answers: <em>What does this data mean?</em><br><br>Examples: "Globally unique customer identifier assigned at onboarding", owner: Revenue Operations, permissible values: UUID v4 format only, PII classification: indirect identifier.' },
    { id: 'ops', label: 'Operational\nMetadata', shape: 'box', size: 28,
      color: { background: '#ffd3c3', border: '#E76F51' },
      x: 0, y: 140, fixed: true,
      desc: '<strong>Operational Metadata</strong> answers: <em>How fresh and active is this data?</em><br><br>Examples: last updated 2 hours ago, read by 14 downstream jobs in the last 7 days, pipeline error rate: 0.003%.' }
];

const EDGES = [
    { from: 'center', to: 'tech', label: 'structure', color: '#5B7FBD' },
    { from: 'center', to: 'biz', label: 'meaning', color: '#2A9D8F' },
    { from: 'center', to: 'ops', label: 'state', color: '#E76F51' }
];

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;

function init() {
    const nodes = NODES.map(n => ({
        id: n.id, label: n.label, shape: n.shape,
        color: { background: n.color.background, border: n.color.border,
                 highlight: { background: n.color.border, border: '#000' } },
        font: { size: 12, color: '#212121', face: 'Arial', multi: 'md' },
        borderWidth: 2.5, x: n.x, y: n.y, fixed: { x: true, y: true },
        widthConstraint: 100, heightConstraint: 50
    }));
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 12, color: e.color, strokeWidth: 4, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.color, highlight: e.color, hover: e.color },
        arrows: { to: { enabled: false } },
        width: 2.5, smooth: { type: 'continuous' }
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
        network.fit({ animation: false, padding: 60 });
        // Pan camera right so diagram appears on left, clearing the right-side panel.
        const pos = network.getViewPosition();
        const scale = network.getScale();
        network.moveTo({ position: { x: pos.x + 80 / scale, y: pos.y }, animation: false });
    });
    network.on('selectNode', (p) => { if (p.nodes.length) showNode(p.nodes[0]); });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length) reset();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: false, padding: 60 });
        const pos = network.getViewPosition();
        const scale = network.getScale();
        network.moveTo({ position: { x: pos.x + 130 / scale, y: pos.y }, animation: { duration: 300 } });
    });
}

function showNode(id) {
    const n = NODES.find(x => x.id === id);
    if (!n) return;
    document.getElementById('db').innerHTML = n.desc;
}

function reset() {
    document.getElementById('db').innerHTML =
        'Click any node to see what questions that metadata layer answers and concrete examples.';
}

document.addEventListener('DOMContentLoaded', init);
