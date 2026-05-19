// Data Model Comparison Explorer
// CANVAS_HEIGHT: 720
// Compare Relational, RDF, LPG, and Vector Store data models across
// structural representation and query performance dimensions.

let canvasWidth = 800;
let drawHeight = 680;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 14;

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const TEAL = '#00897b';
const LIGHTGRAY = '#e0e0e0';
const DARKGRAY = '#555555';

const models = ['Relational', 'RDF / Triplestore', 'Labeled Property Graph', 'Vector Store'];
let activeModel = 0;

let tabButtons = [];

// Benchmark table: rows = query types, cells = ratings per model
const queryTypes = [
  'Single-entity lookup',
  'Two-hop traversal',
  'Five-hop traversal',
  'Semantic similarity',
  'Causal chain audit'
];

const ratings = [
  ['Fast', 'Fast', 'Fast', 'Fast'],
  ['Moderate', 'Moderate', 'Fast', 'N/A'],
  ['Very Slow', 'Slow', 'Fast', 'N/A'],
  ['Poor', 'Poor', 'Moderate', 'Excellent'],
  ['Very Slow', 'Slow', 'Fast', 'N/A']
];

const cellTooltips = [
  ['Indexed primary-key lookup', 'Single triple-pattern match', 'Direct node-id lookup', 'Vector-index nearest match'],
  ['Two JOINs required', 'Two triple patterns chained', 'One traversal step per hop', 'Vector store does not model relationships'],
  ['Five JOINs grow super-linearly with table size', 'Five chained patterns become expensive on triplestores', 'Constant-time hop per edge regardless of depth', 'Vector store cannot follow typed edges'],
  ['Relational has no native vector similarity', 'RDF lacks native vector similarity', 'LPG can store embeddings as node properties', 'Built for k-NN similarity search'],
  ['Each hop requires expensive joins on history tables', 'Reification triples balloon when chaining facts', 'Edges carry causal links directly', 'No way to trace causal chains in a vector store']
];

// Tooltip for any hovered structural element in active model panel
let hoverText = '';
let hoverX = 0;
let hoverY = 0;

const ratingColors = {
  'Fast':      '#4caf50',
  'Excellent': '#2e7d32',
  'Moderate':  '#ffb300',
  'Slow':      '#fb8c00',
  'Very Slow': '#e53935',
  'Poor':      '#bf360c',
  'N/A':       '#9e9e9e'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create four tab buttons positioned at top of canvas
  for (let i = 0; i < models.length; i++) {
    const btn = createButton(models[i]);
    btn.parent(document.querySelector('main'));
    btn.style('font-size', '13px');
    btn.style('padding', '6px 10px');
    btn.style('cursor', 'pointer');
    btn.style('border-radius', '4px');
    btn.style('border', '1px solid #999');
    btn.mousePressed(() => { activeModel = i; updateTabStyles(); });
    tabButtons.push(btn);
  }
  updateTabStyles();
  layoutTabs();

  describe('Interactive infographic comparing Relational, RDF, Labeled Property Graph, and Vector Store data models. Top section shows the structural layout of the active model. Bottom section is a five-row by four-column benchmark table rating each model on common enterprise query types.', LABEL);
}

function updateTabStyles() {
  for (let i = 0; i < tabButtons.length; i++) {
    if (i === activeModel) {
      tabButtons[i].style('background-color', INDIGO);
      tabButtons[i].style('color', 'white');
      tabButtons[i].style('font-weight', 'bold');
      tabButtons[i].style('border', '1px solid ' + INDIGO);
    } else {
      tabButtons[i].style('background-color', '#f5f5f5');
      tabButtons[i].style('color', '#333');
      tabButtons[i].style('font-weight', 'normal');
      tabButtons[i].style('border', '1px solid #bbb');
    }
  }
}

function layoutTabs() {
  // Position the four tab buttons in a single row near the top of the canvas
  const totalGap = 8;
  const tabAreaWidth = canvasWidth - 2 * margin;
  const tabWidth = (tabAreaWidth - 3 * totalGap) / 4;
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].position(margin + i * (tabWidth + totalGap), 12);
    tabButtons[i].size(tabWidth, 30);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutTabs();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}

