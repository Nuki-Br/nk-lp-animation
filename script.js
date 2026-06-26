/* Nuki — Jornada dos módulos
   Reveal + stagger, troca de frames (sticky), nav de progresso, count-up e parallax.
   Tudo em vanilla JS (IntersectionObserver + scroll). Sem dependências. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Reveal com stagger por grupo
  var revIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var items = e.target.querySelectorAll('.reveal');
      items.forEach(function (el, i) {
        setTimeout(function () { el.classList.add('in'); }, reduce ? 0 : i * 100);
      });
      revIO.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal-group]').forEach(function (g) { revIO.observe(g); });

  // 2) Visibilidade do card + troca de frame, ambos dirigidos pelos beats
  var beatIO = new IntersectionObserver(function (es) {
    var entering = es.filter(function (e) { return e.isIntersecting; });
    var leaving   = es.filter(function (e) { return !e.isIntersecting; });
    if (entering.length) {
      document.querySelectorAll('.module .imgcard').forEach(function (c) { c.classList.remove('show'); });
      var latest = entering[entering.length - 1];
      var mod = latest.target.closest('.module');
      var f   = latest.target.dataset.frame;
      var card = mod.querySelector('.imgcard');
      if (card) card.classList.add('show');
      mod.querySelectorAll('.frame').forEach(function (fr) {
        fr.classList.toggle('active', fr.dataset.frame === f);
      });
    } else {
      leaving.forEach(function (e) {
        var card = e.target.closest('.module').querySelector('.imgcard');
        if (card) card.classList.remove('show');
      });
    }
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('.beat').forEach(function (b) { beatIO.observe(b); });

  // 3) Indicador de progresso lateral
  var navIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var id = e.target.id;
      document.querySelectorAll('.progress a').forEach(function (a) {
        a.classList.toggle('on', a.dataset.t === id);
      });
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('.module').forEach(function (m) { navIO.observe(m); });

  // 4) Números contando
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }
  function countUp(el) {
    var target = parseFloat(el.dataset.target), suffix = el.dataset.suffix || '', prefix = el.dataset.prefix || '';
    var dur = 1300, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = prefix + Math.round(target * easeOut(p)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nio = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (!e.isIntersecting) return; countUp(e.target); nio.unobserve(e.target); });
  }, { threshold: 0.6 });
  document.querySelectorAll('.num').forEach(function (n) { nio.observe(n); });

  // 5) Parallax leve (número de fundo 01/02/03)
  if (!reduce) {
    var px = document.querySelectorAll('[data-parallax]'), ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var vh = window.innerHeight;
        px.forEach(function (el) {
          var r = el.getBoundingClientRect(), center = r.top + r.height / 2, off = (center - vh / 2) / vh;
          el.style.transform = 'translateY(' + (off * parseFloat(el.dataset.parallax)) + 'px)';
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
