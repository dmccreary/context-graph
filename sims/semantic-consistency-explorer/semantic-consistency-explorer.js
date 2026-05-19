// Semantic Consistency Explorer — 3-panel comparison of inconsistent metrics
// CANVAS_HEIGHT: 580

let canvasWidth = 900;
let drawHeight = 530;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const TEAL = '#00897b';

let scenario = 'without'; // 'without' | 'with'
let withoutBtn, withBtn;
let hoverText = '';

const FINANCE_ROWS = [
  ['T-1041', '2024-03-04', '$1,250,000', '3'],
  ['T-1042', '2024-03-05', '$  840,000', '5'],
  ['T-1043', '2024-03-08', '$1,100,000', '3'],
  ['T-1044', '2024-03-12', '$  650,000', '7']
];
const FINANCE_COLS = ['trans_id', 'trans_dt', 'net_amt', 'stat_cd'];

const SALES_ROWS = [
  ['O-9001', '2024-03-03', '$  980,000', 'closed_won'],
  ['O-9002', '2024-03-06', '$1,150,000', 'invoiced'],
  ['O-9003', '2024-03-09', '$  720,000', 'closed_won'],
  ['O-9004', '2024-03-11', '$  450,000', 'in_progress']
];
const SALES_COLS = ['order_id', 'order_dt', 'gross_rev', 'status'];

function setup() {
  updateCanvasSize();
  const c = createCanvas(canvasWidth, canvasHeight);
  c.parent(document.querySelector('main'));
  textFont('Arial');

  withoutBtn = createButton('Without Semantic Layer');
  withBtn = createButton('With Semantic Layer');
  for (const b of [withoutBtn, withBtn]) {
    b.parent(document.querySelector('main'));
    b.style('font-size', '13px'); b.style('padding', '7px 14px');
    b.style('border-radius', '4px'); b.style('cursor', 'pointer');
    b.style('font-weight', 'bold'); b.style('border', '1px solid #999');
  }
  withoutBtn.mousePressed(() => { scenario = 'without'; restyleButtons(); });
  withBtn.mousePressed(() => { scenario = 'with'; restyleButtons(); });
  restyleButtons();
  layoutControls();
  describe('Three-panel comparison: a Finance source table, a Sales source table, and a Semantic Layer panel. Toggling the scenario shows how a semantic layer resolves divergent revenue numbers into one canonical value.', LABEL);
}

function restyleButtons() {
  const active = (scenario === 'without') ? withoutBtn : withBtn;
  const inactive = (scenario === 'without') ? withBtn : withoutBtn;
  active.style('background-color', INDIGO); active.style('color', 'white');
  inactive.style('background-color', '#f5f5f5'); inactive.style('color', '#333');
}