function draw() {
  background('aliceblue');
  hoverText = '';

  // Background panels
  noStroke();
  fill('white');
  rect(0, 0, canvasWidth, canvasHeight);

  // Tab strip area
  fill('#eceff1');
  rect(0, 0, canvasWidth, 54);

  // Section 1: Model visualizer panel (y: 64 -> 354)
  const vizTop = 64;
  const vizBottom = 354;
  stroke('silver');
  fill('aliceblue');
  rect(margin, vizTop, canvasWidth - 2 * margin, vizBottom - vizTop);

  noStroke();
  fill('black');
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(models[activeModel] + ' — Supply Chain Scenario', margin + 12, vizTop + 8);
  textStyle(NORMAL);

  // Draw the active model
  if (activeModel === 0) drawRelational(vizTop + 32, vizBottom);
  else if (activeModel === 1) drawRdf(vizTop + 32, vizBottom);
  else if (activeModel === 2) drawLpg(vizTop + 32, vizBottom);
  else drawVector(vizTop + 32, vizBottom);

  // Section 2: Benchmark table (y: 370 -> 660)
  drawBenchmarkTable(370, 660);

  // Hover tooltip (last so it floats on top)
  if (hoverText) {
    drawTooltip(hoverX, hoverY, hoverText);
  }

  // Bottom control region with hint text
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  fill(DARKGRAY);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Hover any cell in the benchmark table or any element in the model panel for an explanation.', canvasWidth / 2, drawHeight + controlHeight / 2);
}

// =====================================================
// Model visualizations
// =====================================================

function drawRelational(top, bottom) {
  // Three tables: Suppliers, Products, SuppliesJunction
  const left = margin + 20;
  const right = canvasWidth - margin - 20;
  const usableWidth = right - left;
  const tableWidth = (usableWidth - 40) / 3;
  const tableHeight = bottom - top - 60;
  const tablesY = top + 10;

  const tables = [
    {
      title: 'Suppliers',
      cols: ['id (PK)', 'name', 'country'],
      rows: [['101', 'Acme', 'US'], ['102', 'Bolts', 'MX']]
    },
    {
      title: 'SuppliesJunction',
      cols: ['sup (FK)', 'prod (FK)', 'lead_days'],
      rows: [['101', 'WDG-A', '14'], ['102', 'WDG-B', '21']],
      highlightCol: 2
    },
    {
      title: 'Products',
      cols: ['sku (PK)', 'name', 'cost'],
      rows: [['WDG-A', 'Widget-A', '$12.50'], ['WDG-B', 'Widget-B', '$7.20']]
    }
  ];

  for (let i = 0; i < tables.length; i++) {
    const x = left + i * (tableWidth + 20);
    drawSqlTable(x, tablesY, tableWidth, tableHeight, tables[i]);
  }

  // Callout below
  drawCallout(left, tablesY + tableHeight + 8, right - left,
    'Attribute lives in a separate junction table — requires a JOIN to retrieve.');
}

function drawSqlTable(x, y, w, h, table) {
  const headerHeight = 36;
  const rowHeight = (h - headerHeight) / (table.cols.length + table.rows.length);
  noStroke();
  fill('#fff8e1');
  rect(x, y, w, headerHeight);
  fill(DARKGRAY);
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(table.title, x + w / 2, y + headerHeight / 2);
  textStyle(NORMAL);

  stroke('#bbb');
  strokeWeight(1);
  noFill();
  rect(x, y, w, h);

  // Column header row
  const colRowY = y + headerHeight;
  noStroke();
  fill('#e3f2fd');
  rect(x, colRowY, w, rowHeight);
  fill('black');
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  const colWidth = w / table.cols.length;
  for (let c = 0; c < table.cols.length; c++) {
    const cx = x + c * colWidth;
    const isFk = table.cols[c].includes('FK') || table.cols[c].includes('PK');
    if (isFk) {
      fill('#fff59d');
      noStroke();
      rect(cx + 2, colRowY + 4, colWidth - 4, rowHeight - 8);
    }
    fill('black');
    text(table.cols[c], cx + 6, colRowY + rowHeight / 2);

    // Hover detection on PK/FK headers
    if (isFk && hoverInRect(cx, colRowY, colWidth, rowHeight)) {
      hoverText = table.cols[c].includes('PK')
        ? 'Primary key uniquely identifies each row.'
        : 'Foreign key references a row in another table — must be joined to retrieve related data.';
    }
  }
  textStyle(NORMAL);

  // Data rows
  for (let r = 0; r < table.rows.length; r++) {
    const ry = colRowY + (r + 1) * rowHeight;
    for (let c = 0; c < table.cols.length; c++) {
      const cx = x + c * colWidth;
      if (table.highlightCol === c) {
        fill('#ffe0b2');
        noStroke();
        rect(cx + 2, ry + 2, colWidth - 4, rowHeight - 4);
        if (hoverInRect(cx, ry, colWidth, rowHeight)) {
          hoverText = 'lead_time_days lives on the junction row — it is an attribute of the relationship itself.';
        }
      }
      fill('black');
      noStroke();
      textSize(10);
      textAlign(LEFT, CENTER);
      text(table.rows[r][c], cx + 6, ry + rowHeight / 2);
    }
  }

  // Outer border
  noFill();
  stroke('#bbb');
  rect(x, y, w, h);
  noStroke();
}

