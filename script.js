/* Nuki — Jornada dos módulos
   Reveal + stagger, troca de imagem por beat (.shot), nav de progresso, count-up e parallax.
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

  // 2) Troca de imagem dirigida pelos beats — cada beat tem seu .shot (no desktop fica
  //    fixo/centralizado e troca por opacidade; no mobile o CSS força todos visíveis inline).
  var beatIO = new IntersectionObserver(function (es) {
    var entering = es.filter(function (e) { return e.isIntersecting; });
    if (entering.length) {
      var shot = entering[entering.length - 1].target.querySelector('.shot');
      // mostra só o shot do beat ativo; esconde os demais (em todos os módulos)
      document.querySelectorAll('.shot').forEach(function (s) { if (s !== shot) s.classList.remove('show'); });
      if (shot) shot.classList.add('show');
    } else {
      es.forEach(function (e) {
        if (e.isIntersecting) return;
        var shot = e.target.querySelector('.shot');
        if (shot) shot.classList.remove('show');
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
    if (reduce) { el.textContent = prefix + target + suffix; return; }
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
  // Navegadores com scroll-driven animations nativas usam a timeline CSS (compositor);
  // este listener só roda como fallback (ex.: Firefox).
  var nativeTimeline = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()'));
  if (!reduce && !nativeTimeline) {
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
