// ISO 11179 Component Hierarchy — abstract + worked example side-by-side
// CANVAS_HEIGHT: 600

const LEFT_X = -200;
const RIGHT_X = 80;
const YS = [-180, -108, -36, 36, 108, 180];

const NODES = [
    // Abstract column (left)
    { id: 'abs-oc',  label: 'Object Class',         x: LEFT_X, y: YS[0], group: 'abs',
      desc: '<strong>Object Class</strong>: a real-world entity or thing of interest. <em>Example:</em> Customer, Employee, Patient.' },
    { id: 'abs-pr',  label: 'Property',             x: LEFT_X, y: YS[1], group: 'abs',
      desc: '<strong>Property</strong>: a characteristic common to all members of an Object Class. <em>Example:</em> Annual Revenue, Birth Date, Diagnosis.' },
    { id: 'abs-dec', label: 'Data Element Concept', x: LEFT_X, y: YS[2], group: 'abs-hi',
      desc: '<strong>Data Element Concept (DEC)</strong>: the combination of an Object Class and a Property. <em>Example:</em> "Customer Annual Revenue" — independent of how it is measured or stored.' },
    { id: 'abs-cd',  label: 'Conceptual Domain',    x: LEFT_X, y: YS[3], group: 'abs',
      desc: '<strong>Conceptual Domain</strong>: the set of permissible values for the DEC, expressed abstractly. <em>Example:</em> "Monetary amounts ≥ 0".' },
    { id: 'abs-vd',  label: 'Value Domain',         x: LEFT_X, y: YS[4], group: 'abs',
      desc: '<strong>Value Domain</strong>: the concrete representation of the Conceptual Domain. <em>Example:</em> "Decimal, USD, trailing-12-months".' },
    { id: 'abs-de',  label: 'Data Element',         x: LEFT_X, y: YS[5], group: 'abs',
      desc: '<strong>Data Element</strong>: a fully specified, named unit of data — DEC + Value Domain. <em>Example:</em> Customer_Annual_Revenue_USD_TTM.' },

    // Example column (right)
    { id: 'ex-oc',  label: 'Customer',                            x: RIGHT_X, y: YS[0], group: 'ex',
      desc: '<strong>Customer</strong> — the Object Class instance. A real-world entity the enterprise tracks.' },
    { id: 'ex-pr',  label: 'Annual Revenue',                      x: RIGHT_X, y: YS[1], group: 'ex',
      desc: '<strong>Annual Revenue</strong> — the Property of interest applied to Customer.' },
    { id: 'ex-dec', label: 'Customer Annual Revenue',             x: RIGHT_X, y: YS[2], group: 'ex',
      desc: '<strong>Customer Annual Revenue</strong> — the DEC. Still abstract: no units, no period.' },
    { id: 'ex-cd',  label: '{Monetary amounts ≥ 0}',              x: RIGHT_X, y: YS[3], group: 'ex',
      desc: '<strong>Conceptual Domain</strong> example: positive monetary amounts of any unit.' },
    { id: 'ex-vd',  label: 'Decimal, USD, trailing 12mo',         x: RIGHT_X, y: YS[4], group: 'ex',
      desc: '<strong>Value Domain</strong> example: decimal representation in US dollars over the trailing 12 months.' },
    { id: 'ex-de',  label: 'Customer_Annual_Revenue_USD_TTM',     x: RIGHT_X, y: YS[5], group: 'ex',
      desc: '<strong>Data Element</strong> — the named, machine-readable field. This is what a database column or registry record carries.' }
];

const EDGES = [
    // Vertical hierarchy (abstract)
    { from: 'abs-oc', to: 'abs-dec', label: 'combines into' },
    { from: 'abs-pr', to: 'abs-dec', label: 'combines into' },
    { from: 'abs-dec', to: 'abs-cd', label: 'has domain' },
    { from: 'abs-cd', to: 'abs-vd', label: 'represented as' },
    { from: 'abs-dec', to: 'abs-de', label: 'specified as' },
    { from: 'abs-vd', to: 'abs-de', label: 'specified as' },
    // Vertical hierarchy (example, mirroring)
    { from: 'ex-oc',  to: 'ex-dec', label: 'combines into' },
    { from: 'ex-pr',  to: 'ex-dec', label: 'combines into' },
    { from: 'ex-dec', to: 'ex-cd',  label: 'has domain' },
    { from: 'ex-cd',  to: 'ex-vd',  label: 'represented as' },
    { from: 'ex-dec', to: 'ex-de',  label: 'specified as' },
    { from: 'ex-vd',  to: 'ex-de',  label: 'specified as' },
    // Horizontal dashed connections
    { from: 'abs-oc',  to: 'ex-oc',  dashed: true },
    { from: 'abs-pr',  to: 'ex-pr',  dashed: true },
    { from: 'abs-dec', to: 'ex-dec', dashed: true },
    { from: 'abs-cd',  to: 'ex-cd',  dashed: true },
    { from: 'abs-vd',  to: 'ex-vd',  dashed: true },
    { from: 'abs-de',  to: 'ex-de',  dashed: true }
];

const GROUP_COLORS = {
    abs:    { background: '#c5cae9', border: '#3949ab' },
    'abs-hi': { background: '#fff3c4', border: '#e9c46a' },
    ex:     { background: '#a7e5dc', border: '#00897b' }
};

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;

function init() {
    const nodes = NODES.map(n => {
        const palette = GROUP_COLORS[n.group];
        return {
            id: n.id, label: n.label, shape: 'box',
            x: n.x, y: n.y, fixed: { x: true, y: true },
            color: { background: palette.background, border: palette.border,
                     highlight: { background: palette.border, border: '#000' } },
            font: { size: 11, color: '#212121', face: 'Arial' },
            borderWidth: n.group === 'abs-hi' ? 3 : 2,
            widthConstraint: 180, heightConstraint: 38
        };
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label || '',
        dashes: !!e.dashed,
        font: { size: 9, color: '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.dashed ? '#cfd8dc' : '#90a4ae', highlight: '#e76f51' },
        arrows: { to: { enabled: !e.dashed, scaleFactor: 0.7 } },
        width: 1.4, smooth: false
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
        network.fit({ animation: false, padding: 35 });
        const pos = network.getViewPosition();
        const scale = network.getScale();
        network.moveTo({ position: { x: pos.x + 70 / scale, y: pos.y }, animation: false });
    });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const n = NODES.find(x => x.id === p.nodes[0]);
            if (n) document.getElementById('db').innerHTML = n.desc;
        }
    });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length) reset();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 35 });
    });
}

function reset() {
    document.getElementById('db').innerHTML =
        'Click any node to see its ISO 11179 definition or its concrete example.';
}

document.addEventListener('DOMContentLoaded', init);
