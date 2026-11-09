// ===== NauMovie =====
const SB_URL = 'https://imkdoccinppycirfmdum.supabase.co';

const SB_KEY = 'sb_publishable_doKirTcsgNO3RQZhpj9cFw_gyadzIaS';

const sb = supabase.createClient(SB_URL, SB_KEY);

const $ = s => document.querySelector(s);

const P = {
    home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
    clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
    down: 'M12 3v12M7 11l5 5 5-5M4 20h16',
    film: 'M4 4h16v16H4zM8 4v16M16 4v16M4 9h4M4 15h4M16 9h4M16 15h4',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6',
    tool: 'M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9zM14 6l3-3',
    key: 'M15 9a4 4 0 1 0-3 3l-8 8h3v-3h3v-3z',
    bow: 'M12 12c-3-5-8-6-9-3s3 7 9 3zM12 12c3-5 8-6 9-3s-3 7-9 3zM12 12l-3 8M12 12l3 8',
    palette: 'M12 3a9 9 0 1 0 0 18c2 0 2-2 1-3s0-3 2-3h3a3 3 0 0 0 3-3c0-5-4-9-9-9z',
    play: 'M7 4l13 8-13 8z',
    copy: 'M9 9h11v11H9zM5 15V5h10',
    mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
    send: 'M3 11l18-8-8 18-2-8z',
    smile: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 14a5 5 0 0 0 8 0M9 9.5h.01M15 9.5h.01',
    sticker: 'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v9l-6 6H5a1 1 0 0 1-1-1zM20 14h-5a1 1 0 0 0-1 1v5',
    camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    pause: 'M8 5v14M16 5v14',
    eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    eyeoff: 'M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.5 6.9C3.7 8.7 2 12 2 12s4 7 10 7a9.6 9.6 0 0 0 4-.9M9.9 9.9a3 3 0 0 0 4.2 4.2',
    sparkle: 'M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9zM19 3v4M17 5h4',
    heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    star: 'M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2-5.5-3-5.5 3 1-6.2L3 9.7l6.2-.9z',
    tv: 'M3 6h18v12H3zM8 21h8M12 18v3',
    sliders: 'M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6',
    globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
    lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
    mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
    info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 7.5h.01',
    headset: 'M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3z',
    micoff: 'M3 3l18 18M9 9V6a3 3 0 0 1 5.5-1.6M15 11v1a3 3 0 0 1-4.5 2.6M5 11a7 7 0 0 0 11 5.7M12 18v3'
};

const ic = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n]}"/></svg>`;

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[c]));

let me = null, titles = [], tab = 'home', room = null, chan = null, suppress = false, pubT = null, hb = null, vc = null;

const THEMES = { deep: ['Biru malam', '#4f7cff'], noir: ['Noir pink', '#ff5fae'], matcha: ['Matcha', '#6fcf6a'], lemon: ['Lemon', '#ffd23f'], lilac: ['Lilac', '#a98bff'], peach: ['Persik', '#ff8a5c'] };
setTheme(THEMES[localStorage.nm_theme] ? localStorage.nm_theme : 'deep', true);

// ---- sound (WebAudio, tanpa file) ----
let ac;

let unlocked = false;

function audio() {
    try {
        ac = ac || new (window.AudioContext || window.webkitAudioContext)();
        if (ac.state !== 'running') ac.resume().catch(() => { });
    } catch (e) { }
    return ac;
}

function tone(f = 660, d = .25, v = .05, t = 'sine') {
    if (localStorage.nm_snd === '0') return;
    const c = audio();
    if (!c) return;
    const play = () => {
        try {
            const o = c.createOscillator(), g = c.createGain(), n = c.currentTime;
            o.type = t;
            o.frequency.value = f;
            g.gain.setValueAtTime(v, n);
            g.gain.exponentialRampToValueAtTime(.0001, n + d);
            o.connect(g).connect(c.destination);
            o.start(n);
            o.stop(n + d);
        } catch (e) { }
    };
    if (c.state === 'running') play();
    else if (unlocked) c.resume().then(play).catch(() => { });
}

// browser baru mengizinkan suara setelah interaksi pertama (klik / sentuh / ketik)
const unlock = () => {
    unlocked = true;
    const c = audio();
    try {
        const s = c.createBufferSource();
        s.buffer = c.createBuffer(1, 1, 22050);
        s.connect(c.destination);
        s.start(0);
    } catch (e) { }
};
['pointerdown', 'touchstart', 'touchend', 'keydown', 'click'].forEach(e => addEventListener(e, unlock, { capture: true, passive: true }));
document.addEventListener('visibilitychange', () => { if (!document.hidden && unlocked) audio(); });

const PACKS = {
    kristal: ['Kristal', 'sine', [1319, 1568, 1760], [1047, 1319, 1568]],
    marimba: ['Marimba', 'triangle', [523, 659, 784], [392, 523, 659, 784]],
    gelembung: ['Gelembung', 'sine', [440, 520, 600], [330, 495, 740]],
    arcade: ['Arcade', 'square', [988, 1175], [523, 784, 1047]],
    lonceng: ['Lonceng', 'sine', [1568, 2093], [880, 1319, 1760]],
    senyap: ['Senyap', 'sine', [], []]
};
const pack = () => PACKS[localStorage.nm_pack] || PACKS.kristal;
const sHover = () => { const [, w, h] = pack(); if (h.length) tone(h[(Math.random() * h.length) | 0], .13, w === 'square' ? .012 : .022, w); };
const sClick = () => { const [, w, , c] = pack(); c.forEach((f, i) => setTimeout(() => tone(f, .3, w === 'square' ? .02 : .045, w), i * 75)); };
const chirp = (f = 1400) => { tone(f, .09, .04, 'sine'); setTimeout(() => tone(f * 1.25, .1, .04, 'sine'), 90); };
function setPack(k) { localStorage.nm_pack = k; document.querySelectorAll('.pk').forEach(b => b.classList.toggle('on', b.dataset.k === k)); sClick(); }

document.addEventListener('pointerenter', e => {
    if (e.target.closest?.('.btn,.tab,.chip,.poster,.item,.avopt,.ib,.swatch'))
        sHover();
}, true);

document.addEventListener('click', e => {
    if (e.target.closest('.btn,.tab,.chip,.swatch'))
        sClick();
});

function toast(m) {
    const t = $('#toast');
    t.textContent = m;
    t.classList.add('on');
    setTimeout(() => t.classList.remove('on'), 2600);
}

// ---- auth ----
const mail = u => u.trim().toLowerCase().replace(/[^a-z0-9_]/g, '') + '@naumovie.app';

let regMode = false;

function setMode(reg) {
    if ($('#p').type === 'text') $('#eye').click();
    regMode = reg;
    $('.login').dataset.m = reg ? 'reg' : 'login';
    document.querySelectorAll('.ltabs .tab[data-k]').forEach(b => b.classList.toggle('on', b.dataset.k === (reg ? 'reg' : 'login')));
    $('#p').setAttribute('autocomplete', reg ? 'new-password' : 'current-password');
    $('#go').textContent = reg ? 'Daftar' : 'Masuk';
}

let swapping = false;

function swapMode(reg) {
    if (reg === regMode || swapping)
        return;
    swapping = true;
    $('.login').dataset.m = reg ? 'reg' : 'login';
    const f = $('#fl'), d = reg ? 1 : -1;
    document.querySelectorAll('.ltabs .tab[data-k]').forEach(b => b.classList.toggle('on', b.dataset.k === (reg ? 'reg' : 'login')));
    $('.mascot').animate([{ rotate: '0deg' }, { rotate: '-14deg' }, { rotate: '0deg' }], {
        duration: 420,
        easing: 'ease-in-out'
    });
    const out = f.animate([{
            opacity: 1,
            transform: 'translateX(0)'
        }, {
            opacity: 0,
            transform: `translateX(${-26 * d}px)`
        }], {
        duration: 170,
        easing: 'ease-in',
        fill: 'forwards'
    });
    out.onfinish = () => {
        setMode(reg);
        const inn = f.animate([{
                opacity: 0,
                transform: `translateX(${26 * d}px)`
            }, {
                opacity: 1,
                transform: 'translateX(0)'
            }], {
            duration: 300,
            easing: 'cubic-bezier(.2,.9,.3,1)'
        });
        out.cancel();
        inn.onfinish = () => {
            swapping = false;
        };
    };
}

function loginView(reg = false) {
    if ($('.login .card')) {
        swapMode(reg);
        return;
    }
    regMode = reg;
    $('#app').innerHTML = `<div class="login" data-m="${reg ? 'reg' : 'login'}"><div class="card glass"><div class="mascot"><img src="img/chick.png" alt=""></div><img class="brandlogo" src="img/logo.png" alt="NauMovie"><p class="welcome gt">Selamat datang di Bioskop Naura</p>
<nav class="ltabs glass"><button class="tab ${reg ? '' : 'on'}" data-k="login"><b>${ic('key')}</b>Masuk</button><button class="tab ${reg ? 'on' : ''}" data-k="reg"><b>${ic('bow')}</b>Daftar</button></nav>
<div id="fl"><input id="u" placeholder="Username" autocomplete="username" autocapitalize="none"><div class="pw"><input id="p" type="password" placeholder="Password (min. 6 karakter)" autocomplete="${reg ? 'new-password' : 'current-password'}"><button type="button" class="eye" id="eye" aria-label="Tampilkan password" aria-pressed="false">${ic('eyeoff')}</button></div>
<button class="btn glow" id="go" style="width:100%">${reg ? 'Daftar' : 'Masuk'}</button></div></div></div>`;
    document.querySelectorAll('.ltabs .tab').forEach(b => b.onclick = () => {
        const k = b.dataset.k;
        if (k === 'theme')
            return toggleTheme();
        loginView(k === 'reg');
    });
    const submit = async () => {
        const u = $('#u').value, p = $('#p').value;
        if (u.length < 3 || p.length < 6)
            return toast('Username min 3, password min 6 ya');
        const reg = regMode;
        const r = reg ? await sb.auth.signUp({
            email: mail(u),
            password: p,
            options: { data: { username: u.trim() } }
        }) : await sb.auth.signInWithPassword({
            email: mail(u),
            password: p
        });
        if (r.error)
            return toast(r.error.message.includes('Invalid') ? 'Username / password salah' : r.error.message);
        if (reg && !r.data.session)
            return toast('Daftar OK. Matikan "Confirm email" di Supabase lalu login');
        boot();
    };
    $('#go').onclick = submit;
    $('#eye').onclick = () => {
        const p = $('#p'), show = p.type === 'password';
        p.type = show ? 'text' : 'password';
        $('#eye').innerHTML = ic(show ? 'eye' : 'eyeoff');
        $('#eye').setAttribute('aria-pressed', show);
        $('#eye').setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
        p.focus();
    };
    hideSplash();
    $('#p').addEventListener('keydown', e => {
        if (e.key === 'Enter')
            submit();
    });
}

function setTheme(t, silent) {
    const h = document.documentElement;
    if (!silent) {
        h.classList.add('tswap');
        setTimeout(() => h.classList.remove('tswap'), 650);
    }
    h.dataset.theme = t;
    localStorage.nm_theme = t;
    const m = document.querySelector('meta[name=theme-color]');
    if (m)
        m.content = getComputedStyle(h).getPropertyValue('--bg').trim() || '#040a1f';
    window.dispatchEvent(new Event('themechange'));
}

function toggleTheme() {
    const k = Object.keys(THEMES), i = k.indexOf(document.documentElement.dataset.theme);
    setTheme(k[(i + 1) % k.length]);
    sClick();
}

