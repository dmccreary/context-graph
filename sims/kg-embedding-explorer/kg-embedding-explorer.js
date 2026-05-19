// KG Embedding Space Explorer — 2D scatter with similarity threshold
// CANVAS_HEIGHT: 580

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;
let sliderLeftMargin = 200;

const TEAL = '#00897b';
const GOLD = '#e9c46a';
const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const STEEL = '#5b7fbd';

const POINTS = [
    // Cluster A — customers (teal)
    { x: 0.20, y: 0.80, label: 'Acme Corp',      type: 'Customer', color: TEAL },
    { x: 0.25, y: 0.72, label: 'GlobalTech Ltd', type: 'Customer', color: TEAL },
    { x: 0.18, y: 0.76, label: 'NordicMfg',      type: 'Customer', color: TEAL },
    // Cluster B — contracts (gold)
    { x: 0.35, y: 0.78, label: 'Acme MSA',         type: 'Contract', color: GOLD },
    { x: 0.40, y: 0.71, label: 'GlobalTech SLA',   type: 'Contract', color: GOLD },
    { x: 0.37, y: 0.80, label: 'NordicMfg Order',  type: 'Contract', color: GOLD },
    // Cluster C — policies (indigo)
    { x: 0.62, y: 0.35, label: 'Data Processing Policy',     type: 'Policy', color: INDIGO },
    { x: 0.68, y: 0.40, label: 'Information Security Policy', type: 'Policy', color: INDIGO },
    { x: 0.60, y: 0.42, label: 'Privacy Policy',              type: 'Policy', color: INDIGO },
    // Cluster D — incidents (orange)
    { x: 0.78, y: 0.20, label: 'Incident-447', type: 'Incident', color: ORANGE },
    { x: 0.82, y: 0.18, label: 'Incident-891', type: 'Incident', color: ORANGE },
    { x: 0.76, y: 0.25, label: 'Incident-332', type: 'Incident', color: ORANGE },
    // Bridging (steel diamonds)
    { x: 0.50, y: 0.50, label: 'IT Department', type: 'Bridge', color: STEEL, bridge: true },
    { x: 0.55, y: 0.45, label: 'Finance Team',  type: 'Bridge', color: STEEL, bridge: true }
];

let threshold = 0.20;
let threshSlider;
let selectedIdx = -1;

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    threshSlider = createSlider(0.0, 0.5, 0.20, 0.05);
    threshSlider.parent(document.querySelector('main'));
    threshSlider.input(() => { threshold = threshSlider.value(); });
    layoutControls();
    describe('Two-dimensional projection of knowledge-graph embeddings. Customers, Contracts, Policies, and Incidents cluster by semantic similarity. Bridging entities (IT, Finance) sit between clusters. Adjust the similarity threshold to draw edges between all pairs within that distance.', LABEL);
}

