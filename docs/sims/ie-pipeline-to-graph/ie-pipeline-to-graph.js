// Information Extraction Pipeline to Graph — 3-stage NER → disambiguate → relations
// CANVAS_HEIGHT: 620

let canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

const INDIGO = '#3949ab';
const TEAL = '#00897b';
const GOLD = '#e9c46a';
const ORANGE = '#f57c00';

const SENTENCE = 'The contract between Acme Corp and the Infrastructure Team expires on December 31st and is governed by the Data Processing Policy v2.1.';

// Highlighted entity spans (start, end indices in SENTENCE, type, canonical mapping)
const SPANS = [
    { text: 'Acme Corp',                  type: 'Org',  color: TEAL,    canon: 'Customer ENT-00441872' },
    { text: 'Infrastructure Team',        type: 'Org',  color: TEAL,    canon: 'Department DEPT-INFRA-07' },
    { text: 'December 31st',              type: 'Date', color: GOLD,    canon: 'Date 2025-12-31' },
    { text: 'Data Processing Policy v2.1', type: 'Doc', color: INDIGO,  canon: 'Policy POL-DPP-021' }
];

const TRIPLES = [
    { s: 'Contract C-889', p: 'PARTY_A',     o: 'ENT-00441872',  color: TEAL },
    { s: 'Contract C-889', p: 'PARTY_B',     o: 'DEPT-INFRA-07', color: TEAL },
    { s: 'Contract C-889', p: 'EXPIRES_ON',  o: '2025-12-31',    color: GOLD },
    { s: 'Contract C-889', p: 'GOVERNED_BY', o: 'POL-DPP-021',   color: INDIGO }
];

let stage = 0;
const MAX_STAGE = 3;
let prevBtn, nextBtn, loadBtn;
let loadPulse = 0; // pulse counter when Load to Graph clicked

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    prevBtn = createButton('◀ Previous'); prevBtn.parent(document.querySelector('main'));
    nextBtn = createButton('Next Stage ▶'); nextBtn.parent(document.querySelector('main'));
    loadBtn = createButton('Load to Graph'); loadBtn.parent(document.querySelector('main'));
    for (const b of [prevBtn, nextBtn, loadBtn]) {
        b.style('font-size','12px'); b.style('padding','7px 12px');
        b.style('border-radius','4px'); b.style('border','none');
        b.style('color','white'); b.style('font-weight','bold'); b.style('cursor','pointer');
    }
    prevBtn.style('background-color', '#757575');
    nextBtn.style('background-color', INDIGO);
    loadBtn.style('background-color', ORANGE);
    prevBtn.mousePressed(() => { if (stage > 0) stage--; });
    nextBtn.mousePressed(() => { if (stage < MAX_STAGE) stage++; });
    loadBtn.mousePressed(() => { if (stage === MAX_STAGE) loadPulse = 60; });
    layoutControls();
    describe('Three-stage information extraction pipeline: a sentence is annotated with named entities (stage 1), entities resolved to canonical IDs (stage 2), and relations extracted into RDF-style triples (stage 3). Final mini-graph shows the resulting node-edge structure.', LABEL);
}

function layoutControls() {
    prevBtn.position(margin, drawHeight + 14);
    nextBtn.position(margin + 110, drawHeight + 14);
    loadBtn.position(margin + 230, drawHeight + 14);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function draw() {
    background('aliceblue');
    stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);
    noStroke(); fill('white'); rect(0,drawHeight,canvasWidth,controlHeight);
    stroke('silver'); noFill(); rect(0,drawHeight,canvasWidth,controlHeight);

    noStroke(); fill('black');
    textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Information Extraction Pipeline — Stage ' + stage + ' / ' + MAX_STAGE, margin, 8);
    textStyle(NORMAL);

    // Text panel
    drawTextPanel(margin, 32, canvasWidth - 2 * margin, 100);
    // Three stage columns
    drawStageColumns(margin, 142, canvasWidth - 2 * margin, 230);
    // Graph output panel
    drawGraphPanel(margin, 380, canvasWidth - 2 * margin, drawHeight - 380 - 12);

    if (loadPulse > 0) loadPulse--;
}

