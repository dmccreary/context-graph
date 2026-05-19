// Query Federation Flow — 5-level step-through workflow
// CANVAS_HEIGHT: 580

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const TEAL = '#00897b';
const LIGHT = '#eceff1';

let nextBtn, runBtn, resetBtn;
let currentStage = 0;
const MAX_STAGE = 5;
let runTimer = null;
let isRunning = false;

let hoverText = '';
let hoverX = 0, hoverY = 0;

const SOURCES = [
  { name: 'HR System',     sub: 'SELECT * FROM hr.headcount_req WHERE status="open" AND dept_id IN (?)', fmt: 'SQL result set (12 rows × 6 cols)', color: ORANGE },
  { name: 'Finance System', sub: 'GET /api/budgets?dept=engineering&status=approved', fmt: 'JSON array (8 budget objects)', color: ORANGE },
  { name: 'Org Chart',      sub: "MATCH (d:Dept {name:'Engineering'})<-[:BELONGS_TO*]-(e) RETURN id(e)", fmt: 'Graph path list (47 employee IDs)', color: ORANGE }
];

function setup() {
  updateCanvasSize();
  const c = createCanvas(canvasWidth, canvasHeight);
  c.parent(document.querySelector('main'));
  textFont('Arial');
  nextBtn = createButton('Next Step'); nextBtn.parent(document.querySelector('main'));
  runBtn = createButton('Run All');    runBtn.parent(document.querySelector('main'));
  resetBtn = createButton('Reset');    resetBtn.parent(document.querySelector('main'));
  for (const b of [nextBtn, runBtn, resetBtn]) {
    b.style('font-size', '13px'); b.style('padding', '7px 14px');
    b.style('border-radius', '4px'); b.style('border', 'none');
    b.style('background-color', INDIGO); b.style('color', 'white');
    b.style('font-weight', 'bold'); b.style('cursor', 'pointer');
  }
  resetBtn.style('background-color', '#757575');
  nextBtn.mousePressed(() => { advance(); });
  runBtn.mousePressed(toggleRun);
  resetBtn.mousePressed(reset);
  layoutControls();
  describe('Step-through visualization of a federated query: a business question flows through the federation engine, gets decomposed into three sub-queries (SQL, REST, graph), each source returns partial results, and the engine joins them into a final answer.', LABEL);
}

function layoutControls() {
  nextBtn.position(margin, drawHeight + 15);
  runBtn.position(margin + 110, drawHeight + 15);
  resetBtn.position(margin + 210, drawHeight + 15);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function advance() { if (currentStage < MAX_STAGE) currentStage++; }
function reset() { currentStage = 0; isRunning = false; if (runTimer) clearTimeout(runTimer); runTimer = null; runBtn.html('Run All'); }
function toggleRun() {
  if (isRunning) { isRunning = false; runBtn.html('Run All'); if (runTimer) clearTimeout(runTimer); return; }
  isRunning = true; runBtn.html('Stop'); tick();
}
function tick() {
  if (!isRunning) return;
  if (currentStage >= MAX_STAGE) { isRunning = false; runBtn.html('Run All'); return; }
  advance();
  runTimer = setTimeout(tick, 700);
}

function draw() {
  background('aliceblue');
  hoverText = '';
  noStroke(); fill('aliceblue'); stroke('silver'); rect(0, 0, canvasWidth, drawHeight);
  noStroke(); fill('white'); rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver'); noFill(); rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Federated Query Flow — Stage ' + currentStage + ' / ' + MAX_STAGE, margin, 8);
  textStyle(NORMAL);

  const left = margin + 10;
  const right = canvasWidth - margin - 10;
  const top = 32;
  const bottom = drawHeight - 12;
  const levelH = (bottom - top) / 5;

  // Level 1: User / business question (active when stage >= 1)
  drawLevel1(left, top, right, top + levelH);
  drawArrow(canvasWidth / 2, top + levelH - 6, canvasWidth / 2, top + levelH + 10, currentStage >= 1, 'Submit business query', 'Natural-language query string');

  // Level 2: Federation engine
  drawLevel2(left, top + levelH + 12, right, top + 2 * levelH);
  // Three arrows from L2 to L3
  const l2bottom = top + 2 * levelH - 4;
  const l3top = top + 2 * levelH + 14;
  const colWidth = (right - left) / 3;
  for (let i = 0; i < 3; i++) {
    const x = left + colWidth * (i + 0.5);
    drawArrow(canvasWidth / 2, l2bottom, x, l3top - 2, currentStage >= 2,
      'Sub-query ' + (i + 1) + ' (' + ['SQL', 'REST API', 'Graph traverse'][i] + ')',
      ['Parameterized SQL string', 'HTTP GET URL', 'Cypher MATCH pattern'][i]);
  }

  // Level 3: Three sources
  drawLevel3(left, l3top, right, l3top + levelH);
  // Level 3->4 arrows
  for (let i = 0; i < 3; i++) {
    const x = left + colWidth * (i + 0.5);
    drawArrow(x, l3top + levelH - 4, x, l3top + levelH + 12, currentStage >= 3, 'Partial result', SOURCES[i].fmt);
  }
  // Level 4: result boxes (overlay below sources)
  drawLevel4(left, l3top + levelH + 14, right, l3top + 2 * levelH);
  // Three arrows merging
  const l5y = l3top + 2 * levelH + 18;
  for (let i = 0; i < 3; i++) {
    const x = left + colWidth * (i + 0.5);
    drawArrow(x, l3top + 2 * levelH - 4, canvasWidth / 2, l5y - 2, currentStage >= 4, 'Merge + join', 'Joined on employee_id');
  }
  // Level 5: final answer
  drawLevel5(left + (right - left) * 0.2, l5y, right - (right - left) * 0.2, bottom);

  if (hoverText) drawTooltip(hoverX, hoverY, hoverText);
}

