// Audit Trail Architecture — 8 nodes, three audit requirements
// CANVAS_HEIGHT: 600

const NODES = [
    { id: 'sys',   label: 'Automated\nDecision System',  x: -250, y: -200, shape: 'box',   group: 'sys',   desc: '<strong>Decision System</strong>. The agents and services that make decisions. Source of all traces flowing into the audit trail.' },
    { id: 'api',   label: 'Write API\n(append-only)',     x: -250, y: -60,  shape: 'box',   group: 'api',   desc: '<strong>Tamper Evidence.</strong> The append-only write API accepts new traces but rejects updates or deletions. Once written, a decision trace is immutable. Structural property: the audit trail cannot be quietly modified after the fact.' },
    { id: 'cg',    label: 'Context Graph\n(decision traces)', x: -250, y: 80,   shape: 'ellipse', group: 'cg',    desc: '<strong>Core store.</strong> All decision traces with bitemporal versioning. Queryable for any point-in-time view.' },
    { id: 'hash',  label: 'Hash Chain Log',               x: -250, y: 230,  shape: 'box',   group: 'hash',  desc: '<strong>High-Assurance Tamper Evidence.</strong> Each new trace\'s hash includes the previous record\'s hash. Any retroactive modification invalidates all subsequent hashes — detectable by any party with the hash chain. Used in high-risk regulated domains.', dashed: true },
    { id: 'gap',   label: 'Compliance\nGap Analyzer',     x: -50,  y: -130, shape: 'box',   group: 'gap',   desc: '<strong>Temporal Completeness.</strong> Continuously compares "decisions made in operational systems" vs. "decision traces stored in the context graph." Alerts when coverage drops below 99% — catches integration failures before auditors do.' },
    { id: 'query', label: 'Audit Query\nEngine (GraphQL)', x: 130,  y: 80,   shape: 'box',   group: 'query', desc: '<strong>Searchability.</strong> The GraphQL API allows regulators to run arbitrary traversal queries: "show all credit decisions for EU residents between Jan-Mar 2025," "trace the authorization chain for decision DT-44821." No custom scripting required.' },
    { id: 'reg',   label: 'Regulator /\nAuditor',         x: 330,  y: -30,  shape: 'dot', size: 24, group: 'ext', desc: '<strong>Regulator</strong> — issues subpoenas and runs audit queries. Context graph + GraphQL means the regulator self-serves.' },
    { id: 'ind',   label: 'Individual\n(right to explain)', x: 330,  y: 180,  shape: 'dot', size: 22, group: 'ext', desc: '<strong>Individual</strong> — has a right to explanation under GDPR Art. 22. Context graph queries assemble the relevant decision trace and serialize as plain-language reasoning.' }
];

const EDGES = [
    { from: 'sys', to: 'api', label: 'writes decisions' },
    { from: 'api', to: 'cg', label: 'append-only writes' },
    { from: 'cg', to: 'hash', label: 'hash-chains writes', dashed: true },
    { from: 'gap', to: 'cg', label: 'monitors completeness' },
    { from: 'gap', to: 'sys', label: 'compares event counts' },
    { from: 'cg', to: 'query', label: 'serves queries' },
    { from: 'query', to: 'reg', label: 'regulatory report' },
    { from: 'query', to: 'ind', label: 'right-to-explanation' }
];

const GROUP_COLORS = {
    sys:   { background: '#ffd3c3', border: '#e76f51' },
    api:   { background: '#c5cae9', border: '#3949ab' },
    cg:    { background: '#c5cae9', border: '#3949ab' },
    hash:  { background: '#cbd9ee', border: '#5b7fbd' },
    gap:   { background: '#fff3c4', border: '#e9c46a' },
    query: { background: '#a7e5dc', border: '#00897b' },
    ext:   { background: '#cfd8dc', border: '#666' }
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
            borderWidth: 2,
            widthConstraint: 110, heightConstraint: 50
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
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
function reset() { document.getElementById('db').innerHTML = 'Click each component to evaluate which audit requirement it addresses.'; }
document.addEventListener('DOMContentLoaded', init);
