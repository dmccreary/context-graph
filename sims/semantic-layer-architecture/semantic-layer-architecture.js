// Semantic Layer Architecture — 3-band layered architecture diagram
// CANVAS_HEIGHT: 580

let canvasWidth = 900;
let drawHeight = 530;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

const INDIGO = '#3949ab';
const TEAL = '#00897b';
const ORANGE = '#f57c00';

let selectedTable = -1;
let selectedMetric = -1;
let highlightQuery = -1; // 0 = business english, 1 = sql
let resetBtn;
let hoverText = '';

const TABLES = [
  { name: 'trans_tbl',   cols: ['trans_id', 'net_amt', 'stat_cd', 'trans_dt'] },
  { name: 'cust_master', cols: ['cust_id', 'name', 'region_cd'] },
  { name: 'prod_cat',    cols: ['sku', 'name', 'category'] },
  { name: 'geo_ref',     cols: ['region_cd', 'region_name', 'country'] },
  { name: 'ord_hdr',     cols: ['ord_id', 'cust_id', 'sku', 'qty'] }
];

const METRICS = [
  { name: 'Metrics',     items: ['revenue', 'avg_order', 'gross_margin'], refs: [0, 4] },
  { name: 'Dimensions',  items: ['region', 'time', 'product_cat'],        refs: [3, 2] },
  { name: 'Logical Model', items: ['Customer', 'Order', 'Product'],       refs: [1, 4, 2] }
];

const QUERIES = [
  { type: 'biz', text: '"Total revenue by region, last 30 days"' },
  { type: 'sql', text: 'SELECT region, SUM(revenue) FROM model GROUP BY region' }
];

function setup() {
  updateCanvasSize();
  const c = createCanvas(canvasWidth, canvasHeight);
  c.parent(document.querySelector('main'));
  textFont('Arial');
  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.style('font-size', '13px'); resetBtn.style('padding', '7px 14px');
  resetBtn.style('border-radius', '4px'); resetBtn.style('border', 'none');
  resetBtn.style('background-color', '#757575'); resetBtn.style('color', 'white');
  resetBtn.style('font-weight', 'bold'); resetBtn.style('cursor', 'pointer');
  resetBtn.mousePressed(() => { selectedTable = -1; selectedMetric = -1; highlightQuery = -1; });
  layoutControls();
  describe('A three-band layered architecture: Query Interface at the top, Semantic Layer in the middle, Physical Storage at the bottom. Clicking any element reveals which other layer items reference it.', LABEL);
}

