// Context Failure Modes — 5 RAG failure modes with context-graph solutions
// CANVAS_HEIGHT: 580

let canvasWidth = 900;
let drawHeight = 580;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

const INDIGO = '#3949ab';
const TEAL = '#00897b';
const ORANGE = '#f57c00';
const RED = '#c62828';

const MODES = [
    {
        name: 'Missing Decision Context',
        what: 'Retrieves top documents matching the user question.',
        gets: 'Static reference docs (e.g., the published policy) with no record of in-flight decisions or escalations.',
        result: 'LLM answers with the official policy. The actual case had an approved exception in last week\'s steering committee — the LLM never saw the decision because it lived in a meeting minute, not a policy doc.',
        sol: 'Context graph records every approval, exception, and decision as edges connecting policy, requester, approver, and outcome — retrievable by policy id, not by full-text match.'
    },
    {
        name: 'Knowledge Staleness',
        what: 'Retrieves top-3 docs by semantic similarity to "What is our discount tier for Acme Corp?"',
        gets: 'Pricing doc v4.1 (published 14 months ago, similarity score 0.91).',
        result: 'LLM answers with old Tier 2 discount. Acme was upgraded to Tier 1 six months ago. The new pricing doc has a slightly different title and lower similarity score.',
        sol: 'Context graph attaches freshness scores and version history to every retrieval result so the LLM detects a more recent doc exists even at lower similarity.'
    },
    {
        name: 'Incomplete Cross-System Synthesis',
        what: 'Retrieves documents about the customer from a single docs corpus.',
        gets: 'Marketing collateral and onboarding PDFs — but not invoices, support tickets, or contract status.',
        result: 'LLM answers about a "valued customer" while the customer is 90 days past due on payments and has an open support escalation. Cross-system facts never reach the LLM.',
        sol: 'Context graph resolves a customer entity across CRM, billing, support, and contracts — the LLM gets one canonical view with edges to every system\'s current state.'
    },
    {
        name: 'Tacit Knowledge Gap',
        what: 'Retrieves the documented procedure for handling the case.',
        gets: 'The official process, last updated 2 years ago.',
        result: 'LLM answers per the docs. In practice, the team has used an unwritten workaround for 9 months — recorded only in Slack threads and runbook annotations.',
        sol: 'Context graph captures process discoveries from event logs and runbook edits, surfacing actual practice alongside documented practice — and flags drift.'
    },
    {
        name: 'Context Poisoning',
        what: 'Retrieves top-K results without provenance or quality filtering.',
        gets: 'A high-similarity blog post from an external site that contradicts internal policy.',
        result: 'LLM is misled by the external doc. The internal policy doc had lower similarity. The system has no notion of "authoritative source" beyond similarity rank.',
        sol: 'Context graph carries an authority/provenance tier on every retrievable node; retrieval can require authority ≥ threshold or weight authority into the rank.'
    }
];

let selected = 0;
let buttons = [];

function setup() {
    updateCanvasSize();
    const c = createCanvas(canvasWidth, canvasHeight);
    c.parent(document.querySelector('main'));
    textFont('Arial');
    for (let i = 0; i < MODES.length; i++) {
        const btn = createButton((i + 1) + '. ' + MODES[i].name);
        btn.parent(document.querySelector('main'));
        btn.style('font-size','12px'); btn.style('padding','8px 10px');
        btn.style('border-radius','4px'); btn.style('border','1px solid #999');
        btn.style('text-align','left'); btn.style('cursor','pointer');
        btn.mousePressed(() => { selected = i; restyle(); });
        buttons.push(btn);
    }
    restyle();
    layoutControls();
    describe('Five RAG failure modes selectable from a list on the left. The right panel shows what RAG retrieves, what the LLM actually sees, the resulting wrong answer, and how a context graph addresses that specific failure mode.', LABEL);
}

function restyle() {
    for (let i = 0; i < buttons.length; i++) {
        if (i === selected) {
            buttons[i].style('background-color', INDIGO); buttons[i].style('color', 'white');
            buttons[i].style('font-weight', 'bold');
        } else {
            buttons[i].style('background-color', '#f5f5f5'); buttons[i].style('color', '#333');
            buttons[i].style('font-weight', 'normal');
        }
    }
}

function layoutControls() {
    const leftW = canvasWidth * 0.32 - margin - 8;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].position(margin, 50 + i * 50);
        buttons[i].size(leftW, 42);
    }
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); layoutControls(); }
function updateCanvasSize() { const el = document.querySelector('main'); if (el) canvasWidth = el.offsetWidth; }

function draw() {
    background('aliceblue');
    stroke('silver'); fill('aliceblue'); rect(0,0,canvasWidth,drawHeight);

    noStroke(); fill('black');
    textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Five RAG Failure Modes — and What Context Graphs Add', margin, 14);
    textStyle(NORMAL);

    // Right detail panel
    const panelLeft = canvasWidth * 0.34;
    const panelRight = canvasWidth - margin;
    const panelTop = 50;
    const panelBot = drawHeight - 14;
    drawDetailPanel(panelLeft, panelTop, panelRight - panelLeft, panelBot - panelTop);
}

function drawDetailPanel(x, y, w, h) {
    push();
    noStroke(); fill('white'); stroke('#cfd8dc'); strokeWeight(1);
    rect(x, y, w, h, 8);
    const m = MODES[selected];
    let cy = y + 10;
    // Title
    noStroke();
    fill('#bf360c'); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text((selected + 1) + '. ' + m.name, x + 14, cy);
    textStyle(NORMAL);
    cy += 26;
    // Row 1: What RAG does
    fill(ORANGE); textSize(11); textStyle(BOLD);
    text('What RAG does', x + 14, cy);
    textStyle(NORMAL);
    cy += 16;
    fill('#212121'); textSize(11);
    cy = drawWrapped(m.what, x + 14, cy, w - 28);
    cy += 10;
    // Row 2: What the LLM gets
    fill(ORANGE); textSize(11); textStyle(BOLD);
    text('What the LLM gets', x + 14, cy);
    textStyle(NORMAL);
    cy += 16;
    fill('#212121'); textSize(11);
    cy = drawWrapped(m.gets, x + 14, cy, w - 28);
    cy += 10;
    // Row 3: Result
    fill(RED); textSize(11); textStyle(BOLD);
    text('Result', x + 14, cy);
    textStyle(NORMAL);
    cy += 16;
    fill('#212121'); textSize(11);
    cy = drawWrapped(m.result, x + 14, cy, w - 28);
    cy += 14;
    // Solution box
    fill('#e0f2f1'); stroke(TEAL); strokeWeight(1.5);
    rect(x + 14, cy, w - 28, h - (cy - y) - 14, 6);
    noStroke();
    fill(TEAL); textSize(11); textStyle(BOLD);
    text('Context Graph Solution', x + 24, cy + 6);
    textStyle(NORMAL);
    fill('#004d40'); textSize(11);
    text(m.sol, x + 24, cy + 24, w - 48, h - (cy - y) - 36);
    pop();
}

function drawWrapped(s, x, y, w) {
    text(s, x, y, w, 100);
    // approximate height
    const lineCount = ceil(textWidth(s) / w);
    return y + lineCount * 14 + 4;
}
