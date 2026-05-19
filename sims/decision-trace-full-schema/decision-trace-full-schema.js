// Decision Trace Full Schema — fully populated decision trace with all schema element types
// CANVAS_HEIGHT: 660

const NODES = [
    { id: 'dec',  label: 'Decision:\nDT-4482\nPricing Exception', x: 0,   y: 0,  shape: 'ellipse', group: 'dec',
      desc: '<strong>Decision Node</strong><br>Properties: decision_id (DT-4482), decision_type (pricing_exception), timestamp (2025-10-31T14:22Z), actor_id (EMP-J-SMITH), approver_id (EMP-M-WILLIAMS), status (active), context_summary, confidence (0.92), retracted (false).' },
    { id: 'init', label: 'Initiator:\nJ. Smith\n(Account Mgr)',   x: -260, y: 80, shape: 'dot', size: 24, group: 'actor',
      desc: '<strong>Initiator (DECIDED_BY edge).</strong> Properties on the edge: timestamp, channel (CRM). Distinct from Approver — the initiator proposes; the approver authorizes.' },
    { id: 'appr', label: 'Approver:\nM. Williams\n(VP Sales)',   x: -260, y: -100, shape: 'dot', size: 26, group: 'approver',
      desc: '<strong>Approver (APPROVED_BY edge).</strong> Properties on the edge: timestamp, channel ("verbal in steering committee + recorded in minute"), conditions ("no recurrence within 12 months"). Out-of-band approvals are recorded by recording channel.' },
    { id: 'cust', label: 'Customer:\nAcme Corp',                  x: 260,  y: 0,  shape: 'ellipse', group: 'cust',
      desc: '<strong>Customer (APPLIES_TO edge).</strong> This node lives in the enterprise knowledge graph. The APPLIES_TO edge makes the decision discoverable from the customer entity without duplicating customer data in the decision trace.' },
    { id: 'pol',  label: 'Policy:\nPricing Policy v3.2',          x: -150, y: 200, shape: 'box', group: 'pol',
      desc: '<strong>Policy Version (GOVERNED_BY edge).</strong> Points to the <em>specific version</em> of the policy in force at decision time. Critical for historical accuracy: v3.2, not the current v4.1.' },
    { id: 'p1',   label: 'Precedent:\nDT-3891\n(Q2-2024)',        x: 200,  y: 200, shape: 'ellipse', group: 'prec',
      desc: '<strong>Precedent (CITES edge).</strong> Properties on the edge: similarity_score (0.87), find_method (system_recommendation), favorability (positive — outcome later confirmed favorable).' },
    { id: 'p2',   label: 'Precedent:\nDT-2204\n(Q4-2023)',        x: 320,  y: 200, shape: 'ellipse', group: 'prec',
      desc: '<strong>Precedent (CITES edge).</strong> Second precedent cited. In-degree across the precedent graph identifies foundational decisions worth retrieving first.' },
    { id: 'src1', label: 'Source:\nCRM Revenue Data',             x: 200,  y: -200, shape: 'diamond', size: 24, group: 'src',
      desc: '<strong>Source Data (CONSULTED edge).</strong> Properties: value_at_decision_time (2.1M USD), quality_score_at_decision_time (0.95), source_freshness_at_decision_time (4h). Frozen as of decision moment for reproducibility.' },
    { id: 'src2', label: 'Source:\nBilling Payment History',      x: 320,  y: -200, shape: 'diamond', size: 24, group: 'src',
      desc: '<strong>Source Data (CONSULTED edge).</strong> Same pattern: the values consulted are pinned at decision time so the audit answers what the system actually knew, not what is true now.' }
];

const EDGES = [
    { from: 'init', to: 'dec', label: 'DECIDED_BY', color: '#666' },
    { from: 'appr', to: 'dec', label: 'APPROVED_BY', color: '#e9c46a', width: 2.5 },
    { from: 'dec',  to: 'cust', label: 'APPLIES_TO', color: '#00897b' },
    { from: 'dec',  to: 'pol',  label: 'GOVERNED_BY', color: '#5b7fbd' },
    { from: 'dec',  to: 'p1',   label: 'CITES', color: '#f57c00', dashed: true },
    { from: 'dec',  to: 'p2',   label: 'CITES', color: '#f57c00', dashed: true },
    { from: 'dec',  to: 'src1', label: 'CONSULTED', color: '#e76f51' },
    { from: 'dec',  to: 'src2', label: 'CONSULTED', color: '#e76f51' }
];

const GROUP_COLORS = {
    dec:      { background: '#c5cae9', border: '#3949ab' },
    actor:    { background: '#fff3c4', border: '#e9c46a' },
    approver: { background: '#ffd57a', border: '#e9c46a' },
    cust:     { background: '#a7e5dc', border: '#00897b' },
    pol:      { background: '#cbd9ee', border: '#5b7fbd' },
    prec:     { background: '#d1c4e9', border: '#3949ab' },
    src:      { background: '#ffd3c3', border: '#e76f51' }
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
            font: { size: 10, color: '#212121', face: 'Arial' },
            borderWidth: n.id === 'dec' ? 3 : 2,
            widthConstraint: 120, heightConstraint: 50
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: e.color, strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.color, highlight: '#000' },
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        dashes: !!e.dashed, width: e.width || 1.6, smooth: { type: 'continuous' }
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
function reset() { document.getElementById('db').innerHTML = 'Click any node or edge to see its property list and role.'; }
document.addEventListener('DOMContentLoaded', init);
