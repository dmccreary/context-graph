// Differential Privacy Noise Mechanism Explorer
// CANVAS_HEIGHT: 540

let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 18;
let sliderLeftMargin = 260;

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const TEAL = '#2a9d8f';

const TRUE_COUNT = 1247;
const SENSITIVITY = 1;
let epsilon = 0.5;
let epsilonSlider, runBtn;
let noisySamples = [];
let currentNoisy = TRUE_COUNT;

function laplace(scale) {
  const u = random() - 0.5;
  return -scale * Math.sign(u) * log(1 - 2 * abs(u));
}

function setup() {
  updateCanvasSize();
  const c = createCanvas(canvasWidth, canvasHeight);
  c.parent(document.querySelector('main'));
  textFont('Arial');
  epsilonSlider = createSlider(0.01, 2.0, 0.5, 0.01);
  epsilonSlider.parent(document.querySelector('main'));
  epsilonSlider.input(() => { epsilon = epsilonSlider.value(); regenerate(); });
  runBtn = createButton('Run 10 Queries');
  runBtn.parent(document.querySelector('main'));
  runBtn.style('font-size','13px'); runBtn.style('padding','7px 14px');
  runBtn.style('border-radius','4px'); runBtn.style('border','none');
  runBtn.style('background-color',TEAL); runBtn.style('color','white');
  runBtn.style('font-weight','bold'); runBtn.style('cursor','pointer');
  runBtn.mousePressed(runQueries);
  layoutControls();
  regenerate();
  describe('Differential privacy explorer: adjust epsilon to control the noise added to a true count. Stronger privacy (smaller epsilon) yields larger noise; weaker privacy yields more accurate results.', LABEL);
}

function regenerate() {
  currentNoisy = TRUE_COUNT + laplace(SENSITIVITY / epsilon);
}

function runQueries() {
  noisySamples = [];
  for (let i = 0; i < 10; i++) noisySamples.push(TRUE_COUNT + laplace(SENSITIVITY / epsilon));
}

function layoutControls() {
  epsilonSlider.position(sliderLeftMargin, drawHeight + 15);
  epsilonSlider.size(canvasWidth - sliderLeftMargin - 180);
  runBtn.position(canvasWidth - 160, drawHeight + 12);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function privacyLevel() {
  if (epsilon < 0.1) return { label: 'Very Strong', color: '#1b5e20' };
  if (epsilon < 0.5) return { label: 'Strong',      color: '#2e7d32' };
  if (epsilon < 1.0) return { label: 'Moderate',    color: '#f57c00' };
  return { label: 'Weak', color: '#c62828' };
}

function draw() {
  background('aliceblue');
  stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);
  noStroke(); fill('white'); rect(0,drawHeight,canvasWidth,controlHeight);
  stroke('silver'); noFill(); rect(0,drawHeight,canvasWidth,controlHeight);

  noStroke(); fill('black');
  textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Differential Privacy — Laplace Noise Mechanism', margin, 10);
  textStyle(NORMAL); textSize(11);
  fill('#455a64');
  text('Query: "Count of customers with credit limit > $50,000"', margin, 30);

  // Bar chart area
  const chartTop = 60;
  const chartH = 200;
  const chartLeft = margin + 80;
  const chartRight = canvasWidth - margin - 40;
  const chartW = chartRight - chartLeft;
  const maxVal = max(TRUE_COUNT * 2.2, abs(currentNoisy) * 1.2);
  const barW = chartW / 6;

  // Y-axis
  stroke('#90a4ae'); line(chartLeft, chartTop, chartLeft, chartTop + chartH);
  line(chartLeft, chartTop + chartH, chartRight, chartTop + chartH);

  // True bar (left)
  const trueX = chartLeft + chartW * 0.25 - barW / 2;
  const trueH = (TRUE_COUNT / maxVal) * chartH;
  noStroke(); fill(INDIGO);
  rect(trueX, chartTop + chartH - trueH, barW, trueH, 4, 4, 0, 0);
  fill('black'); textSize(11); textStyle(BOLD); textAlign(CENTER, BOTTOM);
  text(TRUE_COUNT.toLocaleString(), trueX + barW / 2, chartTop + chartH - trueH - 4);
  textStyle(NORMAL); textSize(11);
  fill('#1a237e');
  text('True Count', trueX + barW / 2, chartTop + chartH + 18);

  // Noisy bar (right)
  const noisyX = chartLeft + chartW * 0.65 - barW / 2;
  const noisyH = (abs(currentNoisy) / maxVal) * chartH;
  fill(ORANGE);
  rect(noisyX, chartTop + chartH - noisyH, barW, noisyH, 4, 4, 0, 0);
  fill('black'); textSize(11); textStyle(BOLD); textAlign(CENTER, BOTTOM);
  text(Math.round(currentNoisy).toLocaleString(), noisyX + barW / 2, chartTop + chartH - noisyH - 4);
  textStyle(NORMAL);
  fill(ORANGE);
  text('Noisy Count', noisyX + barW / 2, chartTop + chartH + 18);

  // Sample dots from "Run 10 Queries"
  if (noisySamples.length > 0) {
    for (const s of noisySamples) {
      const sy = chartTop + chartH - (abs(s) / maxVal) * chartH;
      fill(ORANGE); noStroke();
      ellipse(noisyX + barW * 0.5 + random(-barW * 0.3, barW * 0.3), sy, 6, 6);
    }
  }

  // Privacy level + summary panels
  const panelTop = chartTop + chartH + 36;
  const panelW = (canvasWidth - 2 * margin - 24) / 2;
  drawProtectionPanel(margin, panelTop, panelW, 130);
  drawAccuracyPanel(margin + panelW + 24, panelTop, panelW, 130);

  // Control labels
  noStroke(); fill('black');
  textSize(12); textAlign(LEFT, CENTER);
  const lvl = privacyLevel();
  text('ε (epsilon): ' + nf(epsilon, 1, 2) + '   ', margin, drawHeight + 30);
  fill(lvl.color); textStyle(BOLD);
  text(lvl.label + ' privacy', margin + 110, drawHeight + 30);
  textStyle(NORMAL);
}