function layoutControls() {
  withoutBtn.position(margin + 10, drawHeight + 10);
  withBtn.position(margin + 210, drawHeight + 10);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function draw() {
  background('aliceblue');
  hoverText = '';
  stroke('silver'); fill('aliceblue'); rect(0, 0, canvasWidth, drawHeight);
  noStroke(); fill('white'); rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver'); noFill(); rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
  const title = scenario === 'without'
    ? 'Without Semantic Layer — Finance and Sales report different revenue'
    : 'With Semantic Layer — One canonical reconciled number';
  text(title, margin + 10, 8);
  textStyle(NORMAL);

  // Three panels
  const panelTop = 36;
  const panelBottom = drawHeight - 12;
  const panelGap = 12;
  const panelW = (canvasWidth - 2 * margin - 2 * panelGap) / 3;

  drawPanel(margin, panelTop, panelW, panelBottom - panelTop, ORANGE,
    'Finance System', FINANCE_COLS, FINANCE_ROWS,
    'SELECT SUM(net_amt) FROM finance.transactions WHERE trans_dt BETWEEN ...',
    '$4.2M', 'Sum of all 4 rows regardless of stat_cd');

  drawPanel(margin + panelW + panelGap, panelTop, panelW, panelBottom - panelTop, TEAL,
    'Sales System', SALES_COLS, SALES_ROWS,
    "SELECT SUM(gross_revenue) FROM sales.orders WHERE order_date BETWEEN ...",
    '$3.9M', 'Includes "in_progress" — different scope');

  drawSemanticPanel(margin + 2 * (panelW + panelGap), panelTop, panelW, panelBottom - panelTop);

  if (hoverText) drawTooltip(mouseX, mouseY, hoverText);
}

function drawPanel(x, y, w, h, color, title, cols, rows, sql, value, note) {
  push();
  // Header strip
  noStroke(); fill(color);
  rect(x, y, w, 28, 6);
  fill(color);
  rect(x, y + 14, w, 16);
  // Title
  fill('white');
  textSize(13); textStyle(BOLD); textAlign(LEFT, CENTER);
  text(title, x + 10, y + 14);
  textStyle(NORMAL);

  // Panel body
  fill('white'); stroke('#cfd8dc'); strokeWeight(1);
  rect(x, y + 28, w, h - 28, 0, 0, 6, 6);
  noStroke();

  // Table
  const tableY = y + 34;
  const colW = (w - 16) / cols.length;
  // Column headers
  fill('#eceff1'); rect(x + 8, tableY, w - 16, 22);
  fill('black'); textSize(10); textStyle(BOLD); textAlign(LEFT, CENTER);
  for (let c = 0; c < cols.length; c++) {
    text(cols[c], x + 12 + c * colW, tableY + 11);
    if (mouseX > x + 12 + c * colW && mouseX < x + 12 + (c + 1) * colW && mouseY > tableY && mouseY < tableY + 22) {
      hoverText = colTooltip(cols[c]);
    }
  }
  textStyle(NORMAL);
  // Rows
  for (let r = 0; r < rows.length; r++) {
    const ry = tableY + 22 + r * 18;
    fill(r % 2 === 0 ? 'white' : '#f9fbfc');
    rect(x + 8, ry, w - 16, 18);
    fill('black'); textSize(9); textAlign(LEFT, CENTER);
    for (let c = 0; c < cols.length; c++) {
      text(rows[r][c], x + 12 + c * colW, ry + 9);
    }
  }

  // Bottom: SQL fragment
  const sqlY = tableY + 22 + rows.length * 18 + 12;
  fill('#37474f'); textSize(9); textStyle(NORMAL); textAlign(LEFT, TOP);
  text(sql, x + 10, sqlY, w - 20, 50);

  // Bottom: derived value
  const valY = sqlY + 56;
  fill(color); textSize(22); textStyle(BOLD); textAlign(CENTER, CENTER);
  text(value, x + w / 2, valY);
  textStyle(NORMAL);
  fill('#455a64'); textSize(10); textAlign(CENTER, TOP);
  text(note, x + 10, valY + 18, w - 20, 30);
  pop();
}

function drawSemanticPanel(x, y, w, h) {
  push();
  noStroke(); fill(INDIGO);
  rect(x, y, w, 28, 6);
  rect(x, y + 14, w, 16);
  fill('white'); textSize(13); textStyle(BOLD); textAlign(LEFT, CENTER);
  text('Semantic Layer', x + 10, y + 14);
  textStyle(NORMAL);

  fill('white'); stroke('#cfd8dc'); strokeWeight(1);
  rect(x, y + 28, w, h - 28, 0, 0, 6, 6);
  noStroke();

  // Definition block
  fill('#212121'); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Canonical metric:', x + 10, y + 36);
  textStyle(NORMAL);
  fill('#e8eaf6'); rect(x + 10, y + 52, w - 20, 88, 4);
  fill('#1a237e'); textSize(10);
  text('recognized_revenue =\n' +
       '  SUM(net_amt) WHERE stat_cd IN (3,5)\n' +
       '+ SUM(gross_revenue)\n' +
       "  WHERE order_status IN ('closed_won','invoiced')",
       x + 16, y + 58, w - 32, 80);

  // Result
  const isReconciled = scenario === 'with';
  const resultY = y + 156;
  if (isReconciled) {
    fill('#e8f5e9'); stroke('#2e7d32');
    rect(x + 10, resultY, w - 20, 80, 6);
    noStroke();
    fill('#2e7d32'); textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Reconciled', x + w / 2, resultY + 10);
    textStyle(NORMAL);
    fill('#1b5e20'); textSize(28); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('$4.1M', x + w / 2, resultY + 50);
    textStyle(NORMAL);
  } else {
    fill('#fff3e0'); stroke('#e65100');
    rect(x + 10, resultY, w - 20, 80, 6);
    noStroke();
    fill('#bf360c'); textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Not used — analysts query sources directly', x + w / 2, resultY + 10);
    textStyle(NORMAL);
    fill('#bf360c'); textSize(20); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('Δ $0.3M gap', x + w / 2, resultY + 48);
    textStyle(NORMAL);
  }

  // Note
  fill('#455a64'); textSize(10); textAlign(LEFT, TOP); textStyle(ITALIC);
  text(isReconciled
    ? 'Both sources feed the canonical definition. Filter rules are encoded once. All consumers agree.'
    : 'Each analyst writes their own SQL. Different filter rules → different totals → meeting derails.',
    x + 12, resultY + 90, w - 24, 60);
  textStyle(NORMAL);
  pop();
}

function colTooltip(name) {
  const tips = {
    'trans_id':       'string — Finance transaction id (e.g., T-1041)',
    'trans_dt':       'date — when the transaction posted',
    'net_amt':        'currency — net amount, after returns',
    'stat_cd':        'code — 3=completed, 5=recognized, 7=pending',
    'order_id':       'string — Sales order id (e.g., O-9001)',
    'order_date':     'date — when the order closed',
    'gross_revenue':  'currency — gross revenue, before fees',
    'order_status':   'string — closed_won | invoiced | in_progress'
  };
  return name + ': ' + (tips[name] || 'column');
}

function drawTooltip(x, y, msg) {
  textSize(11);
  const tw = textWidth(msg) + 16; const th = 22;
  let tx = x + 14, ty = y - th - 8;
  if (tx + tw > canvasWidth - 4) tx = canvasWidth - tw - 4;
  if (ty < 4) ty = y + 16;
  noStroke(); fill(0, 0, 0, 220); rect(tx, ty, tw, th, 4);
  fill('white'); textAlign(LEFT, CENTER); text(msg, tx + 8, ty + th / 2);
}