function layoutControls() {
    threshSlider.position(sliderLeftMargin, drawHeight + 18);
    threshSlider.size(canvasWidth - sliderLeftMargin - 30);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function mapX(rx) { return margin + 60 + rx * (canvasWidth - margin - 80 - margin); }
function mapY(ry) { return drawHeight - 90 - ry * (drawHeight - 90 - 50); }

function draw() {
    background('aliceblue');
    stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);
    noStroke(); fill('white'); rect(0,drawHeight,canvasWidth,controlHeight);
    stroke('silver'); noFill(); rect(0,drawHeight,canvasWidth,controlHeight);

    // Title
    noStroke(); fill('black');
    textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Knowledge Graph Embedding Space (2D projection)', margin, 8);
    textStyle(NORMAL);
    fill('#455a64'); textSize(10);
    text('Real embeddings have hundreds of dimensions; this view shows two for visualization.', margin, 28);

    // Plot frame and grid
    const plotLeft = margin + 60;
    const plotRight = canvasWidth - margin - 20;
    const plotTop = 50;
    const plotBot = drawHeight - 90;
    stroke('#cfd8dc'); strokeWeight(1);
    line(plotLeft, plotTop, plotLeft, plotBot);
    line(plotLeft, plotBot, plotRight, plotBot);
    // Grid lines
    stroke('#eceff1');
    for (let i = 1; i < 10; i++) {
        const px = plotLeft + i / 10 * (plotRight - plotLeft);
        line(px, plotTop, px, plotBot);
        const py = plotBot - i / 10 * (plotBot - plotTop);
        line(plotLeft, py, plotRight, py);
    }
    // Axis labels
    noStroke();
    fill('#455a64'); textSize(11); textAlign(CENTER, TOP);
    text('Embedding Dimension 1', (plotLeft + plotRight) / 2, plotBot + 8);
    push();
    translate(margin + 14, (plotTop + plotBot) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Embedding Dimension 2', 0, 0);
    pop();

    // Similarity edges
    stroke('#90a4ae'); strokeWeight(0.6);
    for (let i = 0; i < POINTS.length; i++) {
        for (let j = i + 1; j < POINTS.length; j++) {
            const d = sqrt(sq(POINTS[i].x - POINTS[j].x) + sq(POINTS[i].y - POINTS[j].y));
            if (d <= threshold) line(mapX(POINTS[i].x), mapY(POINTS[i].y), mapX(POINTS[j].x), mapY(POINTS[j].y));
        }
    }

    // Points
    let hoverIdx = -1;
    for (let i = 0; i < POINTS.length; i++) {
        const px = mapX(POINTS[i].x);
        const py = mapY(POINTS[i].y);
        if (dist(mouseX, mouseY, px, py) < 12) hoverIdx = i;
        noStroke();
        fill(POINTS[i].color);
        if (POINTS[i].bridge) {
            push(); translate(px, py); rotate(QUARTER_PI);
            rectMode(CENTER); rect(0, 0, 14, 14); pop();
        } else {
            ellipse(px, py, 14, 14);
        }
        if (i === selectedIdx) {
            noFill(); stroke('black'); strokeWeight(2); ellipse(px, py, 22, 22); noStroke();
        }
        fill('#37474f'); textSize(9); textAlign(LEFT, CENTER);
        text(POINTS[i].label, px + 10, py);
    }

    // Info panel
    drawInfoPanel(margin, drawHeight - 60, canvasWidth - 2 * margin, 50);

    // Control labels
    noStroke();
    fill('black'); textSize(12); textAlign(LEFT, CENTER);
    text('Similarity threshold: ' + nf(threshold, 1, 2), margin, drawHeight + 30);
}

function drawInfoPanel(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    if (selectedIdx < 0) {
        fill('#9e9e9e'); textSize(11); textAlign(LEFT, CENTER); textStyle(ITALIC);
        text('Click any point to inspect its nearest neighbors and why they cluster.', x + 12, y + h / 2);
        textStyle(NORMAL);
        pop();
        return;
    }
    const p = POINTS[selectedIdx];
    // Compute 2 nearest neighbors
    const dists = POINTS.map((q, i) => ({ i, d: i === selectedIdx ? Infinity : sqrt(sq(p.x - q.x) + sq(p.y - q.y)) }));
    dists.sort((a, b) => a.d - b.d);
    const nn = dists.slice(0, 2).map(e => POINTS[e.i]);

    fill(p.color); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text(p.label + ' (' + p.type + ')', x + 12, y + 6);
    textStyle(NORMAL);
    fill('#37474f'); textSize(10);
    text('Nearest: ' + nn.map(n => n.label).join(', ') +
         '   |   Why close: ' + reason(p, nn),
        x + 12, y + 24, w - 24, h - 30);
    pop();
}

function reason(p, nn) {
    if (p.bridge) return 'bridges multiple clusters — links cross-domain concepts.';
    const sameType = nn.filter(n => n.type === p.type).length;
    if (sameType === 2) return 'all three are of type "' + p.type + '" — same semantic role.';
    return 'mix of related types — embeddings capture cross-cluster affinities.';
}

function mousePressed() {
    if (mouseY > drawHeight) return;
    for (let i = 0; i < POINTS.length; i++) {
        const px = mapX(POINTS[i].x);
        const py = mapY(POINTS[i].y);
        if (dist(mouseX, mouseY, px, py) < 12) { selectedIdx = (selectedIdx === i) ? -1 : i; return; }
    }
}
