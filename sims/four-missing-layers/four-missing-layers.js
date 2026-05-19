// Four Missing Layers — RAG Covers vs Context Graph Adds
// CANVAS_HEIGHT: 560

const NODES = [
    // Left panel — RAG Covers (around x = -260)
    { id: 'L-hdr', label: 'Standard RAG Covers', x: -260, y: -200, shape: 'text',
      font: { size: 14, color: '#00695c', face: 'Arial', bold: true } },
    { id: 'doc',   label: 'Document\nArchive',          x: -380, y: -100, group: 'rag',
      desc: '<strong>Standard RAG addresses Document Archive.</strong> It is necessary but not sufficient for enterprise reasoning — many critical facts never reach a document.' },
    { id: 'idx',   label: 'Semantic\nSearch Index',     x: -260, y: -100, group: 'rag',
      desc: '<strong>Standard RAG addresses Semantic Indexing.</strong> Necessary but not sufficient: ranking by similarity alone misses authority and freshness.' },
    { id: 'emb',   label: 'Embedding\nSimilarity',      x: -380, y: 30,   group: 'rag',
      desc: '<strong>Standard RAG addresses Embedding Similarity.</strong> Necessary but not sufficient: similarity does not capture relationships or constraints.' },
    { id: 'topk',  label: 'Top-K\nRetrieval',           x: -260, y: 30,   group: 'rag',
      desc: '<strong>Standard RAG addresses Top-K Retrieval.</strong> Necessary but not sufficient: returns k documents but no organizational context around them.' },

    // Right panel — Context Graph Adds (around x = 260)
    { id: 'R-hdr', label: 'Context Graph Adds', x: 260, y: -200, shape: 'text',
      font: { size: 14, color: '#1a237e', face: 'Arial', bold: true } },
    { id: 'excep', label: '! Exception Logic\n(decision patterns)',     x: 150, y: -100, shape: 'ellipse', group: 'cg',
      desc: '<strong>Exception Logic.</strong> Context graphs capture decision patterns — who approved what, under which condition. Addresses the Missing-Decision-Context failure mode.' },
    { id: 'prec',  label: '⏱ Historical Precedents\n(why + who)',       x: 370, y: -100, shape: 'ellipse', group: 'cg',
      desc: '<strong>Historical Precedents.</strong> Context graphs preserve why decisions were made, by whom, and on what date. Addresses the Tacit Knowledge Gap.' },
    { id: 'cross', label: '⛓ Cross-System Synthesis\n(canonical entities)', x: 150, y: 30, shape: 'ellipse', group: 'cg',
      desc: '<strong>Cross-System Synthesis.</strong> Context graphs resolve entities across CRM, billing, support — the LLM sees one canonical customer view. Addresses the Incomplete Synthesis failure mode.' },
    { id: 'appr',  label: '🔗 Approval Chains\n(out-of-band record)',    x: 370, y: 30,   shape: 'ellipse', group: 'cg',
      desc: '<strong>Approval Chains.</strong> Context graphs record approvals that never made it into a document (meetings, Slack, email). Addresses the Context Poisoning failure mode by giving an authoritative source path.' },

    // Bridge anchor
    { id: 'bridge-l', label: '', x: -120, y: -35, shape: 'dot', size: 6, group: 'invisible' },
    { id: 'bridge-r', label: '', x: 30,  y: -35, shape: 'dot', size: 6, group: 'invisible' }
];

const EDGES = [
    // RAG pipeline (left to right within left panel)
    { from: 'doc', to: 'idx', label: 'indexed' },
    { from: 'idx', to: 'emb', label: 'embeds' },
    { from: 'emb', to: 'topk', label: 'ranks' },
    // CG cluster (no internal edges for clarity)
    // Bridge between panels
    { from: 'bridge-l', to: 'bridge-r', label: 'extends', isBridge: true,
      desc: 'Context graphs do not replace RAG — they extend it. RAG retrieves documents; the context graph provides the organizational intelligence that makes those documents interpretable and trustworthy.' }
];

const GROUP_COLORS = {
    rag: { background: '#a7e5dc', border: '#00897b' },
    cg:  { background: '#c5cae9', border: '#3949ab' },
    invisible: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;
function init() {
    const nodes = NODES.map(n => {
        const c = GROUP_COLORS[n.group];
        const base = {
            id: n.id, label: n.label, shape: n.shape || 'box',
            x: n.x, y: n.y, fixed: { x: true, y: true },
            font: n.font || { size: 11, color: '#212121', face: 'Arial' },
            borderWidth: 2
        };
        if (n.shape !== 'text') {
            base.color = { background: c.background, border: c.border, highlight: { background: c.border, border: '#000' } };
            base.widthConstraint = 110; base.heightConstraint = 44;
            if (n.shape === 'dot') { base.borderWidth = 0; }
        }
        if (n.size) base.size = n.size;
        return base;
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 10, color: e.isBridge ? '#e76f51' : '#546e7a',
                strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.isBridge ? '#e76f51' : '#90a4ae', highlight: '#e76f51' },
        dashes: !!e.isBridge,
        arrows: { to: { enabled: !e.isBridge, scaleFactor: 0.7 } },
        width: e.isBridge ? 3 : 1.5, smooth: false
    }));
    const allowMouse = !isInIframe();
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        { layout: { improvedLayout: false }, physics: { enabled: false },
          interaction: { hover: true, dragNodes: false, selectConnectedEdges: false,
              zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } } });
    network.once('afterDrawing', () => { network.fit({ animation: false, padding: 35 }); });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const n = NODES.find(x => x.id === p.nodes[0]);
            if (n && n.desc) document.getElementById('db').innerHTML = n.desc;
        }
    });
    network.on('selectEdge', (p) => {
        if (p.nodes.length === 0 && p.edges.length > 0) {
            const idx = parseInt(p.edges[0].slice(1));
            const e = EDGES[idx];
            if (e && e.desc) document.getElementById('db').innerHTML = '<strong>extends</strong><br><br>' + e.desc;
        }
    });
    network.on('deselectNode', () => { if (!network.getSelectedNodes().length && !network.getSelectedEdges().length) reset(); });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 35 });
    });
}
function reset() {
    document.getElementById('db').innerHTML =
        'Click any node to see what it provides and which gap it fills. Click the bridge edge for the integration story.';
}
document.addEventListener('DOMContentLoaded', init);
