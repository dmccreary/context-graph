// Graph ETL Pipeline — 5-stage record progression
// CANVAS_HEIGHT: 580

let canvasWidth = 900;
let drawHeight = 510;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

const INDIGO = '#3949ab';
const TEAL = '#00897b';
const ORANGE = '#f57c00';
const RED = '#c62828';

const STAGES = [
    { name: 'Extract',  content: 'cust_id: 8821-B\nname: Acme Corp\nrev: $2.1M\nsys: CRM-legacy' },
    { name: 'Resolve',  content: 'canonical_id: ENT-00441872\nmatched via: email + name\nfuzzy confidence: 0.97' },
    { name: 'Transform', content: 'Node: Customer {\n  id: ENT-00441872,\n  name: "Acme Corp",\n  revenue_usd: 2100000,\n  label: "Customer"\n}' },
    { name: 'Validate', content: '✓ ID format: valid\n✓ Revenue > 0: true\n✓ Schema version: v2.4\n✓ No duplicate', failContent: '✗ Revenue = -500\n  (negative revenue invalid)\nACTION: flagged for steward\nNode NOT loaded' },
    { name: 'Load',     content: 'UPSERT Customer(ENT-00441872)\n  ✓ updated 2 properties\n  ✓ ingestion timestamp recorded' }
];

let stage = 0;
let failMode = false;
let prevBtn, nextBtn, resetBtn, failBtn;

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    prevBtn = createButton('◀ Previous'); prevBtn.parent(document.querySelector('main'));
    nextBtn = createButton('Next Stage ▶'); nextBtn.parent(document.querySelector('main'));
    resetBtn = createButton('Reset'); resetBtn.parent(document.querySelector('main'));
    failBtn = createButton('Simulate Validation Failure'); failBtn.parent(document.querySelector('main'));
    for (const b of [prevBtn, nextBtn, resetBtn, failBtn]) {
        b.style('font-size','12px'); b.style('padding','6px 12px');
        b.style('border-radius','4px'); b.style('border','none');
        b.style('color','white'); b.style('font-weight','bold'); b.style('cursor','pointer');
    }
    prevBtn.style('background-color', '#757575');
    nextBtn.style('background-color', INDIGO);
    resetBtn.style('background-color', '#9e9e9e');
    failBtn.style('background-color', TEAL);
    prevBtn.mousePressed(() => { if (stage > 0) stage--; });
    nextBtn.mousePressed(() => {
        if (failMode && stage === 3) return; // blocked at validate
        if (stage < STAGES.length - 1) stage++;
    });
    resetBtn.mousePressed(() => { stage = 0; });
    failBtn.mousePressed(() => { failMode = !failMode; styleFail(); });
    styleFail();
    layoutControls();
    describe('Interactive 5-stage ETL pipeline showing how a Customer record transforms from raw CRM format to a fully validated graph node. A failure toggle demonstrates how invalid records are quarantined at the validate stage.', LABEL);
}

function styleFail() {
    failBtn.style('background-color', failMode ? RED : TEAL);
    failBtn.html(failMode ? 'Fail mode ON — click to disable' : 'Simulate Validation Failure');
}

function layoutControls() {
    prevBtn.position(margin, drawHeight + 14);
    nextBtn.position(margin + 100, drawHeight + 14);
    resetBtn.position(margin + 220, drawHeight + 14);
    failBtn.position(margin + 300, drawHeight + 14);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function draw() {
    background('aliceblue');
    stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);
    noStroke(); fill('white'); rect(0,drawHeight,canvasWidth,controlHeight);
    stroke('silver'); noFill(); rect(0,drawHeight,canvasWidth,controlHeight);

    noStroke(); fill('black');
    textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Graph ETL Pipeline — Customer Record at Stage ' + (stage + 1) + ' / 5: ' + STAGES[stage].name, margin, 8);
    textStyle(NORMAL);

    // Progress bar
    const progY = 38;
    const progLeft = margin;
    const progRight = canvasWidth - margin;
    const progW = progRight - progLeft;
    noStroke(); fill('#eceff1');
    rect(progLeft, progY, progW, 14, 6);
    const fillW = ((stage + 1) / 5) * progW;
    fill(failMode && stage >= 3 ? RED : INDIGO);
    rect(progLeft, progY, fillW, 14, 6);

    // 5 stage boxes
    const stageTop = 64;
    const stageBot = drawHeight - 110;
    const stageH = stageBot - stageTop;
    const stageW = (progW - 4 * 14) / 5;
    for (let i = 0; i < 5; i++) {
        const x = progLeft + i * (stageW + 14);
        drawStage(x, stageTop, stageW, stageH, i);
    }

    // Record card
    const cardTop = stageBot + 20;
    const cardH = 90;
    drawCard(progLeft, cardTop, progW, cardH);
}

function drawStage(x, y, w, h, i) {
    push();
    const isActive = i === stage;
    const isPast = i < stage;
    const isFail = failMode && i === 3 && stage >= 3;
    let bg, fg;
    if (isFail) { bg = '#ffebee'; fg = RED; }
    else if (isActive) { bg = INDIGO; fg = 'white'; }
    else if (isPast) { bg = '#e8eaf6'; fg = INDIGO; }
    else { bg = 'white'; fg = '#9e9e9e'; }

    noStroke(); fill(bg); stroke(isFail ? RED : (isActive ? '#1a237e' : '#cfd8dc')); strokeWeight(isActive ? 2 : 1);
    rect(x, y, w, h, 8);
    noStroke();
    fill(fg); textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
    text((i + 1) + '. ' + STAGES[i].name, x + w / 2, y + 10);
    textStyle(NORMAL);
    // Mini diagram of the stage transform
    fill(fg); textSize(9); textAlign(CENTER, CENTER);
    text(stageBullet(i), x + w / 2, y + h / 2);
    pop();
}

function stageBullet(i) {
    return ['Pull raw record\nfrom source', 'Match to\ncanonical id', 'Reshape into\ngraph node', 'Apply\nquality rules', 'UPSERT into\nknowledge graph'][i];
}

function drawCard(x, y, w, h) {
    push();
    const failActive = failMode && stage === 3;
    noStroke(); fill(failActive ? '#ffebee' : 'white'); stroke(failActive ? RED : INDIGO); strokeWeight(2);
    rect(x, y, w, h, 6);
    noStroke();
    fill(failActive ? RED : INDIGO);
    textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Record at Stage ' + (stage + 1) + ': ' + STAGES[stage].name, x + 12, y + 8);
    textStyle(NORMAL);
    fill('#212121'); textSize(11); textAlign(LEFT, TOP);
    const content = failActive ? STAGES[stage].failContent : STAGES[stage].content;
    text(content, x + 14, y + 28, w - 24, h - 32);
    pop();
}