function drawRdf(top, bottom) {
  const left = margin + 20;
  const right = canvasWidth - margin - 20;
  const usableWidth = right - left;
  const colWidth = usableWidth / 2 - 10;
  const colTop = top + 10;
  const colBottom = bottom - 50;

  // Left: 7 triples
  noStroke();
  fill('#e8eaf6');
  rect(left, colTop, colWidth, colBottom - colTop, 6);
  fill(INDIGO);
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Triples', left + 10, colTop + 8);
  textStyle(NORMAL);

  const triples = [
    [':Acme', 'rdf:type', ':Supplier'],
    [':Acme', ':country', '"US"'],
    [':Acme', ':supplies', ':WidgetA'],
    [':WidgetA', 'rdf:type', ':Product'],
    [':WidgetA', ':unitCost', '12.50'],
    [':Bolts', 'rdf:type', ':Supplier'],
    [':Bolts', ':supplies', ':WidgetB']
  ];
  textSize(11);
  textAlign(LEFT, TOP);
  fill('black');
  for (let i = 0; i < triples.length; i++) {
    const ty = colTop + 30 + i * 20;
    const t = triples[i];
    text('<' + t[0] + '> <' + t[1] + '> <' + t[2] + '>', left + 14, ty);
    if (hoverInRect(left + 8, ty - 2, colWidth - 16, 18)) {
      hoverText = 'A single RDF triple: ' + t[0] + ' has predicate ' + t[1] + ' with value ' + t[2] + '.';
    }
  }

  // Right: reification block
  const rcolX = left + colWidth + 20;
  fill('#fff3e0');
  rect(rcolX, colTop, colWidth, colBottom - colTop, 6);
  fill(ORANGE);
  textSize(12);
  textStyle(BOLD);
  text('Reification of :Acme :supplies :WidgetA', rcolX + 10, colTop + 8);
  textStyle(NORMAL);

  const reif = [
    '_:stmt rdf:type rdf:Statement',
    '_:stmt rdf:subject :Acme',
    '_:stmt rdf:predicate :supplies',
    '_:stmt rdf:object :WidgetA',
    '_:stmt :leadTimeDays 14'
  ];
  textSize(11);
  fill('black');
  for (let i = 0; i < reif.length; i++) {
    const ty = colTop + 34 + i * 20;
    text(reif[i], rcolX + 14, ty);
    if (hoverInRect(rcolX + 8, ty - 2, colWidth - 16, 18)) {
      hoverText = i === 0
        ? 'A blank node (_:stmt) is introduced to reify the statement so we can attach a property to it.'
        : 'This extra triple is needed only to attach an attribute to the original :supplies edge.';
    }
  }

  drawCallout(left, colBottom + 6, right - left,
    'Four extra triples plus a blank node are needed to attach one attribute to a single edge.');
}

function drawLpg(top, bottom) {
  const left = margin + 20;
  const right = canvasWidth - margin - 20;
  const centerY = (top + bottom) / 2 - 30;

  // Three nodes
  const nodes = [
    { x: left + 100, y: centerY, label: 'Supplier', sub: 'Acme', color: ORANGE },
    { x: (left + right) / 2, y: centerY, label: 'Product', sub: 'Widget-A', color: INDIGO },
    { x: right - 100, y: centerY, label: 'Warehouse', sub: 'Chicago DC', color: TEAL }
  ];

  // Edges (drawn first so nodes overlay)
  drawLpgEdge(nodes[0], nodes[1], 'SUPPLIES', 'lead_time_days: 14', ORANGE);
  drawLpgEdge(nodes[1], nodes[2], 'STOCKS', 'quantity: 8200', TEAL);

  for (const n of nodes) {
    drawLpgNode(n);
  }

  drawCallout(left, bottom - 50, right - left,
    'Each edge holds its own properties — retrieved in the same traversal step.');
}

