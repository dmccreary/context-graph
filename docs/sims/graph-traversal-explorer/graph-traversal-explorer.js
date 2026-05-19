// Graph Traversal Explorer (BFS / DFS step-through)
// CANVAS_HEIGHT: 600
// Bloom L2 — Understand: learners trace BFS and DFS step-by-step on a 12-node
// enterprise graph and explain why the visit orderings differ.

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let sliderLeftMargin = 0;

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const YELLOW = '#fdd835';
const GRAY = '#bdbdbd';
const DARK = '#37474f';

// Node positions defined in a 0..1 unit grid; mapped at render time.
const NODES = {
  E1: { label: 'CEO',            type: 'Employee',   ux: 0.50, uy: 0.05 },
  E2: { label: 'VP-Engineering', type: 'Employee',   ux: 0.28, uy: 0.20 },
  E3: { label: 'VP-Sales',       type: 'Employee',   ux: 0.72, uy: 0.20 },
  E4: { label: 'Eng-Lead',       type: 'Employee',   ux: 0.20, uy: 0.40 },
  E7: { label: 'Sales-Lead',     type: 'Employee',   ux: 0.78, uy: 0.40 },
  E5: { label: 'Eng-A',          type: 'Employee',   ux: 0.10, uy: 0.62 },
  E6: { label: 'Eng-B',          type: 'Employee',   ux: 0.30, uy: 0.62 },
  E8: { label: 'Sales-A',        type: 'Employee',   ux: 0.78, uy: 0.62 },
  D1: { label: 'Engineering',    type: 'Department', ux: 0.45, uy: 0.78 },
  D2: { label: 'Sales',          type: 'Department', ux: 0.65, uy: 0.78 },
  D3: { label: 'Executive',      type: 'Department', ux: 0.50, uy: 0.92 },
  P1: { label: 'Project-Alpha',  type: 'Project',    ux: 0.10, uy: 0.32 }
};

const EDGES = [
  { from: 'E2', to: 'E1', type: 'REPORTS_TO' },
  { from: 'E3', to: 'E1', type: 'REPORTS_TO' },
  { from: 'E4', to: 'E2', type: 'REPORTS_TO' },
  { from: 'E5', to: 'E4', type: 'REPORTS_TO' },
  { from: 'E6', to: 'E4', type: 'REPORTS_TO' },
  { from: 'E7', to: 'E3', type: 'REPORTS_TO' },
  { from: 'E8', to: 'E7', type: 'REPORTS_TO' },
  { from: 'E2', to: 'D1', type: 'BELONGS_TO' },
  { from: 'E4', to: 'D1', type: 'BELONGS_TO' },
  { from: 'E5', to: 'D1', type: 'BELONGS_TO' },
  { from: 'E6', to: 'D1', type: 'BELONGS_TO' },
  { from: 'E3', to: 'D2', type: 'BELONGS_TO' },
  { from: 'E7', to: 'D2', type: 'BELONGS_TO' },
  { from: 'E8', to: 'D2', type: 'BELONGS_TO' },
  { from: 'E1', to: 'D3', type: 'BELONGS_TO' },
  { from: 'E4', to: 'P1', type: 'OWNS' }
];

// Adjacency map (undirected for traversal: walk relationships either way)
let adjacency = {};

// Traversal state
let algorithm = 'BFS';
let startNode = 'E1';
let frontier = [];          // queue for BFS, stack for DFS
let visited = new Set();
let visitOrder = [];        // labels in order visited
let currentNode = null;     // node currently being visited (yellow)
let stepLog = [];           // strings shown in right panel
let isRunning = false;
let runTimer = null;

// UI controls
let algoSelect, startSelect, nextBtn, runBtn, resetBtn;