function hideSplash() {
    const s = $('#splash');
    if (!s)
        return;
    setTimeout(() => {
        s.classList.add('out');
        setTimeout(() => s.remove(), 800);
    }, Math.max(0, 1300 - performance.now()));
}

function moveInd() {
    const i = $('.tabs .ind'), b = $('.tabs .tab.on');
    if (!i || !b)
        return;
    const first = !i.dataset.p;
    if (first)
        i.style.transition = 'none';
    i.style.width = b.offsetWidth + 'px';
    i.style.background = getComputedStyle(b).getPropertyValue('--c') || '';
    i.style.transform = `translateX(${b.offsetLeft}px)`;
    if (first) {
        i.getBoundingClientRect();
        i.style.transition = '';
        i.dataset.p = '1';
    }
}

addEventListener('resize', moveInd);

async function boot() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session)
        return loginView();
    const { data: p } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
    me = {
        id: session.user.id,
        ...p
    };
    me.avatar = me.avatar || 'kucing';
    const { data } = await sb.from('titles').select('*').order('created_at', { ascending: false });
    titles = data || [];
    await loadRatings().catch(() => { });
    shell();
    await playIntro();
    await lobby();
    const rc = new URLSearchParams(location.search).get('room');
    if (rc)
        joinRoom(rc);
}

function shell() {
    const T = [['home', 'home', 'Home'], ['discover', 'search', 'Discover'], ['history', 'clock', 'Riwayat'], ['dl', 'down', 'Unduhan'], ['room', 'film', 'Nobar'], ['more', 'sliders', 'Lainnya']];
    if (me.role === 'admin')
        T.push(['admin', 'tool', 'Admin']);
    $('#app').innerHTML = `<header class="top glass"><img class="brand" src="img/logo.png" alt="NauMovie" onclick="go('home')"><span class="hr"><button class="btn sm ghost fxbtn" onclick="toggleFx()" aria-label="Efek partikel">${ic('sparkle')}</button><button class="btn sm ghost" onclick="toggleTheme()" aria-label="Ganti tema">${ic('palette')}</button><button class="avchip" onclick="go('me')" aria-label="Profil">${av(me.avatar, 34)}</button></span></header><main id="v"></main>
<nav class="tabs glass"><i class="ind"></i>${T.map(t => `<button class="tab" data-t="${t[0]}"><b>${ic(t[1])}</b>${t[2]}</button>`).join('')}</nav>`;
    document.querySelectorAll('.tab').forEach(b => b.onclick = () => go(b.dataset.t));
    go(tab);
}

async function go(t) {
    tab = t;
    clearInterval(heroT);
    clearInterval(pubT);
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.t === t));
    moveInd();
    await views[t]();
    window.scrollTo({ top: 0 });
}

const bg = u => u ? `style="background-image:url('${esc(u)}')"` : '';

let ratings = {}, myR = {};
const rtBadge = id => ratings[id] ? `<em class="rt">★ ${ratings[id].avg}</em>` : '';

const poster = t => `<div class="poster" ${bg(t.thumbnail_url)} onclick="openTitle(${t.id})">${t.type === 'series' ? '<em class="tag">Series</em>' : ''}${rtBadge(t.id)}<span>${esc(t.title)}</span></div>`;

const empty = m => `<div class="empty"><img class="eimg" src="img/chick.png" alt="">${m}</div>`;

const skel = n => `<div class="skel">${'<div class="item glass sk"><div class="th"></div><div class="inf"><i></i><i></i></div></div>'.repeat(n)}</div>`;

let heroT = null, heroI = 0;

function heroShow(i, feat) {
    const h = $('#hero');
    if (!h)
        return clearInterval(heroT);
    heroI = i;
    const t = feat[i];
    h.innerHTML = `<div class="hbg" ${bg(t.thumbnail_url)}></div><div class="hc"><span class="badge">${t.type === 'series' ? 'Series' : 'Film'}${t.year ? ' · ' + t.year : ''}</span><h1 class="gt">${esc(t.title)}</h1><p>${esc(t.description)}</p><div><button class="btn" onclick="openTitle(${t.id})">${ic('play')} Tonton</button></div></div>${feat.length > 1 ? `<div class="dots">${feat.map((_, k) => `<button class="${k === i ? 'on' : ''}" data-i="${k}" aria-label="Slide ${k + 1}"></button>`).join('')}</div>` : ''}`;
    h.querySelectorAll('.dots button').forEach(b => b.onclick = () => {
        clearInterval(heroT);
        heroShow(+b.dataset.i, feat);
        heroT = setInterval(() => heroShow((heroI + 1) % feat.length, feat), 6500);
    });
}

