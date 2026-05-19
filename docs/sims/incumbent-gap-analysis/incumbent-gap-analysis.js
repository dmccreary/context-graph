// Incumbent Gap Analysis — 4×5 ratings grid
// CANVAS_HEIGHT: 540

const REQS = [
    'Real-Time Decision Capture',
    'Graph-Native Traversal',
    'Cross-Silo Entity Linking',
    'Temporal Versioning'
];

const SYSTEMS = ['Data Warehouse', 'CRM System', 'ERP System', 'AI Agent Platform', 'Purpose-Built CG'];

// ratings[req][system] = 'red' | 'yellow' | 'green'
const RATINGS = [
    // Real-Time Decision Capture
    ['red',    'yellow', 'yellow', 'yellow', 'green'],
    // Graph-Native Traversal
    ['yellow', 'red',    'red',    'yellow', 'green'],
    // Cross-Silo Entity Linking
    ['red',    'yellow', 'red',    'red',    'green'],
    // Temporal Versioning
    ['yellow', 'red',    'yellow', 'red',    'green']
];

const LABELS = { red: 'Cannot', yellow: 'Partial', green: 'Native' };

const REASONS = {
    'Data Warehouse|Real-Time Decision Capture|red':       'Batch ETL by design — load cycles measured in hours or days. Decision capture requires sub-second writes against an evolving schema; a warehouse cannot meet this without fundamental redesign.',
    'Data Warehouse|Graph-Native Traversal|yellow':         'You can emulate graph queries with recursive CTEs, but multi-hop joins become super-linearly expensive (see chapter 1). Achievable, but with a heavy integration tax for every query.',
    'Data Warehouse|Cross-Silo Entity Linking|red':         'A warehouse models facts and dimensions, not entities. Identity resolution requires bolt-on MDM systems; cross-silo linking is not a native capability.',
    'Data Warehouse|Temporal Versioning|yellow':            'Type-2 slowly-changing-dimensions provide some temporal versioning, but every fact table needs custom plumbing and "as-of" queries are awkward to write.',
    'CRM System|Real-Time Decision Capture|yellow':         'CRMs capture activities in real time but for sales/marketing events, not arbitrary decisions. Extending the schema and triggering decision-trace writes requires non-trivial integration work.',
    'CRM System|Graph-Native Traversal|red':                'CRMs are relational by design. You can reach related records, but multi-hop graph traversal across customer/contract/policy is not native and degrades quickly.',
    'CRM System|Cross-Silo Entity Linking|yellow':          'CRM owns the customer canonical id but not the product or contract id; cross-silo linking is partial, needing external resolution services.',
    'CRM System|Temporal Versioning|red':                   'Most CRM data models overwrite; audit logs preserve a few key fields but not full temporal versioning of arbitrary records.',
    'ERP System|Real-Time Decision Capture|yellow':         'ERPs capture transactions in real time, but the decision context (why an exception was approved) lives outside the transaction record. Achievable with effort, but the underlying schema fights you.',
    'ERP System|Graph-Native Traversal|red':                'ERPs are deeply relational and tuned for transactional integrity, not graph traversal. Cross-module traversal often requires reporting layers.',
    'ERP System|Cross-Silo Entity Linking|red':             'ERP entities (customer, vendor, item) often differ from the IDs in other systems. Cross-silo linking requires an MDM layer.',
    'ERP System|Temporal Versioning|yellow':                'Some ERP modules log changes; others do not. Comprehensive temporal versioning requires per-module enablement and storage.',
    'AI Agent Platform|Real-Time Decision Capture|yellow':  'Agent platforms capture agent actions in logs, but not the surrounding organizational context. Decision capture across human-in-the-loop steps is achievable but requires significant connector work.',
    'AI Agent Platform|Graph-Native Traversal|yellow':      'Agent platforms can call graph APIs but rarely own a graph datastore. Traversal quality depends on integration with an external graph store.',
    'AI Agent Platform|Cross-Silo Entity Linking|red':      'Agent platforms work with the data they\'re given; identity resolution across enterprise silos is out of scope and must be solved upstream.',
    'AI Agent Platform|Temporal Versioning|red':            'Agent logs are append-only event streams; they record what the agent did, not how downstream data changed over time. Temporal versioning of facts is not part of the model.',
    'Purpose-Built CG|Real-Time Decision Capture|green':    'Designed for it: low-latency writes to decision-trace nodes are first-class.',
    'Purpose-Built CG|Graph-Native Traversal|green':        'Native LPG traversal: fixed cost per hop regardless of depth (chapter 1).',
    'Purpose-Built CG|Cross-Silo Entity Linking|green':     'Canonical entity nodes with APPLIES_TO edges across all silos — no external MDM required.',
    'Purpose-Built CG|Temporal Versioning|green':           'Bitemporal node properties record both valid time and transaction time; "as-of" queries are first-class.'
};

function init() {
    const body = document.getElementById('grid-body');
    for (let r = 0; r < REQS.length; r++) {
        const tr = document.createElement('tr');
        const rh = document.createElement('th');
        rh.className = 'row-header'; rh.textContent = REQS[r];
        tr.appendChild(rh);
        for (let c = 0; c < SYSTEMS.length; c++) {
            const td = document.createElement('td');
            td.className = 'cell ' + RATINGS[r][c];
            td.textContent = LABELS[RATINGS[r][c]];
            td.dataset.system = SYSTEMS[c];
            td.dataset.req = REQS[r];
            td.dataset.rating = RATINGS[r][c];
            td.addEventListener('click', (e) => {
                const k = e.target.dataset.system + '|' + e.target.dataset.req + '|' + e.target.dataset.rating;
                const reason = REASONS[k] || 'No detail recorded for this combination.';
                document.getElementById('detail').innerHTML =
                    '<strong>' + e.target.dataset.system + ' × ' + e.target.dataset.req + '</strong> — ' +
                    LABELS[e.target.dataset.rating] + '<br><br>' + reason;
            });
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', init);
