// Metadata Catalog → Context Graph Flow (5-step pipeline)
// CANVAS_HEIGHT: 540

let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;

const STEEL = '#5b7fbd';
const TEAL = '#2a9d8f';
const INDIGO = '#3949ab';
const ARROW = '#e76f51';

let step = 0;
const MAX_STEP = 5;
let nextBtn, resetBtn;

const STEPS = [
  '0. Press "Next Step" to start the flow.',
  '1. Source systems store data across dozens of platforms.',
  '2. Schema crawler discovers structure (automated).',
  '3. Stewards review and approve business metadata (human-in-loop).',
  '4. Context graph ingests metadata as nodes and edges.',
  '5. Context graph adds decision history — the catalog cannot.'
];

const SOURCES = ['ERP', 'CRM', 'Data Warehouse', 'Streaming Events'];
const CATALOG = ['Schema Crawler', 'Business Terms', 'Quality Scores', 'Lineage Graph'];
const CG_NODES = ['Dataset Node', 'Quality Node', 'Owner Node', 'Decision Trace Node'];

function setup() {
  updateCanvasSize();
  const c = createCanvas(canvasWidth, canvasHeight);
  c.parent(document.querySelector('main'));
  textFont('Arial');
  nextBtn = createButton('Next Step'); nextBtn.parent(document.querySelector('main'));
  resetBtn = createButton('Reset');    resetBtn.parent(document.querySelector('main'));
  for (const b of [nextBtn, resetBtn]) {
    b.style('font-size','13px'); b.style('padding','7px 14px');
    b.style('border-radius','4px'); b.style('border','none');
    b.style('color','white'); b.style('font-weight','bold'); b.style('cursor','pointer');
  }
  nextBtn.style('background-color', INDIGO);
  resetBtn.style('background-color', '#757575');
  nextBtn.mousePressed(() => { if (step < MAX_STEP) step++; });
  resetBtn.mousePressed(() => { step = 0; });
  layoutControls();
  describe('Step-through pipeline showing how metadata flows from source systems through a metadata catalog into a context graph, with the context graph adding decision history as a final step.', LABEL);
}

function layoutControls() {
  nextBtn.position(margin, drawHeight + 15);
  resetBtn.position(margin + 110, drawHeight + 15);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function draw() {
  background('aliceblue');
  stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);
  noStroke(); fill('white'); rect(0,drawHeight,canvasWidth,controlHeight);
  stroke('silver'); noFill(); rect(0,drawHeight,canvasWidth,controlHeight);

  // Title
  noStroke(); fill('black');
  textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Step ' + step + ' of ' + MAX_STEP, margin, 8);
  textStyle(NORMAL);
  textSize(12); fill('#37474f');
  text(STEPS[step], margin + 110, 8, canvasWidth - margin - 120, 30);

  // Three panel positions
  const panelTop = 50;
  const panelBot = drawHeight - 12;
  const panelH = panelBot - panelTop;
  const panelW = (canvasWidth - 2 * margin - 40) / 3;
  drawPanel(margin, panelTop, panelW, panelH, STEEL, 'Source Systems', SOURCES, step >= 1);
  drawPanel(margin + panelW + 20, panelTop, panelW, panelH, TEAL, 'Metadata Catalog', CATALOG, step >= 2,
    step >= 3 ? [1] : []); // Highlight Business Terms at step 3
  drawCgPanel(margin + 2 * (panelW + 20), panelTop, panelW, panelH, step);

  // Arrows
  if (step >= 2) drawFlow(margin + panelW + 4, panelTop + panelH / 2, margin + panelW + 16, panelTop + panelH / 2);
  if (step >= 4) drawFlow(margin + 2 * panelW + 24, panelTop + panelH / 2, margin + 2 * panelW + 36, panelTop + panelH / 2);

  // Control area: step counter
  fill('black'); noStroke(); textSize(12); textAlign(LEFT, CENTER);
  text('Step ' + step + ' / ' + MAX_STEP, margin + 220, drawHeight + 30);

  // Step label below
  fill('#455a64'); textSize(11); textStyle(ITALIC);
  text(STEPS[step], margin + 300, drawHeight + 30, canvasWidth - 320, 30);
  textStyle(NORMAL);
}