const views = {
    home() {
        if (!titles.length) {
            $('#v').innerHTML = empty('Belum ada film');
            return;
        }
        const feat = titles.slice(0, 5);
        const mv = titles.filter(t => t.type !== 'series'), sr = titles.filter(t => t.type === 'series');
        const rowOf = (ico, name, l) => l.length ? `<h2>${ic(ico)} ${name}</h2><div class="row">${l.map(poster).join('')}</div>` : '';
        $('#v').innerHTML = `<p class="hi">Halo, <b class="gt">${esc(me.username)}</b> ${ic('heart')}</p><p class="sub">Mau nonton apa hari ini? <button class="btn sm ghost" onclick="randomPick()">${ic('sparkle')} Acak film</button></p><div class="hero glass" id="hero"></div>${rowOf('star', 'Rating tertinggi', titles.filter(t => ratings[t.id]).sort((a, b) => ratings[b.id].avg - ratings[a.id].avg || ratings[b.id].n - ratings[a.id].n).slice(0, 10))}${rowOf('sparkle', 'Baru ditambahkan', titles)}${mv.length && sr.length ? rowOf('film', 'Film', mv) + rowOf('tv', 'Series', sr) : ''}`;
        heroShow(0, feat);
        contRow();
        if (feat.length > 1)
            heroT = setInterval(() => heroShow((heroI + 1) % feat.length, feat), 6500);
    },
    discover(q = '', g = 'Semua') {
        const gs = ['Semua', ...new Set(titles.flatMap(t => (t.genre || '').split(',').map(x => x.trim()).filter(Boolean)))];
        const grid = () => titles.filter(t => t.title.toLowerCase().includes(q.toLowerCase()) && (g === 'Semua' || (t.genre || '').includes(g))).map(poster).join('') || empty('Ga ketemu');
        $('#v').innerHTML = `<div class="sbox">${ic('search')}<input id="q" placeholder="Cari film / series..." value="${esc(q)}" autocomplete="off"></div><div class="chips">${gs.map(x => `<button class="chip ${x === g ? 'on' : ''}" data-g="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="grid" id="gr">${grid()}</div>`;
        $('#q').oninput = e => {
            q = e.target.value;
            $('#gr').innerHTML = grid();
        };
        document.querySelectorAll('.chip').forEach(c => c.onclick = () => {
            g = c.dataset.g;
            document.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === c));
            $('#gr').innerHTML = grid();
        });
    },
    async history() {
        $('#v').innerHTML = skel(4);
        const { data } = await sb.from('history').select('*,titles(*)').eq('user_id', me.id).order('updated_at', { ascending: false });
        if (tab !== 'history')
            return;
        $('#v').innerHTML = '<h2>' + ic('clock') + ' Riwayat tontonan</h2>' + ((data || []).map(h => item(h.titles, `<div class="bar"><i style="width:${Math.min(100, h.progress / 6)}%"></i></div>`)).join('') || empty('Belum nonton apa-apa'));
    },
    async dl() {
        $('#v').innerHTML = skel(4);
        const { data } = await sb.from('downloads').select('*,titles(*)').eq('user_id', me.id);
        if (tab !== 'dl')
            return;
        $('#v').innerHTML = '<h2>' + ic('down') + ' Unduhan / Tersimpan</h2>' + ((data || []).map(d => item(d.titles, `<button class="btn sm danger" onclick="event.stopPropagation();rmDl(${d.title_id})">Hapus</button>`)).join('') || empty('Kosong. Simpan dari halaman film'));
    },
    room() {
        $('#v').innerHTML = `<h2>${ic('film')} Nobar</h2><div class="two"><div class="glass pad"><b>Buat ruangan</b>
<div class="seg" id="vis"><button class="on" data-p="1">${ic('globe')} Publik</button><button data-p="0">${ic('lock')} Privat</button></div>
<p id="vhint" class="hint">Publik: muncul di daftar, siapa saja bisa gabung.</p>
<select id="rt">${titles.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('')}</select><button class="btn glow" style="width:100%" onclick="makeRoom()">Buat Room</button></div>
<div class="glass pad"><b>Gabung pakai kode</b><p class="hint">Untuk room privat, masukin 5 karakter dari temanmu.</p><input id="rc" maxlength="5" placeholder="ABCDE" style="text-transform:uppercase;text-align:center;letter-spacing:.3em"><button class="btn glow" style="width:100%" onclick="joinRoom($('#rc').value)">Gabung</button></div></div>
<h2>${ic('globe')} Nobar publik</h2><div id="pubs">${skel(2)}</div>`;
        document.querySelectorAll('#vis button').forEach(x => x.onclick = () => {
            document.querySelectorAll('#vis button').forEach(y => y.classList.toggle('on', y === x));
            $('#vhint').textContent = x.dataset.p === '1' ? 'Publik: muncul di daftar, siapa saja bisa gabung.' : 'Privat: tidak muncul di daftar, hanya yang punya kode.';
        });
        loadPublic();
        pubT = setInterval(loadPublic, 12000);
    },
    more() {
        const sw = (id, on, fn) => `<button class="sw ${on ? 'on' : ''}" id="${id}" role="switch" aria-checked="${on}" onclick="${fn}"></button>`;
        const row = (t, d, c) => `<div class="srow"><div><b>${t}</b><small>${d}</small></div>${c}</div>`;
        const fxOn = !document.documentElement.classList.contains('nofx');
        $('#v').innerHTML = `<h2>${ic('sliders')} Lainnya</h2>
<div class="glass pad set"><h3>Tampilan</h3>
${row('Warna', 'Pilih warna aplikasi', `<span class="swatches">${Object.entries(THEMES).map(([k, v]) => `<button class="swatch ${document.documentElement.dataset.theme === k ? 'on' : ''}" style="--s:${v[1]}" aria-label="${v[0]}" onclick="setTheme('${k}');views.more()"></button>`).join('')}</span>`)}
${row('Efek partikel', 'Hati, bintang, dan jejak kursor', sw('s_fx', fxOn, 'toggleFx();setSw(this,!document.documentElement.classList.contains(\'nofx\'))'))}
${row('Intro logo', 'Animasi anak ayam saat buka bioskop', sw('s_in', localStorage.nm_intro !== '0', 'togglePref(\'nm_intro\',this)'))}
${row('Putar ulang intro', 'Lihat animasinya lagi', `<button class="btn sm ghost" onclick="playIntro(true)">${ic('play')}</button>`)}</div>
<div class="glass pad set"><h3>Suara</h3>
${row('Gaya bunyi', 'Hover dan klik', `<span class="packs">${Object.entries(PACKS).map(([k, v]) => `<button class="chip pk ${(localStorage.nm_pack || 'kristal') === k ? 'on' : ''}" data-k="${k}" onclick="setPack('${k}')">${v[0]}</button>`).join('')}</span>`)}
${row('Nada antarmuka', 'Bunyi klik dan notifikasi', sw('s_sn', localStorage.nm_snd !== '0', 'togglePref(\'nm_snd\',this)'))}
<p class="hint">Obrolan suara nobar ada di dalam room (tombol Gabung suara). Butuh izin mikrofon.</p></div>
<div class="glass pad set"><h3>Pemutar & kenyamanan</h3>
${row('Putar episode berikutnya', 'Otomatis lanjut setelah episode selesai', sw('s_au', localStorage.nm_auto !== '0', 'togglePref(\'nm_auto\',this)'))}
${row('Ukuran teks', 'Kecil, normal, atau besar', `<span class="packs">${[['s', 'Kecil'], ['m', 'Normal'], ['l', 'Besar']].map(([k, n]) => `<button class="chip fsb ${(localStorage.nm_fs || 'm') === k ? 'on' : ''}" data-k="${k}" onclick="setFs('${k}')">${n}</button>`).join('')}</span>`)}
${row('Lobi bioskop', 'Layar tiket setelah masuk', sw('s_lb', localStorage.nm_lobby0 !== '1', 'localStorage.nm_lobby0=localStorage.nm_lobby0===\'1\'?\'0\':\'1\';setSw(this,localStorage.nm_lobby0!==\'1\')'))}
${row('Hapus riwayat', 'Bersihkan semua tontonan', `<button class="btn sm danger" onclick="clearHistory()">Hapus</button>`)}</div>
<div class="glass pad set"><h3>Akun</h3>
${row(esc(me.username), me.role === 'admin' ? 'Admin' : 'Member', `<button class="btn sm ghost" onclick="go('me')">${ic('user')} Profil</button>`)}
${row('Keluar', 'Akhiri sesi di perangkat ini', `<button class="btn sm danger" onclick="sb.auth.signOut().then(()=>loginView())">Keluar</button>`)}</div>
<div class="glass pad set"><h3>${ic('mail')} Hubungi layanan</h3>
<p class="hint">Kirim keluhan atau request fitur. Pesan tersimpan di sistem dan email ke layanan akan terbuka otomatis.</p>
<select id="fb_k" onchange="rqToggle()"><option value="keluhan">Keluhan</option><option value="request">Request film / series / fitur</option><option value="bug">Laporkan bug</option><option value="lainnya">Lainnya</option></select>
<div id="rq" hidden><p class="hint">Cari film atau series di TMDB, pilih yang kamu mau. Datanya ikut terkirim ke admin.</p><div class="sbox">${ic('search')}<input id="rq_q" placeholder="Cari judul di TMDB..." autocomplete="off"></div><div id="rq_res"></div><div id="rq_sel"></div></div><textarea id="fb_m" maxlength="2000" placeholder="Ceritakan keluhan / request kamu (kalau sudah pilih judul, boleh kosong)"></textarea>
<input id="fb_c" maxlength="120" placeholder="Kontak balasan (opsional)">
<button class="btn glow" id="fb_go" style="width:100%" onclick="sendFeedback()">${ic('send')} Kirim</button></div>
<div class="glass pad set"><h3>${ic('info')} Tentang</h3><p class="hint">NauMovie · Bioskop Naura<br>Layanan: ${FB_MAIL}</p></div>`;
    },
    me() {
        $('#v').innerHTML = `<div class="glass pad prof">
<div class="avbig">${av(me.avatar, 104)}</div>
<h2>${esc(me.username)}</h2>
<p class="role">${me.role === 'admin' ? 'Admin' : 'Member'}</p><div class="stats" id="stats"></div>
<h3>Akun</h3><div class="pf"><input id="pn" value="${esc(me.username)}" maxlength="24" placeholder="Nama tampilan"><button class="btn sm" onclick="saveName()">Simpan nama</button></div><div class="pf"><input id="pp" type="password" placeholder="Password baru (min. 6)" autocomplete="new-password"><button class="btn sm ghost" onclick="savePass()">Ganti password</button></div><h3>Pilih avatar</h3>${avGroups()}
<label class="btn ghost upl">${ic('camera')} Upload foto sendiri<input type="file" id="avf" accept="image/png,image/jpeg,image/webp,image/gif" hidden onchange="uploadAvatar(this)"></label>
<div class="prow"><button class="btn ghost" onclick="toggleTheme()">${ic('palette')} Tema</button><button class="btn danger" onclick="sb.auth.signOut().then(()=>loginView())">Keluar</button></div>
</div>`;
        loadStats();
    },
    async admin(sec = 'cat', q = '') {
        const S = [['cat', 'Katalog', 'film'], ['add', 'Tambah', 'sparkle'], ['ep', 'Episode', 'tv'], ['imp', 'Import', 'down'], ['fb', 'Masukan', 'mail']];
        const f = (l, c) => `<label class="fld"><span>${l}</span>${c}</label>`;
        const sers = titles.filter(t => t.type === 'series');
        const body = {
            cat: () => `<div class="sbox">${ic('search')}<input id="aq" placeholder="Cari di katalog..." value="${esc(q)}" autocomplete="off"></div><p class="hint">${titles.length} judul · ${sers.length} series</p><div id="alist">${adminList(q)}</div>`,
            add: () => `<div class="glass pad"><div class="fgrid">${f('Judul', '<input id="a_t">')}${f('Jenis', '<select id="a_ty"><option value="movie">Film</option><option value="series">Series</option></select>')}${f('Tahun', '<input id="a_y" type="number">')}${f('Genre (pisah koma)', '<input id="a_g">')}</div>${f('Deskripsi', '<textarea id="a_d"></textarea>')}<div class="fgrid">${f('Video (link .mp4/.m3u8 atau upload)', '<input id="a_v"><input id="a_vf" type="file" accept="video/*">')}${f('Thumbnail (link atau upload)', '<input id="a_th"><input id="a_thf" type="file" accept="image/*">')}</div><button class="btn glow" style="width:100%" onclick="addTitle()">Simpan judul</button></div>`,
            ep: () => sers.length ? `<div class="glass pad"><div class="fgrid">${f('Series', `<select id="e_t">${sers.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('')}</select>`)}${f('Season', '<input id="e_s" type="number" placeholder="1">')}${f('Episode ke', '<input id="e_n" type="number">')}${f('Judul episode', '<input id="e_nm">')}</div>${f('Video (link atau upload)', '<input id="e_v"><input id="e_vf" type="file" accept="video/*">')}${f('Thumbnail (opsional)', '<input id="e_th">')}<button class="btn glow" style="width:100%" onclick="addEp()">Simpan episode</button></div>` : empty('Belum ada series. Tambah dulu di tab Tambah'),
            fb: () => `<div id="fblist">${skel(2)}</div>`,
            imp: () => `<div class="glass pad"><b>Lengkapi otomatis (TMDB)</b><p class="hint">Aktif otomatis: deskripsi, poster, tahun, dan genre diisi dari TMDB berdasarkan judul. Kalau judul kosong, diambil dari nama file video.</p></div><div class="glass pad"><b>Dari API</b><input id="j_u" placeholder="URL API (array JSON)"><button class="btn ghost" style="width:100%" onclick="importApi()">Import dari API</button></div><div class="glass pad"><b>Tempel JSON</b><p class="hint">Tempel isi JSON berisi link CDN. Tidak perlu simpan file di HP / PC.</p><textarea id="j_t" placeholder='[{"title":"Judul","video_url":"https://cdn.../film.m3u8"}]'></textarea><button class="btn ghost" style="width:100%" onclick="importText()">Import dari teks</button></div><div class="glass pad"><b>Dari file .json</b><p class="hint">Boleh array atau {data:[...]}. Cukup isi link video saja, judul diambil dari nama file. Kunci yang dikenali: title/judul/name, video_url/url/link, poster/thumbnail, description/deskripsi, year/tahun, genre, dan episodes:[{season,number,name,video_url}] untuk series.</p><input id="j_f" type="file" accept=".json" onchange="importFile(this)"></div>`
        }[sec]();
        $('#v').innerHTML = `<h2>${ic('tool')} Admin</h2><div class="seg adm">${S.map(x => `<button class="${x[0] === sec ? 'on' : ''}" onclick="views.admin('${x[0]}')">${ic(x[2])} ${x[1]}</button>`).join('')}</div>${body}`;
        if (sec === 'fb') loadFb();
        const aq = $('#aq');
        if (aq) aq.oninput = e => { $('#alist').innerHTML = adminList(e.target.value); };
    }
};

const adminList = q => titles.filter(t => t.title.toLowerCase().includes((q || '').toLowerCase())).map(t => item(t, `<button class="btn sm danger" onclick="event.stopPropagation();delTitle(${t.id})">Hapus</button>`)).join('') || empty('Tidak ada judul');

const item = (t, extra = '') => t ? `<div class="item glass glow" onclick="openTitle(${t.id})"><div class="th" ${bg(t.thumbnail_url)}></div><div class="inf"><b>${esc(t.title)}</b><br><small>${esc(t.genre || '')} ${t.year || ''}${ratings[t.id] ? ' · ★ ' + ratings[t.id].avg : ''}</small>${extra.startsWith('<div') ? extra : ''}</div>${extra.startsWith('<button') ? extra : ''}</div>` : '';

// ---- pemutar: streaming langsung dari link CDN (tanpa simpan file) ----
let hlsI = null;

