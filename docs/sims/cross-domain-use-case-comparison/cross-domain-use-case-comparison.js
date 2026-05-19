// Cross-Domain Use Case Comparison — 5 domain mini-graphs sharing one schema
// CANVAS_HEIGHT: 600

const DOMAINS = [
    { name: 'Finance',     dec: 'Revenue Exception', ent: 'Invoice',          actor: 'Controller',         pol: 'GAAP ASC 606 v2024',     ox: -360, oy: -160 },
    { name: 'Sales',       dec: 'Pricing Concession', ent: 'Opportunity',     actor: 'VP Sales',            pol: 'Pricing Policy v3.2',    ox: 0,    oy: -160 },
    { name: 'Engineering', dec: 'Rollback to v4.1',   ent: 'Auth Service',    actor: 'On-Call Engineer',    pol: 'Change Mgmt Policy',     ox: 360,  oy: -160 },
    { name: 'Legal',       dec: 'Exception Approval', ent: 'Contract Clause', actor: 'Legal Counsel',       pol: 'Standard Terms v8',      ox: -180, oy: 140 },
    { name: 'Healthcare',  dec: 'Treatment Change',   ent: 'Patient Encounter', actor: 'Attending Physician', pol: 'Clinical Guideline v2025.3', ox: 180,  oy: 140 }
];

const DESCS = {
    dec: '<strong>Decision Trace Node.</strong> Shared properties: trace_id, decision_type, timestamp, status, context_summary. Domain-specific: optional decision_subtype, severity, etc.',
    ent: '<strong>Entity Link (APPLIES_TO).</strong> Same edge type across all domains. The entity is defined differently per domain but referenced via the same canonical-id convention.',
    actor:'<strong>Actor (DECIDED_BY).</strong> Same edge type across all domains. The actor identity comes from the org\'s identity provider; the actor\'s role label is domain-specific.',
    pol: '<strong>Policy Version (GOVERNED_BY).</strong> Same edge type. Critically, the policy is referenced by <em>specific version</em>, not by current version — auditors need to know what rule was in force when the decision was made.'
};

const NODES = [];
const EDGES = [];
DOMAINS.forEach((d, i) => {
    const decId = 'd' + i, eId = 'e' + i, aId = 'a' + i, pId = 'p' + i;
    NODES.push({ id: decId, label: d.name + '\n— ' + d.dec, x: d.ox, y: d.oy, group: 'dec', desckey: 'dec' });
    NODES.push({ id: eId, label: d.ent,   x: d.ox - 110, y: d.oy + 60, group: 'ent', desckey: 'ent' });
    NODES.push({ id: aId, label: d.actor, x: d.ox + 110, y: d.oy + 60, group: 'actor', desckey: 'actor' });
    NODES.push({ id: pId, label: d.pol,   x: d.ox,       y: d.oy + 130, group: 'pol', desckey: 'pol' });
    EDGES.push({ from: decId, to: eId, label: 'APPLIES_TO' });
    EDGES.push({ from: aId,   to: decId, label: 'DECIDED_BY' });
    EDGES.push({ from: decId, to: pId, label: 'GOVERNED_BY' });
});

const GROUP_COLORS = {
    dec:   { background: '#c5cae9', border: '#3949ab' },
    ent:   { background: '#a7e5dc', border: '#00897b' },
    actor: { background: '#fff3c4', border: '#e9c46a' },
    pol:   { background: '#cbd9ee', border: '#5b7fbd' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }
let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        return {
            id: n.id, label: n.label, shape: n.group === 'dec' ? 'ellipse' : 'box',
            x: n.x, y: n.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 9, color: '#212121', face: 'Arial' },
            borderWidth: 2, widthConstraint: 100, heightConstraint: 36
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'eg' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 8, color: '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51' },
        arrows: { to: { enabled: true, scaleFactor: 0.6 } },
        width: 1.2, smooth: false
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
            if (n && DESCS[n.desckey]) document.getElementById('db').innerHTML = DESCS[n.desckey];
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length) reset(); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 40 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click any node. <em>Edge types are the same across all five domains: DECIDED_BY, APPLIES_TO, GOVERNED_BY, CITES.</em>'; }
document.addEventListener('DOMContentLoaded', init);
