// Hybrid Retrieval Pipeline — 5 stages, step-through
// CANVAS_HEIGHT: 580

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;

const INDIGO = '#3949ab';
const STEEL = '#5b7fbd';
const ORANGE = '#f57c00';

const STAGES = [
    { name: 'Query Interpretation', latency: 8,  body: '"Pricing exception\nprecedents for Acme\nCorp Q4 renewal"\n\n→ {entity_id:\n    ENT-00441872,\n   decision_type:\n    pricing_exception,\n   recency: 24mo}',
      detail: 'Parses natural language into structured spec. Latency budget: <10ms. Failure mode: spec misses important entity or decision_type → wrong candidate set.' },
    { name: 'Graph Traversal',      latency: 18, body: 'Entity-linked\ntraces found: 12\n\nFollows APPLIES_TO\nfrom Acme to all\ndecisions, filters by\nrecency.',
      detail: 'Multi-hop graph walk starting from the entity. Latency budget: <20ms. Failure mode: missing edges or stale entity resolution → false negatives.' },
    { name: 'Vector Search',        latency: 26, body: 'Semantically similar\ntraces: 23\n\nCombined candidate\nset: 35 (graph ∪ vec)',
      detail: 'Embedding-similarity search adds traces that weren\'t found via direct edges. Latency budget: <30ms. Failure mode: low-quality embeddings → noisy candidates.' },
    { name: 'First-Pass Ranking',   latency: 16, body: 'Composite score:\n  0.4·graph_score +\n  0.3·vec_score +\n  0.2·recency +\n  0.1·authority\n\nTop 15 retained.',
      detail: 'Cheap composite reranker reduces candidates to top-K for the expensive cross-encoder. Latency budget: <20ms. Failure mode: wrong score weights mute important signals.' },
    { name: 'Cross-Encoder Rerank', latency: 42, body: 'Cross-encoder applied.\nTop 5 selected.\n\nFinal context injected\ninto prompt.',
      detail: 'Pairwise (query, candidate) scoring with a small neural reranker. Latency budget: <50ms. Failure mode: reranker has its own training distribution — investigate when good candidates rank low.' }
];

let stage = 0;
let prevBtn, nextBtn, resetBtn;
let selectedDetail = -1;

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    prevBtn = createButton('◀ Previous'); prevBtn.parent(document.querySelector('main'));
    nextBtn = createButton('Next Stage ▶'); nextBtn.parent(document.querySelector('main'));
    resetBtn = createButton('Reset'); resetBtn.parent(document.querySelector('main'));
    for (const b of [prevBtn, nextBtn, resetBtn]) {
        b.style('font-size','12px'); b.style('padding','7px 12px');
        b.style('border-radius','4px'); b.style('border','none');
        b.style('color','white'); b.style('font-weight','bold'); b.style('cursor','pointer');
    }
    prevBtn.style('background-color', STEEL);
    nextBtn.style('background-color', INDIGO);
    resetBtn.style('background-color', '#9e9e9e');
    prevBtn.mousePressed(() => { if (stage > 0) stage--; });
    nextBtn.mousePressed(() => { if (stage < 5) stage++; });
    resetBtn.mousePressed(() => { stage = 0; selectedDetail = -1; });
    layoutControls();
    describe('Five-stage hybrid retrieval pipeline. Each stage box shows what it computes, candidate counts at that stage, and is clickable for latency budget and failure-mode details.', LABEL);
}

function layoutControls() {
    prevBtn.position(margin, drawHeight + 14);
    nextBtn.position(margin + 110, drawHeight + 14);
    resetBtn.position(margin + 230, drawHeight + 14);
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
    text('Hybrid Retrieval — Stage ' + stage + ' / 5', margin, 8);
    textStyle(NORMAL);

    // Stages
    const stageY = 36;
    const stageH = 250;
    const gap = 8;
    const stageW = (canvasWidth - 2 * margin - 4 * gap) / 5;
    for (let i = 0; i < 5; i++) {
        const x = margin + i * (stageW + gap);
        drawStage(x, stageY, stageW, stageH, i);
        if (i < 4) {
            drawArrow(x + stageW, stageY + stageH / 2, x + stageW + gap, stageY + stageH / 2, stage > i);
        }
    }

    // Cumulative latency tracker
    let totalLat = 0;
    for (let i = 0; i < stage; i++) totalLat += STAGES[i].latency;
    const latX = canvasWidth - margin - 220;
    const latY = stageY + stageH + 12;
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(latX, latY, 220, 30, 6);
    noStroke();
    fill(totalLat > 150 ? '#c62828' : '#1a237e'); textSize(11); textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text('Cumulative latency: ' + totalLat + ' / 150 ms', latX + 10, latY + 15);
    textStyle(NORMAL);

    // Detail panel
    const detTop = stageY + stageH + 50;
    drawDetail(margin, detTop, canvasWidth - 2 * margin, drawHeight - detTop - 14);
}

function drawStage(x, y, w, h, i) {
    push();
    const isActive = stage > i;
    noStroke();
    fill(isActive ? 'white' : '#f5f5f5');
    stroke(isActive ? INDIGO : '#cfd8dc'); strokeWeight(isActive ? 2 : 1);
    rect(x, y, w, h, 6);
    noStroke();
    fill(isActive ? INDIGO : '#9e9e9e');
    textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text((i + 1) + '. ' + STAGES[i].name, x + 8, y + 8);
    textStyle(NORMAL);
    fill('#9e9e9e'); textSize(9);
    text('< ' + STAGES[i].latency + 'ms', x + 8, y + 24);
    fill(isActive ? '#212121' : '#bdbdbd');
    textSize(10);
    text(STAGES[i].body, x + 10, y + 44, w - 20, h - 50);
    pop();

    // Hit test for click → set selected detail
    if (mouseInRect(x, y, w, h) && mouseIsPressed && mouseY < drawHeight - 4 && !window._clickConsumed) {
        selectedDetail = i;
        window._clickConsumed = true;
    }
}

function mouseReleased() { window._clickConsumed = false; }
function mouseInRect(x, y, w, h) { return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h; }

function drawArrow(x1, y1, x2, y2, active) {
    push();
    stroke(active ? ORANGE : '#cfd8dc'); strokeWeight(active ? 2 : 1.2);
    line(x1, y1, x2, y2);
    if (active) {
        fill(ORANGE); noStroke();
        triangle(x2, y2, x2 - 6, y2 - 4, x2 - 6, y2 + 4);
    }
    pop();
}

function drawDetail(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill(INDIGO); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Stage detail', x + 12, y + 8);
    textStyle(NORMAL);
    if (selectedDetail < 0) {
        fill('#9e9e9e'); textSize(11); textStyle(ITALIC);
        text('Click any stage box above to see what it computes, its latency budget, and the typical failure mode for that stage.',
            x + 14, y + 28, w - 28, h - 32);
        textStyle(NORMAL);
    } else {
        const s = STAGES[selectedDetail];
        fill('#1a237e'); textSize(11); textStyle(BOLD);
        text(s.name + ' (Stage ' + (selectedDetail + 1) + ')', x + 14, y + 28);
        textStyle(NORMAL);
        fill('#212121'); textSize(10);
        text(s.detail, x + 14, y + 46, w - 28, h - 52);
    }
    pop();
}
