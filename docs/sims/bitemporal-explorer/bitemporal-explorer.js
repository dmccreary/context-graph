// Bitemporal Explorer — 2D time grid with crosshair sliders
// CANVAS_HEIGHT: 600

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;
let sliderLeftMargin = 200;

const TEAL = '#00897b';
const GOLD = '#e9c46a';
const ORANGE = '#f57c00';
const INDIGO = '#3949ab';

// Time range: months from Jan 2024 (0) to Dec 2025 (23)
function monthLabel(m) {
    const yr = 2024 + Math.floor(m / 12);
    const mo = m % 12;
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][mo] + ' ' + yr;
}

// Records: valid_from, valid_to (exclusive), tt_from, tt_to (null = open)
const RECORDS = [
    { id: 'A', tier: 'Tier 2 (original)', desc: 'Tier 2 (original recording). This was the tier the database showed on this transaction date for this valid time.',
      vf: 0, vt: 5, tf: 1, tt: 7, color: TEAL },
    { id: 'B', tier: 'Tier 1 (upgrade)',  desc: 'Tier 1. This is the post-upgrade tier.',
      vf: 5, vt: 24, tf: 6, tt: 24, color: GOLD },
    { id: 'C', tier: 'Tier 2 (restated)', desc: 'Tier 2 (restated). The database was corrected in Aug 2024 to accurately reflect the tier for the Jan-May period.',
      vf: 0, vt: 5, tf: 7, tt: 24, color: ORANGE }
];

let validSlider, ttSlider;

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    validSlider = createSlider(0, 23, 9, 0.1);
    validSlider.parent(document.querySelector('main'));
    ttSlider = createSlider(0, 23, 14, 0.1);
    ttSlider.parent(document.querySelector('main'));
    layoutControls();
    describe('Two-dimensional time grid showing three credit-tier records as colored rectangles. The X-axis is valid time, the Y-axis is transaction time. Two sliders move a crosshair across the grid; the record at the crosshair intersection is the query result for that (valid time, transaction time) pair.', LABEL);
}

function layoutControls() {
    validSlider.position(sliderLeftMargin, drawHeight + 18);
    validSlider.size(canvasWidth - sliderLeftMargin - 30);
    ttSlider.position(sliderLeftMargin, drawHeight + 50);
    ttSlider.size(canvasWidth - sliderLeftMargin - 30);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function mapX(m, plotLeft, plotRight) { return plotLeft + (m / 24) * (plotRight - plotLeft); }
function mapY(m, plotTop, plotBot) { return plotBot - (m / 24) * (plotBot - plotTop); }

function recordAt(vt, tt) {
    for (const r of RECORDS) {
        if (vt >= r.vf && vt < r.vt && tt >= r.tf && tt < r.tt) return r;
    }
    return null;
}

function draw() {
    background('aliceblue');
    stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);
    noStroke(); fill('white'); rect(0,drawHeight,canvasWidth,controlHeight);
    stroke('silver'); noFill(); rect(0,drawHeight,canvasWidth,controlHeight);

    noStroke(); fill('black');
    textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Bitemporal — Valid Time × Transaction Time', margin, 8);
    textStyle(NORMAL);
    fill('#455a64'); textSize(10);
    text('Customer Credit Tier records. Drag sliders to query at any (valid, transaction) point.', margin, 28);

    // Plot area
    const plotLeft = margin + 80;
    const plotRight = canvasWidth - margin - 250;
    const plotTop = 52;
    const plotBot = drawHeight - 90;
    // Grid
    stroke('#cfd8dc'); strokeWeight(1);
    rect(plotLeft, plotTop, plotRight - plotLeft, plotBot - plotTop);
    for (let i = 1; i < 8; i++) {
        const px = plotLeft + i / 8 * (plotRight - plotLeft);
        stroke('#eceff1'); line(px, plotTop, px, plotBot);
        const py = plotBot - i / 8 * (plotBot - plotTop);
        line(plotLeft, py, plotRight, py);
    }
    // Axis labels
    noStroke(); fill('#455a64'); textSize(10); textAlign(CENTER, TOP);
    text('Valid Time → (when the fact was true)', (plotLeft + plotRight) / 2, plotBot + 12);
    push(); translate(margin + 14, (plotTop + plotBot) / 2); rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Transaction Time → (when the system knew)', 0, 0);
    pop();
    // Tick labels at corners
    textAlign(LEFT, TOP);
    text(monthLabel(0), plotLeft, plotBot + 28);
    textAlign(RIGHT, TOP);
    text(monthLabel(23), plotRight, plotBot + 28);
    textAlign(RIGHT, TOP);
    push(); translate(plotLeft - 8, plotTop); textAlign(RIGHT, TOP);
    text(monthLabel(23), 0, 0);
    pop();
    push(); translate(plotLeft - 8, plotBot - 10); textAlign(RIGHT, TOP);
    text(monthLabel(0), 0, 0);
    pop();

    // Record rectangles
    for (const r of RECORDS) {
        const x1 = mapX(r.vf, plotLeft, plotRight);
        const x2 = mapX(r.vt, plotLeft, plotRight);
        const y1 = mapY(r.tt, plotTop, plotBot);
        const y2 = mapY(r.tf, plotTop, plotBot);
        noStroke();
        fill(r.color + 'cc');
        rect(x1, y1, x2 - x1, y2 - y1);
        fill('black'); textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
        text(r.tier, x1 + 4, y1 + 4, x2 - x1 - 4, y2 - y1 - 4);
        textStyle(NORMAL);
    }

    // Crosshair
    const vt = validSlider.value();
    const tt = ttSlider.value();
    const cx = mapX(vt, plotLeft, plotRight);
    const cy = mapY(tt, plotTop, plotBot);
    stroke('#212121'); strokeWeight(1.5);
    drawingContext.setLineDash([4, 3]);
    line(cx, plotTop, cx, plotBot);
    line(plotLeft, cy, plotRight, cy);
    drawingContext.setLineDash([]);
    fill(INDIGO); stroke('#1a237e'); strokeWeight(2);
    ellipse(cx, cy, 12, 12);

    // Result panel
    const panelX = plotRight + 14;
    const panelW = canvasWidth - panelX - margin;
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(panelX, plotTop, panelW, plotBot - plotTop, 6);
    noStroke();
    fill(INDIGO); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Query result', panelX + 10, plotTop + 8);
    textStyle(NORMAL);
    const r = recordAt(vt, tt);
    fill('#455a64'); textSize(10);
    text('valid_time = ' + monthLabel(Math.floor(vt)), panelX + 10, plotTop + 30);
    text('transaction_time = ' + monthLabel(Math.floor(tt)), panelX + 10, plotTop + 44);
    if (r) {
        fill(r.color); textSize(14); textStyle(BOLD);
        text(r.tier, panelX + 10, plotTop + 66);
        textStyle(NORMAL);
        fill('#212121'); textSize(11);
        text(r.desc, panelX + 10, plotTop + 90, panelW - 20, plotBot - plotTop - 100);
    } else {
        fill('#9e9e9e'); textSize(12); textStyle(ITALIC);
        text('No record. This (valid_time, transaction_time) combination has no matching row.',
            panelX + 10, plotTop + 70, panelW - 20, plotBot - plotTop - 80);
        textStyle(NORMAL);
    }

    // Slider labels
    fill('black'); textSize(11); textAlign(LEFT, CENTER);
    text('Valid time: ' + monthLabel(Math.floor(vt)),       margin, drawHeight + 30);
    text('Transaction time: ' + monthLabel(Math.floor(tt)), margin, drawHeight + 62);
}
