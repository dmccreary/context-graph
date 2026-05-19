// Process Discovery — derive directly-follows graph from event log
// CANVAS_HEIGHT: 560

let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const TEAL = '#00897b';

// Cases: list of activity sequences
const CASES = [
    { id: 'PO-001', activities: ['Submit', 'Review', 'Approve', 'Pay'] },
    { id: 'PO-002', activities: ['Submit', 'Review', 'Reject', 'Revise', 'Review', 'Approve', 'Pay'] },
    { id: 'PO-003', activities: ['Submit', 'Approve'] }
];

// Build the full event log as a flat sequence of (case, activity, transition-from)
const EVENTS = [];
for (const c of CASES) {
    for (let i = 0; i < c.activities.length; i++) {
        EVENTS.push({ caseId: c.id, act: c.activities[i], prev: i === 0 ? null : c.activities[i - 1] });
    }
}

// Activities (nodes) with fixed positions
const ACTIVITIES = {
    'Submit':  { x: 0.18, y: 0.50 },
    'Review':  { x: 0.40, y: 0.30 },
    'Approve': { x: 0.62, y: 0.50 },
    'Reject':  { x: 0.50, y: 0.78 },
    'Revise':  { x: 0.30, y: 0.78 },
    'Pay':     { x: 0.85, y: 0.50 }
};

let eventIdx = 0;
let autoTimer = null;
let isAuto = false;
let prevBtn, nextBtn, autoBtn, resetBtn;

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    prevBtn = createButton('◀ Previous'); prevBtn.parent(document.querySelector('main'));
    nextBtn = createButton('Next Event ▶'); nextBtn.parent(document.querySelector('main'));
    autoBtn = createButton('Auto-play'); autoBtn.parent(document.querySelector('main'));
    resetBtn = createButton('Reset'); resetBtn.parent(document.querySelector('main'));
    for (const b of [prevBtn, nextBtn, autoBtn, resetBtn]) {
        b.style('font-size','12px'); b.style('padding','7px 12px');
        b.style('border-radius','4px'); b.style('border','none');
        b.style('color','white'); b.style('font-weight','bold'); b.style('cursor','pointer');
    }
    prevBtn.style('background-color', '#757575');
    nextBtn.style('background-color', INDIGO);
    autoBtn.style('background-color', TEAL);
    resetBtn.style('background-color', '#9e9e9e');
    prevBtn.mousePressed(() => { if (eventIdx > 0) eventIdx--; });
    nextBtn.mousePressed(() => { if (eventIdx < EVENTS.length) eventIdx++; });
    autoBtn.mousePressed(toggleAuto);
    resetBtn.mousePressed(() => { eventIdx = 0; stopAuto(); });
    layoutControls();
    describe('Two-panel process discovery: the left panel shows an event log of three purchase order cases (PO-001, PO-002, PO-003); the right panel builds a directly-follows graph step by step as each event is processed. A deviant edge (Submit→Approve, skipping Review) is highlighted in orange.', LABEL);
}

function toggleAuto() {
    if (isAuto) { stopAuto(); return; }
    isAuto = true; autoBtn.html('Stop');
    tick();
}
function stopAuto() {
    isAuto = false; autoBtn.html('Auto-play');
    if (autoTimer) clearTimeout(autoTimer);
    autoTimer = null;
}
function tick() {
    if (!isAuto) return;
    if (eventIdx >= EVENTS.length) { stopAuto(); return; }
    eventIdx++;
    autoTimer = setTimeout(tick, 900);
}

function layoutControls() {
    prevBtn.position(margin, drawHeight + 15);
    nextBtn.position(margin + 100, drawHeight + 15);
    autoBtn.position(margin + 220, drawHeight + 15);
    resetBtn.position(margin + 310, drawHeight + 15);
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
    text('Process Discovery — Event ' + eventIdx + ' / ' + EVENTS.length, margin, 8);
    textStyle(NORMAL);

    const splitX = canvasWidth * 0.40;
    drawEventLog(margin, 32, splitX - margin - 6, drawHeight - 44);
    drawProcessGraph(splitX + 6, 32, canvasWidth - splitX - margin - 6, drawHeight - 44);
}