function drawProtectionPanel(x, y, w, h) {
  push();
  noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke(); fill(INDIGO);
  textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Privacy Protection', x + 10, y + 8);
  textStyle(NORMAL);

  // Shield outline at right
  const sx = x + w - 70;
  const sy = y + 24;
  const sw = 50, sh = 70;
  const protection = constrain(1 - epsilon / 2.0, 0, 1);
  // Outline
  stroke(INDIGO); strokeWeight(2); noFill();
  beginShape();
  vertex(sx + sw / 2, sy);
  vertex(sx + sw, sy + 10);
  vertex(sx + sw, sy + sh * 0.5);
  vertex(sx + sw / 2, sy + sh);
  vertex(sx, sy + sh * 0.5);
  vertex(sx, sy + 10);
  endShape(CLOSE);
  // Fill based on protection level
  noStroke();
  fill(INDIGO + 'cc');
  const fillH = (sh - 4) * protection;
  rect(sx + 4, sy + sh - 4 - fillH, sw - 8, fillH);

  noStroke(); fill('#37474f'); textSize(11); textAlign(LEFT, TOP);
  text('Smaller ε = more noise per query =\nless can be inferred about any individual.', x + 10, y + 30, w - 90, h - 36);

  fill(INDIGO); textSize(13); textStyle(BOLD);
  text(Math.round(protection * 100) + '%', x + 10, y + h - 26);
  textStyle(NORMAL);
  pop();
}

function drawAccuracyPanel(x, y, w, h) {
  push();
  noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
  rect(x, y, w, h, 6);
  noStroke(); fill(ORANGE);
  textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
  text('Result Accuracy', x + 10, y + 8);
  textStyle(NORMAL);

  // Target rings at right
  const tx = x + w - 50;
  const ty = y + 60;
  const accuracy = constrain(epsilon / 2.0, 0.05, 1);
  const maxR = 30;
  for (let i = 4; i >= 1; i--) {
    const r = (maxR / 4) * i;
    fill(i % 2 === 0 ? '#ffe0b2' : 'white'); stroke(ORANGE); strokeWeight(1);
    ellipse(tx, ty, r * 2, r * 2);
  }
  // Filled center
  noStroke(); fill(ORANGE);
  ellipse(tx, ty, (maxR * 0.4) * 2 * accuracy, (maxR * 0.4) * 2 * accuracy);

  noStroke(); fill('#37474f'); textSize(11); textAlign(LEFT, TOP);
  text('Larger ε = less noise per query =\nresult is closer to the true value.', x + 10, y + 30, w - 90, h - 36);

  fill(ORANGE); textSize(13); textStyle(BOLD);
  text(Math.round(accuracy * 100) + '%', x + 10, y + h - 26);
  textStyle(NORMAL);
  pop();
}
