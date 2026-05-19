// Agent Memory Architecture — 3 tiers + write-back loop
// CANVAS_HEIGHT: 600

const NODES = [
    // In-context (top)
    { id: 'task', label: 'Task Spec',     x: -260, y: -210, group: 'src', desc: '<strong>In-Context — Task Specification</strong>. What the user or upstream system asked the agent to do this turn.' },
    { id: 'ret',  label: 'Retrieved\nTraces', x: -90,  y: -210, group: 'cg',  desc: '<strong>In-Context — Retrieved Traces</strong>. Decision precedents pulled from the context graph at the start of the loop.' },
    { id: 'tool', label: 'Tool Results',  x: 90,  y: -210, group: 'sem', desc: '<strong>In-Context — Tool Results</strong>. Outputs of tool calls made during this loop iteration.' },
    { id: 'loop', label: 'Loop History',  x: 260,  y: -210, group: 'kg',  desc: '<strong>In-Context — Loop History</strong>. Compact trace of this loop\'s prior steps for self-coherence.' },
    // Session (middle)
    { id: 'session', label: 'Session State\nObject',         x: 0,    y: -30, group: 'ses', desc: '<strong>Session Memory</strong>. Persisted across loop cycles, summarized at loop start. Bridges between ephemeral in-context and durable long-term storage.' },
    // Long-term (bottom)
    { id: 'dt',   label: 'Decision Trace\nNodes',          x: -200, y: 150, group: 'cg-l', desc: '<strong>Long-Term — Decision Trace nodes</strong>. The agent\'s persistent record of decisions made; shared with all other agents and humans.' },
    { id: 'ent',  label: 'Entity Nodes',  x: -10,  y: 150, group: 'sem-l', desc: '<strong>Long-Term — Entity nodes</strong>. Canonical customers, products, contracts. The decisions link to these.' },
    { id: 'pol',  label: 'Policy\nVersions',         x: 170,  y: 150, group: 'kg-l', desc: '<strong>Long-Term — Policy versions</strong>. The exact policy version in force at each decision time.' }
];

const EDGES = [
    { from: 'session', to: 'task', label: 'session summary injected', color: '#e9c46a' },
    { from: 'session', to: 'ret', color: '#e9c46a' },
    { from: 'session', to: 'tool', color: '#e9c46a' },
    { from: 'session', to: 'loop', color: '#e9c46a' },
    { from: 'task', to: 'session', label: 'updated after loop', color: '#e9c46a', dashed: true },
    { from: 'dt', to: 'session', label: 'Agent Read Pattern\n(retrieval queries)', color: '#f57c00', desc: '<strong>Agent Read Pattern</strong> — the retrieval query sequence that populates the agent\'s working memory at the start of each loop cycle. Uses hybrid retrieval (graph traversal + vector search) to find relevant decision history and precedents.' },
    { from: 'session', to: 'dt', label: 'Agent Write-Back\n(decision trace)', color: '#3949ab', width: 3, desc: '<strong>Agent Write-Back</strong> — the most important data flow. After each decision, the agent writes a complete decision trace to the context graph: the decision, the actor, the cited precedents, the policy version, and the reasoning summary. Immediately available to all future agents and human queries.' }
];

const GROUP_COLORS = {
    src:  { background: '#ffd3c3', border: '#e76f51' },
    cg:   { background: '#c5cae9', border: '#3949ab' },
    sem:  { background: '#a7e5dc', border: '#00897b' },
    kg:   { background: '#cbd9ee', border: '#5b7fbd' },
    ses:  { background: '#fff3c4', border: '#e9c46a' },
    'cg-l': { background: '#c5cae9', border: '#3949ab' },
    'sem-l': { background: '#a7e5dc', border: '#00897b' },
    'kg-l': { background: '#cbd9ee', border: '#5b7fbd' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }
let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        return {
            id: n.id, label: n.label, shape: n.id === 'session' || n.id === 'ent' ? 'ellipse' : 'box',
            x: n.x, y: n.y, fixed: { x: true, y: true },
            color: { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } },
            font: { size: 11, color: '#212121', face: 'Arial' },
            borderWidth: n.id === 'session' ? 3 : 2,
            widthConstraint: 110, heightConstraint: 50
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label || '',
        font: { size: 9, color: e.color, strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.color, highlight: '#000' },
        dashes: !!e.dashed,
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: e.width || 1.5, smooth: { type: 'continuous' }
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
        network.fit({ animation: { duration: 300 }, padding: 40 });
    });
}
function reset() { document.getElementById('db').innerHTML = 'Click any node, edge, or tier to learn its role in the agent loop.'; }
document.addEventListener('DOMContentLoaded', init);