// Hover state
let hoverText = '';
let hoverX = 0;
let hoverY = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  buildAdjacency();
  resetTraversal();

  // Algorithm selector
  algoSelect = createSelect();
  algoSelect.parent(document.querySelector('main'));
  algoSelect.option('BFS');
  algoSelect.option('DFS');
  algoSelect.selected(algorithm);
  algoSelect.changed(() => { algorithm = algoSelect.value(); resetTraversal(); });

  // Start node selector
  startSelect = createSelect();
  startSelect.parent(document.querySelector('main'));
  for (const id of Object.keys(NODES)) {
    startSelect.option(NODES[id].label, id);
  }
  startSelect.selected(startNode);
  startSelect.changed(() => { startNode = startSelect.value(); resetTraversal(); });

  nextBtn = createButton('Next Step');
  nextBtn.parent(document.querySelector('main'));
  nextBtn.mousePressed(stepOnce);

  runBtn = createButton('Run All');
  runBtn.parent(document.querySelector('main'));
  runBtn.mousePressed(toggleRun);

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetTraversal);

  styleControls();
  layoutControls();

  describe('Interactive visualization of breadth-first and depth-first graph traversal on a 12-node enterprise org graph. Select algorithm and start node, then advance step-by-step or run all steps. The right panel shows the queue or stack contents and the ordered list of visited nodes.', LABEL);
}

function styleControls() {
  const dropdownStyle = (el) => {
    el.style('font-size', '13px');
    el.style('padding', '4px 6px');
    el.style('border-radius', '4px');
    el.style('border', '1px solid #bbb');
  };
  dropdownStyle(algoSelect);
  dropdownStyle(startSelect);
  for (const b of [nextBtn, runBtn, resetBtn]) {
    b.style('font-size', '13px');
    b.style('padding', '6px 12px');
    b.style('border-radius', '4px');
    b.style('border', '1px solid #999');
    b.style('background-color', INDIGO);
    b.style('color', 'white');
    b.style('cursor', 'pointer');
    b.style('font-weight', 'bold');
  }
  resetBtn.style('background-color', '#757575');
}

function layoutControls() {
  // Row 1: dropdowns
  const row1Y = drawHeight + 8;
  algoSelect.position(margin + 80, row1Y);
  algoSelect.size(110, 28);
  startSelect.position(margin + 280, row1Y);
  startSelect.size(160, 28);

  // Row 2: buttons
  const row2Y = drawHeight + 44;
  nextBtn.position(margin, row2Y);
  runBtn.position(margin + 110, row2Y);
  resetBtn.position(margin + 220, row2Y);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}

function buildAdjacency() {
  for (const id of Object.keys(NODES)) adjacency[id] = [];
  for (const e of EDGES) {
    adjacency[e.from].push({ to: e.to, type: e.type });
    adjacency[e.to].push({ to: e.from, type: e.type });
  }
  // Stable order: by node id key for predictable BFS/DFS demos
  for (const id of Object.keys(adjacency)) {
    adjacency[id].sort((a, b) => a.to.localeCompare(b.to));
  }
}

function resetTraversal() {
  visited = new Set();
  visitOrder = [];
  currentNode = null;
  frontier = [startNode];
  stepLog = [
    'Algorithm: ' + algorithm,
    'Start node: ' + NODES[startNode].label,
    'Initial ' + (algorithm === 'BFS' ? 'queue' : 'stack') + ': [' + NODES[startNode].label + ']'
  ];
  isRunning = false;
  if (runTimer) { clearTimeout(runTimer); runTimer = null; }
  if (runBtn) runBtn.html('Run All');
}

function toggleRun() {
  if (isRunning) {
    isRunning = false;
    runBtn.html('Run All');
    if (runTimer) { clearTimeout(runTimer); runTimer = null; }
    return;
  }
  isRunning = true;
  runBtn.html('Stop');
  scheduleRun();
}

function scheduleRun() {
  if (!isRunning) return;
  if (frontier.length === 0 && currentNode === null) {
    isRunning = false;
    runBtn.html('Run All');
    return;
  }
  stepOnce();
  runTimer = setTimeout(scheduleRun, 500);
}

