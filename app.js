// ============================================
// Simple CSV Parser (no external dependency)
// ============================================
function parseCSV(text) {
    var lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    var headers = lines[0].split(',');
    var results = [];
    for (var i = 1; i < lines.length; i++) {
        var values = lines[i].split(',');
        if (values.length < headers.length) continue;
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            var h = headers[j].trim();
            var v = values[j].trim();
            // Try to parse as number
            var num = Number(v);
            obj[h] = isNaN(num) ? v : num;
        }
        results.push(obj);
    }
    return results;
}

// ============================================
// Game Data (embedded - no file loading needed)
// ============================================
var DEFAULT_DATA = [
    {id:1, name:"ゲルぴよ", image_path:"assets/23-001-ゲルぴよ.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:0, leave:0, weight:100},
    {id:2, name:"モモぴよ", image_path:"assets/23-002モモぴよ.jpg", hit:0, slap:0, stroke:1, shake:0, drop:0, warm:1, cool:0, stare:0, sing:0, leave:0, weight:80},
    {id:3, name:"蓄光", image_path:"assets/23-003蓄光.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:1, stare:1, sing:0, leave:0, weight:80},
    {id:4, name:"パルぴよ", image_path:"assets/23-004パルぴよ.jpg", hit:0, slap:1, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:1, leave:0, weight:80},
    {id:5, name:"蓄光オレンジ", image_path:"assets/23-005蓄光オレンジ.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:1, cool:1, stare:0, sing:0, leave:0, weight:70},
    {id:6, name:"サックスブルー", image_path:"assets/23-006サックスブルー.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:1, stare:0, sing:1, leave:0, weight:70},
    {id:7, name:"Sブルー", image_path:"assets/23-007Sブルー.jpg", hit:0, slap:0, stroke:1, shake:0, drop:0, warm:0, cool:1, stare:0, sing:0, leave:0, weight:70},
    {id:8, name:"Mレッド", image_path:"assets/23-008Mレッド.jpg", hit:1, slap:0, stroke:0, shake:0, drop:0, warm:1, cool:0, stare:0, sing:0, leave:0, weight:70},
    {id:9, name:"ゲルチキ", image_path:"assets/23-009ゲルチキ.jpg", hit:0, slap:0, stroke:0, shake:1, drop:0, warm:1, cool:0, stare:0, sing:0, leave:0, weight:60},
    {id:10, name:"レインボー", image_path:"assets/23-010レインボー.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:1, sing:1, leave:0, weight:50},
    {id:11, name:"みどぴよ", image_path:"assets/23-011みどぴよ.jpg", hit:0, slap:0, stroke:2, shake:0, drop:0, warm:0, cool:0, stare:0, sing:0, leave:0, weight:80},
    {id:12, name:"ぴよクリア", image_path:"assets/23-012ぴよクリア.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:2, stare:0, sing:0, leave:0, weight:80},
    {id:13, name:"パープル", image_path:"assets/23-013パープル.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:2, sing:0, leave:0, weight:80},
    {id:14, name:"ゆめぴよ", image_path:"assets/23-014ゆめぴよ.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:2, leave:0, weight:70},
    {id:15, name:"Zブルー", image_path:"assets/23-015Zブルー.jpg", hit:1, slap:1, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:0, leave:0, weight:60},
    {id:16, name:"ぴよレンジャーブルー", image_path:"assets/23-016ぴよレンジャーブルー.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:1, stare:0, sing:1, leave:0, weight:50},
    {id:17, name:"ぴよレンジャーイエロー", image_path:"assets/23-017ぴよレンジャーイエロー.jpg", hit:0, slap:0, stroke:1, shake:0, drop:0, warm:1, cool:0, stare:0, sing:0, leave:0, weight:50},
    {id:18, name:"ぴよレンジャーピンク", image_path:"assets/23-018ぴよレンジャーピンク.jpg", hit:0, slap:0, stroke:1, shake:0, drop:0, warm:0, cool:0, stare:1, sing:0, leave:0, weight:50},
    {id:19, name:"ぴよレンジャーグリーン", image_path:"assets/23-019ぴよレンジャーグリーン.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:1, stare:1, sing:0, leave:0, weight:50},
    {id:20, name:"なりきりSブルー", image_path:"assets/23-020なりきりSブルー.jpg", hit:0, slap:0, stroke:1, shake:0, drop:0, warm:0, cool:0, stare:0, sing:1, leave:0, weight:40},
    {id:21, name:"本人Sブルー", image_path:"assets/23-021本人Sブルー.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:2, leave:0, weight:30},
    {id:22, name:"ぴよレンジャーレッド", image_path:"assets/23-022ぴよレンジャーレッド.jpg", hit:1, slap:0, stroke:0, shake:0, drop:0, warm:1, cool:0, stare:0, sing:0, leave:0, weight:50},
    {id:23, name:"ドレッドSブルー", image_path:"assets/24-001ドレッドSブルー.jpg", hit:0, slap:1, stroke:0, shake:1, drop:0, warm:0, cool:0, stare:0, sing:0, leave:0, weight:40},
    {id:24, name:"ディープブルー", image_path:"assets/24-002ディープブルー.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:2, stare:0, sing:0, leave:0, weight:60},
    {id:25, name:"スカイブルー", image_path:"assets/24-003スカイブルー.jpg", hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:1, stare:0, sing:1, leave:0, weight:70},
    {id:26, name:"シロぴよ", image_path:"assets/24-004シロぴよ.jpg", hit:0, slap:0, stroke:1, shake:0, drop:0, warm:0, cool:0, stare:0, sing:0, leave:1, weight:90},
    {id:27, name:"クロぴよ", image_path:"assets/24-005クロぴよ.jpg", hit:1, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:0, leave:1, weight:80},
    {id:28, name:"ワルぴよ", image_path:"assets/24-006ワルぴよ.jpg", hit:2, slap:1, stroke:0, shake:0, drop:1, warm:0, cool:0, stare:0, sing:0, leave:0, weight:40}
];

// ============================================
// Game State
// ============================================
var gerupiyoData = DEFAULT_DATA.slice(); // copy
var collection = {};
try { collection = JSON.parse(localStorage.getItem('gerupiyo_collection')) || {}; } catch(e) { collection = {}; }

var stats = { hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:0, leave:0, totalActions:0 };
var gameActive = true;
var hatchTimeout = null;

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('[INIT] Game starting, ' + gerupiyoData.length + ' characters loaded.');
    bindEvents();
    // Always force title screen on load
    showScreen('screen-title');
    console.log('[INIT] Events bound successfully. Title screen active.');
});

// ============================================
// Event Binding
// ============================================
function bindEvents() {
    // Title Screen
    document.getElementById('btn-start').addEventListener('click', function() {
        console.log('[NAV] → Start Game');
        resetGame();
    });
    document.getElementById('btn-title-book').addEventListener('click', function() {
        console.log('[NAV] → Book from Title');
        showScreen('screen-book');
    });

    // Navigation
    document.getElementById('nav-book-btn').addEventListener('click', function() {
        console.log('[NAV] → Book');
        showScreen('screen-book');
    });
    document.getElementById('btn-to-book').addEventListener('click', function() {
        console.log('[NAV] → Book');
        showScreen('screen-book');
    });
    document.getElementById('nav-back-btn').addEventListener('click', function() {
        console.log('[NAV] → Back to Title');
        showScreen('screen-title');
    });
    document.getElementById('btn-back-main').addEventListener('click', function() {
        console.log('[NAV] → Reset & Title');
        showScreen('screen-title');
    });

    // CSV Upload
    document.getElementById('csv-upload').addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            var reader = new FileReader();
            reader.onload = function(evt) {
                var parsed = parseCSV(evt.target.result);
                if (parsed.length > 0) {
                    gerupiyoData = parsed;
                    alert('ルール(CSV)を読み込みました！ ' + parsed.length + '体のキャラ');
                } else {
                    alert('CSVの読み込みに失敗しました。フォーマットを確認してください。');
                }
            };
            reader.readAsText(e.target.files[0]);
        }
    });

    // Action Buttons
    var actionBtns = document.querySelectorAll('.action-btn');
    for (var i = 0; i < actionBtns.length; i++) {
        actionBtns[i].addEventListener('click', function(e) {
            var action = this.getAttribute('data-action');
            console.log('[ACTION] ' + action);
            handleAction(action);
        });
    }
}

// ============================================
// Particle Effects
// ============================================
var ACTION_PARTICLES = {
    hit:    ['↕', '📏', '✨'],
    slap:   ['👋', '💢', '❗'],
    stroke: ['💖', '💕', '✨'],
    shake:  ['💨', '❕', '❗'],
    drop:   ['💧', '💦', '⬇'],
    warm:   ['🔥', '🟠', '🟡'],
    cool:   ['❄', '🧊', '💎'],
    stare:  ['👁', '👀', '😳'],
    sing:   ['🎵', '🎶', '♪'],
    leave:  ['💤', '😴', '💭']
};

function spawnParticles(actionType) {
    var container = document.getElementById('particle-container');
    var eggBody = document.getElementById('egg-body');
    if (!container || !eggBody) return;

    var emojis = ACTION_PARTICLES[actionType] || ['✨'];
    var count = 6 + Math.floor(Math.random() * 4);
    var rect = eggBody.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2 - containerRect.left;
    var centerY = rect.top + rect.height / 2 - containerRect.top;

    for (var i = 0; i < count; i++) {
        var el = document.createElement('div');
        el.className = 'particle';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        var angle = Math.random() * Math.PI * 2;
        var distance = 80 + Math.random() * 120;
        var px = Math.cos(angle) * distance;
        var py = Math.sin(angle) * distance - 40;

        el.style.left = centerX + 'px';
        el.style.top = centerY + 'px';
        el.style.setProperty('--px', px + 'px');
        el.style.setProperty('--py', py + 'px');
        el.style.animationDelay = (Math.random() * 0.15) + 's';
        el.style.fontSize = (1.2 + Math.random() * 1) + 'rem';

        container.appendChild(el);
        (function(element) {
            setTimeout(function() { element.remove(); }, 1200);
        })(el);
    }
}

// ============================================
// Action Handling
// ============================================
function handleAction(actionType) {
    if (!gameActive) return;

    stats[actionType] = (stats[actionType] || 0) + 1;
    stats.totalActions++;

    // Animate egg-body
    var eggBody = document.getElementById('egg-body');
    if (eggBody) {
        // Remove old animation (guard against empty string)
        var old = eggBody.getAttribute('data-anim');
        if (old && old.length > 0) {
            try { eggBody.classList.remove(old); } catch(e) {}
        }
        // Force reflow
        void eggBody.offsetWidth;
        // Add new animation
        var animClass = 'anim-' + actionType;
        eggBody.classList.add(animClass);
        eggBody.setAttribute('data-anim', animClass);
    }

    // Spawn particles
    spawnParticles(actionType);

    // Show message
    var msgs = {
        hit: "びよーん！", slap: "バシッ！", stroke: "なでなで...",
        shake: "ガタガタガタッ！", drop: "ドスンッ！落ちた...",
        warm: "ぽかぽかする...", cool: "ひんやり冷やされた...",
        stare: "じーっ...見られてる...", sing: "ルンルン♪", leave: "放置した..."
    };
    var msgArea = document.getElementById('message-area');
    if (msgArea) msgArea.textContent = msgs[actionType] || "";

    console.log('[STATS] total=' + stats.totalActions + ' | ' + actionType + '=' + stats[actionType]);

    // Hatch check — all timers set from here in one shot (no chaining)
    if (stats.totalActions >= 10 || actionType === 'leave') {
        if (!hatchTimeout) {
            console.log('[HATCH] Threshold reached! Setting up hatch timeline...');
            gameActive = false;
            hatchTimeout = true; // prevent re-entry

            var hatchEggBody = document.getElementById('egg-body');
            var hatchMsgArea = document.getElementById('message-area');

            // T+1.5s: Show pre-hatch message + start shaking animation
            window.setTimeout(function() {
                console.log('[HATCH T+1.5] Pre-hatch message & animation');
                if (hatchMsgArea) hatchMsgArea.textContent = "あれ…？ なにかが起こりそう…！";
                if (hatchEggBody) {
                    var old = hatchEggBody.getAttribute('data-anim');
                    if (old && old.length > 0) try { hatchEggBody.classList.remove(old); } catch(e) {}
                    void hatchEggBody.offsetWidth;
                    hatchEggBody.classList.add('anim-prehatch');
                    hatchEggBody.setAttribute('data-anim', 'anim-prehatch');
                }
                spawnParticles('stroke');
            }, 1500);

            // T+2.0s: More particles
            window.setTimeout(function() {
                console.log('[HATCH T+2.0] Particles wave 2');
                spawnParticles('sing');
            }, 2000);

            // T+2.5s: More particles
            window.setTimeout(function() {
                console.log('[HATCH T+2.5] Particles wave 3');
                spawnParticles('warm');
            }, 2500);

            // T+3.3s: White fade IN
            window.setTimeout(function() {
                console.log('[HATCH T+3.3] White fade IN');
                var fade = document.getElementById('white-fade');
                if (fade) fade.classList.add('active');
            }, 3300);

            // T+4.0s: Switch to result screen (while white)
            window.setTimeout(function() {
                console.log('[HATCH T+4.0] Calling triggerHatch');
                triggerHatch();
            }, 4000);

            // T+4.2s: White fade OUT (reveal result)
            window.setTimeout(function() {
                console.log('[HATCH T+4.2] White fade OUT');
                var fade = document.getElementById('white-fade');
                if (fade) fade.classList.remove('active');
            }, 4200);
        }
    }
}

// ============================================
// Hatching Logic (decides character or miss)
// ============================================
var MISS_RESULTS = [
    { type: 'paper', emoji: '📜', title: 'ハズレ…', name: '白紙の手紙が出てきた', sub: 'なにも書いてない…' },
    { type: 'empty', emoji: '💨', title: 'あれ…？', name: 'なにも出てこなかった', sub: '卵はからっぽだった…' },
    { type: 'crack', emoji: '🥚', title: 'パリッ…', name: 'ヒビが入っただけだった', sub: 'もうちょっとかも…' },
    { type: 'dust', emoji: '✨', title: 'シーン…', name: 'キラキラした粉が出た', sub: 'きれいだけど…' }
];

var MISS_CHANCE = 0.3; // 30% chance of miss

function triggerHatch() {
    if (hatchTimeout) clearTimeout(hatchTimeout);
    hatchTimeout = null;

    // Decide: miss or success?
    var isMiss = Math.random() < MISS_CHANCE;

    if (isMiss) {
        showMissScreen();
    } else {
        // Select character
        var selectedChar = gerupiyoData[0];
        var candidates = [];
        for (var i = 0; i < gerupiyoData.length; i++) {
            var c = gerupiyoData[i];
            if (
                stats.hit >= (c.hit || 0) &&
                stats.slap >= (c.slap || 0) &&
                stats.stroke >= (c.stroke || 0) &&
                stats.shake >= (c.shake || 0) &&
                stats.drop >= (c.drop || 0) &&
                stats.warm >= (c.warm || 0) &&
                stats.cool >= (c.cool || 0) &&
                stats.stare >= (c.stare || 0) &&
                stats.sing >= (c.sing || 0) &&
                stats.leave >= (c.leave || 0)
            ) {
                candidates.push(c);
            }
        }
        if (candidates.length === 0) candidates = gerupiyoData.slice();

        // Weighted random
        var totalWeight = 0;
        for (var i = 0; i < candidates.length; i++) totalWeight += (candidates[i].weight || 100);
        var randomVal = Math.random() * totalWeight;
        var cumulative = 0;
        for (var i = 0; i < candidates.length; i++) {
            cumulative += (candidates[i].weight || 100);
            if (randomVal <= cumulative) {
                selectedChar = candidates[i];
                break;
            }
        }

        console.log('[HATCH] Selected: ' + selectedChar.name);
        showHatchScreen(selectedChar);
    }
}

function showHatchScreen(char) {
    // Set up success screen content
    document.getElementById('hatch-title').textContent = 'うまれた！';
    document.getElementById('hatched-image').src = char.image_path;
    document.getElementById('hatched-image').style.display = '';
    document.getElementById('hatched-name').textContent = char.name;

    // Remove miss display if it exists
    var oldMiss = document.querySelector('.miss-display');
    if (oldMiss) oldMiss.remove();
    var oldMissSub = document.querySelector('.miss-sub');
    if (oldMissSub) oldMissSub.remove();

    // Show character display
    document.getElementById('character-display').style.display = 'flex';

    // Save to collection
    if (!collection[char.id]) {
        collection[char.id] = { count: 0, charData: char };
    }
    collection[char.id].count++;
    try { localStorage.setItem('gerupiyo_collection', JSON.stringify(collection)); } catch(e) {}

    // Switch to hatch screen (white fade out handled by timeline)
    showScreen('screen-hatch');
}

function showMissScreen() {
    var miss = MISS_RESULTS[Math.floor(Math.random() * MISS_RESULTS.length)];
    console.log('[HATCH] Miss: ' + miss.title);

    // Set up miss screen content
    document.getElementById('hatch-title').textContent = miss.title;
    document.getElementById('hatched-image').style.display = 'none';
    document.getElementById('hatched-name').textContent = miss.name;

    // Hide character display, show miss emoji instead
    var charDisplay = document.getElementById('character-display');
    charDisplay.style.display = 'none';

    // Remove old miss display if exists
    var oldMiss = document.querySelector('.miss-display');
    if (oldMiss) oldMiss.remove();
    var oldMissSub = document.querySelector('.miss-sub');
    if (oldMissSub) oldMissSub.remove();

    // Create miss emoji display
    var missEl = document.createElement('div');
    missEl.className = 'miss-display';
    missEl.textContent = miss.emoji;

    var missSub = document.createElement('div');
    missSub.className = 'miss-sub';
    missSub.textContent = miss.sub;

    // Insert before the name
    var overlay = document.querySelector('.hatch-overlay');
    var nameEl = document.getElementById('hatched-name');
    overlay.insertBefore(missEl, nameEl);
    overlay.insertBefore(missSub, nameEl);

    // Switch to hatch screen (white fade out handled by timeline)
    showScreen('screen-hatch');
}

// ============================================
// Screen Navigation (robust: uses add/remove, not replace)
// ============================================
function showScreen(screenId) {
    var allScreens = document.querySelectorAll('.screen');
    for (var i = 0; i < allScreens.length; i++) {
        allScreens[i].classList.remove('active');
        allScreens[i].classList.add('hide');
    }
    var target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hide');
        target.classList.add('active');
    }

    if (screenId === 'screen-book') {
        renderBook();
    }
}

function resetGame() {
    stats = { hit:0, slap:0, stroke:0, shake:0, drop:0, warm:0, cool:0, stare:0, sing:0, leave:0, totalActions:0 };
    gameActive = true;
    hatchTimeout = null;

    var eggBody = document.getElementById('egg-body');
    if (eggBody) {
        var old = eggBody.getAttribute('data-anim');
        if (old && old.length > 0) {
            try { eggBody.classList.remove(old); } catch(e) {}
        }
        eggBody.removeAttribute('data-anim');
    }

    var msgArea = document.getElementById('message-area');
    if (msgArea) msgArea.textContent = "卵を触ってみよう...";

    showScreen('screen-main');
}

// ============================================
// Book / Collection
// ============================================
function renderBook() {
    var grid = document.getElementById('collection-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (gerupiyoData.length === 0) {
        grid.innerHTML = '<p>データがありません。</p>';
        return;
    }

    for (var i = 0; i < gerupiyoData.length; i++) {
        var char = gerupiyoData[i];
        var isDiscovered = !!collection[char.id];
        var card = document.createElement('div');
        card.className = 'collection-card';

        var countText = isDiscovered ? '発見: ' + collection[char.id].count + '回' : '未発見';
        var nameText = isDiscovered ? char.name : '???';
        var imgClass = isDiscovered ? '' : 'silhouette';

        card.innerHTML =
            '<div class="card-img-wrapper">' +
                '<img src="' + char.image_path + '" class="' + imgClass + '" alt="' + nameText + '">' +
            '</div>' +
            '<div class="card-name">' + nameText + '</div>' +
            '<div class="card-count">' + countText + '</div>';
        grid.appendChild(card);
    }
}
