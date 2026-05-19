// Registry API Retrieval Flow — 4-stage grounded-context build-up
// CANVAS_HEIGHT: 600

let canvasWidth = 900;
let drawHeight = 530;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';

const STAGES = [
    { title: 'LLM Query',     body: '"What is Acme Corp\'s\nannual revenue?"' },
    { title: 'Context Graph', body: 'Customer {\n  id: ENT-00441872,\n  annual_revenue: 2100000,\n  revenue_field_id:\n    DE-CUST-REV-002\n}' },
    { title: 'Registry API',  body: 'GET /registry/data-elements/\n  DE-CUST-REV-002\n\n{\n  "name": "Customer Annual\n           Revenue USD TTM",\n  "version": "3.2",\n  "definition": "Recognized\n     revenue in USD\n     for trailing 12 months",\n  "value_domain":\n    {"type":"decimal","units":"USD"},\n  "approved": "2024-01-15"\n}' },
    { title: 'Grounded Context', body: 'Field: annual_revenue = 2,100,000\nDefinition: Recognized revenue in USD\n  for trailing 12 months\nUnits: USD | Version: 3.2\nAs of: 2024-01-15' }
];

const STEP_LABELS = [
    '0: Press "Next Step" to start',
    '1: Query received',
    '2: Field retrieved from context graph (with registry ID)',
    '3: Registry API called for definition',
    '4: Value + definition combined into grounded context'
];

let step = 0;
let showWhy = false;
let nextBtn, prevBtn, resetBtn, whyBtn;

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    prevBtn = createButton('◀ Previous'); prevBtn.parent(document.querySelector('main'));
    nextBtn = createButton('Next Step ▶'); nextBtn.parent(document.querySelector('main'));
    resetBtn = createButton('Reset');     resetBtn.parent(document.querySelector('main'));
    whyBtn = createButton('Why this matters'); whyBtn.parent(document.querySelector('main'));
    for (const b of [prevBtn, nextBtn, resetBtn, whyBtn]) {
        b.style('font-size','12px'); b.style('padding','7px 12px');
        b.style('border-radius','4px'); b.style('border','none');
        b.style('color','white'); b.style('font-weight','bold'); b.style('cursor','pointer');
    }
    prevBtn.style('background-color', '#757575');
    nextBtn.style('background-color', INDIGO);
    resetBtn.style('background-color', '#9e9e9e');
    whyBtn.style('background-color', ORANGE);
    prevBtn.mousePressed(() => { if (step > 0) step--; });
    nextBtn.mousePressed(() => { if (step < 4) step++; });
    resetBtn.mousePressed(() => { step = 0; showWhy = false; });
    whyBtn.mousePressed(() => { showWhy = !showWhy; });
    layoutControls();
    describe('Four-stage data flow showing a query passing through context graph and registry API to assemble a grounded context payload for the LLM. Click through the stages to see what data and metadata accumulate at each step.', LABEL);
}

function layoutControls() {
    prevBtn.position(margin, drawHeight + 15);
    nextBtn.position(margin + 110, drawHeight + 15);
    resetBtn.position(margin + 230, drawHeight + 15);
    whyBtn.position(margin + 310, drawHeight + 15);
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
    text('Step ' + step + ' / 4 — ' + STEP_LABELS[step], margin, 8);
    textStyle(NORMAL);

    // 4 stage boxes
    const panelTop = 34;
    const panelBot = drawHeight - 140;
    const panelH = panelBot - panelTop;
    const panelGap = 16;
    const panelW = (canvasWidth - 2 * margin - 3 * panelGap) / 4;
    for (let i = 0; i < 4; i++) {
        const x = margin + i * (panelW + panelGap);
        drawStage(x, panelTop, panelW, panelH, i);
        if (i < 3) {
            drawArrow(x + panelW, panelTop + panelH / 2, x + panelW + panelGap, panelTop + panelH / 2, step >= i + 1);
        }
    }

    // Why this matters
    if (showWhy) {
        drawWhyBox(margin, panelBot + 8, canvasWidth - 2 * margin, drawHeight - panelBot - 16);
    }
}

function drawStage(x, y, w, h, i) {
    push();
    const isActive = step > i;
    noStroke();
    fill(isActive ? 'white' : '#f5f5f5');
    stroke(isActive ? INDIGO : '#cfd8dc'); strokeWeight(isActive ? 2 : 1);
    rect(x, y, w, h, 6);
    noStroke();
    fill(isActive ? INDIGO : '#9e9e9e');
    textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text((i + 1) + '. ' + STAGES[i].title, x + 10, y + 8);
    textStyle(NORMAL);
    if (isActive) {
        fill('#212121'); textSize(10);
        text(STAGES[i].body, x + 10, y + 26, w - 18, h - 32);
    } else {
        fill('#bdbdbd'); textSize(10); textStyle(ITALIC);
        text('(awaiting...)', x + 12, y + 28);
        textStyle(NORMAL);
    }
    pop();
}

function drawArrow(x1, y1, x2, y2, active) {
    push();
    stroke(active ? ORANGE : '#cfd8dc'); strokeWeight(active ? 2.5 : 1.5);
    line(x1, y1, x2, y2);
    if (active) {
        fill(ORANGE); noStroke();
        triangle(x2, y2, x2 - 8, y2 - 5, x2 - 8, y2 + 5);
    }
    pop();
}

function drawWhyBox(x, y, w, h) {
    push();
    noStroke(); fill('#fff8e1'); stroke('#fbc02d'); strokeWeight(1.5);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#bf6516'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Why this matters', x + 12, y + 6);
    textStyle(NORMAL);
    fill('#37474f'); textSize(11);
    text('Without the registry lookup, the LLM receives only "2,100,000" with no context about units, time period, or whether it is gross or net revenue. With the registry definition, the LLM can answer accurately and caveat appropriately if the definition has changed.',
        x + 14, y + 26, w - 28, h - 30);
    pop();
}