function drawLevel1(l, t, r, b) {
  const active = currentStage >= 1;
  drawBox(l + (r - l) * 0.15, t + 4, (r - l) * 0.7, (b - t) - 8, INDIGO, active, 'User / LLM',
    'What is the total approved budget for open headcount requests in Engineering?');
}
function drawLevel2(l, t, r, b) {
  const active = currentStage >= 2;
  drawBox(l + (r - l) * 0.18, t + 2, (r - l) * 0.64, (b - t) - 4, TEAL, active, 'Federation Engine',
    'Parses NL query → resolves entities → decomposes into 3 source-specific sub-queries');
}
function drawLevel3(l, t, r, b) {
  const active = currentStage >= 3;
  const cw = (r - l) / 3;
  for (let i = 0; i < 3; i++) {
    const x = l + i * cw + 6;
    const w = cw - 12;
    const src = SOURCES[i];
    drawBox(x, t + 2, w, (b - t) - 4, src.color, active, src.name, currentStage >= 2 ? src.sub : '');
  }
}
function drawLevel4(l, t, r, b) {
  const active = currentStage >= 4;
  const cw = (r - l) / 3;
  const labels = ['12 rows returned', '8 budget objects', '47 employee IDs'];
  for (let i = 0; i < 3; i++) {
    const x = l + i * cw + 6;
    const w = cw - 12;
    drawBox(x, t + 2, w, (b - t) - 4, '#90a4ae', active, 'Result ' + (i + 1), active ? labels[i] : '');
  }
}
function drawLevel5(l, t, r, b) {
  const active = currentStage >= 5;
  drawBox(l, t, r - l, b - t, INDIGO, active, 'Joined Result',
    active ? 'Total approved budget for open Engineering headcount: $4.3M (8 budgets across 12 requests, joined on employee_id)' : '');
}

function drawBox(x, y, w, h, color, active, title, body) {
  push();
  if (active) {
    fill(color);
    stroke('black'); strokeWeight(1.5);
  } else {
    fill('#f5f5f5');
    stroke('#bdbdbd'); strokeWeight(1);
  }
  rect(x, y, w, h, 6);
  noStroke();
  // Title bar
  fill(active ? 'white' : '#616161');
  textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
  text(title, x + 8, y + 4);
  textStyle(NORMAL);
  // Body text
  fill(active ? 'white' : '#9e9e9e');
  textSize(10);
  text(body || '', x + 8, y + 22, w - 16, h - 26);
  pop();
}

function drawArrow(x1, y1, x2, y2, active, label, hoverDetail) {
  push();
  const c = active ? INDIGO : '#cfd8dc';
  stroke(c); strokeWeight(active ? 2 : 1.2);
  line(x1, y1, x2, y2);
  // Arrowhead
  const ang = atan2(y2 - y1, x2 - x1);
  fill(c); noStroke();
  translate(x2, y2); rotate(ang);
  triangle(0, 0, -8, -4, -8, 4);
  pop();
  // Label
  if (active && label) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    noStroke(); fill('white');
    const labelW = textWidth(label) + 10;
    rect(midX - labelW / 2, midY - 8, labelW, 16, 3);
    fill(INDIGO);
    textSize(9); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(label, midX, midY);
    textStyle(NORMAL);
  }
  // Hover detect on midpoint
  if (active && hoverDetail) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    if (dist(mouseX, mouseY, midX, midY) < 30) {
      hoverText = label + ' — ' + hoverDetail;
      hoverX = mouseX; hoverY = mouseY;
    }
  }
}

function drawTooltip(x, y, msg) {
  textSize(11);
  const tw = textWidth(msg) + 16; const th = 22;
  let tx = x + 14, ty = y - th - 8;
  if (tx + tw > canvasWidth - 4) tx = canvasWidth - tw - 4;
  if (ty < 4) ty = y + 16;
  noStroke(); fill(0, 0, 0, 220);
  rect(tx, ty, tw, th, 4);
  fill('white'); textAlign(LEFT, CENTER); text(msg, tx + 8, ty + th / 2);
}
