/* Shared trailing tooltip (see html-motion-reference). No dependencies.
 * Tip.bind(surface, { hit(ev) -> key|null, render(key, tipEl), frame })
 *   hit    : called at most once per animation frame with the latest pointer event; return a stable key for the
 *            hovered mark (any string/number) or null/undefined for none. Never touch layout here.
 *   render : fill tipEl (use textContent / createElement, never innerHTML with data). Called only when key changes
 *            or when Tip.refresh() is called.
 *   frame  : element whose box the tooltip must stay inside (default: document.documentElement).
 * Tip.hide() hides it. Needs #tip in the page and tip.css. */
(function () {
  'use strict';
  var GAP = 14, EDGE = 8;
  var tipEl, on = false, curKey, size = null, latest = null, raf = 0, cfg = null;

  function reduced() { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function ensure() {
    if (tipEl) return tipEl;
    tipEl = document.getElementById('tip');
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.id = 'tip'; tipEl.setAttribute('role', 'tooltip'); document.body.appendChild(tipEl); }
    return tipEl;
  }
  function place(x, y, frame) {
    var r = frame.getBoundingClientRect(), W = frame === document.documentElement ? innerWidth : r.width, H = frame === document.documentElement ? innerHeight : r.height;
    var px = x - (frame === document.documentElement ? 0 : r.left), py = y - (frame === document.documentElement ? 0 : r.top);
    var tx = (px + GAP + size.w > W - EDGE) ? px - GAP - size.w : px + GAP;
    var ty = Math.min(Math.max(py - size.h / 2, EDGE), Math.max(EDGE, H - size.h - EDGE));
    tx = Math.max(EDGE, tx);
    var tf = 'translate(' + tx + 'px,' + ty + 'px)';
    if (on && !reduced()) tipEl.style.transform = tf;
    else {                                   // first show jumps; it must not glide in from its last spot
      tipEl.classList.add('no-tr'); tipEl.style.transform = tf; void tipEl.offsetWidth; tipEl.classList.remove('no-tr');
      on = true; tipEl.classList.add('on');
    }
  }
  function step() {
    raf = 0;
    var ev = latest; latest = null;
    if (!ev || !cfg) return;
    var key = cfg.hit(ev);
    if (key === null || key === undefined) { Tip.hide(); return; }
    ensure();
    if (key !== curKey) { curKey = key; tipEl.textContent = ''; cfg.render(key, tipEl); size = null; }
    if (!size) size = { w: tipEl.offsetWidth, h: tipEl.offsetHeight };
    place(ev.clientX, ev.clientY, cfg.frame || document.documentElement);
  }
  var Tip = {
    bind: function (surface, config) {
      ensure(); cfg = config;
      surface.addEventListener('pointermove', function (ev) { if (ev.pointerType === 'touch') return; latest = ev; if (!raf) raf = requestAnimationFrame(step); });
      surface.addEventListener('pointerleave', function () { latest = null; Tip.hide(); });
      surface.addEventListener('pointerdown', function (ev) { if (ev.pointerType === 'touch') { latest = ev; if (!raf) raf = requestAnimationFrame(step); } });
    },
    refresh: function () { curKey = undefined; },
    hide: function () { if (!tipEl) return; on = false; curKey = undefined; tipEl.classList.remove('on'); }
  };
  window.Tip = Tip;
})();
