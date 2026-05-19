// Multi-Hop Query Performance — Chart.js grouped bar chart
// CANVAS_HEIGHT: 480
// Bloom L4 — Analyze: compare native graph (linear) vs relational (super-linear).

const HOPS = ['1', '2', '3', '4', '5'];
const RELATIONAL = [8, 90, 1400, 28000, 650000];
const GRAPH      = [4, 7,  11,   15,    19];

const INDIGO = '#3949ab';
const ORANGE = '#f57c00';
const INDIGO_HI = '#1a237e';
const ORANGE_HI = '#bf360c';

let chart;
let logScale = true;
let selectedHop = null; // 0..4 when a hop is clicked

function formatMs(ms) {
    if (ms < 1000) return ms + ' ms';
    if (ms < 60000) return ms.toLocaleString() + ' ms ≈ ' + (ms / 1000).toFixed(1) + ' s';
    if (ms < 3600000) return ms.toLocaleString() + ' ms ≈ ' + (ms / 60000).toFixed(1) + ' min';
    return ms.toLocaleString() + ' ms ≈ ' + (ms / 3600000).toFixed(2) + ' hr';
}

function bgColors(seriesColor, hiColor) {
    return HOPS.map((_, i) => (i === selectedHop ? hiColor : seriesColor));
}

function borderColors(hiColor) {
    return HOPS.map((_, i) => (i === selectedHop ? '#000000' : 'rgba(0,0,0,0.2)'));
}

function borderWidths() {
    return HOPS.map((_, i) => (i === selectedHop ? 2.5 : 1));
}

function makeConfig() {
    return {
        type: 'bar',
        data: {
            labels: HOPS,
            datasets: [
                {
                    label: 'Relational Database',
                    data: RELATIONAL,
                    backgroundColor: bgColors(ORANGE, ORANGE_HI),
                    borderColor: borderColors(ORANGE_HI),
                    borderWidth: borderWidths()
                },
                {
                    label: 'Native Graph Database',
                    data: GRAPH,
                    backgroundColor: bgColors(INDIGO, INDIGO_HI),
                    borderColor: borderColors(INDIGO_HI),
                    borderWidth: borderWidths()
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                title: { display: false },
                legend: { position: 'top', align: 'end' },
                tooltip: {
                    callbacks: {
                        label: function(ctx) {
                            const series = ctx.dataset.label;
                            const ms = ctx.parsed.y;
                            return series + ': ' + formatMs(ms);
                        },
                        afterBody: function(items) {
                            if (items.length < 2) return '';
                            const hopIdx = items[0].dataIndex;
                            const ratio = (RELATIONAL[hopIdx] / GRAPH[hopIdx]).toFixed(0);
                            return ['Relational is ' + Number(ratio).toLocaleString() + '× slower at ' + HOPS[hopIdx] + ' hop' + (hopIdx === 0 ? '' : 's')];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Number of Hops', font: { size: 13, weight: 'bold' } },
                    grid: { display: false }
                },
                y: {
                    type: logScale ? 'logarithmic' : 'linear',
                    title: { display: true, text: 'Query Response Time (ms)', font: { size: 13, weight: 'bold' } },
                    min: logScale ? 1 : 0,
                    max: logScale ? 1000000 : undefined,
                    ticks: {
                        callback: function(v) {
                            if (logScale) {
                                if (v === 1) return '1 ms';
                                if (v === 10) return '10 ms';
                                if (v === 100) return '100 ms';
                                if (v === 1000) return '1 s';
                                if (v === 10000) return '10 s';
                                if (v === 100000) return '100 s';
                                if (v === 1000000) return '1000 s';
                                return '';
                            }
                            if (v >= 1000) return (v / 1000) + 'k';
                            return v;
                        }
                    }
                }
            },
            onClick: function(_, elements) {
                if (elements.length > 0) {
                    const idx = elements[0].index;
                    selectedHop = (selectedHop === idx) ? null : idx;
                    updateCallout();
                    refreshColors();
                }
            }
        }
    };
}

function refreshColors() {
    chart.data.datasets[0].backgroundColor = bgColors(ORANGE, ORANGE_HI);
    chart.data.datasets[0].borderColor = borderColors(ORANGE_HI);
    chart.data.datasets[0].borderWidth = borderWidths();
    chart.data.datasets[1].backgroundColor = bgColors(INDIGO, INDIGO_HI);
    chart.data.datasets[1].borderColor = borderColors(INDIGO_HI);
    chart.data.datasets[1].borderWidth = borderWidths();
    chart.update('none');
}

function updateCallout() {
    const c = document.getElementById('callout');
    if (selectedHop === null) {
        c.textContent = 'Click any hop’s bar to see the relational/graph ratio. Toggle the Y-axis scale to feel the super-linear growth.';
        return;
    }
    const rel = RELATIONAL[selectedHop];
    const gph = GRAPH[selectedHop];
    const ratio = Math.round(rel / gph);
    let suffix = '';
    if (selectedHop === 4) suffix = ' (~11 minutes — effectively unusable for real-time queries)';
    c.textContent = 'At ' + HOPS[selectedHop] + ' hop' + (selectedHop === 0 ? '' : 's')
        + ': relational ' + formatMs(rel) + ' vs graph ' + formatMs(gph)
        + ' — relational is ' + ratio.toLocaleString() + '× slower' + suffix;
}

function toggleScale() {
    logScale = !logScale;
    document.getElementById('scale-label').textContent = logScale ? 'logarithmic' : 'linear';
    document.getElementById('scale-btn').textContent = logScale ? 'Switch to Linear Scale' : 'Switch to Logarithmic Scale';
    chart.destroy();
    chart = new Chart(document.getElementById('chart').getContext('2d'), makeConfig());
}

document.addEventListener('DOMContentLoaded', function() {
    chart = new Chart(document.getElementById('chart').getContext('2d'), makeConfig());
    document.getElementById('scale-btn').addEventListener('click', toggleScale);
    updateCallout();
});
