// Interactive LPG Explorer
// CANVAS_HEIGHT: 540
// Bloom L2 — Understand: learners click nodes and edges to identify labels,
// types, and properties in a Labeled Property Graph.

const COLORS = {
    supplier:  { bg: '#ffe0b2', border: '#f57c00', highlight: '#ffb74d' },
    product:   { bg: '#c5cae9', border: '#3949ab', highlight: '#7986cb' },
    warehouse: { bg: '#b2dfdb', border: '#00897b', highlight: '#4db6ac' },
    order:     { bg: '#e0e0e0', border: '#616161', highlight: '#bdbdbd' }
};

const EDGE_COLORS = {
    SUPPLIES: '#f57c00',
    STOCKS:   '#00897b',
    FULFILLS: '#3949ab'
};

const TYPE_PILL_COLOR = {
    Supplier:  '#f57c00',
    Product:   '#3949ab',
    Warehouse: '#00897b',
    Order:     '#616161',
    SUPPLIES:  '#f57c00',
    STOCKS:    '#00897b',
    FULFILLS:  '#3949ab'
};

// 10-node supply chain
const RAW_NODES = [
    { id: 's1', label: 'Acme Components',  type: 'Supplier',  shape: 'ellipse',
      properties: { name: 'Acme Components', country: 'US', risk_tier: 'tier-1' } },
    { id: 's2', label: 'Bolts & More',     type: 'Supplier',  shape: 'ellipse',
      properties: { name: 'Bolts & More', country: 'MX', risk_tier: 'tier-2' } },
    { id: 'p1', label: 'Widget-A',         type: 'Product',   shape: 'box',
      properties: { sku: 'WDG-A', unit_cost: '$12.50' } },
    { id: 'p2', label: 'Widget-B',         type: 'Product',   shape: 'box',
      properties: { sku: 'WDG-B', unit_cost: '$7.20' } },
    { id: 'p3', label: 'Widget-C',         type: 'Product',   shape: 'box',
      properties: { sku: 'WDG-C', unit_cost: '$18.40' } },
    { id: 'w1', label: 'Chicago DC',       type: 'Warehouse', shape: 'diamond',
      properties: { location: 'Chicago, IL', capacity_units: '50,000' } },
    { id: 'w2', label: 'Atlanta DC',       type: 'Warehouse', shape: 'diamond',
      properties: { location: 'Atlanta, GA', capacity_units: '32,000' } },
    { id: 'o1', label: 'ORD-2024-001',     type: 'Order',     shape: 'dot',
      properties: { order_id: 'ORD-2024-001', amount_usd: '$45,000', status: 'confirmed' } },
    { id: 'o2', label: 'ORD-2024-002',     type: 'Order',     shape: 'dot',
      properties: { order_id: 'ORD-2024-002', amount_usd: '$12,300', status: 'shipped' } },
    { id: 'o3', label: 'ORD-2024-003',     type: 'Order',     shape: 'dot',
      properties: { order_id: 'ORD-2024-003', amount_usd: '$8,750',  status: 'pending' } }
];

const RAW_EDGES = [
    { id: 'e1', from: 's1', to: 'p1', type: 'SUPPLIES', properties: { lead_time_days: 14 } },
    { id: 'e2', from: 's1', to: 'p3', type: 'SUPPLIES', properties: { lead_time_days: 21 } },
    { id: 'e3', from: 's2', to: 'p2', type: 'SUPPLIES', properties: { lead_time_days: 10 } },
    { id: 'e4', from: 'w1', to: 'p1', type: 'STOCKS',   properties: { quantity_on_hand: 8200 } },
    { id: 'e5', from: 'w1', to: 'p2', type: 'STOCKS',   properties: { quantity_on_hand: 3100 } },
    { id: 'e6', from: 'w2', to: 'p2', type: 'STOCKS',   properties: { quantity_on_hand: 4500 } },
    { id: 'e7', from: 'w2', to: 'p3', type: 'STOCKS',   properties: { quantity_on_hand: 1800 } },
    { id: 'e8', from: 'w1', to: 'o1', type: 'FULFILLS', properties: { fulfillment_date: '2024-03-12' } },
    { id: 'e9', from: 'w2', to: 'o2', type: 'FULFILLS', properties: { fulfillment_date: '2024-03-14' } },
    { id: 'e10', from: 'w1', to: 'o3', type: 'FULFILLS', properties: { fulfillment_date: '2024-03-18' } }
];

let network;
let nodesDataSet;
let edgesDataSet;

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

function buildNodes() {
    return RAW_NODES.map(n => {
        const palette = COLORS[n.type.toLowerCase()];
        return {
            id: n.id,
            label: n.label,
            shape: n.shape,
            color: {
                background: palette.bg,
                border: palette.border,
                highlight: { background: palette.highlight, border: palette.border },
                hover: { background: palette.highlight, border: palette.border }
            },
            font: { size: 14, face: 'Arial', color: '#212121' },
            borderWidth: 2,
            margin: 10,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 1, y: 1 },
            title: buildHoverTitle(n)
        };
    });
}

