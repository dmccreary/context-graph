// Taxonomy vs. Ontology — side-by-side product graph comparison
// CANVAS_HEIGHT: 540

const NODES = [
    // Left panel: Taxonomy
    { id: 'L-hdr', label: 'Taxonomy (hierarchy only)', x: -300, y: -250, shape: 'text',
      font: { size: 14, color: '#1a237e', face: 'Arial', bold: true } },
    { id: 'L-phys', label: 'Physical Product', x: -300, y: -150, shape: 'box', group: 'L-root' },
    { id: 'L-elec', label: 'Electronics',     x: -400, y: -40,  shape: 'box', group: 'L-mid' },
    { id: 'L-app',  label: 'Apparel',         x: -200, y: -40,  shape: 'box', group: 'L-mid' },
    { id: 'L-lap',  label: 'Laptop',          x: -460, y:  90,  shape: 'box', group: 'L-leaf' },
    { id: 'L-mon',  label: 'Monitor',         x: -340, y:  90,  shape: 'box', group: 'L-leaf' },
    { id: 'L-sht',  label: 'Shirt',           x: -200, y:  90,  shape: 'box', group: 'L-leaf' },

    // Right panel: Ontology
    { id: 'R-hdr', label: 'Ontology (typed relationships)', x: 280, y: -250, shape: 'text',
      font: { size: 14, color: '#1a237e', face: 'Arial', bold: true } },
    { id: 'R-prod', label: 'Product',            x: 280, y: -100, shape: 'box', group: 'R-root' },
    { id: 'R-sup',  label: 'Supplier',           x: 130, y: -100, shape: 'box', group: 'R-mid' },
    { id: 'R-cat',  label: 'Category',           x: 430, y: -100, shape: 'box', group: 'R-leaf' },
    { id: 'R-reg',  label: 'RegulatoryStandard', x: 430, y:  50,  shape: 'box', group: 'R-reg' },
    { id: 'R-con',  label: 'Contract',           x: 130, y:  100, shape: 'box', group: 'R-steel' }
];

const EDGES = [
    // Left: IS-A only
    { from: 'L-lap', to: 'L-elec', label: 'is-a' },
    { from: 'L-mon', to: 'L-elec', label: 'is-a' },
    { from: 'L-sht', to: 'L-app',  label: 'is-a' },
    { from: 'L-elec', to: 'L-phys', label: 'is-a' },
    { from: 'L-app',  to: 'L-phys', label: 'is-a' },
    // Right: diverse typed
    { from: 'R-prod', to: 'R-cat', label: 'has-type', desc: 'A Product belongs to one or more Categories; Category drives merchandising and reporting hierarchies.' },
    { from: 'R-sup', to: 'R-prod', label: 'manufactures', desc: 'A Supplier manufactures one or more Products. Captures the upstream provenance of every catalog item.' },
    { from: 'R-prod', to: 'R-reg', label: 'governed-by', desc: 'A Product is governed-by one or more RegulatoryStandards. Drives compliance reporting and import/export rules.' },
    { from: 'R-sup', to: 'R-con', label: 'bound-by',  desc: 'A Supplier is bound-by one or more Contracts. Encodes the legal relationship that authorizes manufacture.' },
    { from: 'R-con', to: 'R-prod', label: 'covers',   desc: 'A Contract covers a specific set of Products. Used to compute which products are protected by which agreements.' }
];

const GROUP_COLORS = {
    'L-root': { background: '#c5cae9', border: '#4B4EFC' },
    'L-mid':  { background: '#a7e5dc', border: '#2A9D8F' },
    'L-leaf': { background: '#f6e0a8', border: '#E9C46A' },
    'R-root': { background: '#c5cae9', border: '#4B4EFC' },
    'R-mid':  { background: '#a7e5dc', border: '#2A9D8F' },
    'R-leaf': { background: '#f6e0a8', border: '#E9C46A' },
    'R-reg':  { background: '#ffd3c3', border: '#E76F51' },
    'R-steel':{ background: '#cbd9ee', border: '#5B7FBD' }
};

const DETAILS = {
    'L-root': '<strong>Taxonomy Node</strong> — in a taxonomy, each node is a concept type. The only relationship is <code>is-a</code> (subtype). Useful for browsing categories, but cannot express cross-concept relationships like "manufactures" or "covers".',
    'L-mid':  '<strong>Taxonomy Node</strong> — sub-categories that classify by single-inheritance. They cannot reach across the hierarchy: in a strict taxonomy you cannot say "this laptop is governed by a regulatory standard".',
    'L-leaf': '<strong>Taxonomy Node</strong> — leaf classification. The taxonomy tells you what kind of thing this is, but offers no vocabulary for who makes it, where it ships, or what regulations apply.',
    'R-root': '<strong>Ontology Node</strong> — central concept type in the ontology, participating in multiple typed relationships. Click any edge to see the specific constraint each relationship encodes.',
    'R-mid':  '<strong>Ontology Node</strong> — a separate concept type (Supplier) linked to Product via a typed edge. The ontology allows multiple, named, cross-concept relationships that a taxonomy cannot express.',
    'R-leaf': '<strong>Ontology Node</strong> — Category coexists with hierarchy but is just one of several relationship types. The ontology can also model regulatory and contractual cross-links.',
    'R-reg':  '<strong>Ontology Node</strong> — RegulatoryStandard exists in its own right; products are <code>governed-by</code> standards. A taxonomy could not relate these two type families.',
    'R-steel':'<strong>Ontology Node</strong> — Contract exists alongside Supplier and Product, with two cross-edges (bound-by, covers). The ontology supports rich constraint reasoning.'
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;

function init() {
    const nodes = NODES.map(n => {
        const palette = GROUP_COLORS[n.group] || { background: '#eceff1', border: '#90a4ae' };
        const base = {
            id: n.id, label: n.label, shape: n.shape || 'box',
            x: n.x, y: n.y, fixed: { x: true, y: true },
            font: n.font || { size: 12, color: '#212121', face: 'Arial' },
            borderWidth: 2
        };
        if (n.shape !== 'text') {
            base.color = { background: palette.background, border: palette.border,
                            highlight: { background: palette.border, border: '#000' } };
            base.widthConstraint = 110;
            base.heightConstraint = 40;
        }
        return base;
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 10, color: '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51', hover: '#e76f51' },
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: 1.5, smooth: { type: 'continuous' }
    }));
    const allowMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: { hover: true, selectConnectedEdges: false, dragNodes: false,
            zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } }
    };
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, options);
    network.once('afterDrawing', () => {
        network.fit({ animation: false, padding: 30 });
    });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const n = NODES.find(x => x.id === p.nodes[0]);
            if (n) document.getElementById('db').innerHTML = DETAILS[n.group] || 'Click any element to see details.';
        }
    });
    network.on('selectEdge', (p) => {
        if (p.nodes.length === 0 && p.edges.length > 0) {
            const eid = p.edges[0]; const idx = parseInt(eid.slice(1));
            const e = EDGES[idx];
            if (e && e.desc) {
                document.getElementById('db').innerHTML =
                    '<strong>' + e.label + '</strong><br><br>' + e.desc;
            }
        }
    });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length && !network.getSelectedEdges().length) reset();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 30 });
    });
}

function reset() {
    document.getElementById('db').innerHTML =
        'Click any node on either side, or any edge in the ontology, to learn what each form expresses.';
}

document.addEventListener('DOMContentLoaded', init);