function loadSrc(v, url) {
    if (hlsI) { hlsI.destroy(); hlsI = null; }
    const isHls = /\.m3u8(\?|#|$)/i.test(url || '');
    if (isHls && !v.canPlayType('application/vnd.apple.mpegurl') && window.Hls && Hls.isSupported()) {
        hlsI = new Hls({ maxBufferLength: 30 });
        hlsI.loadSource(url);
        hlsI.attachMedia(v);
        hlsI.on(Hls.Events.ERROR, (_, d) => { if (d.fatal) toast('Stream gagal dimuat, cek link m3u8-nya'); });
    } else {
        v.src = url;
        v.load();
    }
}

// ---- film ----
let curEp = null, epList = [];

const epRow = e => `<div class="item ep glass glow ${curEp && e.id == curEp.id ? 'on' : ''}" data-e="${e.id}"><div class="th" ${bg(e.thumbnail_url)}></div><div class="inf"><b>S${e.season} E${e.number}</b><br><small>${esc(e.name || '')}</small></div><span>${ic('play')}</span></div>`;

async function openTitle(id, roomMode = false) {
    const t = titles.find(x => x.id == id);
    if (!t)
        return;
    const [{ data: h }, { data: eps }] = await Promise.all([sb.from('history').select('progress,episode_id').eq('user_id', me.id).eq('title_id', id).maybeSingle(), sb.from('episodes').select('*').eq('title_id', id).order('season').order('number')]);
    epList = eps || [];
    const isS = t.type === 'series' && epList.length;
    const pick = (roomMode && room.episode_id) || h?.episode_id;
    curEp = isS ? (epList.find(e => e.id == pick) || epList[0]) : null;
    const lbl = () => curEp ? `S${curEp.season} E${curEp.number} · ${esc(curEp.name || '')}` : '';
    const m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = `<div class="sheet glass"><video id="vid" data-src="${esc(curEp ? curEp.video_url : t.video_url)}" controls playsinline preload="metadata"></video><h2>${esc(t.title)}</h2><b id="epn" style="color:var(--ac2)">${lbl()}</b><p style="color:var(--mut);font-size:.9rem;margin-top:6px">${esc(t.description)}</p><br>
<div class="rate" id="rate"></div><div id="rinfo"></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="sv">${ic('down')} Simpan</button><button class="btn sm ghost" id="cl">Tutup</button></div>${isS ? `<h2>Episode</h2><div id="eps">${epList.map(epRow).join('')}</div>` : ''}</div>`;
    document.body.appendChild(m);
    drawRate(id);
    m.onclick = e => {
        if (e.target === m)
            $('#cl').click();
    };
    const v = $('#vid');
    loadSrc(v, v.dataset.src);
    v.addEventListener('error', () => toast('Video gagal dimuat. Cek link CDN: harus HTTPS, format mp4 (H.264) atau m3u8'));
    const save = () => sb.from('history').upsert({
        user_id: me.id,
        title_id: id,
        episode_id: curEp?.id || null,
        progress: v.currentTime || 0,
        updated_at: new Date()
    });
    if (h?.progress && (!curEp || curEp.id == h.episode_id))
        v.addEventListener('loadedmetadata', () => v.currentTime = h.progress, { once: true });
    let last = 0;
    v.ontimeupdate = () => {
        if (Date.now() - last > 8000) {
            last = Date.now();
            save();
        }
    };
    window._sw = (e, fromRoom) => {
        curEp = e;
        loadSrc(v, e.video_url);
        $('#epn').innerHTML = lbl();
        m.querySelectorAll('#eps .item').forEach(x => x.classList.toggle('on', x.dataset.e == e.id));
        save();
        if (!fromRoom && room && room.host_id === me.id)
            sb.from('rooms').update({
                episode_id: e.id,
                position: 0,
                is_playing: false,
                updated_at: new Date()
            }).eq('code', room.code);
    };
    m.querySelectorAll('#eps .item').forEach(x => x.onclick = () => {
        window._sw(epList.find(e => e.id == x.dataset.e));
        v.play().catch(() => { });
    });
    v.addEventListener('ended', () => {
        if (!curEp || localStorage.nm_auto === '0')
            return;
        const n = epList[epList.findIndex(e => e.id === curEp.id) + 1];
        if (n) {
            toast('Lanjut episode berikutnya');
            window._sw(n);
            v.play().catch(() => { });
        }
    });
    $('#sv').onclick = async () => {
        await sb.from('downloads').upsert({
            user_id: me.id,
            title_id: id
        });
        toast('Tersimpan');
    };
    $('#cl').onclick = () => {
        if (hlsI) { hlsI.destroy(); hlsI = null; }
        cancelRec();
        save();
        clearInterval(hb);
        leaveVoice();
        if (chan) {
            sb.removeChannel(chan);
            chan = null;
            room = null;
        }
        m.remove();
    };
    if (roomMode)
        bindRoom(v);
}

const rmDl = async (id) => {
    await sb.from('downloads').delete().eq('user_id', me.id).eq('title_id', id);
    views.dl();
};

// ---- nobar ----
const FB_MAIL = 'aryadwiputrabimo56@gmail.com';

async function makeRoom() {
    const code = Math.random().toString(36).slice(2, 7).toUpperCase();
    const tid = +$('#rt').value;
    if (!tid)
        return toast('Pilih film dulu ya');
    const isPub = $('#vis .on')?.dataset.p === '1';
    const { error } = await sb.from('rooms').insert({
        code,
        host_id: me.id,
        title_id: tid,
        is_public: isPub
    });
    if (error)
        return toast(error.message);
    joinRoom(code);
}

async function joinRoom(code) {
    code = (code || '').trim().toUpperCase();
    if (code.length < 5)
        return toast('Kode 5 karakter ya');
    const { data: r, error } = await sb.rpc('join_room', { p_code: code });
    if (error || !r)
        return toast('Kode tidak ditemukan');
    room = r;
    await openTitle(r.title_id, true);
}

async function loadPublic() {
    const { data } = await sb.rpc('list_public_rooms');
    const el = $('#pubs');
    if (!el || tab !== 'room')
        return;
    el.innerHTML = (data || []).map(r => `<div class="item glass glow" onclick="joinRoom('${esc(r.code)}')"><div class="th" ${bg(r.thumbnail_url)}></div><div class="inf"><b>${esc(r.title || 'Film')}</b><br><small>${av(r.host_avatar || 'kucing', 22)} ${esc(r.host_name || 'Host')}</small></div><span class="live ${r.is_playing ? 'on' : ''}">${r.is_playing ? 'Diputar' : 'Menunggu'}</span></div>`).join('') || empty('Belum ada nobar publik. Buat yang pertama!');
}

function bindRoom(v) {
    const host = room.host_id === me.id, url = `${location.origin}${location.pathname}?room=${room.code}`;
    $('#rinfo').innerHTML = `<div class="glass pad" style="margin-bottom:10px"><div class="code">${room.code}</div><p class="vis-b">${room.is_public ? ic('globe') + ' Publik' : ic('lock') + ' Privat · bagikan kodenya'}</p><p style="text-align:center;color:var(--mut);font-size:.8rem">${host ? 'Kamu host: kontrol play/pause kamu diikuti semua' : 'Ikut kontrol host'}</p><div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><button class="btn sm" id="cp">${ic('copy')} Salin link</button></div>${voiceUI()}${chatUI()}</div>`;
    $('#cp').onclick = () => navigator.share ? navigator.share({
        title: 'Nobar NauMovie',
        text: `Nobar yuk! Kode: ${room.code}`,
        url
    }) : navigator.clipboard.writeText(url).then(() => toast('Link disalin'));
    const push = () => {
        if (host && !suppress)
            sb.from('rooms').update({
                is_playing: !v.paused,
                position: v.currentTime,
                updated_at: new Date()
            }).eq('code', room.code);
    };
    ['play', 'pause', 'seeked'].forEach(e => v.addEventListener(e, push));
    chan = sb.channel('r' + room.code).on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'rooms',
        filter: `code=eq.${room.code}`
    }, ({ new: n }) => {
        if (host)
            return;
        suppress = true;
        if (n.episode_id && curEp && n.episode_id !== curEp.id) {
            const e = epList.find(x => x.id == n.episode_id);
            if (e)
                window._sw(e, true);
        }
        if (Math.abs(v.currentTime - n.position) > 1.5)
            v.currentTime = n.position;
        n.is_playing ? v.play().catch(() => toast('Tap play untuk ikut')) : v.pause();
        setTimeout(() => suppress = false, 400);
    })
        .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'room_chat',
        filter: `code=eq.${room.code}`
    }, ({ new: c }) => addChat(c)).subscribe();
    initChat();
    initVoice();
    if (host)
        hb = setInterval(push, 45000);
}

// ---- suara peer-to-peer (WebRTC mesh, signaling lewat Supabase Realtime) ----
const ICE = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }] };

const voiceUI = () => `<div class="voice"><div class="vtop"><b>${ic('headset')} Obrolan suara</b><span id="vst">Mati</span></div><div class="vlist" id="vlist"></div><div class="vbtns"><button class="btn sm" id="vjoin">${ic('mic')} Gabung suara</button><button class="btn sm ghost" id="vmute" hidden>${ic('micoff')} Mute</button><button class="btn sm ghost" id="vdeaf" hidden>${ic('headset')} Deafen</button></div><p class="hint" id="vhint2" hidden>Ketuk nama teman untuk membisukan dia (hanya di telingamu).</p></div>`;

function applyAudio() {
    if (!vc) return;
    Object.entries(vc.peers).forEach(([id, p]) => { if (p.el) p.el.muted = !!(vc.deaf || vc.loc[id]); });
}

function initVoice() {
    $('#vjoin').onclick = () => vc ? leaveVoice() : joinVoice();
    $('#vmute').onclick = () => {
        if (!vc) return;
        vc.muted = !vc.muted;
        vc.stream.getAudioTracks().forEach(t => t.enabled = !vc.muted);
        drawVoice();
    };
    // deafen: suara orang lain dibisukan di perangkatmu saja, mic-mu tetap jalan
    $('#vdeaf').onclick = () => { if (!vc) return; vc.deaf = !vc.deaf; applyAudio(); drawVoice(); };
    $('#vlist').onclick = e => {
        const b = e.target.closest('[data-id]');
        if (!b || !vc) return;
        vc.loc[b.dataset.id] = !vc.loc[b.dataset.id];
        applyAudio(); drawVoice();
    };
}

function drawVoice() {
    const st = $('#vst');
    if (!st) return;
    const ids = vc ? Object.keys(vc.peers) : [];
    st.textContent = vc ? `Terhubung · ${ids.length + 1} orang` : 'Mati';
    $('#vjoin').innerHTML = vc ? 'Keluar suara' : `${ic('mic')} Gabung suara`;
    $('#vmute').hidden = $('#vdeaf').hidden = $('#vhint2').hidden = !vc;
    if (vc) {
        $('#vmute').innerHTML = vc.muted ? `${ic('mic')} Nyalakan mic` : `${ic('micoff')} Mute mic`;
        $('#vmute').classList.toggle('hot', vc.muted);
        $('#vdeaf').innerHTML = vc.deaf ? `${ic('headset')} Dengar lagi` : `${ic('headset')} Deafen`;
        $('#vdeaf').classList.toggle('hot', vc.deaf);
    }
    $('#vlist').innerHTML = vc ? [`<span class="vchip on">${esc(me.username)}${vc.muted ? ' · mic mati' : ''}${vc.deaf ? ' · deaf' : ''}</span>`,
        ...ids.map(i => `<button class="vchip ${vc.peers[i].pc.connectionState === 'connected' ? 'on' : ''} ${vc.loc[i] ? 'off' : ''}" data-id="${i}">${esc(vc.names[i] || 'Teman')}${vc.loc[i] ? ' · dibisukan' : ''}</button>`)].join('') : '';
}

async function joinVoice() {
    if (!navigator.mediaDevices?.getUserMedia || !window.RTCPeerConnection)
        return toast('Browser ini belum mendukung suara');
    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    } catch (e) {
        return toast('Izin mikrofon ditolak');
    }
    if (!room) {
        stream.getTracks().forEach(t => t.stop());
        return;
    }
    const ch = sb.channel('vc' + room.code, { config: { broadcast: { self: false } } });
    vc = { stream, ch, peers: {}, names: {}, muted: false, deaf: false, loc: {} };
    vc.send = (type, to, data) => ch.send({ type: 'broadcast', event: 'sig', payload: { type, from: me.id, to, name: me.username, data } });
    ch.on('broadcast', { event: 'sig' }, ({ payload }) => onSig(payload).catch(() => { }));
    ch.subscribe(st => {
        if (st === 'SUBSCRIBED')
            vc?.send('hello', null);
    });
    drawVoice();
}

function closePeer(id) {
    const p = vc?.peers[id];
    if (!p)
        return;
    delete vc.peers[id];
    p.pc.close();
    if (p.el) {
        p.el.srcObject = null;
    }
    drawVoice();
}

function makePeer(id, init) {
    const pc = new RTCPeerConnection(ICE), p = { pc, q: [], el: null };
    vc.peers[id] = p;
    vc.stream.getTracks().forEach(t => pc.addTrack(t, vc.stream));
    pc.onicecandidate = e => e.candidate && vc?.send('ice', id, e.candidate.toJSON());
    pc.ontrack = e => {
        p.el = p.el || new Audio();
        p.el.autoplay = true;
        p.el.muted = !!(vc && (vc.deaf || vc.loc[id]));
        p.el.srcObject = e.streams[0];
        p.el.play().catch(() => { });
        drawVoice();
    };
    pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'failed')
            closePeer(id);
        else
            drawVoice();
    };
    if (init)
        pc.createOffer().then(o => pc.setLocalDescription(o)).then(() => vc?.send('offer', id, pc.localDescription));
    drawVoice();
    return p;
}

