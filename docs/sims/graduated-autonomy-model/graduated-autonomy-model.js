// Graduated Autonomy Model — 4 levels with forward + rollback transitions
// CANVAS_HEIGHT: 580

const LEVELS = [
    { id: 'L1', label: 'Level 1\nDraft Only',                         y: -220, group: 'l1',
      desc: '<strong>Level 1 — Draft Only.</strong> Agent proposes; human reviews and approves every decision. Monitor: faithfulness, hallucination rate, human override rate.' },
    { id: 'L2', label: 'Level 2\nAuto-Approve\nw/ Review',             y: -80,  group: 'l2',
      desc: '<strong>Level 2 — Auto-Approve with Review.</strong> Agent approves; human reviews after the fact (sampling). Monitor: reversal rate, drift in approval distribution.' },
    { id: 'L3', label: 'Level 3\nAuto-Approve Routine',                y: 60,   group: 'l3',
      desc: '<strong>Level 3 — Auto-Approve Routine.</strong> Agent acts autonomously on routine cases; humans review exceptions only. Monitor: exception flag rate, reversal rate, faithfulness P95.' },
    { id: 'L4', label: 'Level 4\nFull Autonomy\nIn-Policy',            y: 200,  group: 'l4',
      desc: '<strong>Level 4 — Full Autonomy In-Policy.</strong> Agent acts on all in-policy decisions without human-in-loop. Out-of-policy still escalates. Monitor: compliance violations, regulatory alerts.' }
];

const EDGES = [
    // Forward promotions
    { from: 'L1', to: 'L2', label: '≥ 95% validation rate\nover 200+ decisions', color: '#3949ab',
      desc: '<strong>L1 → L2 promotion criterion.</strong> Human-validation rate ≥ 95% sustained over 200+ decisions, plus 50+ relevant precedents in the context graph. Why: 200 decisions × 5% disagreement is ~10 cases — enough to detect systematic error.' },
    { from: 'L2', to: 'L3', label: '≤ 2% reversal rate\nover 500+ decisions', color: '#3949ab',
      desc: '<strong>L2 → L3 promotion criterion.</strong> Reversal rate ≤ 2% over 500+ decisions, plus 200+ precedents. Why: 500 × 2% = 10 reversals — statistically meaningful sample.' },
    { from: 'L3', to: 'L4', label: '≤ 0.5% reversal\nP95 faithfulness > 0.92\nover 2000+ decisions', color: '#3949ab',
      desc: '<strong>L3 → L4 promotion criterion.</strong> Reversal ≤ 0.5%, P95 faithfulness > 0.92, 2000+ decisions, 1000+ precedents. Why: regulatory-grade reliability requires near-zero base rate.' },
    // Rollbacks
    { from: 'L2', to: 'L1', label: 'reversal spike\n> 5% / 7d',  color: '#c62828', dashed: true,
      desc: '<strong>L2 → L1 rollback.</strong> If reversal rate spikes > 5% in any 7-day window, demote to L1. Investigate before re-promotion.' },
    { from: 'L3', to: 'L2', label: 'reversal > 3% or\nanomalous pattern', color: '#c62828', dashed: true,
      desc: '<strong>L3 → L2 rollback.</strong> Reversal rate > 3% OR anomalous decision pattern detected. Investigation required before re-promotion.' },
    { from: 'L4', to: 'L2', label: 'compliance violation\nor regulatory alert', color: '#c62828', dashed: true, width: 3,
      desc: '<strong>L4 → L2 rollback (big).</strong> Any compliance violation or regulatory alert demotes the agent two levels. Full audit and policy review before any re-promotion.' }
];

const GROUP_COLORS = {
    l1: { background: '#cbd9ee', border: '#5b7fbd' },
    l2: { background: '#a7e5dc', border: '#00897b' },
    l3: { background: '#fff3c4', border: '#e9c46a' },
    l4: { background: '#c5cae9', border: '#3949ab' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }
let network;
function init() {
    const nodes = LEVELS.map(l => {
        const c = GROUP_COLORS[l.group];
        return {
            id: l.id, label: l.label, shape: 'box',
            x: -100, y: l.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 12, color: '#212121', face: 'Arial' },
            borderWidth: 2,
            widthConstraint: 200, heightConstraint: 60
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: e.color, strokeWidth: 3, strokeColor: '#f8f8f8', align: 'middle' },
        color: { color: e.color, highlight: '#000' },
        dashes: !!e.dashed,
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: e.width || 1.5,
        smooth: { type: 'curvedCW', roundness: e.dashed ? 0.3 : 0.0 }
    }));
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => { network.fit({ animation: false, padding: 50 }); });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const l = LEVELS.find(x => x.id === p.nodes[0]);
            if (l) document.getElementById('db').innerHTML = l.desc;
        }
    });
    network.on('selectEdge', (p) => {
        if (p.nodes.length === 0 && p.edges.length > 0) {
            const idx = parseInt(p.edges[0].slice(1));
            const e = EDGES[idx];
            if (e && e.desc) document.getElementById('db').innerHTML = e.desc;
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length && !network.getSelectedEdges().length) reset(); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 50 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click any autonomy level or transition edge to see criteria and rollback rules.'; }
document.addEventListener('DOMContentLoaded', init);