function drawTextPanel(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#1a237e'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Input sentence', x + 12, y + 8);
    textStyle(NORMAL);

    // Render with span highlights when stage >= 1
    textSize(13); textAlign(LEFT, TOP);
    fill('#212121');
    if (stage === 0) {
        text(SENTENCE, x + 14, y + 28, w - 28, h - 32);
    } else {
        // Render token-aware: split sentence at span boundaries, color spans
        let cursor = 0;
        const segments = [];
        for (const span of SPANS) {
            const idx = SENTENCE.indexOf(span.text, cursor);
            if (idx === -1) continue;
            if (idx > cursor) segments.push({ text: SENTENCE.substring(cursor, idx), highlight: false });
            segments.push({ text: span.text, highlight: true, color: span.color });
            cursor = idx + span.text.length;
        }
        if (cursor < SENTENCE.length) segments.push({ text: SENTENCE.substring(cursor), highlight: false });

        // Layout text with wrapping
        let cx = x + 14, cy = y + 30;
        const right = x + w - 14;
        for (const seg of segments) {
            const words = seg.text.split(/(\s+)/);
            for (const wd of words) {
                const ww = textWidth(wd);
                if (cx + ww > right) { cx = x + 14; cy += 22; }
                if (seg.highlight) {
                    noStroke(); fill(seg.color); rect(cx - 1, cy + 14, ww + 2, 3);
                    fill(seg.color); textStyle(BOLD);
                    text(wd, cx, cy);
                    textStyle(NORMAL);
                } else {
                    fill('#212121');
                    text(wd, cx, cy);
                }
                cx += ww;
            }
        }
    }
    pop();
}

function drawStageColumns(x, y, w, h) {
    const colW = (w - 24) / 3;
    drawStageCol(x, y, colW, h, 0, 'Stage 1: NER',
        stage >= 1 ? SPANS.map(s => '• [' + s.type + '] ' + s.text).join('\n') : '');
    drawStageCol(x + colW + 12, y, colW, h, 1, 'Stage 2: Disambiguation',
        stage >= 2 ? SPANS.map(s => '• ' + s.text + '\n  → ' + s.canon).join('\n\n') : '');
    drawStageCol(x + 2 * (colW + 12), y, colW, h, 2, 'Stage 3: Relation Extraction',
        stage >= 3 ? TRIPLES.map(t => '(' + t.s + ',\n  ' + t.p + ',\n  ' + t.o + ')').join('\n\n') : '');
}

function drawStageCol(x, y, w, h, i, title, body) {
    const isActive = stage > i;
    push();
    noStroke();
    fill(isActive ? 'white' : '#f5f5f5');
    stroke(isActive ? INDIGO : '#cfd8dc'); strokeWeight(isActive ? 1.5 : 1);
    rect(x, y, w, h, 6);
    noStroke();
    fill(isActive ? INDIGO : '#9e9e9e');
    textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text(title, x + 10, y + 8);
    textStyle(NORMAL);
    fill('#212121'); textSize(10);
    text(body, x + 12, y + 30, w - 20, h - 34);
    pop();
}

function drawGraphPanel(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#1a237e'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Resulting Graph (5 nodes, 4 edges)', x + 12, y + 8);
    textStyle(NORMAL);

    if (stage < MAX_STAGE) {
        fill('#9e9e9e'); textSize(11); textAlign(LEFT, TOP);
        text('Advance to Stage 3 to see the extracted graph.', x + 14, y + 30);
        pop();
        return;
    }
    // Draw 5 nodes: center contract + 4 entities
    const cx = x + w / 2;
    const cy = y + h / 2 + 4;
    const r = min(w, h) * 0.35;
    const positions = [
        { x: cx, y: cy, label: 'Contract C-889', color: ORANGE, isCenter: true },
        { x: cx - r * 0.95, y: cy - r * 0.45, label: 'ENT-00441872', color: TEAL, edge: 'PARTY_A' },
        { x: cx - r * 0.95, y: cy + r * 0.45, label: 'DEPT-INFRA-07', color: TEAL, edge: 'PARTY_B' },
        { x: cx + r * 0.95, y: cy - r * 0.45, label: '2025-12-31', color: GOLD, edge: 'EXPIRES_ON' },
        { x: cx + r * 0.95, y: cy + r * 0.45, label: 'POL-DPP-021', color: INDIGO, edge: 'GOVERNED_BY' }
    ];

    // Edges
    stroke('#90a4ae'); strokeWeight(1.5);
    for (let i = 1; i < positions.length; i++) {
        line(positions[0].x, positions[0].y, positions[i].x, positions[i].y);
        // Edge label
        const mx = (positions[0].x + positions[i].x) / 2;
        const my = (positions[0].y + positions[i].y) / 2;
        noStroke(); fill('white');
        const lw = textWidth(positions[i].edge) + 8;
        rect(mx - lw / 2, my - 6, lw, 12, 3);
        fill('#546e7a'); textSize(9); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(positions[i].edge, mx, my);
        textStyle(NORMAL);
        stroke('#90a4ae'); strokeWeight(1.5);
    }
    noStroke();
    // Nodes
    for (const p of positions) {
        const pulsing = loadPulse > 0;
        let nr = p.isCenter ? 30 : 24;
        if (pulsing) nr += 4 * sin(loadPulse / 6);
        stroke(p.color); strokeWeight(pulsing ? 3 : 2);
        fill('white'); ellipse(p.x, p.y, nr * 2, nr * 2);
        noStroke();
        fill(p.color); textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(p.label, p.x, p.y);
        textStyle(NORMAL);
    }
    pop();
}