async function onSig(m) {
    if (!vc || m.from === me.id || (m.to && m.to !== me.id))
        return;
    vc.names[m.from] = m.name;
    const t = m.type;
    if (t === 'hello' || t === 'hi') {
        if (t === 'hello') {
            closePeer(m.from);
            vc.send('hi', m.from);
        }
        // satu sisi saja yang jadi penawar supaya tidak bentrok
        if (!vc.peers[m.from] && me.id > m.from)
            makePeer(m.from, true);
    } else if (t === 'offer') {
        closePeer(m.from);
        const p = makePeer(m.from, false);
        await p.pc.setRemoteDescription(m.data);
        for (const c of p.q.splice(0))
            await p.pc.addIceCandidate(c).catch(() => { });
        const a = await p.pc.createAnswer();
        await p.pc.setLocalDescription(a);
        vc.send('answer', m.from, p.pc.localDescription);
    } else if (t === 'answer') {
        const p = vc.peers[m.from];
        if (!p)
            return;
        await p.pc.setRemoteDescription(m.data);
        for (const c of p.q.splice(0))
            await p.pc.addIceCandidate(c).catch(() => { });
    } else if (t === 'ice') {
        const p = vc.peers[m.from];
        if (!p)
            return;
        p.pc.remoteDescription ? p.pc.addIceCandidate(m.data).catch(() => { }) : p.q.push(m.data);
    } else if (t === 'bye') {
        closePeer(m.from);
    }
}

function leaveVoice() {
    if (!vc)
        return;
    const v = vc;
    v.send('bye', null);
    Object.keys(v.peers).forEach(closePeer);
    v.stream.getTracks().forEach(t => t.stop());
    setTimeout(() => sb.removeChannel(v.ch), 300);
    vc = null;
    drawVoice();
}

// ---- pengaturan ----
function setSw(el, on) {
    el.classList.toggle('on', on);
    el.setAttribute('aria-checked', on);
}

function togglePref(k, el) {
    const on = localStorage[k] === '0';
    localStorage[k] = on ? '1' : '0';
    setSw(el, on);
}

