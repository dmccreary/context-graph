// Engineering Incident Context Graph — full instantiated example
// CANVAS_HEIGHT: 580

const NODES = [
    { id: 'alert',  label: 'Alert:\nHighErrorRate-Auth', x: -300, y: -180, shape: 'diamond', size: 22, group: 'alert', desc: '<strong>Alert</strong> — the monitoring trigger that started the incident. Properties: alert_id, fired_at, severity, runbook_ref.' },
    { id: 'dec1',   label: 'Decision:\nRollback\nAuth v4.2',    x: 0,    y: -50,  shape: 'ellipse', group: 'dec',    desc: '<strong>Decision (rollback).</strong> Properties: trace_id, decision_type=incident_response, timestamp, context_summary, exception_flag=true (rollback is non-standard for this service), confidence=high.' },
    { id: 'dec2',   label: 'Decision:\nPage DB-team',         x: 220,  y: -180,  shape: 'ellipse', group: 'dec',    desc: '<strong>Secondary decision</strong> triggered by the rollback decision. Records the side-action taken to cover the surge in DB capacity.' },
    { id: 'svc',    label: 'Service:\nAuth Service',          x: -240, y: 90,   shape: 'box', group: 'svc',    desc: '<strong>Service entity.</strong> The auth service whose error rate spiked. APPLIES_TO edge connects the decision to this entity.' },
    { id: 'bad',    label: 'Deployment\nv4.2 (bad)',          x: -100, y: 90,   shape: 'box', group: 'bad',    desc: '<strong>Failed deployment.</strong> The version being rolled back from. FROM_VERSION edge points here.' },
    { id: 'good',   label: 'Deployment\nv4.1 (good)',         x: 80,   y: 90,   shape: 'box', group: 'good',   desc: '<strong>Good deployment.</strong> The version being rolled back to. TO_VERSION edge points here.' },
    { id: 'eng',    label: 'Engineer:\nK. Patel (on-call)',   x: -100, y: -180, shape: 'dot', size: 24, group: 'eng', desc: '<strong>Engineer</strong> — DECIDED_BY edge. Properties on edge: decided_at, decision_channel="PagerDuty incident".' },
    { id: 'prec',   label: 'Precedent:\nIncident-447',        x: 220,  y: 0,    shape: 'ellipse', group: 'prec', desc: '<strong>Cited Precedent</strong> — Incident-447 from 18 days earlier had the same alert pattern, same auth service, similar rollback. Context graph retrieval surfaced this trace, reducing investigation time from ~30 min to ~5 min.' },
    { id: 'res',    label: 'Resolution:\nHealthy T+18min',    x: 0,    y: 200,  shape: 'box', group: 'res',    desc: '<strong>Outcome Node</strong> — recorded 18 minutes after the rollback. Longer than precedent (9 min) because of the additional DB-paging side-decision. This outcome is also recorded back into the precedent\'s trace for future reference.' }
];

const EDGES = [
    { from: 'alert', to: 'dec1', label: 'triggered' },
    { from: 'dec1',  to: 'svc',  label: 'APPLIES_TO' },
    { from: 'dec1',  to: 'bad',  label: 'FROM_VERSION' },
    { from: 'dec1',  to: 'good', label: 'TO_VERSION' },
    { from: 'eng',   to: 'dec1', label: 'DECIDED_BY' },
    { from: 'dec1',  to: 'prec', label: 'CITES', dashed: true, color: '#f57c00' },
    { from: 'dec1',  to: 'dec2', label: 'TRIGGERED' },
    { from: 'dec1',  to: 'res',  label: 'RESULTED_IN', color: '#2e7d32' }
];

const GROUP_COLORS = {
    alert: { background: '#ffd3c3', border: '#e76f51' },
    dec:   { background: '#c5cae9', border: '#3949ab' },
    svc:   { background: '#a7e5dc', border: '#00897b' },
    bad:   { background: '#ffcdd2', border: '#c62828' },
    good:  { background: '#c8e6c9', border: '#2e7d32' },
    eng:   { background: '#fff3c4', border: '#e9c46a' },
    prec:  { background: '#d1c4e9', border: '#3949ab' },
    res:   { background: '#c8e6c9', border: '#2e7d32' }
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
            borderWidth: 2, widthConstraint: 110, heightConstraint: 44
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: e.color || '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.color || '#90a4ae', highlight: '#000' },
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
function reset() { document.getElementById('db').innerHTML = 'Click any node to see its role and properties in this incident response trace.'; }
document.addEventListener('DOMContentLoaded', init);
