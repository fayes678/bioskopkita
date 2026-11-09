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
    eyeoff: 'M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.5 6.9C3.7 8.7 2 12 2 12s4 7 10 7a9.6 9.6 0 0 0 4-.9M9.9 9.9a3 3 0 0 0 4.2 4.2'
};

const ic = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n]}"/></svg>`;

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[c]));

let me = null, titles = [], tab = 'home', room = null, chan = null, suppress = false;

document.documentElement.dataset.theme = localStorage.nm_theme || 'deep';

// ---- sound (WebAudio, tanpa file) ----
let ac;

function tone(f = 660, d = .25, v = .05, t = 'sine') {
    try {
        ac = ac || new (window.AudioContext || window.webkitAudioContext)();
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = t;
        o.frequency.value = f;
        g.gain.setValueAtTime(v, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + d);
        o.connect(g).connect(ac.destination);
        o.start();
        o.stop(ac.currentTime + d);
    }
    catch (e) { }
}

const sHover = () => tone(880 + Math.random() * 200, .18, .025);

const sClick = () => {
    tone(523, .35, .05);
    setTimeout(() => tone(659, .35, .05), 90);
    setTimeout(() => tone(784, .5, .05), 180);
};

document.addEventListener('pointerenter', e => {
    if (e.target.closest?.('.btn,.tab,.chip,.poster'))
        sHover();
}, true);