function drawEventLog(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#1a237e'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Event Log', x + 10, y + 8);
    textStyle(NORMAL);
    // Header row
    fill('#eceff1'); rect(x + 10, y + 28, w - 20, 18);
    fill('black'); textSize(10); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Case ID',  x + 14, y + 37);
    text('Activity', x + 90, y + 37);
    textStyle(NORMAL);
    // Rows
    const rowH = (h - 56) / EVENTS.length;
    for (let i = 0; i < EVENTS.length; i++) {
        const ry = y + 48 + i * rowH;
        const isPast = i < eventIdx;
        const isCurrent = i === eventIdx - 1;
        if (isCurrent) {
            fill('#fff8e1'); noStroke();
            rect(x + 10, ry, w - 20, rowH - 1);
        } else if (isPast) {
            fill('#e8eaf6'); noStroke();
            rect(x + 10, ry, w - 20, rowH - 1);
        }
        fill(isPast ? '#212121' : '#9e9e9e');
        textSize(10); textAlign(LEFT, CENTER);
        text(EVENTS[i].caseId, x + 14, ry + rowH / 2);
        text(EVENTS[i].act, x + 90, ry + rowH / 2);
    }
    pop();
}

function drawProcessGraph(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#1a237e'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Discovered Process Graph', x + 10, y + 8);
    textStyle(NORMAL);

    // Compute edge weights from processed events
    const weights = {};
    for (let i = 0; i < eventIdx; i++) {
        const e = EVENTS[i];
        if (e.prev) {
            const k = e.prev + '→' + e.act;
            weights[k] = (weights[k] || 0) + 1;
        }
    }

    // Identify active activities
    const seenActivities = new Set();
    for (let i = 0; i < eventIdx; i++) seenActivities.add(EVENTS[i].act);

    // Map activity name → screen position
    function pos(act) {
        const a = ACTIVITIES[act];
        return { px: x + 30 + a.x * (w - 60), py: y + 50 + a.y * (h - 70) };
    }

    // Edges
    for (const k of Object.keys(weights)) {
        const [from, to] = k.split('→');
        const wt = weights[k];
        const p1 = pos(from), p2 = pos(to);
        const isDeviant = (k === 'Submit→Approve');
        stroke(isDeviant ? ORANGE : '#90a4ae'); strokeWeight(1 + wt * 0.7);
        line(p1.px, p1.py, p2.px, p2.py);
        // Arrowhead
        const ang = atan2(p2.py - p1.py, p2.px - p1.px);
        push(); translate(p2.px - cos(ang) * 22, p2.py - sin(ang) * 22); rotate(ang);
        fill(isDeviant ? ORANGE : '#90a4ae'); noStroke();
        triangle(0, 0, -8, -4, -8, 4);
        pop();
        // Weight label
        noStroke(); fill('white');
        rect((p1.px + p2.px) / 2 - 10, (p1.py + p2.py) / 2 - 8, 20, 14, 3);
        fill(isDeviant ? ORANGE : '#37474f'); textSize(9); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(wt, (p1.px + p2.px) / 2, (p1.py + p2.py) / 2 - 1);
        textStyle(NORMAL);
    }

    // Nodes
    for (const act of Object.keys(ACTIVITIES)) {
        const p = pos(act);
        const active = seenActivities.has(act);
        stroke(active ? INDIGO : '#cfd8dc'); strokeWeight(2);
        fill(active ? '#c5cae9' : 'white');
        ellipse(p.px, p.py, 70, 30);
        noStroke();
        fill(active ? '#1a237e' : '#9e9e9e');
        textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(act, p.px, p.py);
        textStyle(NORMAL);
    }

    // Summary
    if (eventIdx >= EVENTS.length) {
        noStroke(); fill('#fff8e1'); stroke('#fbc02d');
        rect(x + 10, y + h - 50, w - 20, 36, 6);
        noStroke();
        fill('#bf6516'); textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
        text('Process discovered from 3 cases, ' + EVENTS.length + ' events.', x + 16, y + h - 44);
        textStyle(NORMAL);
        fill('#5d4037');
        text('1 conformance deviation: PO-003 skipped Review (Submit→Approve, orange).', x + 16, y + h - 28);
    }
    pop();
}
