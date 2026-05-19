// Context Graph Schema — decision-centric node + edge types
// CANVAS_HEIGHT: 600

const NODES = [
    { id: 'dec',    label: 'Decision:\nPrice Exception Q4-2025', x: -130, y: 0, shape: 'ellipse', group: 'dec',
      desc: '<strong>Decision Node</strong> — the core schema element. Properties: decision_id (UID), decision_type (pricing_exception), timestamp (2025-10-31T14:22Z), actor_id (EMP-J-SMITH), status (active), context_summary ("15% discount for Acme renewal").' },
    { id: 'cust',   label: 'Customer:\nAcme Corp',     x: -350, y: 0,   shape: 'ellipse', group: 'cust',
      desc: '<strong>Entity Link (APPLIES_TO)</strong> — connects a Decision node to the business entity it concerns. This entity lives in the enterprise knowledge graph. The link makes the decision discoverable through any query starting from this customer.' },
    { id: 'appr',   label: 'Approver:\nM. Williams (VP Sales)', x: -130, y: -160, shape: 'dot', size: 28, group: 'appr',
      desc: '<strong>Approval Edge (APPROVED)</strong> — records the authorization. Properties: approval_timestamp, approval_channel ("CRM workflow"), conditions ("no recurrence within 12 months"). Out-of-band approvals (verbal, email) can be recorded as edge-typed annotations.' },
    { id: 'pol',    label: 'Policy:\nPricing Policy v3.2', x: -350, y: 160, shape: 'box', group: 'pol',
      desc: '<strong>Policy Reference Edge (GOVERNED_BY)</strong> — links to the <em>specific version</em> of the policy in force at decision time. Critical for historical query accuracy: v3.2, not the current v4.1.' },
    { id: 'pre1',   label: 'Precedent:\nQ2-2024',       x: 100,  y: -90, shape: 'ellipse', group: 'pre',
      desc: '<strong>Precedent Link (CITES)</strong> — records which earlier decisions were consulted. High in-degree decisions (cited by many) are the most influential organizational precedents and are retrieved first in LLM context assembly.' },
    { id: 'pre2',   label: 'Precedent:\nQ4-2023',       x: 100,  y: 90,  shape: 'ellipse', group: 'pre',
      desc: '<strong>Precedent Link (CITES)</strong> — a second precedent cited. Following CITES edges back through time reveals the chain of reasoning the organization has built.' }
];

const EDGES = [
    { from: 'dec',  to: 'cust', label: 'APPLIES_TO', color: '#37474f' },
    { from: 'appr', to: 'dec',  label: 'APPROVED', color: '#e9c46a', width: 2.5 },
    { from: 'dec',  to: 'pol',  label: 'GOVERNED_BY', color: '#5b7fbd' },
    { from: 'dec',  to: 'pre1', label: 'CITES', color: '#f57c00', dashed: true },
    { from: 'dec',  to: 'pre2', label: 'CITES', color: '#f57c00', dashed: true }
];

const GROUP_COLORS = {
    dec:  { background: '#c5cae9', border: '#3949ab' },
    cust: { background: '#a7e5dc', border: '#00897b' },
    appr: { background: '#fff3c4', border: '#e9c46a' },
    pol:  { background: '#cbd9ee', border: '#5b7fbd' },
    pre:  { background: '#c5cae9', border: '#3949ab' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        return {
            id: n.id, label: n.label, shape: n.shape, size: n.size,
            x: n.x, y: n.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 11, color: '#212121', face: 'Arial' },
            borderWidth: n.id === 'dec' ? 3 : 2,
            widthConstraint: 130, heightConstraint: 50
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: e.color, strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.color, highlight: '#000' },
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        dashes: !!e.dashed, width: e.width || 1.5, smooth: { type: 'continuous' }
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
function reset() { document.getElementById('db').innerHTML = 'Click any node or edge to see its schema role and properties.'; }
document.addEventListener('DOMContentLoaded', init);