function layoutControls() {
  resetBtn.position(margin + 10, drawHeight + 12);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function draw() {
  background('aliceblue');
  hoverText = '';
  stroke('silver'); fill('aliceblue'); rect(0, 0, canvasWidth, drawHeight);
  noStroke(); fill('white'); rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver'); noFill(); rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke(); fill('black');
  textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Semantic Layer Architecture — click a layer element to trace its references', margin + 10, 8);
  textStyle(NORMAL);

  const top = 34;
  const bottom = drawHeight - 12;
  const totalH = bottom - top;
  const band1 = top + totalH * 0.25;          // top of band 2
  const band2 = top + totalH * 0.60;          // top of band 3

  // Band 1: Query Interface
  drawBand(margin, top, canvasWidth - 2 * margin, band1 - top, INDIGO, 'Query Interface');
  drawQueries(margin + 20, top + 30, canvasWidth - 2 * margin - 40, band1 - top - 38);

  // Band 2: Semantic Layer
  drawBand(margin, band1 + 4, canvasWidth - 2 * margin, band2 - band1 - 8, TEAL, 'Semantic Layer');
  drawMetrics(margin + 20, band1 + 34, canvasWidth - 2 * margin - 40, band2 - band1 - 42);

  // Band 3: Physical Storage
  drawBand(margin, band2 + 4, canvasWidth - 2 * margin, bottom - band2 - 4, ORANGE, 'Physical Storage');
  drawTables(margin + 14, band2 + 34, canvasWidth - 2 * margin - 28, bottom - band2 - 42);

  // Connection arrows (when something is selected)
  drawConnections(band1, band2);

  if (hoverText) drawTooltip(mouseX, mouseY, hoverText);
}

function drawBand(x, y, w, h, color, title) {
  push();
  noStroke();
  // Subtle band fill
  fill(red(unhex('FF' + color.substring(1))), green(unhex('FF' + color.substring(1))), blue(unhex('FF' + color.substring(1))), 30);
  fill(color + '22'); // 13% alpha via hex
  rect(x, y, w, h, 6);
  // Left ribbon
  fill(color);
  rect(x, y, 8, h, 6, 0, 0, 6);
  // Title
  fill(color);
  textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
  text(title, x + 18, y + 6);
  textStyle(NORMAL);
  pop();
}

function drawQueries(x, y, w, h) {
  const bubbleW = (w - 24) / 2;
  for (let i = 0; i < 2; i++) {
    const bx = x + i * (bubbleW + 24);
    const active = (highlightQuery === i || highlightQuery === -1);
    push();
    if (highlightQuery === i) {
      fill(INDIGO); stroke('black'); strokeWeight(2);
    } else {
      fill('white'); stroke(INDIGO); strokeWeight(1);
    }
    rect(bx, y, bubbleW, h, 10);
    noStroke();
    fill(highlightQuery === i ? 'white' : INDIGO);
    textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
    text(QUERIES[i].type === 'biz' ? 'Business question' : 'SQL query', bx + 12, y + 8);
    textStyle(NORMAL);
    fill(highlightQuery === i ? 'white' : '#212121');
    textSize(11);
    text(QUERIES[i].text, bx + 12, y + 24, bubbleW - 24, h - 30);
    pop();

    if (mouseInRect(bx, y, bubbleW, h) && mouseIsPressed === false) {
      hoverText = QUERIES[i].type === 'biz' ? 'Business question — natural language; the semantic layer translates this' : 'SQL — uses semantic objects (revenue, region) not raw columns';
    }
  }
}

function drawMetrics(x, y, w, h) {
  const boxW = (w - 32) / 3;
  for (let i = 0; i < METRICS.length; i++) {
    const bx = x + i * (boxW + 16);
    const active = (selectedMetric === i || selectedMetric === -1);
    push();
    if (selectedMetric === i) {
      fill(TEAL); stroke('black'); strokeWeight(2);
    } else {
      fill('white'); stroke(TEAL); strokeWeight(1.5);
    }
    rect(bx, y, boxW, h, 6);
    noStroke();
    fill(selectedMetric === i ? 'white' : TEAL);
    textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text(METRICS[i].name, bx + 10, y + 6);
    textStyle(NORMAL);
    fill(selectedMetric === i ? 'white' : '#212121');
    textSize(10);
    for (let j = 0; j < METRICS[i].items.length; j++) {
      text('• ' + METRICS[i].items[j], bx + 12, y + 24 + j * 14);
    }
    pop();
    if (mouseInRect(bx, y, boxW, h)) hoverText = METRICS[i].name + ' — translates business terms to physical column references';
  }
}

function drawTables(x, y, w, h) {
  const colW = (w - 40) / 5;
  for (let i = 0; i < TABLES.length; i++) {
    const bx = x + i * (colW + 10);
    const isSelected = (selectedTable === i);
    const isReferenced = referencedByCurrentSelection(i);
    push();
    if (isSelected) {
      fill(ORANGE); stroke('black'); strokeWeight(2);
    } else if (isReferenced) {
      fill('#ffe0b2'); stroke(ORANGE); strokeWeight(1.5);
    } else {
      fill('white'); stroke(ORANGE); strokeWeight(1);
    }
    rect(bx, y, colW, h - 4, 6);
    noStroke();
    fill(isSelected ? 'white' : ORANGE);
    textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text(TABLES[i].name, bx + 8, y + 6);
    textStyle(NORMAL);
    fill(isSelected ? 'white' : '#37474f');
    textSize(9);
    for (let c = 0; c < TABLES[i].cols.length; c++) {
      text('· ' + TABLES[i].cols[c], bx + 10, y + 22 + c * 12);
    }
    pop();
    if (mouseInRect(bx, y, colW, h - 4)) {
      hoverText = TABLES[i].name + ' — raw physical table; columns: ' + TABLES[i].cols.join(', ');
    }
  }
}

function referencedByCurrentSelection(tableIdx) {
  if (selectedMetric >= 0) return METRICS[selectedMetric].refs.includes(tableIdx);
  if (highlightQuery >= 0) return [0, 1, 3, 4].includes(tableIdx); // revenue + region + customer
  return false;
}

function drawConnections(band1, band2) {
  if (selectedTable < 0 && selectedMetric < 0 && highlightQuery < 0) return;
  push();
  stroke(INDIGO); strokeWeight(1.5); drawingContext.setLineDash([4, 3]);
  if (selectedMetric >= 0) {
    // From middle to physical (selected metric to its referenced tables)
    const midBoxW = (canvasWidth - 2 * margin - 40 - 32) / 3;
    const midX = margin + 20 + selectedMetric * (midBoxW + 16) + midBoxW / 2;
    const midY = band2 - 4;
    const tableColW = (canvasWidth - 2 * margin - 28 - 40) / 5;
    for (const tableIdx of METRICS[selectedMetric].refs) {
      const tx = margin + 14 + tableIdx * (tableColW + 10) + tableColW / 2;
      const ty = band2 + 8;
      line(midX, midY, tx, ty);
    }
  }
  if (highlightQuery >= 0) {
    // From top to middle (all metric boxes)
    const bubbleW = (canvasWidth - 2 * margin - 40 - 24) / 2;
    const qx = margin + 20 + highlightQuery * (bubbleW + 24) + bubbleW / 2;
    const qy = band1 - 8;
    const midBoxW = (canvasWidth - 2 * margin - 40 - 32) / 3;
    for (let i = 0; i < 3; i++) {
      const mx = margin + 20 + i * (midBoxW + 16) + midBoxW / 2;
      const my = band1 + 12;
      line(qx, qy, mx, my);
    }
  }
  drawingContext.setLineDash([]);
  pop();
}

function mousePressed() {
  if (mouseY > drawHeight) return; // ignore clicks in control area

  const top = 34;
  const bottom = drawHeight - 12;
  const totalH = bottom - top;
  const band1 = top + totalH * 0.25;
  const band2 = top + totalH * 0.60;

  // Query bubbles
  const bubbleY = top + 30;
  const bubbleH = band1 - top - 38;
  const bubbleW = (canvasWidth - 2 * margin - 40 - 24) / 2;
  for (let i = 0; i < 2; i++) {
    const bx = margin + 20 + i * (bubbleW + 24);
    if (mouseInRect(bx, bubbleY, bubbleW, bubbleH)) {
      highlightQuery = (highlightQuery === i) ? -1 : i;
      selectedMetric = -1; selectedTable = -1;
      return;
    }
  }
  // Middle metric boxes
  const midY = band1 + 34;
  const midH = band2 - band1 - 42;
  const midBoxW = (canvasWidth - 2 * margin - 40 - 32) / 3;
  for (let i = 0; i < 3; i++) {
    const bx = margin + 20 + i * (midBoxW + 16);
    if (mouseInRect(bx, midY, midBoxW, midH)) {
      selectedMetric = (selectedMetric === i) ? -1 : i;
      highlightQuery = -1; selectedTable = -1;
      return;
    }
  }
  // Bottom table icons
  const tableY = band2 + 34;
  const tableH = bottom - band2 - 42;
  const tableColW = (canvasWidth - 2 * margin - 28 - 40) / 5;
  for (let i = 0; i < 5; i++) {
    const bx = margin + 14 + i * (tableColW + 10);
    if (mouseInRect(bx, tableY, tableColW, tableH - 4)) {
      selectedTable = (selectedTable === i) ? -1 : i;
      selectedMetric = -1; highlightQuery = -1;
      return;
    }
  }
}

function mouseInRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
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