document.addEventListener('click', e => {
    if (e.target.closest('.btn,.ltabs .tab'))
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
    document.querySelectorAll('.ltabs .tab[data-k]').forEach(b => b.classList.toggle('on', b.dataset.k === (reg ? 'reg' : 'login')));
    $('#p').setAttribute('autocomplete', reg ? 'new-password' : 'current-password');
    $('#go').textContent = reg ? 'Daftar' : 'Masuk';
}

let swapping = false;

function swapMode(reg) {
    if (reg === regMode || swapping)
        return;
    swapping = true;
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
    $('#app').innerHTML = `<div class="stars">${[0, 1, 2, 3, 4, 5].map((s, i) => `<span style="left:${10 + i * 16}%;top:${8 + (i * 37) % 80}%;animation-delay:${i * .6}s"></span>`).join('')}</div>
<div class="login"><div class="card glass"><div class="mascot">${ic('bow')}</div><h1 class="logo">NauMovie</h1><p>Selamat datang di Bioskop Naura</p>
<nav class="ltabs glass"><button class="tab ${reg ? '' : 'on'}" data-k="login"><b>${ic('key')}</b>Masuk</button><button class="tab ${reg ? 'on' : ''}" data-k="reg"><b>${ic('bow')}</b>Daftar</button><button class="tab" data-k="theme"><b>${ic('palette')}</b>Tema</button></nav>
<div id="fl"><input id="u" placeholder="Username" autocomplete="username" autocapitalize="none"><div class="pw"><input id="p" type="password" placeholder="Password (min. 6 karakter)" autocomplete="${reg ? 'new-password' : 'current-password'}"><button type="button" class="eye" id="eye" aria-label="Tampilkan password" aria-pressed="false">${ic('eye')}</button></div>
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
        $('#eye').innerHTML = ic(show ? 'eyeoff' : 'eye');
        $('#eye').setAttribute('aria-pressed', show);
        $('#eye').setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
        p.focus();
    };
    $('#p').addEventListener('keydown', e => {
        if (e.key === 'Enter')
            submit();
    });
}

function toggleTheme() {
    const t = document.documentElement.dataset.theme === 'deep' ? 'sanrio' : 'deep';
    document.documentElement.dataset.theme = t;
    localStorage.nm_theme = t;
    sClick();
}

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
    shell();
    const rc = new URLSearchParams(location.search).get('room');
    if (rc)
        joinRoom(rc);
}

function shell() {
    const T = [['home', 'home', 'Home'], ['discover', 'search', 'Discover'], ['history', 'clock', 'Riwayat'], ['dl', 'down', 'Unduhan'], ['room', 'film', 'Nobar'], ['me', 'user', 'Profil']];
    if (me.role === 'admin')
        T.push(['admin', 'tool', 'Admin']);
    $('#app').innerHTML = `<header class="top glass"><span class="logo">NauMovie</span><span class="hr"><button class="btn sm ghost" onclick="toggleTheme()" aria-label="Ganti tema">${ic('palette')}</button><button class="avchip" onclick="go('me')" aria-label="Profil">${av(me.avatar, 34)}</button></span></header><main id="v"></main>
<nav class="tabs glass">${T.map(t => `<button class="tab" data-t="${t[0]}"><b>${ic(t[1])}</b>${t[2]}</button>`).join('')}</nav>`;
    document.querySelectorAll('.tab').forEach(b => b.onclick = () => go(b.dataset.t));
    go(tab);
}

async function go(t) {
    tab = t;
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.t === t));
    await views[t]();
}

const bg = u => u ? `style="background-image:url('${esc(u)}')"` : '';

const poster = t => `<div class="poster" ${bg(t.thumbnail_url)} onclick="openTitle(${t.id})"><span>${esc(t.title)}</span></div>`;

const views = {
    home() {
        const h = titles[0];
        $('#v').innerHTML = titles.length ? `<div class="hero glass" ${bg(h.thumbnail_url)}><h1>${esc(h.title)}</h1><p>${esc(h.description)}</p><div><button class="btn" onclick="openTitle(${h.id})">${ic('play')} Tonton</button></div></div>
<h2> Baru ditambahkan</h2><div class="row">${titles.map(poster).join('')}</div>` : '<div class="empty">Belum ada film</div>';
    },
    discover(q = '', g = 'Semua') {
        const gs = ['Semua', ...new Set(titles.flatMap(t => (t.genre || '').split(',').map(x => x.trim()).filter(Boolean)))];
        const l = titles.filter(t => t.title.toLowerCase().includes(q.toLowerCase()) && (g === 'Semua' || (t.genre || '').includes(g)));
        $('#v').innerHTML = `<input id="q" placeholder=" Cari film / series..." value="${esc(q)}"><div class="chips">${gs.map(x => `<button class="chip ${x === g ? 'on' : ''}" data-g="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="grid">${l.map(poster).join('') || '<div class="empty">Ga ketemu</div>'}</div>`;
        $('#q').oninput = e => {
            const v = e.target.value;
            views.discover(v, g);
            const i = $('#q');
            i.focus();
            i.setSelectionRange(v.length, v.length);
        };
        document.querySelectorAll('.chip').forEach(c => c.onclick = () => views.discover(q, c.dataset.g));
    },
    async history() {
        const { data } = await sb.from('history').select('*,titles(*)').eq('user_id', me.id).order('updated_at', { ascending: false });
        $('#v').innerHTML = '<h2> Riwayat tontonan</h2>' + ((data || []).map(h => item(h.titles, `<div class="bar"><i style="width:${Math.min(100, h.progress / 6)}%"></i></div>`)).join('') || '<div class="empty">Belum nonton apa-apa</div>');
    },
    async dl() {
        const { data } = await sb.from('downloads').select('*,titles(*)').eq('user_id', me.id);
        $('#v').innerHTML = '<h2>⬇ Unduhan / Tersimpan</h2>' + ((data || []).map(d => item(d.titles, `<button class="btn sm danger" onclick="event.stopPropagation();rmDl(${d.title_id})">Hapus</button>`)).join('') || '<div class="empty">Kosong. Simpan dari halaman film</div>');
    },
    room() {
        $('#v').innerHTML = `<h2> Nobar</h2><div class="two"><div class="glass pad"><b>Buat ruangan</b><p style="color:var(--mut);margin:6px 0 12px;font-size:.85rem">Pilih film, bagikan kode ke teman.</p><select id="rt">${titles.map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('')}</select><button class="btn glow" style="width:100%" onclick="makeRoom()">Buat Room</button></div>
<div class="glass pad"><b>Gabung pakai kode</b><p style="color:var(--mut);margin:6px 0 12px;font-size:.85rem">Masukin 5 karakter dari temanmu.</p><input id="rc" maxlength="5" placeholder="ABCDE" style="text-transform:uppercase;text-align:center;letter-spacing:.3em"><button class="btn glow" style="width:100%" onclick="joinRoom($('#rc').value)">Gabung</button></div></div>`;
    },
    me() {
        $('#v').innerHTML = `<div class="glass pad prof">
<div class="avbig">${av(me.avatar, 104)}</div>
<h2>${esc(me.username)}</h2>
<p class="role">${me.role === 'admin' ? 'Admin' : 'Member'}</p>
<h3>Pilih avatar</h3>
<div class="avgrid">${Object.keys(AVATARS).map(k => `<button class="avopt ${me.avatar === k ? 'on' : ''}" onclick="setAvatar('${k}')" aria-label="Avatar ${k}">${av(k, 58)}<small>${k}</small></button>`).join('')}</div>
<label class="btn ghost upl">${ic('camera')} Upload foto sendiri<input type="file" id="avf" accept="image/png,image/jpeg,image/webp,image/gif" hidden onchange="uploadAvatar(this)"></label>
<div class="prow"><button class="btn ghost" onclick="toggleTheme()">${ic('palette')} Tema</button><button class="btn danger" onclick="sb.auth.signOut().then(()=>loginView())">Keluar</button></div>
</div>`;
    },
    async admin() {
        const L = titles.map(t => item(t, `<button class="btn sm danger" onclick="event.stopPropagation();delTitle(${t.id})">Hapus</button>`)).join('');
        $('#v').innerHTML = `<h2> Panel Admin</h2><div class="glass pad"><b>Tambah film / series</b><br><br><input id="a_t" placeholder="Judul"><select id="a_ty"><option value="movie">Film</option><option value="series">Series</option></select><input id="a_y" type="number" placeholder="Tahun"><input id="a_g" placeholder="Genre (pisah koma)"><textarea id="a_d" placeholder="Deskripsi"></textarea>
<input id="a_v" placeholder="Link video / CDN (.mp4 / .m3u8)"><small>atau upload video:</small><input id="a_vf" type="file" accept="video/*"><input id="a_th" placeholder="Link thumbnail"><small>atau upload thumbnail:</small><input id="a_thf" type="file" accept="image/*">
<button class="btn glow" style="width:100%" onclick="addTitle()">Simpan</button></div><br>
<div class="glass pad"><b>Import JSON / API</b><br><br><input id="j_u" placeholder="URL API yang return array JSON"><button class="btn ghost" style="width:100%;margin-bottom:10px" onclick="importApi()">Import dari API</button><small>atau upload file .json (array berisi title, video_url, thumbnail_url, description, year, genre, type, dan untuk series boleh ada episodes:[{season,number,name,video_url,thumbnail_url}])</small><input id="j_f" type="file" accept=".json" onchange="importFile(this)"></div><br><div class="glass pad"><b>Tambah episode</b><br><br><select id="e_t">${titles.filter(t => t.type === 'series').map(t => `<option value="${t.id}">${esc(t.title)}</option>`).join('')}</select><input id="e_s" type="number" placeholder="Season (1)"><input id="e_n" type="number" placeholder="Nomor episode"><input id="e_nm" placeholder="Judul episode"><input id="e_v" placeholder="Link video / CDN"><small>atau upload video:</small><input id="e_vf" type="file" accept="video/*"><input id="e_th" placeholder="Link thumbnail episode (opsional)"><button class="btn glow" style="width:100%" onclick="addEp()">Simpan episode</button></div><h2>Katalog</h2>${L}`;
    }
};

const item = (t, extra = '') => t ? `<div class="item glass glow" onclick="openTitle(${t.id})"><div class="th" ${bg(t.thumbnail_url)}></div><div class="inf"><b>${esc(t.title)}</b><br><small>${esc(t.genre || '')} ${t.year || ''}</small>${extra.startsWith('<div') ? extra : ''}</div>${extra.startsWith('<button') ? extra : ''}</div>` : '';

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
    m.innerHTML = `<div class="sheet glass"><video id="vid" src="${esc(curEp ? curEp.video_url : t.video_url)}" controls playsinline preload="metadata"></video><h2>${esc(t.title)}</h2><b id="epn" style="color:var(--ac2)">${lbl()}</b><p style="color:var(--mut);font-size:.9rem;margin-top:6px">${esc(t.description)}</p><br>
<div id="rinfo"></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="sv">${ic('down')} Simpan</button><button class="btn sm ghost" id="cl">Tutup</button></div>${isS ? `<h2>Episode</h2><div id="eps">${epList.map(epRow).join('')}</div>` : ''}</div>`;
    document.body.appendChild(m);
    const v = $('#vid');
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
        v.src = e.video_url;
        v.load();
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
        if (!curEp)
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
        cancelRec();
        save();
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
async function makeRoom() {
    const code = Math.random().toString(36).slice(2, 7).toUpperCase();
    const tid = +$('#rt').value;
    const { error } = await sb.from('rooms').insert({
        code,
        host_id: me.id,
        title_id: tid
    });
    if (error)
        return toast(error.message);
    joinRoom(code);
}

async function joinRoom(code) {
    code = (code || '').trim().toUpperCase();
    const { data: r } = await sb.from('rooms').select('*').eq('code', code).maybeSingle();
    if (!r)
        return toast('Kode tidak ditemukan');
    room = r;
    await openTitle(r.title_id, true);
}

function bindRoom(v) {
    const host = room.host_id === me.id, url = `${location.origin}${location.pathname}?room=${room.code}`;
    $('#rinfo').innerHTML = `<div class="glass pad" style="margin-bottom:10px"><div class="code">${room.code}</div><p style="text-align:center;color:var(--mut);font-size:.8rem">${host ? 'Kamu host: kontrol play/pause kamu diikuti semua' : 'Ikut kontrol host'}</p><div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><button class="btn sm" id="cp">${ic('copy')} Salin link</button></div>${chatUI()}</div>`;
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

function av(a, size = 40) {
    const inner = AVATARS[a]
        ? avatarSVG(a)
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

async function bulk(arr) {
    if (!Array.isArray(arr))
        return toast('Harus berupa array JSON');
    const good = arr.filter(x => x.title && (x.video_url || x.episodes?.length));
    const rows = good.map(x => ({
        title: x.title,
        type: x.type === 'series' || x.episodes?.length ? 'series' : 'movie',
        year: x.year || null,
        genre: x.genre || null,
        description: x.description || null,
        video_url: x.video_url || null,
        thumbnail_url: x.thumbnail_url || null,
        created_by: me.id
    }));
    const { data, error } = await sb.from('titles').insert(rows).select('id');
    if (error)
        return toast(error.message);
    const eps = [];
    good.forEach((x, i) => (x.episodes || []).forEach((e, j) => e.video_url && eps.push({
        title_id: data[i].id,
        season: e.season || 1,
        number: e.number || j + 1,
        name: e.name || null,
        video_url: e.video_url,
        thumbnail_url: e.thumbnail_url || null
    })));
    if (eps.length) {
        const r = await sb.from('episodes').insert(eps);
        if (r.error)
            return toast(r.error.message);
    }
    reload(`${rows.length} judul & ${eps.length} episode diimport`);
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

const importApi = () => fetch($('#j_u').value).then(r => r.json()).then(bulk).catch(() => toast('API gagal / diblok CORS'));

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