function drawLpgNode(n) {
  push();
  stroke(n.color);
  strokeWeight(3);
  fill('white');
  ellipse(n.x, n.y, 130, 70);
  noStroke();
  fill('black');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(n.label, n.x, n.y - 10);
  textStyle(NORMAL);
  textSize(11);
  text(n.sub, n.x, n.y + 8);
  pop();

  if (hoverInRect(n.x - 65, n.y - 35, 130, 70)) {
    hoverText = n.label + ' node — label "' + n.label + '" identifies its type; properties live inline on the node.';
  }
}

function drawLpgEdge(a, b, label, prop, color) {
  push();
  stroke(color);
  strokeWeight(2.5);
  const x1 = a.x + 65;
  const x2 = b.x - 65;
  line(x1, a.y, x2, b.y);
  // Arrow head
  fill(color);
  noStroke();
  triangle(x2, b.y, x2 - 10, b.y - 5, x2 - 10, b.y + 5);
  // Label
  const midX = (x1 + x2) / 2;
  noStroke();
  fill('white');
  rectMode(CENTER);
  rect(midX, a.y - 14, textWidth(label) + 16, 18, 4);
  fill(color);
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, midX, a.y - 14);
  textStyle(NORMAL);
  // Property badge
  fill('#fff3e0');
  stroke(color);
  strokeWeight(1);
  rect(midX, a.y + 14, textWidth(prop) + 16, 18, 4);
  noStroke();
  fill('black');
  textSize(10);
  text(prop, midX, a.y + 14);
  rectMode(CORNER);
  pop();

  if (hoverInRect(midX - 50, a.y - 8, 100, 30)) {
    hoverText = label + ' edge — typed and directed; the property "' + prop + '" lives on the edge itself.';
  }
}

function drawVector(top, bottom) {
  const left = margin + 20;
  const right = canvasWidth - margin - 20;
  const plotTop = top + 10;
  const plotBottom = bottom - 60;

  // Plot frame
  noFill();
  stroke('#bbb');
  rect(left, plotTop, right - left, plotBottom - plotTop);
  // Axis labels
  noStroke();
  fill(DARKGRAY);
  textSize(10);
  textAlign(LEFT, TOP);
  text('t-SNE dim 1 →', left + 8, plotBottom - 14);
  push();
  translate(left + 12, plotTop + 12);
  rotate(-HALF_PI);
  text('← t-SNE dim 2', 0, 0);
  pop();

  // Six embedding points in t-SNE space
  const pw = right - left;
  const ph = plotBottom - plotTop;
  const points = [
    { rx: 0.18, ry: 0.30, label: 'doc-1' },
    { rx: 0.22, ry: 0.36, label: 'doc-2' },
    { rx: 0.28, ry: 0.28, label: 'doc-3' },
    { rx: 0.70, ry: 0.70, label: 'doc-4' },
    { rx: 0.78, ry: 0.62, label: 'doc-5' },
    { rx: 0.60, ry: 0.80, label: 'doc-6' }
  ];

  // Query point (in the middle of cluster 1)
  const qx = left + 0.24 * pw;
  const qy = plotTop + 0.32 * ph;

  // Draw lines from query to its three nearest neighbors (doc-1, doc-2, doc-3)
  stroke(ORANGE);
  strokeWeight(1.5);
  for (let i = 0; i < 3; i++) {
    const px = left + points[i].rx * pw;
    const py = plotTop + points[i].ry * ph;
    line(qx, qy, px, py);
  }

  // Draw all points
  for (const p of points) {
    const px = left + p.rx * pw;
    const py = plotTop + p.ry * ph;
    stroke(INDIGO);
    strokeWeight(1);
    fill(INDIGO);
    ellipse(px, py, 10, 10);
    noStroke();
    fill('black');
    textSize(10);
    textAlign(LEFT, CENTER);
    text(p.label, px + 8, py);
    if (hoverInRect(px - 8, py - 8, 50, 16)) {
      hoverText = 'Document embedding "' + p.label + '" — a fixed-length vector capturing semantic meaning.';
    }
  }

  // Query point
  noStroke();
  fill(ORANGE);
  ellipse(qx, qy, 14, 14);
  fill('white');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Q', qx, qy);
  if (hoverInRect(qx - 8, qy - 8, 16, 16)) {
    hoverText = 'Query vector — the search returns the k embeddings closest to this point.';
  }

  drawCallout(left, plotBottom + 6, right - left,
    'Finds semantically similar things — but cannot express why they connect.');
}