async function sendFeedback() {
    const kind = $('#fb_k').value, contact = $('#fb_c').value.trim();
    const sel = kind === 'request' ? rqSel : null;
    let message = $('#fb_m').value.trim();
    if (!message && sel) message = `Request ${sel.media_type === 'tv' ? 'series' : 'film'}: ${sel.title}${sel.year ? ` (${sel.year})` : ''}`;
    if (message.length < 5)
        return toast('Tulis minimal 5 karakter ya');
    const b = $('#fb_go');
    b.disabled = true;
    const row = { kind, message, contact: contact || null };
    if (sel) Object.assign(row, { tmdb_id: sel.id, media_type: sel.media_type, poster_url: sel.poster, req_title: sel.title.slice(0, 200), req_year: sel.year || null });
    const { data: ins, error } = await sb.from('feedback').insert(row).select('id').single();
    b.disabled = false;
    if (error)
        return toast(error.message);
    $('#fb_m').value = '';
    rqSel = null;
    if ($('#rq_sel')) $('#rq_sel').innerHTML = '';
    // server yang kirim ke Discord + email (rahasia tidak ada di browser)
    const { data: n, error: ne } = await sb.functions.invoke('hub', { body: { action: 'notify', id: ins.id } });
    if (ne) {
        toast('Tersimpan. Membuka email layanan...');
        const subj = `[NauMovie] ${kind} dari ${me.username}`;
        const body = `${message}\n\n- ${me.username}${contact ? ' | ' + contact : ''}`;
        location.href = `mailto:${FB_MAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
        return;
    }
    toast(n?.discord || n?.email ? 'Terkirim ke admin, makasih!' : 'Tersimpan, admin akan membacanya');
}

// ---- intro: anak ayam -> logo -> pindah ke header ----
async function playIntro(replay) {
    $('#splash')?.remove();
    const brand = $('.brand');
    if ((localStorage.nm_intro === '0' && !replay) || matchMedia('(prefers-reduced-motion: reduce)').matches || !brand)
        return;
    window.scrollTo({ top: 0 });
    const box = document.createElement('div');
    box.id = 'intro';
    box.innerHTML = '<div class="i-bg"></div><img class="i-logo" src="img/logo.png" alt=""><img class="i-chick" src="img/chick.png" alt=""><b class="i-say"></b>';
    document.body.appendChild(box);
    brand.style.visibility = 'hidden';
    const bg = box.firstChild, logo = box.querySelector('.i-logo'), chick = box.querySelector('.i-chick');
    await Promise.all([logo, chick].map(i => i.decode().catch(() => { })));
    const vw = innerWidth, vh = innerHeight;
    const LW = Math.min(320, vw * .72), LH = LW * logo.naturalHeight / logo.naturalWidth;
    const lx = vw / 2 - LW / 2, ly = vh / 2 - LH / 2 - 10;
    const CW = Math.min(96, vw * .24), cx = vw / 2, cy = ly + LH / 2;
    Object.assign(logo.style, { left: lx + 'px', top: ly + 'px', width: LW + 'px' });
    Object.assign(chick.style, { left: cx - CW / 2 + 'px', top: cy - CW / 2 + 'px', width: CW + 'px' });
    // posisi anak ayam di dalam logo (kiri bawah, di samping tulisan THE MOVIE)
    const dx = lx + LW * .26 - cx, dy = ly + LH * .87 - cy, ts = LW * .145 / CW;
    const sayEl = box.querySelector('.i-say');
    const say = (t, f) => { if (skip) return; sayEl.textContent = t; sayEl.style.left = cx + 'px'; sayEl.style.top = (cy - CW * .95) + 'px'; sayEl.animate([{ opacity: 0, transform: 'translate(-50%,8px) scale(.6)' }, { opacity: 1, transform: 'translate(-50%,0) scale(1)' }], { duration: 260, fill: 'forwards', easing: 'cubic-bezier(.3,1.6,.5,1)' }); if (f) chirp(f); };
    const unsay = () => { sayEl.getAnimations().forEach(a => a.pause()); sayEl.animate([{ opacity: 1, transform: 'translate(-50%,0)' }, { opacity: 0, transform: 'translate(-50%,-12px) scale(.7)' }], { duration: 150, fill: 'forwards' }); };
    let skip = false;
    box.onclick = () => {
        skip = true;
        box.getAnimations({ subtree: true }).forEach(a => a.finish());
    };
    const run = (el, kf, o) => {
        const a = el.animate(kf, { fill: 'both', ...o });
        if (skip)
            a.finish();
        return a.finished.catch(() => { });
    };
    const wait = ms => new Promise(r => setTimeout(r, skip ? 0 : ms));
    const hearts = (x, y) => {
        for (let i = 0; i < 6; i++) {
            const h = document.createElement('i');
            h.className = 'i-heart';
            h.textContent = '♥';
            h.style.cssText = `left:${x + (Math.random() - .5) * 90}px;top:${y}px;--hx:${(Math.random() - .5) * 60}px;animation-delay:${i * 90}ms`;
            box.appendChild(h);
            setTimeout(() => h.remove(), 1600);
        }
    };
    // 1. anak ayam muncul memantul
    setTimeout(() => say('!', 1500), 420);
    await run(chick, [
        { opacity: 0, transform: 'translate(0,260px) scale(.3)' },
        { opacity: 1, transform: 'translate(0,-44px) scale(1.04)', offset: .6 },
        { opacity: 1, transform: 'translate(0,0) scale(1.14,.82)', offset: .8 },
        { opacity: 1, transform: 'translate(0,0) scale(1)' }
    ], { duration: 700, easing: 'cubic-bezier(.3,.7,.4,1)' });
    // 2. lompat-lompat kecil + hati
    hearts(cx, cy - CW * .7);
    say('♥ piyo!', 1800); setTimeout(() => chirp(1650), 420); setTimeout(() => chirp(1950), 800);
    await run(chick, [
        { transform: 'translate(0,0) rotate(0)' },
        { transform: 'translate(0,-34px) rotate(-9deg) scale(.96,1.06)', offset: .2 },
        { transform: 'translate(0,0) rotate(0) scale(1.1,.9)', offset: .38 },
        { transform: 'translate(0,-22px) rotate(9deg) scale(.97,1.04)', offset: .58 },
        { transform: 'translate(0,0) rotate(0) scale(1.06,.94)', offset: .76 },
        { transform: 'translate(0,0) rotate(0) scale(1)' }
    ], { duration: 1100, easing: 'ease-in-out' });
    say('^_^', 2100);
    await wait(450);
    unsay();
    // 3. lompat ke posisi di logo, logo muncul dari blur
    await Promise.all([
        run(chick, [
            { transform: 'translate(0,0) scale(1) rotate(0)' },
            { transform: `translate(${dx * .5}px,${dy * .5 - 130}px) scale(${(1 + ts) / 2}) rotate(-14deg)`, offset: .5 },
            { transform: `translate(${dx}px,${dy}px) scale(${ts}) rotate(0)` }
        ], { duration: 850, easing: 'cubic-bezier(.45,0,.3,1)' }),
        run(logo, [
            { opacity: 0, transform: 'scale(.88)', filter: 'blur(10px)' },
            { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' }
        ], { duration: 700, delay: 300, easing: 'ease-out' })
    ]);
    await run(chick, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 });
    await wait(550);
    // 4. logo mengecil dan pindah ke header, latar memudar
    const br = brand.getBoundingClientRect();
    logo.style.transformOrigin = '0 0';
    box.style.pointerEvents = 'none';
    await Promise.all([
        run(logo, [
            { transform: 'none', filter: 'none' },
            { transform: `translate(${br.left - lx}px,${br.top - ly}px) scale(${br.width / LW})`, filter: 'none' }
        ], { duration: 950, easing: 'cubic-bezier(.6,0,.15,1)' }),
        run(bg, [{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 200, easing: 'ease-in' })
    ]);
    brand.style.visibility = '';
    box.remove();
    brand.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
}

// ---- avatar (semua ilustrasi orisinal buatan sendiri) ----
const AVATARS = {
    kucing: { c: '#ffd7b5', ear: 'cat', ec: '#ff9db8', acc: 'star', ac: '#5aa2ff' },
    kelinci: { c: '#f3efff', ear: 'bunny', ec: '#ffb4d2', acc: 'bow', ac: '#8f7bff' },
    beruang: { c: '#c9915f', ear: 'bear', ec: '#e9bb92', acc: 'none', ac: '' },
    panda: { c: '#ffffff', ear: 'panda', ec: '#2b2540', acc: 'flower', ac: '#ff8fc7' },
    anjing: { c: '#ecc994', ear: 'dog', ec: '#8a5a2b', acc: 'bow', ac: '#4fc3f7' },
    babi: { c: '#ffb9d0', ear: 'pig', ec: '#ff8fb2', acc: 'none', ac: '', snout: true },
    kodok: { c: '#a9e8a2', ear: 'frog', ec: '#7fd17a', acc: 'flower', ac: '#fff176', noEyes: true },
    hamster: { c: '#ffe2b8', ear: 'hamster', ec: '#ffb4a0', acc: 'star', ac: '#ff8fc7' }
};

function avatarSVG(k) {
    const a = AVATARS[k], f = a.c, e = a.ec, ink = '#2b2540';
    const ears = {
        cat: `<path d="M9 28L11 6l18 12z" fill="${f}"/><path d="M55 28L53 6 35 18z" fill="${f}"/><path d="M13 22l1-9 8 6z" fill="${e}"/><path d="M51 22l-1-9-8 6z" fill="${e}"/>`,
        bunny: `<ellipse cx="21" cy="15" rx="7" ry="15" fill="${f}"/><ellipse cx="43" cy="15" rx="7" ry="15" fill="${f}"/><ellipse cx="21" cy="16" rx="3.5" ry="10" fill="${e}"/><ellipse cx="43" cy="16" rx="3.5" ry="10" fill="${e}"/>`,
        bear: `<circle cx="14" cy="17" r="9" fill="${f}"/><circle cx="50" cy="17" r="9" fill="${f}"/><circle cx="14" cy="17" r="5" fill="${e}"/><circle cx="50" cy="17" r="5" fill="${e}"/>`,
        panda: `<circle cx="13" cy="16" r="9" fill="${e}"/><circle cx="51" cy="16" r="9" fill="${e}"/>`,
        dog: `<ellipse cx="9" cy="28" rx="8" ry="14" fill="${e}" transform="rotate(12 9 28)"/><ellipse cx="55" cy="28" rx="8" ry="14" fill="${e}" transform="rotate(-12 55 28)"/>`,
        pig: `<path d="M12 24l2-14 14 8z" fill="${e}"/><path d="M52 24l-2-14-14 8z" fill="${e}"/>`,
        frog: `<circle cx="19" cy="17" r="10" fill="${f}"/><circle cx="45" cy="17" r="10" fill="${f}"/><circle cx="19" cy="17" r="5.5" fill="#fff"/><circle cx="45" cy="17" r="5.5" fill="#fff"/><circle cx="19" cy="17" r="2.6" fill="${ink}"/><circle cx="45" cy="17" r="2.6" fill="${ink}"/>`,
        hamster: `<circle cx="14" cy="19" r="7" fill="${f}"/><circle cx="50" cy="19" r="7" fill="${f}"/><circle cx="14" cy="19" r="4" fill="${e}"/><circle cx="50" cy="19" r="4" fill="${e}"/>`
    }[a.ear];
    const patch = a.ear === 'panda'
        ? `<ellipse cx="23" cy="36" rx="5.5" ry="6.5" fill="${e}" transform="rotate(-20 23 36)"/><ellipse cx="41" cy="36" rx="5.5" ry="6.5" fill="${e}" transform="rotate(20 41 36)"/>`
        : '';
    const eyes = a.noEyes ? '' : `<circle cx="23" cy="36" r="3" fill="${ink}"/><circle cx="41" cy="36" r="3" fill="${ink}"/><circle cx="24" cy="35" r="1" fill="#fff"/><circle cx="42" cy="35" r="1" fill="#fff"/>`;
    const eyesF = a.noEyes ? `<circle cx="24" cy="38" r="2.4" fill="${ink}"/><circle cx="40" cy="38" r="2.4" fill="${ink}"/>` : '';
    const mouth = a.snout
        ? `<ellipse cx="32" cy="44" rx="8" ry="5.5" fill="${e}"/><circle cx="29.5" cy="44" r="1.2" fill="${ink}"/><circle cx="34.5" cy="44" r="1.2" fill="${ink}"/>`
        : `<path d="M28 44q2 3 4 0q2 3 4 0" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round"/>`;
    const acc = {
        none: '',
        bow: `<path d="M50 14l-9-6v12zM50 14l9-6v12z" fill="${a.ac}"/><circle cx="50" cy="14" r="2.6" fill="#fff"/>`,
        star: `<path d="M50 6l2.6 5.4 5.9.8-4.3 4.1 1 5.9L50 19.4l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" fill="${a.ac}"/>`,
        flower: `<g fill="${a.ac}"><circle cx="50" cy="8" r="3.4"/><circle cx="55" cy="12" r="3.4"/><circle cx="53" cy="18" r="3.4"/><circle cx="47" cy="18" r="3.4"/><circle cx="45" cy="12" r="3.4"/></g><circle cx="50" cy="13.5" r="2.6" fill="#fff6a8"/>`
    }[a.acc];
    return `<svg viewBox="0 0 64 64" aria-hidden="true"><g transform="translate(5.8 8) scale(.82)">${ears}<ellipse cx="32" cy="37" rx="25" ry="22" fill="${f}"/>${patch}${eyes}${eyesF}<circle cx="16.5" cy="43.5" r="4" fill="#ff8fb0" opacity=".55"/><circle cx="47.5" cy="43.5" r="4" fill="#ff8fb0" opacity=".55"/>${mouth}${acc}</g></svg>`;
}

const avOpt = (k, t) => `<button class="avopt ${me.avatar === k ? 'on' : ''}" onclick="setAvatar('${k}')" aria-label="Avatar ${esc(t)}">${av(k, 58)}<small>${esc(t)}</small></button>`;

const avGroups = () => [...CHAR_GROUPS.map(g => [g, Object.keys(CHARS).filter(k => CHARS[k][0] === g).map(k => [k, CHARS[k][1]])]), ['Klasik', Object.keys(AVATARS).map(k => [k, k])]].map(([g, l]) => `<h4 class="avh">${g}</h4><div class="avgrid">${l.map(([k, t]) => avOpt(k, t)).join('')}</div>`).join('');

function av(a, size = 40) {
    const inner = AVATARS[a]
        ? avatarSVG(a)
        : CHARS[a]
            ? charSVG(a)
            : /^https?:/.test(a || '')
            ? `<img src="${esc(a)}" alt="" loading="lazy">`
            : avatarSVG('kucing');
    return `<span class="av" style="width:${size}px;height:${size}px">${inner}</span>`;
}

async function setAvatar(val) {
    const { error } = await sb.from('profiles').update({ avatar: val }).eq('id', me.id);
    if (error)
        return toast(error.message);
    me.avatar = val;
    const chip = $('.avchip');
    if (chip)
        chip.innerHTML = av(val, 34);
    if (tab === 'me')
        views.me();
    toast('Avatar diganti');
}

function resizeSquare(file, size = 256) {
    return new Promise((ok, fail) => {
        const img = new Image();
        img.onload = () => {
            const s = Math.min(img.width, img.height), cv = document.createElement('canvas');
            cv.width = cv.height = size;
            cv.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
            cv.toBlob(b => b ? ok(b) : fail(new Error('Gagal memproses gambar')), 'image/jpeg', .88);
        };
        img.onerror = () => fail(new Error('File bukan gambar'));
        img.src = URL.createObjectURL(file);
    });
}

async function uploadAvatar(input) {
    const f = input.files[0];
    if (!f)
        return;
    try {
        toast('Mengupload...');
        const blob = await resizeSquare(f), path = `${me.id}/${Date.now()}.jpg`;
        const { error } = await sb.storage.from('avatars').upload(path, blob, { contentType: 'image/jpeg' });
        if (error)
            throw error;
        await setAvatar(sb.storage.from('avatars').getPublicUrl(path).data.publicUrl);
    } catch (e) {
        toast(e.message);
    }
    input.value = '';
}

// ---- chat nobar: teks, emoji, stiker, voice ----
const STICKERS = ['😂', '🥹', '😭', '🥰', '😎', '🤩', '😴', '🤯', '🥳', '😡', '🫶', '🔥', '💀', '👀', '🙏', '👏', '💙', '💖', '✨', '🎬', '🍿', '😱', '🤣', '😘', '🫠', '🤭', '😏', '🥺', '🤤', '🙈', '💅', '🫡', '👍', '👎', '🤝', '💯', '🎉', '🌈', '⭐', '🐰'];
let seenMsgs = new Set(), rec = null, recChunks = [], recT0 = 0, recTimer = null, voiceAudio = null, voiceBtn = null;

function chatUI() {
    return `<div class="chatbox">
<div class="msgs" id="chat"></div>
<div class="panel" id="panel" hidden>
  <div class="ptabs"><button class="on" data-p="emoji">Emoji</button><button data-p="stk">Stiker</button></div>
  <emoji-picker id="ep"></emoji-picker>
  <div class="stkgrid" id="stkgrid" hidden>${STICKERS.map(s => `<button class="stkbtn" data-s="${s}">${s}</button>`).join('')}</div>
</div>
<div class="cmp" id="cmp">
  <button class="ib" id="bEm" aria-label="Emoji">${ic('smile')}</button>
  <input id="cm" placeholder="Ketik pesan..." maxlength="500" autocomplete="off">
  <button class="ib" id="bStk" aria-label="Stiker">${ic('sticker')}</button>
  <button class="ib send" id="bSend" aria-label="Kirim" hidden>${ic('send')}</button>
  <button class="ib mic" id="bMic" aria-label="Rekam suara">${ic('mic')}</button>
</div>
<div class="rec" id="rec" hidden><i class="dot"></i><b id="rtime">0:00</b><span>Merekam</span><button class="btn sm ghost" id="rx">Batal</button><button class="btn sm" id="rs">Kirim</button></div>
</div>`;
}

const fmtT = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

async function sendMsg(extra) {
    const { error } = await sb.from('room_chat').insert({
        code: room.code,
        user_id: me.id,
        username: me.username,
        avatar: me.avatar || 'kucing',
        ...extra
    });
    if (error)
        toast(error.message);
}

function openPanel(name) {
    const p = $('#panel'), same = !p.hidden && p.dataset.on === name;
    p.hidden = same;
    p.dataset.on = name;
    p.querySelectorAll('.ptabs button').forEach(b => b.classList.toggle('on', b.dataset.p === name));
    $('#ep').hidden = name !== 'emoji';
    $('#stkgrid').hidden = name !== 'stk';
    if (!same)
        p.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    if (!same && name === 'emoji' && !customElements.get('emoji-picker'))
        toast('Emoji picker belum termuat, cek koneksi internet');
}

function initChat() {
    seenMsgs = new Set();
    const inp = $('#cm'), sendBtn = $('#bSend'), micBtn = $('#bMic');
    const sendText = () => {
        const t = inp.value.trim();
        if (!t)
            return;
        sendMsg({ kind: 'text', msg: t });
        inp.value = '';
        sync();
    };
    const sync = () => {
        const has = inp.value.trim().length > 0;
        sendBtn.hidden = !has;
        micBtn.hidden = has;
    };
    inp.addEventListener('input', sync);
    inp.addEventListener('keydown', e => {
        if (e.key === 'Enter')
            sendText();
    });
    sendBtn.onclick = sendText;
    $('#bEm').onclick = () => openPanel('emoji');
    $('#bStk').onclick = () => openPanel('stk');
    $('#panel').querySelectorAll('.ptabs button').forEach(b => b.onclick = () => {
        $('#panel').dataset.on = '';
        openPanel(b.dataset.p);
    });
    $('#ep').addEventListener('emoji-click', e => {
        const i = inp.selectionStart ?? inp.value.length;
        inp.value = inp.value.slice(0, i) + e.detail.unicode + inp.value.slice(inp.selectionEnd ?? i);
        inp.focus();
        sync();
    });
    $('#stkgrid').onclick = e => {
        const b = e.target.closest('.stkbtn');
        if (!b)
            return;
        sendMsg({ kind: 'sticker', msg: b.dataset.s });
        $('#panel').hidden = true;
    };
    micBtn.onclick = startRec;
    $('#rx').onclick = () => stopRec(false);
    $('#rs').onclick = () => stopRec(true);
    $('#chat').onclick = e => {
        const b = e.target.closest('.vplay');
        if (b)
            toggleVoice(b);
    };
    sb.from('room_chat').select('*').eq('code', room.code).order('id', { ascending: false }).limit(40)
        .then(({ data }) => (data || []).reverse().forEach(addChat));
}

const emojiOnly = t => t.length <= 12 && /^(?:\p{Extended_Pictographic}|\p{Emoji_Modifier}|\u200d|\ufe0f|\s)+$/u.test(t);

function msgBody(c) {
    if (c.kind === 'sticker')
        return `<div class="stk">${esc(c.msg)}</div>`;
    if (c.kind === 'voice') {
        const d = c.duration || 0;
        const bars = Array.from({ length: 22 }, (_, i) => `<i style="height:${6 + ((c.id * (i + 3) * 7) % 16)}px"></i>`).join('');
        return `<button class="vplay" data-src="${esc(c.media_url)}" aria-label="Putar pesan suara"><span class="vi">${ic('play')}</span><span class="wave">${bars}</span><small>${fmtT(d)}</small></button>`;
    }
    return `<div class="${emojiOnly(c.msg || '') ? 'big' : 'txt'}">${esc(c.msg)}</div>`;
}

function addChat(c) {
    const box = $('#chat');
    if (!box || seenMsgs.has(c.id))
        return;
    seenMsgs.add(c.id);
    const mine = c.user_id === me.id, bare = c.kind === 'sticker';
    box.insertAdjacentHTML('beforeend', `<div class="msg ${mine ? 'me' : ''}">${mine ? '' : av(c.avatar, 34)}<div class="bub ${bare ? 'bare' : ''}">${mine ? '' : `<small>${esc(c.username)}</small>`}${msgBody(c)}</div></div>`);
    const near = box.scrollHeight - box.scrollTop - box.clientHeight < 140;
    if (near || mine)
        box.scrollTop = box.scrollHeight;
}

// voice
async function startRec() {
    if (rec)
        return;
    if (!navigator.mediaDevices || !window.MediaRecorder)
        return toast('Browser ini belum mendukung rekam suara');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find(m => MediaRecorder.isTypeSupported(m)) || '';
        rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
        recChunks = [];
        rec.ondataavailable = e => e.data.size && recChunks.push(e.data);
        rec.start();
        recT0 = Date.now();
        $('#rec').hidden = false;
        $('#cmp').hidden = true;
        recTimer = setInterval(() => {
            const s = (Date.now() - recT0) / 1000;
            $('#rtime').textContent = fmtT(s);
            if (s >= 60)
                stopRec(true);
        }, 250);
    } catch (e) {
        rec = null;
        toast('Izinkan akses mikrofon dulu ya');
    }
}

