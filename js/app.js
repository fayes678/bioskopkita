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
    copy: 'M9 9h11v11H9zM5 15V5h10'
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
<div class="login"><div class="card glass"><div class="mascot">${ic('bow')}</div><h1 class="logo">NauMovie</h1><p>Selamat datang diBioskop Naura</p>
<nav class="ltabs glass"><button class="tab ${reg ? '' : 'on'}" data-k="login"><b>${ic('key')}</b>Masuk</button><button class="tab ${reg ? 'on' : ''}" data-k="reg"><b>${ic('bow')}</b>Daftar</button><button class="tab" data-k="theme"><b>${ic('palette')}</b>Tema</button></nav>
<div id="fl"><input id="u" placeholder="Username" autocomplete="username" autocapitalize="none"><input id="p" type="password" placeholder="Password (min. 6 karakter)" autocomplete="${reg ? 'new-password' : 'current-password'}">
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
    $('#app').innerHTML = `<header class="top glass"><span class="logo"> NauMovie</span><button class="btn sm ghost" onclick="toggleTheme()">${ic('palette')}</button></header><main id="v"></main>
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
        $('#v').innerHTML = `<div class="glass pad" style="text-align:center"><div class="mascot">${ic('bow')}</div><h2>${esc(me.username)}</h2><p style="color:var(--mut)">${me.role === 'admin' ? ' Admin' : 'Member'}</p><br><button class="btn ghost" onclick="toggleTheme()">${ic('palette')} Ganti tema Sanrio / Deep Blue</button><br><br><button class="btn danger" onclick="sb.auth.signOut().then(()=>loginView())">Keluar</button></div>`;
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
    $('#rinfo').innerHTML = `<div class="glass pad" style="margin-bottom:10px"><div class="code">${room.code}</div><p style="text-align:center;color:var(--mut);font-size:.8rem">${host ? 'Kamu host: kontrol play/pause kamu diikuti semua' : 'Ikut kontrol host'}</p><div style="display:flex;gap:8px;justify-content:center;margin-top:8px"><button class="btn sm" id="cp">${ic('copy')} Salin link</button></div><div class="chat" id="chat"></div><input id="cm" placeholder="Chat..." style="margin:0"></div>`;
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
    sb.from('room_chat').select('*').eq('code', room.code).order('id').limit(30).then(({ data }) => (data || []).forEach(addChat));
    $('#cm').onkeydown = e => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            sb.from('room_chat').insert({
                code: room.code,
                username: me.username,
                msg: e.target.value.trim()
            });
            e.target.value = '';
        }
    };
}

function addChat(c) {
    const b = $('#chat');
    if (!b)
        return;
    b.insertAdjacentHTML('beforeend', `<p><b>${esc(c.username)}</b> ${esc(c.msg)}</p>`);
    b.scrollTop = 1e9;
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
