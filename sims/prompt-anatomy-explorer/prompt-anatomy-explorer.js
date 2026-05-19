// Prompt Anatomy Explorer — toggle prompt sections, see token budget
// CANVAS_HEIGHT: 600

let canvasWidth = 900;
let drawHeight = 540;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;

const GOLD = '#e9c46a';
const TEAL = '#00897b';
const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const STEEL = '#5b7fbd';

const BLOCKS = [
    { id: 'sys',  title: 'System Prompt',      tokens: 240, color: GOLD,
      body: 'You are an enterprise pricing advisor. When reviewing exception requests, always cite the most relevant precedent from the provided context...',
      desc: 'System prompt sets role and rules. Highest weight in most LLMs. Keep stable across calls so caching works.' },
    { id: 'fs',   title: 'Few-Shot Examples',  tokens: 480, color: TEAL,
      body: 'Example 1: [Customer: RetailCorp, Decision: approved 10% discount, Precedent: similar volume tier...] → Recommendation: Approve with conditions...',
      desc: 'Few-shot examples teach the response shape. Skip when the system prompt is sufficient — they cost tokens.' },
    { id: 'ctx',  title: 'Retrieved Context',  tokens: 1200, color: INDIGO,
      body: '[Decision Trace DT-4482: Customer Acme Corp, 2025-10-31, 15% discount exception, approved by M. Williams, citing DT-3891 and DT-2204...]',
      desc: 'Retrieved context from the context graph. Place just before the user query so the LLM has it fresh in its attention window.' },
    { id: 'q',    label: 'User Query', title: 'User Query',    tokens: 45,   color: ORANGE,
      body: 'Should we approve Acme Corp\'s request for a 20% discount on their Q4 renewal?',
      desc: 'User query placed last so the LLM\'s recency bias works in your favor.' },
    { id: 'out',  title: 'Expected Output',    tokens: 500,  color: STEEL, reserved: true,
      body: 'Model generates response here...',
      desc: 'Reserved tokens for the response. Always budget for output — exceeding leads to truncation.' }
];

const TOTAL_BUDGET = 8000;
let visible = { sys: true, fs: true, ctx: true, q: true, out: true };
let selectedIdx = -1;
let fsBtn, ctxBtn;

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    fsBtn = createButton('Toggle Few-Shot Examples');
    ctxBtn = createButton('Toggle Retrieved Context');
    for (const b of [fsBtn, ctxBtn]) {
        b.parent(document.querySelector('main'));
        b.style('font-size','12px'); b.style('padding','7px 12px');
        b.style('border-radius','4px'); b.style('border','none');
        b.style('background-color', INDIGO); b.style('color','white');
        b.style('font-weight','bold'); b.style('cursor','pointer');
    }
    fsBtn.mousePressed(() => { visible.fs = !visible.fs; });
    ctxBtn.mousePressed(() => { visible.ctx = !visible.ctx; });
    layoutControls();
    describe('Prompt anatomy explorer: stacked colored blocks for system prompt, few-shot examples, retrieved context, user query, and expected output. The right panel shows a token-budget bar chart. Toggle blocks to see how the budget changes.', LABEL);
}

function layoutControls() {
    fsBtn.position(margin, drawHeight + 15);
    ctxBtn.position(margin + 200, drawHeight + 15);
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function totalUsed() {
    let t = 0;
    for (const b of BLOCKS) if (visible[b.id]) t += b.tokens;
    return t;
}

function draw() {
    background('aliceblue');
    stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);
    noStroke(); fill('white'); rect(0,drawHeight,canvasWidth,controlHeight);
    stroke('silver'); noFill(); rect(0,drawHeight,canvasWidth,controlHeight);

    noStroke(); fill('black');
    textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Prompt Anatomy — Click any block to inspect', margin, 8);
    textStyle(NORMAL);

    // Layout: left 60% = prompt stack, right 40% = token bar + detail
    const splitX = canvasWidth * 0.60;
    drawPromptStack(margin, 30, splitX - margin - 8, drawHeight - 42);
    drawTokenBar(splitX + 4, 30, canvasWidth - splitX - margin - 4, 260);
    drawDetail(splitX + 4, 300, canvasWidth - splitX - margin - 4, drawHeight - 312);
}