function drawPanel(x, y, w, h, color, title, items, active, highlights = []) {
  push();
  noStroke();
  fill(active ? color : '#f5f5f5');
  rect(x, y, w, h, 8);
  fill(active ? 'white' : '#757575');
  textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
  text(title, x + 12, y + 10);
  textStyle(NORMAL);
  // Items
  const itemY = y + 38;
  const itemH = (h - 50) / items.length;
  for (let i = 0; i < items.length; i++) {
    const iy = itemY + i * itemH;
    const isHi = highlights.includes(i);
    if (isHi) {
      fill('#fff8e1'); stroke('#fbc02d'); strokeWeight(1.5);
    } else {
      fill(active ? 'rgba(255,255,255,0.85)' : 'white');
      stroke(active ? 'rgba(255,255,255,0.5)' : '#cfd8dc');
      strokeWeight(1);
    }
    rect(x + 10, iy, w - 20, itemH - 8, 4);
    noStroke();
    fill(active ? '#1a237e' : '#9e9e9e');
    textSize(12); textAlign(LEFT, CENTER);
    text(items[i], x + 20, iy + (itemH - 8) / 2);
    if (isHi) {
      fill('#bf6516'); textSize(9); textAlign(RIGHT, CENTER);
      text('human-in-loop', x + w - 16, iy + (itemH - 8) / 2);
    }
  }
  pop();
}

function drawCgPanel(x, y, w, h, currentStep) {
  push();
  const active = currentStep >= 4;
  noStroke();
  fill(active ? INDIGO : '#f5f5f5');
  rect(x, y, w, h, 8);
  fill(active ? 'white' : '#757575');
  textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Context Graph', x + 12, y + 10);
  textStyle(NORMAL);

  // Draw 4 nodes in a small graph layout
  const cx = x + w / 2;
  const cy = y + h / 2 + 4;
  const r = min(w, h) * 0.32;
  const positions = [
    { x: cx, y: cy - r * 0.7, label: CG_NODES[0] },        // Dataset top
    { x: cx - r * 0.85, y: cy + r * 0.3, label: CG_NODES[1] }, // Quality left
    { x: cx + r * 0.85, y: cy + r * 0.3, label: CG_NODES[2] }, // Owner right
    { x: cx, y: cy + r * 0.95, label: CG_NODES[3] }         // Decision Trace bottom (special)
  ];
  // Edges
  stroke(active ? 'white' : '#bdbdbd'); strokeWeight(1.5);
  for (let i = 1; i < 4; i++) line(positions[0].x, positions[0].y, positions[i].x, positions[i].y);

  // Nodes
  for (let i = 0; i < positions.length; i++) {
    const p = positions[i];
    const lit = (i < 3) ? (currentStep >= 4) : (currentStep >= 5);
    noStroke();
    fill(lit ? '#fff8e1' : (active ? 'rgba(255,255,255,0.85)' : 'white'));
    stroke(lit ? '#fbc02d' : (active ? '#1a237e' : '#cfd8dc'));
    strokeWeight(lit ? 2 : 1);
    ellipse(p.x, p.y, 70, 30);
    noStroke();
    fill(lit ? '#bf6516' : (active ? '#1a237e' : '#9e9e9e'));
    textSize(9); textAlign(CENTER, CENTER); textStyle(BOLD);
    text(p.label, p.x, p.y);
    textStyle(NORMAL);
  }
  pop();
}

function drawFlow(x1, y, x2, y2) {
  push();
  stroke(ARROW); strokeWeight(2);
  line(x1, y, x2, y2);
  fill(ARROW); noStroke();
  triangle(x2, y2, x2 - 6, y2 - 4, x2 - 6, y2 + 4);
  pop();
}
