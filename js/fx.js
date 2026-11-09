// ===== NauMovie FX: partikel, kursor, tilt, ripple =====
(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    let on = localStorage.nm_fx !== '0' && !reduce;

    const cv = document.getElementById('fx'), cx = cv.getContext('2d');
    const cv2 = document.getElementById('fx2'), c2 = cv2.getContext('2d');
    const spot = document.getElementById('spot');

    let W = 0, H = 0, DPR = 1, parts = [], bits = [], stars = [], pal = [], nextStar = 3000;
    let mx = -999, my = -999, lastTrail = 0, last = performance.now(), t0 = last;

    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = a => a[(Math.random() * a.length) | 0];
    const css = (s, n) => s.getPropertyValue(n).trim();

    function readPal() {
        const s = getComputedStyle(document.documentElement);
        pal = [css(s, '--pk'), css(s, '--pk2'), css(s, '--bl'), css(s, '--ac'), '#ffffff'];
    }

    function size() {
        DPR = Math.min(devicePixelRatio || 1, 2);
        W = innerWidth;
        H = innerHeight;
        for (const c of [cv, cv2]) {
            c.width = W * DPR;
            c.height = H * DPR;
        }
        cx.setTransform(DPR, 0, 0, DPR, 0, 0);
        c2.setTransform(DPR, 0, 0, DPR, 0, 0);
        const n = (W < 600 ? 10 : Math.max(18, Math.min(40, Math.round(W * H / 30000))));
        while (parts.length < n) parts.push(mk(true));
        parts.length = n;
    }

    function mk(init) {
        const type = pick(['heart', 'spark', 'spark', 'dot', 'dot', 'mote', 'mote', 'petal']);
        const s = type === 'dot' ? rand(14, 38) : type === 'mote' ? rand(.8, 2) : type === 'petal' ? rand(5, 9) : rand(4, 9);
        return {
            type, s,
            x: rand(0, W),
            y: init ? rand(0, H) : H + 30,
            vy: -(type === 'dot' ? rand(.08, .22) : rand(.12, .5)),
            vx: rand(-.12, .12),
            ph: rand(0, 6.28),
            sw: rand(.3, 1.1),
            rot: rand(0, 6.28),
            vr: rand(-.8, .8),
            a: type === 'dot' ? rand(.10, .22) : rand(.28, .75),
            ci: (Math.random() * 5) | 0
        };
    }

    // ---- bentuk ----
    function heart(c, s) {
        c.beginPath();
        c.moveTo(0, s * .35);
        c.bezierCurveTo(-s * 1.1, -s * .4, -s * .6, -s * 1.1, 0, -s * .45);
        c.bezierCurveTo(s * .6, -s * 1.1, s * 1.1, -s * .4, 0, s * .35);
        c.fill();
    }

    function spark(c, s) {
        c.beginPath();
        c.moveTo(0, -s);
        c.quadraticCurveTo(0, 0, s, 0);
        c.quadraticCurveTo(0, 0, 0, s);
        c.quadraticCurveTo(0, 0, -s, 0);
        c.quadraticCurveTo(0, 0, 0, -s);
        c.fill();
    }

    function petal(c, s) {
        c.beginPath();
        c.ellipse(0, 0, s * .55, s, 0, 0, 6.2832);
        c.fill();
    }

    function glowDot(c, s, col) {
        const g = c.createRadialGradient(0, 0, 0, 0, 0, s);
        g.addColorStop(0, col);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = g;
        c.beginPath();
        c.arc(0, 0, s, 0, 6.2832);
        c.fill();
    }

    function shape(c, type, s, col) {
        c.fillStyle = col;
        if (type === 'heart') heart(c, s);
        else if (type === 'spark') spark(c, s);
        else if (type === 'petal') petal(c, s);
        else if (type === 'dot') glowDot(c, s, col);
        else { c.beginPath(); c.arc(0, 0, s, 0, 6.2832); c.fill(); }
    }

    // ---- efek kursor ----
    function burst(x, y, n = 14) {
        for (let i = 0; i < n; i++) {
            const a = rand(0, 6.2832), v = rand(1.2, 4.2);
            bits.push({
                type: pick(['heart', 'spark', 'spark']),
                x, y,
                vx: Math.cos(a) * v,
                vy: Math.sin(a) * v - 1.2,
                s: rand(3, 7),
                life: 0, max: rand(700, 1200),
                rot: rand(0, 6.28), vr: rand(-4, 4),
                ci: (Math.random() * 4) | 0,
                g: .06
            });
        }
    }

    function trail(x, y) {
        bits.push({
            type: pick(['spark', 'heart']),
            x: x + rand(-6, 6), y: y + rand(-6, 6),
            vx: rand(-.4, .4), vy: rand(-.2, .7),
            s: rand(2, 4.5),
            life: 0, max: rand(500, 850),
            rot: rand(0, 6.28), vr: rand(-3, 3),
            ci: (Math.random() * 4) | 0,
            g: .015
        });
    }

    function shoot() {
        const x = rand(W * .35, W), y = rand(-20, H * .35), v = rand(7, 11);
        stars.push({ x, y, vx: -v, vy: v * .55, life: 0, max: rand(700, 1000), l: rand(90, 160) });
    }

    // ---- loop ----
    function frame(now) {
        requestAnimationFrame(frame);
        if (!on || document.hidden) {
            last = now;
            return;
        }
        const dt = Math.min(48, now - last) / 16.67;
        last = now;
        const t = (now - t0) / 1000;

        cx.clearRect(0, 0, W, H);
        for (const p of parts) {
            p.y += p.vy * dt;
            p.x += (p.vx + Math.sin(t * p.sw + p.ph) * .25) * dt;
            p.rot += p.vr * .01 * dt;
            // menjauh dari kursor pelan-pelan
            const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
            if (fine && d2 < 14400) {
                const f = (1 - d2 / 14400) * 1.4;
                p.x += (dx / (Math.sqrt(d2) + 1)) * f * dt;
                p.y += (dy / (Math.sqrt(d2) + 1)) * f * dt;
            }
            if (p.y < -40 || p.x < -50 || p.x > W + 50) {
                Object.assign(p, mk(false), { x: rand(0, W) });
            }
            const tw = .65 + .35 * Math.sin(t * 1.6 + p.ph * 3);
            cx.save();
            cx.globalAlpha = p.a * tw;
            cx.translate(p.x, p.y);
            cx.rotate(p.type === 'dot' || p.type === 'mote' ? 0 : p.rot);
            shape(cx, p.type, p.s, pal[p.ci]);
            cx.restore();
        }

        // bintang jatuh
        if (now > nextStar) {
            shoot();
            nextStar = now + rand(6000, 13000);
        }
        for (let i = stars.length - 1; i >= 0; i--) {
            const s = stars[i];
            s.life += dt * 16.67;
            s.x += s.vx * dt;
            s.y += s.vy * dt;
            const k = 1 - s.life / s.max;
            if (k <= 0) { stars.splice(i, 1); continue; }
            const ux = s.vx / Math.hypot(s.vx, s.vy), uy = s.vy / Math.hypot(s.vx, s.vy);
            const g = cx.createLinearGradient(s.x, s.y, s.x - ux * s.l, s.y - uy * s.l);
            g.addColorStop(0, 'rgba(255,255,255,' + (.9 * k) + ')');
            g.addColorStop(.3, pal[0]);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            cx.save();
            cx.globalAlpha = k;
            cx.strokeStyle = g;
            cx.lineWidth = 2;
            cx.lineCap = 'round';
            cx.beginPath();
            cx.moveTo(s.x, s.y);
            cx.lineTo(s.x - ux * s.l, s.y - uy * s.l);
            cx.stroke();
            cx.restore();
        }

        // partikel kursor / klik
        c2.clearRect(0, 0, W, H);
        for (let i = bits.length - 1; i >= 0; i--) {
            const b = bits[i];
            b.life += dt * 16.67;
            if (b.life >= b.max) { bits.splice(i, 1); continue; }
            b.vy += b.g * dt;
            b.x += b.vx * dt;
            b.y += b.vy * dt;
            b.rot += b.vr * .02 * dt;
            const k = 1 - b.life / b.max;
            c2.save();
            c2.globalAlpha = k;
            c2.translate(b.x, b.y);
            c2.rotate(b.rot);
            c2.shadowColor = pal[b.ci];
            c2.shadowBlur = 8;
            shape(c2, b.type, b.s * (.5 + k * .5), pal[b.ci]);
            c2.restore();
        }
    }

    // ---- event ----
    let sx = -999, sy = -999, sq = false;
    function moveSpot() {
        sq = false;
        spot.style.transform = 'translate3d(' + (sx - 320) + 'px,' + (sy - 320) + 'px,0)';
    }

    addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') return;
        mx = e.clientX;
        my = e.clientY;
        if (!on) return;
        sx = mx;
        sy = my;
        if (!sq) { sq = true; requestAnimationFrame(moveSpot); }
        const n = performance.now();
        if (n - lastTrail > 38) { lastTrail = n; trail(mx, my); }

        // tilt poster
        const p = e.target.closest && e.target.closest('.poster');
        if (p) {
            const r = p.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
            p.style.setProperty('--rx', ((.5 - py) * 14).toFixed(1) + 'deg');
            p.style.setProperty('--ry', ((px - .5) * 14).toFixed(1) + 'deg');
            p.style.setProperty('--px', (px * 100).toFixed(0) + '%');
            p.style.setProperty('--py', (py * 100).toFixed(0) + '%');
        }
    }, { passive: true });

    addEventListener('pointerout', e => {
        const p = e.target.closest && e.target.closest('.poster');
        if (p && !p.contains(e.relatedTarget)) {
            p.style.setProperty('--rx', '0deg');
            p.style.setProperty('--ry', '0deg');
        }
    }, { passive: true });

    addEventListener('pointerdown', e => {
        if (on) burst(e.clientX, e.clientY, e.pointerType === 'touch' ? 10 : 14);
        // ripple
        const el = e.target.closest && e.target.closest('.btn,.chip,.ib');
        if (el) {
            const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
            const s = document.createElement('span');
            s.className = 'rip';
            s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
            el.appendChild(s);
            setTimeout(() => s.remove(), 650);
        }
    }, { passive: true });

    addEventListener('resize', size);
    addEventListener('themechange', readPal);

    window.toggleFx = () => {
        if (reduce) return typeof toast === 'function' && toast('Perangkatmu mematikan animasi');
        on = !on;
        localStorage.nm_fx = on ? '1' : '0';
        document.documentElement.classList.toggle('nofx', !on);
        if (!on) { cx.clearRect(0, 0, W, H); c2.clearRect(0, 0, W, H); bits.length = 0; }
        if (typeof toast === 'function') toast(on ? 'Efek nyala' : 'Efek mati');
    };

    // aman dari error pada halaman tanpa canvas
    if (!cx || reduce) document.documentElement.classList.add('nofx');
    readPal();
    size();
    requestAnimationFrame(frame);
})();