function buildEdges() {
    return RAW_EDGES.map(e => {
        const color = EDGE_COLORS[e.type];
        return {
            id: e.id,
            from: e.from,
            to: e.to,
            label: e.type,
            arrows: { to: { enabled: true, scaleFactor: 1.0 } },
            color: { color: color, highlight: color, hover: color },
            font: { size: 11, face: 'Arial', color: color, strokeWidth: 4, strokeColor: '#ffffff', align: 'middle' },
            width: 2,
            dashes: (e.type === 'STOCKS'),
            smooth: { type: 'continuous' },
            title: buildEdgeHoverTitle(e)
        };
    });
}

function buildHoverTitle(node) {
    const lines = [node.type + ': ' + node.label];
    for (const k of Object.keys(node.properties)) {
        lines.push(k + ': ' + node.properties[k]);
    }
    return lines.join('\n');
}

function buildEdgeHoverTitle(edge) {
    const fromNode = RAW_NODES.find(n => n.id === edge.from);
    const toNode = RAW_NODES.find(n => n.id === edge.to);
    const lines = [edge.type + ': ' + fromNode.label + ' → ' + toNode.label];
    for (const k of Object.keys(edge.properties)) {
        lines.push(k + ': ' + edge.properties[k]);
    }
    return lines.join('\n');
}

function initializeNetwork() {
    nodesDataSet = new vis.DataSet(buildNodes());
    edgesDataSet = new vis.DataSet(buildEdges());

    const allowMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            stabilization: { enabled: true, iterations: 250, fit: true },
            forceAtlas2Based: {
                gravitationalConstant: -40,
                centralGravity: 0.015,
                springLength: 85,
                springConstant: 0.10,
                damping: 0.5,
                avoidOverlap: 0.5
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            selectConnectedEdges: false,
            zoomView: allowMouse,
            dragView: allowMouse,
            dragNodes: true,
            navigationButtons: true,
            keyboard: { enabled: false }
        },
        nodes: {
            scaling: { min: 22, max: 28 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.0 } }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodesDataSet, edges: edgesDataSet }, options);

    network.on('stabilizationIterationsDone', () => {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' }, padding: 40 });
    });

    network.on('selectNode', (params) => {
        if (params.nodes.length > 0) showNodeDetails(params.nodes[0]);
    });

    network.on('selectEdge', (params) => {
        // When clicking purely on an edge (no node selected)
        if (params.nodes.length === 0 && params.edges.length > 0) {
            showEdgeDetails(params.edges[0]);
        }
    });

    network.on('deselectNode', () => {
        if (network.getSelectedNodes().length === 0 && network.getSelectedEdges().length === 0) {
            resetDetailPanel();
        }
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll();
        resetDetailPanel();
        network.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' }, padding: 40 });
    });
}

function showNodeDetails(nodeId) {
    const node = RAW_NODES.find(n => n.id === nodeId);
    if (!node) return;
    const pillColor = TYPE_PILL_COLOR[node.type] || '#607d8b';
    let html = '<div class="pill" style="background-color:' + pillColor + ';">NODE · ' + escapeHtml(node.type) + '</div>';
    html += '<div class="row"><span class="k">Label</span><span class="v">' + escapeHtml(node.label) + '</span></div>';
    for (const k of Object.keys(node.properties)) {
        html += '<div class="row"><span class="k">' + escapeHtml(k) + '</span><span class="v">' + escapeHtml(String(node.properties[k])) + '</span></div>';
    }
    document.getElementById('detail-body').innerHTML = html;
}

function showEdgeDetails(edgeId) {
    const edge = RAW_EDGES.find(e => e.id === edgeId);
    if (!edge) return;
    const fromNode = RAW_NODES.find(n => n.id === edge.from);
    const toNode = RAW_NODES.find(n => n.id === edge.to);
    const pillColor = TYPE_PILL_COLOR[edge.type] || '#607d8b';
    let html = '<div class="pill" style="background-color:' + pillColor + ';">EDGE · ' + escapeHtml(edge.type) + '</div>';
    html += '<div class="row"><span class="k">From</span><span class="v">' + escapeHtml(fromNode.label) + '</span></div>';
    html += '<div class="row"><span class="k">→ To</span><span class="v">' + escapeHtml(toNode.label) + '</span></div>';
    for (const k of Object.keys(edge.properties)) {
        html += '<div class="row"><span class="k">' + escapeHtml(k) + '</span><span class="v">' + escapeHtml(String(edge.properties[k])) + '</span></div>';
    }
    document.getElementById('detail-body').innerHTML = html;
}

function resetDetailPanel() {
    document.getElementById('detail-body').innerHTML =
        'Click any node or edge to inspect its label, type, and properties.';
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

document.addEventListener('DOMContentLoaded', initializeNetwork);
