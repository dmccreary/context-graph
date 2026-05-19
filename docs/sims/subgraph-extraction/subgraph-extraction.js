// Subgraph Extraction — full graph (left) with highlighted subgraph
// CANVAS_HEIGHT: 600

// Highlighted nodes form the extracted subgraph
const NODES = [
    { id: 'cust', label: 'Customer:\nAcme Corp', x: -200, y: 0,   shape: 'ellipse', group: 'hi-cust' },
    { id: 'dt1',  label: 'DT-4482',              x: 0,    y: -130, shape: 'box',    group: 'hi-dt' },
    { id: 'dt2',  label: 'DT-3128',              x: 0,    y: 0,    shape: 'box',    group: 'hi-dt' },
    { id: 'dt3',  label: 'DT-2745',              x: 0,    y: 130,  shape: 'box',    group: 'hi-dt' },
    { id: 'a1',   label: 'J. Smith',             x: 200,  y: -200, shape: 'dot', size: 18, group: 'hi-actor' },
    { id: 'a2',   label: 'M. Williams',          x: 200,  y: -120, shape: 'dot', size: 18, group: 'hi-actor' },
    { id: 'p1',   label: 'Policy v3.2',          x: 200,  y: -40,  shape: 'box', group: 'hi-pol' },
    { id: 'pr1',  label: 'DT-3891',              x: 200,  y: 40,   shape: 'box', group: 'hi-prec' },
    { id: 'pr2',  label: 'DT-2204',              x: 200,  y: 120,  shape: 'box', group: 'hi-prec' },
    // Unrelated background nodes (gray)
    { id: 'u1',  label: 'Acme Order O-99',  x: -360, y: -80,  shape: 'dot', size: 14, group: 'bg' },
    { id: 'u2',  label: 'Contract C-44',    x: -360, y: 60,   shape: 'dot', size: 14, group: 'bg' },
    { id: 'u3',  label: 'Support Ticket',   x: -360, y: 180,  shape: 'dot', size: 14, group: 'bg' },
    { id: 'u4',  label: 'Marketing Event',  x: -260, y: 200,  shape: 'dot', size: 14, group: 'bg' },
    { id: 'u5',  label: 'GlobalTech',       x: -260, y: -190, shape: 'dot', size: 14, group: 'bg' },
    { id: 'u6',  label: 'Random Doc',       x: -300, y: -250, shape: 'dot', size: 12, group: 'bg' }
];

const EDGES = [
    // Highlighted
    { from: 'dt1', to: 'cust', label: 'APPLIES_TO', hi: true },
    { from: 'dt2', to: 'cust', label: 'APPLIES_TO', hi: true },
    { from: 'dt3', to: 'cust', label: 'APPLIES_TO', hi: true },
    { from: 'a1',  to: 'dt1',  label: 'DECIDED_BY', hi: true },
    { from: 'a2',  to: 'dt1',  label: 'APPROVED_BY', hi: true },
    { from: 'dt1', to: 'p1',   label: 'GOVERNED_BY', hi: true },
    { from: 'dt1', to: 'pr1',  label: 'CITES', hi: true },
    { from: 'dt1', to: 'pr2',  label: 'CITES', hi: true },
    // Background
    { from: 'u1', to: 'cust' }, { from: 'u2', to: 'cust' }, { from: 'u3', to: 'cust' },
    { from: 'u4', to: 'u5' }, { from: 'u5', to: 'cust' }, { from: 'u6', to: 'u5' }
];

const GROUP_COLORS = {
    'hi-cust':  { background: '#c5cae9', border: '#3949ab' },
    'hi-dt':    { background: '#fff3c4', border: '#e9c46a' },
    'hi-actor': { background: '#a7e5dc', border: '#00897b' },
    'hi-pol':   { background: '#cbd9ee', border: '#5b7fbd' },
    'hi-prec':  { background: '#d1c4e9', border: '#3949ab' },
    'bg':       { background: '#f5f5f5', border: '#bdbdbd' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        const isHi = n.group !== 'bg';
        return {
            id: n.id, label: n.label, shape: n.shape, size: n.size,
            x: n.x, y: n.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: isHi ? 10 : 8, color: isHi ? '#212121' : '#9e9e9e', face: 'Arial' },
            borderWidth: isHi ? 2 : 1,
            widthConstraint: 80, heightConstraint: 30,
            opacity: isHi ? 1 : 0.5
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.hi ? e.label : '',
        font: { size: 8, color: '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.hi ? '#1a237e' : '#cfd8dc', highlight: '#e76f51' },
        arrows: { to: { enabled: !!e.hi, scaleFactor: 0.5 } },
        width: e.hi ? 1.6 : 0.8, smooth: { type: 'continuous' }
    }));
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => { network.fit({ animation: false, padding: 30 }); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.fit({ animation: { duration: 300 }, padding: 30 });
    });
}
document.addEventListener('DOMContentLoaded', init);