function drawPromptStack(x, y, w, h) {
    // Stack visible blocks proportionally to token count
    const visibleBlocks = BLOCKS.filter(b => visible[b.id]);
    const totalTokens = visibleBlocks.reduce((s, b) => s + b.tokens, 0);
    let cy = y;
    for (let i = 0; i < visibleBlocks.length; i++) {
        const b = visibleBlocks[i];
        const blockH = (b.tokens / totalTokens) * h;
        push();
        noStroke();
        fill(b.color + '33'); // alpha
        stroke(b.color); strokeWeight(b.reserved ? 2 : 1.5);
        if (b.reserved) drawingContext.setLineDash([6, 4]);
        rect(x, cy, w, blockH, 4);
        drawingContext.setLineDash([]);
        noStroke();
        fill(b.color); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
        text(b.title + '  (' + b.tokens + ' tokens)', x + 10, cy + 6);
        textStyle(NORMAL);
        fill('#212121'); textSize(10);
        text(b.body, x + 12, cy + 24, w - 22, blockH - 26);
        pop();

        // Hit test for click
        if (mouseX > x && mouseX < x + w && mouseY > cy && mouseY < cy + blockH) {
            if (mouseIsPressed === false) {
                // Don't auto-select on hover, only on click
            }
        }
        cy += blockH;
    }
}

function drawTokenBar(x, y, w, h) {
    push();
    noStroke();
    fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#1a237e'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Token Budget', x + 10, y + 8);
    textStyle(NORMAL);
    fill('#455a64'); textSize(10);
    const used = totalUsed();
    const pct = ((used / TOTAL_BUDGET) * 100).toFixed(0);
    text(used + ' / ' + TOTAL_BUDGET + ' tokens (' + pct + '%)', x + 10, y + 26);

    // Horizontal stacked bar
    const barY = y + 50;
    const barX = x + 16;
    const barW = w - 32;
    const barH = 30;
    noStroke();
    fill('#eceff1'); rect(barX, barY, barW, barH, 4);
    let cx = barX;
    for (const b of BLOCKS) {
        if (!visible[b.id]) continue;
        const segW = (b.tokens / TOTAL_BUDGET) * barW;
        fill(b.color);
        rect(cx, barY, segW, barH);
        cx += segW;
    }

    // Legend
    let ly = barY + barH + 16;
    for (const b of BLOCKS) {
        const on = visible[b.id];
        fill(on ? b.color : '#cfd8dc'); noStroke();
        rect(x + 16, ly, 12, 12, 2);
        fill(on ? '#212121' : '#9e9e9e'); textSize(10); textAlign(LEFT, CENTER);
        text(b.title + ' — ' + b.tokens, x + 34, ly + 6);
        ly += 18;
    }

    // Warning
    if (used > 7000) {
        fill('#fff3e0'); stroke(ORANGE); strokeWeight(1);
        rect(x + 10, y + h - 32, w - 20, 24, 4);
        noStroke(); fill(ORANGE); textSize(10); textStyle(BOLD); textAlign(LEFT, CENTER);
        text('⚠ Approaching token limit — reduce retrieved context', x + 16, y + h - 20);
        textStyle(NORMAL);
    }
    pop();
}

function drawDetail(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 6);
    noStroke();
    fill('#1a237e'); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Block details', x + 10, y + 8);
    textStyle(NORMAL);
    if (selectedIdx < 0) {
        fill('#9e9e9e'); textSize(11); textStyle(ITALIC);
        text('Click a prompt block on the left to see its role and best practices.', x + 12, y + 28, w - 22, h - 30);
        textStyle(NORMAL);
    } else {
        const b = BLOCKS[selectedIdx];
        fill(b.color); textSize(11); textStyle(BOLD);
        text(b.title + ' (' + b.tokens + ' tokens)', x + 12, y + 28);
        textStyle(NORMAL);
        fill('#212121'); textSize(10);
        text(b.desc, x + 12, y + 46, w - 22, h - 50);
    }
    pop();
}

function mousePressed() {
    if (mouseY > drawHeight) return;
    const splitX = canvasWidth * 0.60;
    if (mouseX > splitX) return;
    // Determine which prompt block contains the mouse
    const x = margin, y = 30;
    const w = splitX - margin - 8;
    const h = drawHeight - 42;
    const visibleBlocks = BLOCKS.filter(b => visible[b.id]);
    const totalTokens = visibleBlocks.reduce((s, b) => s + b.tokens, 0);
    let cy = y;
    for (let i = 0; i < visibleBlocks.length; i++) {
        const b = visibleBlocks[i];
        const blockH = (b.tokens / totalTokens) * h;
        if (mouseY > cy && mouseY < cy + blockH && mouseX > x && mouseX < x + w) {
            // Find original index in BLOCKS
            selectedIdx = BLOCKS.findIndex(x => x.id === b.id);
            return;
        }
        cy += blockH;
    }
}