function stopRec(send) {
    if (!rec)
        return;
    const r = rec, dur = (Date.now() - recT0) / 1000;
    rec = null;
    clearInterval(recTimer);
    const rb = $('#rec'), cb = $('#cmp');
    if (rb)
        rb.hidden = true;
    if (cb)
        cb.hidden = false;
    r.onstop = async () => {
        r.stream.getTracks().forEach(t => t.stop());
        if (!send)
            return;
        if (dur < 1)
            return toast('Terlalu pendek, tahan sedikit lebih lama');
        const type = (r.mimeType || 'audio/webm').split(';')[0];
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        const path = `${me.id}/${Date.now()}.${ext}`;
        toast('Mengirim suara...');
        const { error } = await sb.storage.from('voice').upload(path, new Blob(recChunks, { type }), { contentType: type });
        if (error)
            return toast(error.message);
        sendMsg({ kind: 'voice', msg: '', media_url: sb.storage.from('voice').getPublicUrl(path).data.publicUrl, duration: dur });
    };
    r.state !== 'inactive' ? r.stop() : r.onstop();
}

function cancelRec() {
    stopRec(false);
    stopVoice();
}

function stopVoice() {
    if (voiceAudio) {
        voiceAudio.pause();
        voiceAudio = null;
    }
    if (voiceBtn) {
        voiceBtn.classList.remove('playing');
        voiceBtn.querySelector('.vi').innerHTML = ic('play');
        voiceBtn = null;
    }
}

function toggleVoice(btn) {
    const was = voiceBtn === btn;
    stopVoice();
    if (was)
        return;
    voiceBtn = btn;
    voiceAudio = new Audio(btn.dataset.src);
    btn.classList.add('playing');
    btn.querySelector('.vi').innerHTML = ic('pause');
    voiceAudio.onended = stopVoice;
    voiceAudio.onerror = () => {
        stopVoice();
        toast('Gagal memutar suara');
    };
    voiceAudio.play().catch(stopVoice);
}

// ---- admin ----
async function up(bucket, f) {
    const p = `${Date.now()}_${f.name.replace(/[^\w.]/g, '_')}`;
    const { error } = await sb.storage.from(bucket).upload(p, f);
    if (error)
        throw error;
    return sb.storage.from(bucket).getPublicUrl(p).data.publicUrl;
}

async function addTitle() {
    try {
        toast('Menyimpan...');
        let v = $('#a_v').value, th = $('#a_th').value;
        const vf = $('#a_vf').files[0], tf = $('#a_thf').files[0];
        if (vf)
            v = await up('videos', vf);
        if (tf)
            th = await up('thumbnails', tf);
        if (!$('#a_t').value || (!v && $('#a_ty').value === 'movie'))
            return toast('Judul & video wajib (series boleh kosong, isi lewat episode)');
        const { error } = await sb.from('titles').insert({
            title: $('#a_t').value,
            type: $('#a_ty').value,
            year: +$('#a_y').value || null,
            genre: $('#a_g').value,
            description: $('#a_d').value,
            video_url: v || null,
            thumbnail_url: th || null,
            created_by: me.id
        });
        if (error)
            throw error;
        await reload('Ditambahkan');
    }
    catch (e) {
        toast(e.message);
    }
}

const TMDB_G = { 28: 'Aksi', 12: 'Petualangan', 16: 'Animasi', 35: 'Komedi', 80: 'Kriminal', 99: 'Dokumenter', 18: 'Drama', 10751: 'Keluarga', 14: 'Fantasi', 36: 'Sejarah', 27: 'Horor', 10402: 'Musik', 9648: 'Misteri', 10749: 'Romantis', 878: 'Fiksi Ilmiah', 53: 'Thriller', 10752: 'Perang', 37: 'Western', 10759: 'Aksi', 10765: 'Fiksi Ilmiah', 10762: 'Anak', 10764: 'Reality', 10766: 'Sinetron' };

// judul dari nama file: "Spider-Man.No.Way.Home.2021.1080p.WEB-DL.mp4" -> "Spider Man No Way Home"
const guessTitle = u => {
    let n = '';
    try { n = decodeURIComponent(String(u).split('?')[0].split('#')[0].split('/').pop()); } catch (e) { n = String(u).split('/').pop(); }
    return n.replace(/\.[a-z0-9]{2,4}$/i, '').replace(/[._]+/g, ' ')
        .replace(/\b(2160p|1080p|720p|480p|360p|web-?dl|webrip|blu-?ray|brrip|hdrip|hdtv|x26[45]|hevc|aac|dubbed|indo|nonton)\b/gi, ' ')
        .replace(/[\(\[]\s*(19|20)\d\d\s*[\)\]]/g, ' ').replace(/\b(19|20)\d\d\b/g, ' ').replace(/-+/g, ' ').replace(/\s+/g, ' ').trim()
        .replace(/\b\w/g, c => c.toUpperCase());
};

// terima banyak format kunci (title/judul/name, url/link/video, poster/thumbnail, ...)
function normItem(x) {
    if (typeof x === 'string') x = { video_url: x };
    if (!x || typeof x !== 'object') return null;
    const pk = (...k) => { for (const n of k) if (x[n] != null && x[n] !== '') return x[n]; return null; };
    const url = pk('video_url', 'video', 'url', 'link', 'src', 'file', 'stream');
    const t0 = pk('title', 'judul', 'name', 'nama', 'original_title');
    const title = String(t0 || (url && guessTitle(url)) || '').trim();
    let th = pk('thumbnail_url', 'thumbnail', 'poster', 'poster_url', 'image', 'cover', 'img', 'poster_path');
    if (th && /^\/[\w-]+\.(jpg|png|webp)$/i.test(th)) th = 'https://image.tmdb.org/t/p/w500' + th;
    let g = pk('genre', 'genres', 'kategori');
    if (Array.isArray(g)) g = g.map(i => (i && i.name) || i).filter(i => typeof i === 'string').join(', ');
    const dt = pk('year', 'tahun', 'release_date', 'first_air_date');
    let year = null;
    if (dt) year = +String(dt).slice(0, 4) || null;
    else { const m = (title + ' ' + (url || '')).match(/\b(19|20)\d\d\b/); if (m) year = +m[0]; }
    const eps = pk('episodes', 'eps');
    const ty = String(pk('type', 'jenis', 'media_type') || '');
    return {
        title, guessed: !t0, year, genre: g || null, video_url: url, thumbnail_url: th,
        type: /series|tv|serial/i.test(ty) || (Array.isArray(eps) && eps.length) ? 'series' : 'movie',
        description: pk('description', 'deskripsi', 'overview', 'synopsis', 'sinopsis', 'plot'),
        episodes: Array.isArray(eps) ? eps : []
    };
}

// lengkapi deskripsi / poster / genre / tahun dari TMDB lewat Edge Function 'hub' (key aman di server)
async function tmdbFill(r) {
    if (!r.title || (!r.guessed && r.description && r.thumbnail_url && r.genre && r.year)) return;
    try {
        const { data } = await sb.functions.invoke('hub', { body: { action: 'tmdb', q: r.title } });
        const m = data && data.results && data.results[0];
        if (!m) return;
        if (r.guessed) r.title = m.title || r.title;
        r.description = r.description || m.overview || null;
        r.thumbnail_url = r.thumbnail_url || m.poster || null;
        r.genre = r.genre || m.genres || null;
        r.year = r.year || +m.year || null;
    } catch (e) { }
}

async function bulk(j) {
    const arr = Array.isArray(j) ? j : j && (j.data || j.results || j.movies || j.items || j.films || j.titles || Object.values(j).find(Array.isArray));
    if (!Array.isArray(arr)) return toast('Format JSON tidak dikenali (harus berupa array)');
    let rows = arr.map(normItem).filter(x => x && x.title && (x.video_url || x.episodes.length));
    if (!rows.length) return toast('Tidak ada item valid. Minimal ada judul atau link video');
    const n0 = rows.length;
    for (let i = 0; i < rows.length; i++) {
        toast(`Melengkapi data ${i + 1}/${n0}...`);
        await tmdbFill(rows[i]);
    }
    const seen = new Set(titles.map(t => t.title.toLowerCase()));
    rows = rows.filter(x => !seen.has(x.title.toLowerCase()) && seen.add(x.title.toLowerCase()));
    if (!rows.length) return toast('Semua judul sudah ada di katalog');
    const { data, error } = await sb.from('titles').insert(rows.map(x => ({
        title: x.title, type: x.type, year: x.year, genre: x.genre, description: x.description,
        video_url: x.video_url || null, thumbnail_url: x.thumbnail_url, created_by: me.id
    }))).select('id');
    if (error) return toast(error.message);
    const eps = [];
    rows.forEach((x, i) => x.episodes.forEach((e, k) => {
        const v = e.video_url || e.url || e.link || e.video;
        if (v) eps.push({ title_id: data[i].id, season: e.season || e.musim || 1, number: e.number || e.episode || e.ep || k + 1, name: e.name || e.title || e.judul || null, video_url: v, thumbnail_url: e.thumbnail_url || e.thumbnail || null });
    }));
    if (eps.length) {
        const r = await sb.from('episodes').insert(eps);
        if (r.error) return toast(r.error.message);
    }
    reload(`${rows.length} judul & ${eps.length} episode masuk${n0 > rows.length ? `, ${n0 - rows.length} dilewati (sudah ada)` : ''}`);
}