function stepOnce() {
  if (frontier.length === 0) {
    if (currentNode === null) return;
    // Final commit
    visited.add(currentNode);
    visitOrder.push(NODES[currentNode].label);
    stepLog.push('Visited: ' + NODES[currentNode].label + ' (traversal complete)');
    currentNode = null;
    return;
  }

  // If a current node is already "in flight" (yellow), commit it first
  if (currentNode !== null) {
    visited.add(currentNode);
    visitOrder.push(NODES[currentNode].label);
  }

  // Pop next node (queue front for BFS, stack top for DFS)
  let next;
  if (algorithm === 'BFS') {
    next = frontier.shift();
  } else {
    next = frontier.pop();
  }

  // Skip already-visited
  while (visited.has(next) && frontier.length > 0) {
    next = (algorithm === 'BFS') ? frontier.shift() : frontier.pop();
  }
  if (visited.has(next)) {
    // No more work to do
    currentNode = null;
    stepLog.push('Traversal complete.');
    return;
  }

  currentNode = next;
  stepLog.push('Visiting: ' + NODES[next].label);

  // Discover neighbors
  const newNeighbors = [];
  for (const nbr of adjacency[next]) {
    if (!visited.has(nbr.to) && nbr.to !== next && !frontier.includes(nbr.to)) {
      frontier.push(nbr.to);
      newNeighbors.push(NODES[nbr.to].label);
    }
  }
  if (newNeighbors.length > 0) {
    stepLog.push('  + Added to ' + (algorithm === 'BFS' ? 'queue' : 'stack') + ': ' + newNeighbors.join(', '));
  }
}

// =====================================================
// Drawing
// =====================================================

function draw() {
  background('aliceblue');
  hoverText = '';

  // Drawing region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Control region background
  noStroke();
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver');
  noFill();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Right panel sized as fixed 240px (or smaller on narrow viewports)
  const panelW = constrain(canvasWidth * 0.30, 200, 260);
  const panelX = canvasWidth - panelW - 8;
  const panelY = 38;
  const panelH = drawHeight - panelY - 8;

  // Graph area extents
  const graphLeft = margin;
  const graphTop = 36;
  const graphRight = panelX - 12;
  const graphBottom = drawHeight - margin;

  drawTitle();
  drawEdges(graphLeft, graphTop, graphRight, graphBottom);
  drawNodes(graphLeft, graphTop, graphRight, graphBottom);
  drawRightPanel(panelX, panelY, panelW, panelH);
  drawControlLabels();

  if (hoverText) {
    drawTooltip(hoverX, hoverY, hoverText);
  }
}

function drawTitle() {
  noStroke();
  fill('black');
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Graph Traversal: ' + algorithm + ' from ' + NODES[startNode].label, margin, 8);
  textStyle(NORMAL);
}

function mapNodePos(node, gl, gt, gr, gb) {
  const w = gr - gl;
  const h = gb - gt;
  return { x: gl + node.ux * w, y: gt + node.uy * h };
}

function drawEdges(gl, gt, gr, gb) {
  textAlign(CENTER, CENTER);
  for (const e of EDGES) {
    const a = mapNodePos(NODES[e.from], gl, gt, gr, gb);
    const b = mapNodePos(NODES[e.to], gl, gt, gr, gb);

    let edgeColor = '#90a4ae';
    let weight = 1.5;
    if (visited.has(e.from) && visited.has(e.to)) {
      edgeColor = INDIGO;
      weight = 2;
    }

    stroke(edgeColor);
    strokeWeight(weight);
    line(a.x, a.y, b.x, b.y);

    // Hover detection on edge
    if (distToSegment(mouseX, mouseY, a.x, a.y, b.x, b.y) < 6) {
      hoverText = e.type + ': ' + NODES[e.from].label + ' → ' + NODES[e.to].label;
    }
  }
}