function drawCallout(x, y, w, msg) {
  noStroke();
  fill('#fff8e1');
  stroke('#fbc02d');
  strokeWeight(1);
  rect(x, y, w, 28, 4);
  noStroke();
  fill('#5d4037');
  textSize(11);
  textStyle(ITALIC);
  textAlign(LEFT, CENTER);
  text(msg, x + 10, y + 14);
  textStyle(NORMAL);
}

// =====================================================
// Benchmark table
// =====================================================

function drawBenchmarkTable(top, bottom) {
  const left = margin;
  const right = canvasWidth - margin;
  const headerRowH = 32;
  const queryColWidth = 170;
  const dataColWidth = (right - left - queryColWidth) / 4;
  const rowH = (bottom - top - headerRowH) / queryTypes.length;

  // Title
  noStroke();
  fill('black');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, BOTTOM);
  text('Query Performance Benchmark', left, top - 4);
  textStyle(NORMAL);

  // Outer
  noFill();
  stroke('#bbb');
  rect(left, top, right - left, bottom - top);

  // Header row
  noStroke();
  fill('#e3f2fd');
  rect(left, top, right - left, headerRowH);
  fill('black');
  textStyle(BOLD);
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Query Type', left + 10, top + headerRowH / 2);
  textAlign(CENTER, CENTER);
  for (let c = 0; c < 4; c++) {
    const cx = left + queryColWidth + c * dataColWidth;
    text(models[c], cx + dataColWidth / 2, top + headerRowH / 2);
  }
  textStyle(NORMAL);

  // Data rows
  for (let r = 0; r < queryTypes.length; r++) {
    const ry = top + headerRowH + r * rowH;
    // Row label
    noStroke();
    fill(r % 2 === 0 ? '#fafafa' : 'white');
    rect(left, ry, queryColWidth, rowH);
    fill('black');
    textSize(12);
    textAlign(LEFT, CENTER);
    text(queryTypes[r], left + 10, ry + rowH / 2);

    for (let c = 0; c < 4; c++) {
      const cx = left + queryColWidth + c * dataColWidth;
      const rating = ratings[r][c];
      const cellColor = ratingColors[rating] || '#bbb';
      noStroke();
      fill(cellColor);
      rect(cx + 2, ry + 4, dataColWidth - 4, rowH - 8, 4);
      fill('white');
      textStyle(BOLD);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(rating, cx + dataColWidth / 2, ry + rowH / 2);
      textStyle(NORMAL);

      // Highlight on hover
      if (hoverInRect(cx, ry, dataColWidth, rowH)) {
        hoverText = queryTypes[r] + ' / ' + models[c] + ': ' + cellTooltips[r][c];
        noFill();
        stroke('black');
        strokeWeight(2);
        rect(cx + 2, ry + 4, dataColWidth - 4, rowH - 8, 4);
      }
    }
  }

  // Grid lines
  stroke('#ddd');
  strokeWeight(1);
  for (let r = 1; r < queryTypes.length; r++) {
    const ry = top + headerRowH + r * rowH;
    line(left, ry, right, ry);
  }
  noStroke();
}

// =====================================================
// Tooltip rendering
// =====================================================

function drawTooltip(x, y, msg) {
  textSize(12);
  const tw = textWidth(msg) + 16;
  const th = 22;
  let tx = x + 14;
  let ty = y - th - 8;
  if (tx + tw > canvasWidth - 4) tx = canvasWidth - tw - 4;
  if (ty < 4) ty = y + 16;
  noStroke();
  fill(0, 0, 0, 220);
  rect(tx, ty, tw, th, 4);
  fill('white');
  textAlign(LEFT, CENTER);
  text(msg, tx + 8, ty + th / 2);
}

function hoverInRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}