async function addEp() {
    try {
        let v = $('#e_v').value;
        const f = $('#e_vf').files[0];
        if (f) {
            toast('Mengupload...');
            v = await up('videos', f);
        }
        if (!v || !$('#e_t').value)
            return toast('Pilih series & isi video');
        const { error } = await sb.from('episodes').insert({
            title_id: +$('#e_t').value,
            season: +$('#e_s').value || 1,
            number: +$('#e_n').value || 1,
            name: $('#e_nm').value || null,
            video_url: v,
            thumbnail_url: $('#e_th').value || null
        });
        if (error)
            throw error;
        toast('Episode ditambahkan');
        $('#e_n').value = (+$('#e_n').value || 0) + 1;
        $('#e_nm').value = $('#e_v').value = '';
    }
    catch (e) {
        toast(e.message);
    }
}

const importFile = i => i.files[0].text().then(t => bulk(JSON.parse(t))).catch(() => toast('JSON tidak valid'));

const importText = () => { try { bulk(JSON.parse($('#j_t').value)); } catch (e) { toast('JSON tidak valid'); } };

const importApi = () => fetch($('#j_u').value).then(r => r.json()).then(bulk).catch(() => toast('API gagal / diblok CORS. Coba host JSON di GitHub raw / Gist'));

const delTitle = async (id) => {
    if (confirm('Hapus judul ini?')) {
        await sb.from('titles').delete().eq('id', id);
        reload('Dihapus');
    }
};

async function reload(m) {
    const { data } = await sb.from('titles').select('*').order('created_at', { ascending: false });
    titles = data || [];
    toast(m);
    go(tab);
}

sb.auth.onAuthStateChange(e => {
    if (e === 'SIGNED_IN' && !me)
        boot();
});

boot();


// ---- lobi bioskop: tiket + tirai terbuka ----
function lobby() {
    if (sessionStorage.nm_lobby || localStorage.nm_lobby0 === '1' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sessionStorage.nm_lobby = '1';
    const now = titles.slice(0, 3);
    const d = document.createElement('div');
    d.id = 'lobby';
    d.innerHTML = `<i class="cur l"></i><i class="cur r"></i><div class="lb"><img src="img/chick.png" alt=""><h1>Studio Naura</h1><p>Sedang tayang</p><div class="now">${now.map(t => `<span ${bg(t.thumbnail_url)}></span>`).join('')}</div><div class="tix"><small>TIKET MASUK</small><b>${esc(me.username)}</b><small>Kursi bebas · Popcorn gratis</small></div><button class="btn glow" id="lbgo">Masuk bioskop</button></div>`;
    document.body.appendChild(d);
    return new Promise(ok => {
        $('#lbgo').onclick = () => {
            sClick(); chirp(1700);
            d.classList.add('open');
            setTimeout(() => { d.remove(); ok(); }, 1100);
        };
    });
}


// ---- fitur tambahan ----
async function contRow() {
    const { data } = await sb.from('history').select('*,titles(*)').eq('user_id', me.id).order('updated_at', { ascending: false }).limit(8);
    const l = (data || []).filter(h => h.titles && h.progress > 5).map(h => h.titles);
    if (!l.length || tab !== 'home' || $('#cont')) return;
    $('#hero')?.insertAdjacentHTML('afterend', `<div id="cont"><h2>${ic('play')} Lanjutkan nonton</h2><div class="row">${l.map(poster).join('')}</div></div>`);
}

function randomPick() {
    if (!titles.length) return;
    const t = titles[(Math.random() * titles.length) | 0];
    toast('Coba: ' + t.title);
    openTitle(t.id);
}

function setFs(k) {
    localStorage.nm_fs = k;
    document.documentElement.style.fontSize = { s: '14px', m: '', l: '18px' }[k] || '';
    document.querySelectorAll('.fsb').forEach(b => b.classList.toggle('on', b.dataset.k === k));
}
setFs(localStorage.nm_fs || 'm');

async function clearHistory() {
    if (!confirm('Hapus semua riwayat tontonan?')) return;
    const { error } = await sb.from('history').delete().eq('user_id', me.id);
    toast(error ? error.message : 'Riwayat dihapus');
}

async function saveName() {
    const u = $('#pn').value.trim();
    if (u.length < 3) return toast('Nama minimal 3 karakter');
    const { error } = await sb.from('profiles').update({ username: u }).eq('id', me.id);
    if (error) return toast(error.message);
    me.username = u;
    toast('Nama diganti');
    views.me();
}

async function savePass() {
    const p = $('#pp').value;
    if (p.length < 6) return toast('Password minimal 6 karakter');
    const { error } = await sb.auth.updateUser({ password: p });
    if (error) return toast(error.message);
    $('#pp').value = '';
    toast('Password diganti');
}

async function loadStats() {
    const q = t => sb.from(t).select('title_id', { count: 'exact', head: true }).eq('user_id', me.id);
    const [h, d] = await Promise.all([q('history'), q('downloads')]);
    const el = $('#stats');
    if (el) el.innerHTML = `<div><b>${h.count || 0}</b><small>Ditonton</small></div><div><b>${d.count || 0}</b><small>Tersimpan</small></div><div><b>${titles.length}</b><small>Judul</small></div>`;
}


// ---- rating bintang ----
async function loadRatings() {
    const [{ data: a }, { data: b }] = await Promise.all([sb.from('title_ratings').select('*'), sb.from('ratings').select('title_id,stars').eq('user_id', me.id)]);
    ratings = {}; myR = {};
    (a || []).forEach(r => ratings[r.title_id] = r);
    (b || []).forEach(r => myR[r.title_id] = r.stars);
}

function drawRate(id) {
    const el = $('#rate');
    if (!el) return;
    const r = ratings[id], mine = myR[id] || 0;
    el.innerHTML = `<div class="stars" role="radiogroup" aria-label="Beri rating">${[1, 2, 3, 4, 5].map(n => `<button class="st ${n <= mine ? 'on' : ''}" data-n="${n}" role="radio" aria-checked="${n === mine}" aria-label="${n} bintang">${ic('star')}</button>`).join('')}</div><small>${r ? `★ ${r.avg} dari ${r.n} penilaian` : 'Belum ada penilaian'}${mine ? ` · nilaimu ${mine}` : ''}</small>${mine ? '<button class="btn sm ghost" id="rclr">Hapus nilai</button>' : ''}`;
    el.querySelectorAll('.st').forEach(b => b.onclick = () => rate(id, +b.dataset.n));
    const c = $('#rclr');
    if (c) c.onclick = () => rate(id, 0);
}

async function rate(id, n) {
    const q = n ? sb.from('ratings').upsert({ user_id: me.id, title_id: id, stars: n, updated_at: new Date() }) : sb.from('ratings').delete().eq('user_id', me.id).eq('title_id', id);
    const { error } = await q;
    if (error) return toast(error.message);
    if (n) myR[id] = n; else delete myR[id];
    const { data } = await sb.from('title_ratings').select('*').eq('title_id', id).maybeSingle();
    if (data) ratings[id] = data; else delete ratings[id];
    drawRate(id);
    toast(n ? `Rating ${n} bintang tersimpan` : 'Rating dihapus');
}

// ---- request film/series lewat TMDB (proxy Edge Function 'hub') ----
let rqSel = null, rqT = null, rqList = [];

function rqToggle() {
    const on = $('#fb_k').value === 'request';
    $('#rq').hidden = !on;
    if (!on) { rqSel = null; $('#rq_sel').innerHTML = ''; return; }
    $('#rq_q').oninput = e => { clearTimeout(rqT); rqT = setTimeout(() => rqSearch(e.target.value), 450); };
}

async function rqSearch(q) {
    const box = $('#rq_res');
    if (!box) return;
    q = q.trim();
    if (q.length < 2) { box.innerHTML = ''; return; }
    box.innerHTML = '<p class="hint">Mencari...</p>';
    const { data, error } = await sb.functions.invoke('hub', { body: { action: 'tmdb', q } });
    if (error || data?.error) { box.innerHTML = `<p class="hint">${esc(data?.error || 'Pencarian belum aktif, coba lagi nanti')}</p>`; return; }
    const have = new Set(titles.map(t => t.title.toLowerCase()));
    rqList = data.results || [];
    box.innerHTML = rqList.map((r, i) => `<button class="rqi" onclick="rqPick(${i})">${r.poster ? `<img src="${esc(r.poster)}" alt="" loading="lazy">` : '<span class="np"></span>'}<span><b>${esc(r.title)}</b><small>${r.media_type === 'tv' ? 'Series' : 'Film'}${r.year ? ' · ' + r.year : ''}${r.rating ? ' · ★ ' + r.rating : ''}${have.has(r.title.toLowerCase()) ? ' · sudah ada' : ''}</small><small>${esc(r.overview)}</small></span></button>`).join('') || '<p class="hint">Tidak ketemu di TMDB</p>';
}

function rqPick(i) {
    rqSel = rqList[i];
    $('#rq_res').innerHTML = '';
    $('#rq_q').value = '';
    $('#rq_sel').innerHTML = `<div class="rqi sel">${rqSel.poster ? `<img src="${esc(rqSel.poster)}" alt="">` : ''}<span><b>${esc(rqSel.title)}</b><small>${rqSel.media_type === 'tv' ? 'Series' : 'Film'}${rqSel.year ? ' · ' + rqSel.year : ''}</small><small>${esc(rqSel.genres || '')}</small></span><button class="btn sm ghost" onclick="rqSel=null;$('#rq_sel').innerHTML=''">Ganti</button></div>`;
}

// ---- admin: kotak masuk masukan & request ----
async function loadFb() {
    const { data } = await sb.from('feedback').select('*').order('created_at', { ascending: false }).limit(50);
    const el = $('#fblist');
    if (!el) return;
    window._fb = data || [];
    el.innerHTML = window._fb.map(f => `<div class="glass pad fbi ${esc(f.status)}">${f.poster_url ? `<img src="${esc(f.poster_url)}" alt="">` : ''}<div><b>${esc(f.req_title || f.kind)}</b> <small>${esc(f.kind)} · ${esc(f.username || '')} · ${new Date(f.created_at).toLocaleDateString('id-ID')}</small><p>${esc(f.message)}</p>${f.contact ? `<small>${esc(f.contact)}</small>` : ''}<div class="fbb">${['baru', 'diproses', 'selesai'].map(x => `<button class="chip ${f.status === x ? 'on' : ''}" onclick="fbStatus(${f.id},'${x}')">${x}</button>`).join('')}${f.tmdb_id ? `<button class="btn sm" onclick="fbAdd(${f.id})">Tambah ke katalog</button>` : ''}</div></div></div>`).join('') || empty('Belum ada masukan');
}

async function fbStatus(id, st) {
    const { error } = await sb.from('feedback').update({ status: st }).eq('id', id);
    if (error) return toast(error.message);
    loadFb();
}

function fbAdd(id) {
    const f = (window._fb || []).find(x => x.id === id);
    if (!f) return;
    views.admin('add');
    $('#a_t').value = f.req_title || '';
    $('#a_y').value = f.req_year || '';
    $('#a_ty').value = f.media_type === 'tv' ? 'series' : 'movie';
    $('#a_th').value = f.poster_url || '';
    toast('Terisi dari request. Lengkapi link video lalu simpan');
}
