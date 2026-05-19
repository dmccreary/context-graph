// Compliance Lifecycle — 6 phases arranged in a circle around the context graph
// CANVAS_HEIGHT: 620

const R = 200;
function ang(i) { return -HALF_PI + (i * 2 * Math.PI / 6); }
function px(i) { return R * Math.cos(ang(i)); }
function py(i) { return R * Math.sin(ang(i)); }
function HALF_PI() { return Math.PI / 2; }

const PHASES = [
    { id: 'design',  label: '1. Design &\nModel Card',     group: 'indigo',
      desc: '<strong>Design & Model Card.</strong> Activities: model card drafted, data retention policy set, fairness metrics defined, schema designed for auditability. <strong>Regulatory:</strong> EU AI Act conformity-assessment preparation. <strong>CG role:</strong> schema decisions encoded as graph-shape choices that downstream audit queries depend on.' },
    { id: 'deploy',  label: '2. Deploy &\nActivate',       group: 'teal',
      desc: '<strong>Deploy & Activate.</strong> Activities: integration connections established, monitoring dashboards configured, autonomy starts at L1. <strong>Regulatory:</strong> GDPR Art. 22 legitimate basis documented. <strong>CG role:</strong> first decision traces start flowing in; baseline metrics computed.' },
    { id: 'monitor', label: '3. Monitor\nContinuously',    group: 'gold',
      desc: '<strong>Monitor Continuously.</strong> Activities: faithfulness score tracked, fairness metrics computed daily, compliance gap analysis runs, autonomy levels adjusted. <strong>Regulatory:</strong> EU AI Act post-market monitoring. <strong>CG role:</strong> daily queries over the trace store reveal drift and bias.' },
    { id: 'audit',   label: '4. Audit\nResponse',          group: 'steel',
      desc: '<strong>Audit Response.</strong> Activities: decision traces retrieved on subpoena, right-to-explanation responses generated, regulatory submissions prepared. <strong>Regulatory:</strong> GDPR Art. 22 right to explanation. <strong>CG role:</strong> the trace store IS the audit record; queries self-serve.' },
    { id: 'gov',     label: '5. Governance\nReporting',    group: 'orange',
      desc: '<strong>Governance Reporting.</strong> Activities: quarterly report generated from context graph analytics, board and regulator submission, red-team results included. <strong>Regulatory:</strong> EU AI Act transparency and accountability. <strong>CG role:</strong> aggregate queries summarize quarter-over-quarter compliance posture.' },
    { id: 'red',     label: '6. Red Team\n& Review',       group: 'red',
      desc: '<strong>Red Team & Review.</strong> Activities: context manipulation probed, precedent gaming tested, extraction attacks attempted, findings → access-control updates. <strong>Regulatory:</strong> EU AI Act robustness and cybersecurity. <strong>CG role:</strong> attack attempts themselves become decision traces — the graph learns its own attack surface.' }
];

const COLORS = {
    indigo: { background: '#c5cae9', border: '#3949ab' },
    teal:   { background: '#a7e5dc', border: '#00897b' },
    gold:   { background: '#fff3c4', border: '#e9c46a' },
    steel:  { background: '#cbd9ee', border: '#5b7fbd' },
    orange: { background: '#ffd3c3', border: '#e76f51' },
    red:    { background: '#ffcdd2', border: '#c62828' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }
let network;
function init() {
    const nodes = [];
    nodes.push({
        id: 'cg-center', label: 'Context Graph\n(decision traces)',
        shape: 'ellipse', x: 0, y: 0, fixed: { x: true, y: true },
        color: { background: '#c5cae9', border: '#3949ab' },
        font: { size: 11, color: '#1a237e', face: 'Arial' },
        borderWidth: 3, widthConstraint: 130, heightConstraint: 60
    });
    PHASES.forEach((p, i) => {
        const c = COLORS[p.group];
        const cx = R * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / 6);
        const cy = R * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / 6);
        nodes.push({
            id: p.id, label: p.label, shape: 'box',
            x: cx, y: cy, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 10, color: '#212121', face: 'Arial' },
            borderWidth: 2,
            widthConstraint: 110, heightConstraint: 50
        });
    });

    const edges = [];
    // Clockwise lifecycle arrows
    for (let i = 0; i < 6; i++) {
        edges.push({
            id: 'cy' + i, from: PHASES[i].id, to: PHASES[(i + 1) % 6].id,
            color: { color: '#3949ab', highlight: '#e76f51' },
            arrows: { to: { enabled: true, scaleFactor: 0.6 } },
            width: 1.5,
            smooth: { type: 'curvedCW', roundness: 0.3 }
        });
    }
    // Spokes to center (dashed)
    for (let i = 0; i < 6; i++) {
        edges.push({
            id: 'sp' + i, from: PHASES[i].id, to: 'cg-center',
            color: { color: '#cfd8dc' }, dashes: true, width: 1,
            arrows: { to: { enabled: false } }, smooth: false
        });
    }

    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => { network.fit({ animation: false, padding: 50 }); });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const ph = PHASES.find(x => x.id === p.nodes[0]);
            if (ph) document.getElementById('db').innerHTML = ph.desc;
            else if (p.nodes[0] === 'cg-center') {
                document.getElementById('db').innerHTML = '<strong>Context Graph.</strong> The shared store all six phases read from and write back to. The graph itself is the artifact that makes the lifecycle continuous rather than episodic.';
            }
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length) reset(); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 50 });
    });
}
function reset() { document.getElementById('db').innerHTML = "Click any phase to see its activities, the regulatory requirements it addresses, and the context graph's role."; }
document.addEventListener('DOMContentLoaded', init);
