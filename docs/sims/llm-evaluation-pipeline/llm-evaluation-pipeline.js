// LLM Evaluation Pipeline — BLEU vs Faithfulness
// CANVAS_HEIGHT: 540

const NODES = [
    { id: 'q',     label: 'User Query',                x: -380, y: 0,  shape: 'ellipse', group: 'q',
      desc: '<strong>User Query</strong> — the input from the user or upstream agent. Drives both retrieval and the final evaluation comparison.' },
    { id: 'ret',   label: 'Context Graph\nRetrieval',  x: -210, y: 0,  shape: 'box', group: 'ret',
      desc: '<strong>Context Graph Retrieval</strong> — fetches decision traces and supporting facts relevant to the query. Quality depends on freshness, relevance, and coverage; degradation here is the first thing to check when alerts fire.' },
    { id: 'llm',   label: 'LLM Response\nGeneration', x: -60,  y: 0,  shape: 'box', group: 'llm',
      desc: '<strong>LLM Response Generation</strong> — generates the natural-language response grounded in retrieved context. Both evaluators consume the output.' },
    { id: 'eval',  label: 'Evaluation Layer',          x: 130,  y: 0,  shape: 'box', group: 'eval',
      desc: '<strong>Evaluation Layer</strong> — splits into BLEU (lexical similarity) and Faithfulness (factual grounding). Run both; they catch different failure modes.' },
    { id: 'bleu',  label: 'BLEU',                      x: 130,  y: -120, shape: 'box', size: 20, group: 'sub',
      desc: '<strong>BLEU Score</strong> — measures lexical similarity to reference responses. Use when you have a test set of queries with known correct responses. Limitation: misses hallucinations that use different words than the reference (but state correct facts), and misses hallucinations that match the reference\'s words but are factually wrong.' },
    { id: 'faith', label: 'Faithfulness',              x: 130,  y: 120, shape: 'box', size: 20, group: 'sub',
      desc: '<strong>Faithfulness Score</strong> — measures whether every factual claim in the response is supported by the retrieved context. Use when you care about grounding quality and hallucination detection. Implementation: send (response, retrieved context) to an evaluator LLM. Limitation: evaluator LLMs have their own failure modes.' },
    { id: 'mon',   label: 'Quality\nMonitor',          x: 310,  y: 0,  shape: 'box', group: 'mon',
      desc: '<strong>Quality Monitor</strong> — aggregates metrics over time and triggers alerts. Looks for trend breaks, not just single-call failures.' },
    { id: 'alert', label: 'Alert / Log',               x: 460,  y: 0,  shape: 'diamond', size: 22, group: 'alert',
      desc: '<strong>Quality Alert</strong> — triggers when faithfulness drops below threshold (typically 0.85 for decision support). First investigation step: check whether context graph retrieval quality has degraded.' }
];

const EDGES = [
    { from: 'q',    to: 'ret',   label: '' },
    { from: 'ret',  to: 'llm',   label: 'injects context' },
    { from: 'llm',  to: 'eval',  label: 'generated response' },
    { from: 'ret',  to: 'eval',  label: 'retrieved context\n(for faithfulness)', dashed: true },
    { from: 'eval', to: 'bleu',  label: '' },
    { from: 'eval', to: 'faith', label: '' },
    { from: 'eval', to: 'mon',   label: '' },
    { from: 'mon',  to: 'alert', label: 'if score < threshold' }
];

const GROUP_COLORS = {
    q:    { background: '#ffd3c3', border: '#e76f51' },
    ret:  { background: '#c5cae9', border: '#3949ab' },
    llm:  { background: '#fff3c4', border: '#e9c46a' },
    eval: { background: '#a7e5dc', border: '#00897b' },
    sub:  { background: '#cfece8', border: '#00897b' },
    mon:  { background: '#cbd9ee', border: '#5b7fbd' },
    alert:{ background: '#ffcdd2', border: '#c62828' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        const base = {
            id: n.id, label: n.label, shape: n.shape, size: n.size,
            x: n.x, y: n.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 11, color: '#212121', face: 'Arial' },
            borderWidth: n.id === 'eval' ? 3 : 2
        };
        if (n.shape === 'box') { base.widthConstraint = 100; base.heightConstraint = 40; }
        return base;
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
function reset() { document.getElementById('db').innerHTML = 'Click any node to see its role and which quality concern it addresses.'; }
document.addEventListener('DOMContentLoaded', init);
