// Governance Framework Concept Map — 25 nodes, 5 clusters
// CANVAS_HEIGHT: 760

const CLUSTERS = {
    types:      { color: '#5b7fbd' },
    mgmt:       { color: '#2a9d8f' },
    quality:    { color: '#e9c46a' },
    structure:  { color: '#3949ab' },
    access:     { color: '#e76f51' }
};

const RAW_NODES = [
    // types (4)
    { id: 'metadata',    label: 'Metadata',                cluster: 'types',
      def: 'Data about data — descriptive information that defines, qualifies, and locates other data.' },
    { id: 'tech-md',     label: 'Technical Metadata',      cluster: 'types',
      def: 'Schema-level metadata: column names, types, constraints. Generated automatically.' },
    { id: 'biz-md',      label: 'Business Metadata',       cluster: 'types',
      def: 'Human-curated meaning: definitions, ownership, permissible values.' },
    { id: 'ops-md',      label: 'Operational Metadata',    cluster: 'types',
      def: 'State and freshness data: last updated, usage counts, error rates.' },
    // mgmt (5)
    { id: 'active-mm',   label: 'Active Metadata Management', cluster: 'mgmt',
      def: 'Continuously-updated metadata that reflects current usage and lineage.' },
    { id: 'passive-mc',  label: 'Passive Metadata Cataloging', cluster: 'mgmt',
      def: 'Manually-curated catalogs that become stale quickly without intervention.' },
    { id: 'catalog',     label: 'Metadata Catalog Platform', cluster: 'mgmt',
      def: 'Software that indexes, searches, and serves metadata from many sources.' },
    { id: 'auto-disc',   label: 'Automated Metadata Discovery', cluster: 'mgmt',
      def: 'Bots and crawlers that detect new datasets, schemas, and relationships.' },
    { id: 'tagging',     label: 'Metadata Tagging',        cluster: 'mgmt',
      def: 'Attaching descriptive labels (PII, sensitive, deprecated) to data assets.' },
    // quality (6)
    { id: 'quality',     label: 'Data Quality',            cluster: 'quality',
      def: 'Composite measure of fitness for purpose across multiple dimensions.' },
    { id: 'completeness',label: 'Data Completeness',       cluster: 'quality',
      def: 'Proportion of expected values present (no missing fields).' },
    { id: 'accuracy',    label: 'Data Accuracy',           cluster: 'quality',
      def: 'How closely values match the real-world entities they describe.' },
    { id: 'consistency', label: 'Data Consistency',        cluster: 'quality',
      def: 'Agreement of the same fact across different systems.' },
    { id: 'timeliness',  label: 'Data Timeliness',         cluster: 'quality',
      def: 'How current the data is relative to the real-world event.' },
    { id: 'q-rule',      label: 'Data Quality Rule',       cluster: 'quality',
      def: 'Executable constraint that quantifies one dimension of quality.' },
    // structure (4)
    { id: 'gov-fw',      label: 'Data Governance Framework', cluster: 'structure',
      def: 'Org-wide policies and structures for treating data as a managed asset.' },
    { id: 'stewardship', label: 'Data Stewardship',        cluster: 'structure',
      def: 'Day-to-day accountability for data definitions and quality.' },
    { id: 'ownership',   label: 'Data Ownership',          cluster: 'structure',
      def: 'Accountability for policy and budget; sets the meaning of a dataset.' },
    { id: 'gov-role',    label: 'Governance Role',         cluster: 'structure',
      def: 'Named role with defined responsibilities (steward, owner, custodian).' },
    // access (6)
    { id: 'classify',    label: 'Data Classification',     cluster: 'access',
      def: 'Assignment of sensitivity labels (public, internal, confidential, restricted).' },
    { id: 'access-ctrl', label: 'Access Control',          cluster: 'access',
      def: 'Mechanism enforcing who can see or modify specific data.' },
    { id: 'policy-enf',  label: 'Policy Enforcement',      cluster: 'access',
      def: 'Runtime checks that block disallowed reads, writes, or exports.' },
    { id: 'masking',     label: 'Data Masking',            cluster: 'access',
      def: 'Obscuring sensitive values in non-production environments.' },
    { id: 'anonymize',   label: 'Data Anonymization',      cluster: 'access',
      def: 'Irreversibly removing identifying information from a dataset.' },
    { id: 'dp',          label: 'Differential Privacy',    cluster: 'access',
      def: 'Adding calibrated noise so query results reveal nothing about any individual.' }
];