function drawNodes(gl, gt, gr, gb) {
  for (const id of Object.keys(NODES)) {
    const node = NODES[id];
    const p = mapNodePos(node, gl, gt, gr, gb);
    const isCurrent = (id === currentNode);
    const isVisited = visited.has(id);
    const isInFrontier = !isCurrent && !isVisited && frontier.includes(id);

    let fillColor, borderColor, textColor;
    if (isCurrent) {
      fillColor = YELLOW; borderColor = ORANGE; textColor = 'black';
    } else if (isVisited) {
      fillColor = INDIGO; borderColor = '#1a237e'; textColor = 'white';
    } else if (isInFrontier) {
      fillColor = ORANGE; borderColor = '#e65100'; textColor = 'white';
    } else {
      fillColor = GRAY; borderColor = DARK; textColor = 'black';
    }

    // Pulse the currently-visiting node
    let radius = 26;
    if (isCurrent) {
      radius = 26 + 2 * sin(millis() / 120);
    }

    noStroke();
    if (isCurrent) {
      fill(255, 220, 100, 100);
      ellipse(p.x, p.y, radius * 2 + 14, radius * 2 + 14);
    }

    stroke(borderColor);
    strokeWeight(2);
    fill(fillColor);
    ellipse(p.x, p.y, radius * 2, radius * 2);

    noStroke();
    fill(textColor);
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(node.label.length > 15 ? node.label.substring(0, 14) + '…' : node.label, p.x, p.y);
    textStyle(NORMAL);

    // Hover tooltip
    if (dist(mouseX, mouseY, p.x, p.y) < radius) {
      const nbrs = adjacency[id].map(n => NODES[n.to].label).join(', ');
      hoverText = node.label + ' (' + node.type + ') — neighbors: ' + nbrs;
    }
  }
}

function drawRightPanel(x, y, w, h) {
  // Panel background
  noStroke();
  fill('white');
  stroke('#ccc');
  rect(x, y, w, h, 6);

  noStroke();
  fill(INDIGO);
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text((algorithm === 'BFS' ? 'Queue' : 'Stack') + ' contents', x + 10, y + 8);
  textStyle(NORMAL);

  // Frontier contents
  fill('#fff3e0');
  stroke('#fb8c00');
  strokeWeight(1);
  rect(x + 10, y + 30, w - 20, 60, 4);
  noStroke();
  fill('black');
  textSize(11);
  const frontierLabels = frontier.map(id => NODES[id].label);
  const frontierStr = frontierLabels.length === 0 ? '(empty)' : '[' + frontierLabels.join(', ') + ']';
  text(frontierStr, x + 16, y + 36, w - 32, 50);
  textSize(10);
  fill('#666');
  text(algorithm === 'BFS' ? 'next out: front (left)' : 'next out: top (right)', x + 16, y + 80);

  // Visit order
  noStroke();
  fill(INDIGO);
  textSize(13);
  textStyle(BOLD);
  text('Visit order (' + visitOrder.length + ')', x + 10, y + 100);
  textStyle(NORMAL);

  const listY = y + 122;
  const listH = h - 132 - 80;
  fill('#f5f5f5');
  rect(x + 10, listY, w - 20, listH, 4);
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, TOP);
  for (let i = 0; i < visitOrder.length; i++) {
    const ty = listY + 6 + i * 16;
    if (ty > listY + listH - 14) break;
    text((i + 1) + '. ' + visitOrder[i], x + 16, ty);
  }
  // Currently visiting overlay
  if (currentNode !== null) {
    fill(ORANGE);
    textSize(11);
    textStyle(BOLD);
    text('→ visiting: ' + NODES[currentNode].label, x + 16, listY + 6 + visitOrder.length * 16);
    textStyle(NORMAL);
  }

  // Step log (last 3 messages)
  fill(INDIGO);
  textSize(12);
  textStyle(BOLD);
  text('Last action', x + 10, y + h - 70);
  textStyle(NORMAL);
  noStroke();
  fill('#eceff1');
  rect(x + 10, y + h - 52, w - 20, 44, 4);
  fill('black');
  textSize(10);
  textAlign(LEFT, TOP);
  const lastMsg = stepLog.length > 0 ? stepLog[stepLog.length - 1] : '';
  text(lastMsg, x + 14, y + h - 48, w - 28, 38);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Algorithm:', margin, drawHeight + 22);
  text('Start node:', margin + 200, drawHeight + 22);
}

// =====================================================
// Helpers
// =====================================================

function drawTooltip(x, y, msg) {
  textSize(11);
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

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return dist(px, py, x1, y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = constrain(t, 0, 1);
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return dist(px, py, projX, projY);
}