const RAW_EDGES = [
    { from: 'metadata', to: 'tech-md',  label: 'is-type-of' },
    { from: 'metadata', to: 'biz-md',   label: 'is-type-of' },
    { from: 'metadata', to: 'ops-md',   label: 'is-type-of' },
    { from: 'active-mm', to: 'catalog', label: 'implemented-by' },
    { from: 'catalog', to: 'auto-disc', label: 'enables' },
    { from: 'auto-disc', to: 'tagging', label: 'produces' },
    { from: 'quality', to: 'completeness', label: 'measured-by' },
    { from: 'quality', to: 'accuracy',   label: 'measured-by' },
    { from: 'quality', to: 'consistency',label: 'measured-by' },
    { from: 'quality', to: 'timeliness', label: 'measured-by' },
    { from: 'q-rule',  to: 'quality',    label: 'enforces' },
    { from: 'gov-fw',  to: 'stewardship',label: 'includes' },
    { from: 'gov-fw',  to: 'ownership',  label: 'includes' },
    { from: 'gov-fw',  to: 'classify',   label: 'includes' },
    { from: 'gov-fw',  to: 'access-ctrl',label: 'includes' },
    { from: 'gov-fw',  to: 'policy-enf', label: 'includes' },
    { from: 'stewardship', to: 'ownership', label: 'escalates-to' },
    { from: 'stewardship', to: 'gov-role', label: 'is-a' },
    { from: 'classify', to: 'access-ctrl', label: 'drives' },
    { from: 'access-ctrl', to: 'policy-enf', label: 'implemented-by' },
    { from: 'policy-enf', to: 'masking', label: 'uses-technique' },
    { from: 'policy-enf', to: 'anonymize', label: 'uses-technique' },
    { from: 'policy-enf', to: 'dp', label: 'uses-technique' },
    { from: 'metadata', to: 'catalog', label: 'managed-in' },
    { from: 'metadata', to: 'quality', label: 'qualifies' }
];

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

function buildNodes() {
    return RAW_NODES.map(n => ({
        id: n.id, label: n.label,
        color: { background: lighten(CLUSTERS[n.cluster].color),
                 border: CLUSTERS[n.cluster].color,
                 highlight: { background: CLUSTERS[n.cluster].color, border: '#000' } },
        font: { size: 11, color: '#212121' },
        shape: 'box', margin: 8, borderWidth: 2,
        title: n.def
    }));
}

function lighten(hex) {
    // crude lighten by mixing with white
    const r = parseInt(hex.substr(1,2),16);
    const g = parseInt(hex.substr(3,2),16);
    const b = parseInt(hex.substr(5,2),16);
    const mix = (c) => Math.round(c + (255 - c) * 0.6);
    return 'rgb(' + mix(r) + ',' + mix(g) + ',' + mix(b) + ')';
}

function buildEdges() {
    return RAW_EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: '#546e7a', strokeWidth: 3, strokeColor: '#f8f8f8', align: 'middle' },
        color: { color: '#90a4ae', highlight: '#e76f51', hover: '#e76f51' },
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: 1.2, smooth: { type: 'continuous' }
    }));
}

let network, nodesDS, edgesDS;

function init() {
    nodesDS = new vis.DataSet(buildNodes());
    edgesDS = new vis.DataSet(buildEdges());
    const allowMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true, solver: 'barnesHut',
            stabilization: { enabled: true, iterations: 400, fit: true },
            barnesHut: { gravitationalConstant: -3000, centralGravity: 0.5,
                springLength: 70, springConstant: 0.04, damping: 0.6, avoidOverlap: 0.6 }
        },
        interaction: {
            hover: true, tooltipDelay: 250, selectConnectedEdges: false,
            zoomView: allowMouse, dragView: allowMouse, dragNodes: true,
            navigationButtons: true, keyboard: { enabled: false }
        }
    };
    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodesDS, edges: edgesDS }, options);
    network.on('stabilizationIterationsDone', () => {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' }, padding: 40 });
    });
    network.on('selectNode', (p) => { if (p.nodes.length) showNode(p.nodes[0]); });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length && !network.getSelectedEdges().length) reset();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 40 });
    });
}

function showNode(id) {
    const n = RAW_NODES.find(x => x.id === id);
    if (!n) return;
    const neighbors = RAW_EDGES.filter(e => e.from === id || e.to === id)
        .map(e => RAW_NODES.find(x => x.id === (e.from === id ? e.to : e.from)).label);
    const cluster = CLUSTERS[n.cluster].color;
    let html = '<div style="display:inline-block;background:' + cluster
        + ';color:white;border-radius:10px;padding:2px 8px;font-size:10px;font-weight:bold;margin-bottom:6px;">'
        + n.cluster.toUpperCase() + '</div>';
    html += '<div style="font-weight:bold;font-size:13px;color:#212121;margin-bottom:6px;">' + esc(n.label) + '</div>';
    html += '<div>' + esc(n.def) + '</div>';
    if (neighbors.length) {
        html += '<div class="neighbors"><span class="lbl">Connected to (' + neighbors.length + '):</span>';
        for (const nb of neighbors) html += '<span class="n">' + esc(nb) + '</span>';
        html += '</div>';
    }
    document.getElementById('db').innerHTML = html;
}

function reset() {
    document.getElementById('db').innerHTML = 'Click any concept to see its definition and connected neighbors.';
}

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

document.addEventListener('DOMContentLoaded', init);
