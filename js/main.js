/*
 * Lógica del portafolio. Sin dependencias, sin build.
 * Módulos (cada uno es una función que se arranca al final del archivo):
 *   1. Idioma (i18n)          5. Cabecera, menú y progreso
 *   2. Efecto de escritura    6. Animaciones de entrada y contadores
 *   3. Fondo de partículas    7. Efectos de cursor (foco de luz e inclinación)
 *   4. Utilidades             8. Galerías de capturas (EventHub, LingAI, Peru Eterno)
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ 4. UTILIDADES */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // localStorage puede fallar (modo privado, datos bloqueados): se envuelve siempre
  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch (e) { /* sin persistencia */ } }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* ------------------------------------------------------------------ 1. IDIOMA */
  const LANG_STORAGE_KEY = 'portfolio-lang';
  const supportedLangs = Object.keys(translations);
  let currentLang = DEFAULT_LANG;

  // Prioridad: ?lang=xx en la URL > idioma guardado > italiano (idioma principal)
  function getInitialLang() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && supportedLangs.includes(fromUrl)) return fromUrl;
    const saved = storage.get(LANG_STORAGE_KEY);
    if (saved && supportedLangs.includes(saved)) return saved;
    return DEFAULT_LANG;
  }

  function translate(key) {
    const dict = translations[currentLang] || {};
    return dict[key] !== undefined ? dict[key] : translations[DEFAULT_LANG][key];
  }

  function applyLanguage(lang, { persist = true } = {}) {
    if (!supportedLangs.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    document.documentElement.lang = lang;

    // Textos
    $$('[data-i18n]').forEach((el) => {
      const value = translate(el.dataset.i18n);
      if (value !== undefined) el.textContent = value;
    });

    // Atributos (formato "atributo:clave")
    $$('[data-i18n-attr]').forEach((el) => {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      const value = translate(key);
      if (attr && value !== undefined) el.setAttribute(attr, value);
    });

    // Metadatos de la página
    document.title = translate('meta.title');
    const description = $('meta[name="description"]');
    if (description) description.setAttribute('content', translate('meta.description'));
    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', translate('meta.title'));
    const ogDescription = $('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', translate('meta.ogDescription'));

    // Estado de los botones del selector
    $$('.lang-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    if (persist) storage.set(LANG_STORAGE_KEY, lang);
    restartTyped();
  }

  function initLanguage() {
    $$('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });
    // El HTML ya viene en italiano: solo se reaplica si el idioma elegido es otro
    const initial = getInitialLang();
    if (initial !== DEFAULT_LANG) {
      applyLanguage(initial, { persist: false });
    } else {
      currentLang = DEFAULT_LANG;
      startTyped();
    }
  }

  /* ------------------------------------------------------------------ 2. EFECTO DE ESCRITURA */
  let typedTimer = null;
  let typedRunId = 0;

  function startTyped() {
    const target = $('#typedRole');
    if (!target) return;
    const roles = (translate('hero.roles') || '').split('|').filter(Boolean);
    if (!roles.length) return;

    // Con movimiento reducido se muestra el primer rol sin animar
    if (prefersReducedMotion) {
      target.textContent = roles[0];
      return;
    }

    const runId = ++typedRunId;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 28;
    const HOLD_FULL = 1900;
    const HOLD_EMPTY = 350;

    function tick() {
      if (runId !== typedRunId) return; // se canceló (cambio de idioma)
      const word = roles[roleIndex];
      charIndex += isDeleting ? -1 : 1;
      target.textContent = word.slice(0, charIndex);

      let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;
      if (!isDeleting && charIndex === word.length) {
        isDeleting = true;
        delay = HOLD_FULL;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = HOLD_EMPTY;
      }
      typedTimer = window.setTimeout(tick, delay);
    }

    target.textContent = '';
    typedTimer = window.setTimeout(tick, 400);
  }

  function restartTyped() {
    window.clearTimeout(typedTimer);
    startTyped();
  }

  /* ------------------------------------------------------------------ 3. FONDO DE PARTÍCULAS */
  function initParticles() {
    const canvas = $('#bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pointer = { x: -9999, y: -9999 };
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    let isRunning = false;

    const LINK_DISTANCE = 140;
    const POINTER_RADIUS = 170;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Menos partículas en pantallas pequeñas para cuidar el rendimiento
      const count = Math.min(90, Math.max(28, Math.floor((width * height) / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // El cursor empuja suavemente las partículas cercanas
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < POINTER_RADIUS * POINTER_RADIUS && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (POINTER_RADIUS - dist) / POINTER_RADIUS;
            p.x += (dx / dist) * force * 1.6;
            p.y += (dy / dist) * force * 1.6;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(103, 232, 249, 0.65)';
        ctx.fill();

        // Líneas entre partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.22;
            ctx.strokeStyle = 'rgba(139, 150, 246, ' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      draw();
      rafId = window.requestAnimationFrame(loop);
    }

    function start() {
      if (isRunning || prefersReducedMotion) return;
      isRunning = true;
      rafId = window.requestAnimationFrame(loop);
    }

    function stop() {
      isRunning = false;
      if (rafId) window.cancelAnimationFrame(rafId);
    }

    resize();
    draw(); // un fotograma estático (suficiente si hay movimiento reducido)
    start();

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { resize(); draw(); }, 150);
    });
    window.addEventListener('pointermove', (e) => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
    window.addEventListener('pointerleave', () => { pointer.x = -9999; pointer.y = -9999; });

    // Se pausa cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  }

  /* ------------------------------------------------------------------ 5. CABECERA, MENÚ Y PROGRESO */
  function initHeader() {
    const header = $('#siteHeader');
    const menuBtn = $('#menuBtn');
    const progress = $('#scrollProgress');
    const navLinks = $$('.nav-link');
    if (!header) return;

    // Estado "scrolled" y barra de progreso, con requestAnimationFrame para no saturar
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        header.classList.toggle('is-scrolled', scrollTop > 12);
        if (progress) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(scrollTop / max, 1) : 0) + ')';
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Menú móvil
    function setMenu(open) {
      header.classList.toggle('is-open', open);
      if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
    }
    if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
    navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) setMenu(false);
    });

    // Enlace activo según la sección visible
    // Se observa también el hero (#top): al volver arriba no debe quedar nada resaltado
    const sections = navLinks
      .map((link) => $(link.getAttribute('href')))
      .filter(Boolean);
    const hero = $('#top');
    if ('IntersectionObserver' in window && sections.length) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach((section) => sectionObserver.observe(section));
      if (hero) sectionObserver.observe(hero);
    }
  }

  /* ------------------------------------------------------------------ 6. ANIMACIONES DE ENTRADA Y CONTADORES */
  function initReveal() {
    const items = $$('.reveal');

    // Retraso escalonado entre elementos hermanos (rejillas de tarjetas, estadísticas...)
    $$('.project-grid, .skills-grid, .stats').forEach((group) => {
      $$('.reveal', group).forEach((el, index) => {
        el.style.setProperty('--reveal-delay', (index % 4) * 90 + 'ms');
      });
    });
    $$('.hero-copy .reveal').forEach((el, index) => {
      el.style.setProperty('--reveal-delay', index * 110 + 'ms');
    });

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      items.forEach((el) => el.classList.add('is-visible'));
      initCounters(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => observer.observe(el));

    initCounters(false);
  }

  function initCounters(skipAnimation) {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    function run(el) {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      if (skipAnimation) { el.textContent = String(target); return; }

      const duration = 1400;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }

    if (skipAnimation || !('IntersectionObserver' in window)) {
      counters.forEach(run);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => { el.textContent = '0'; observer.observe(el); });
  }

  /* ------------------------------------------------------------------ 7. EFECTOS DE CURSOR */
  function initPointerEffects() {
    if (!canHover) return;

    // Foco de luz: cada tarjeta recibe la posición del cursor como variables CSS
    $$('[data-spotlight]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', e.clientX - rect.left + 'px');
        card.style.setProperty('--my', e.clientY - rect.top + 'px');
      });
    });

    // Inclinación 3D suave en la ventana de código del hero
    const visual = $('.hero-visual');
    const codeWindow = $('#codeWindow');
    if (visual && codeWindow && !prefersReducedMotion) {
      const MAX_TILT = 7; // grados
      visual.addEventListener('pointermove', (e) => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        codeWindow.style.transform =
          'perspective(900px) rotateY(' + (x * MAX_TILT * 2).toFixed(2) + 'deg) rotateX(' + (-y * MAX_TILT * 2).toFixed(2) + 'deg)';
      });
      visual.addEventListener('pointerleave', () => { codeWindow.style.transform = ''; });
    }
  }

  /* ------------------------------------------------------------------ 8. GALERÍAS DE CAPTURAS */
  // Cada tarjeta con data-showcase (EventHub, LingAI, Peru Eterno) tiene su propia galería
  function initShowcase() {
    $$('[data-showcase]').forEach(setupShowcase);
  }

  function setupShowcase(root) {
    const images = $$('.showcase-img', root);
    const tabs = $$('.showcase-tab', root);
    if (!images.length || images.length !== tabs.length) return;

    const AUTOPLAY_MS = 5000;
    let current = 0;
    let timer = null;
    let userChose = false;   // si el visitante elige una pantalla, se acaba la rotación automática
    let isVisible = false;
    let isHovered = false;

    function show(index) {
      current = (index + images.length) % images.length;
      images.forEach((img, i) => img.classList.toggle('is-active', i === current));
      tabs.forEach((tab, i) => {
        tab.classList.toggle('is-active', i === current);
        tab.setAttribute('aria-pressed', String(i === current));
      });
    }

    function stop() { window.clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (prefersReducedMotion || userChose || !isVisible || isHovered) return;
      timer = window.setInterval(() => show(current + 1), AUTOPLAY_MS);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => { userChose = true; show(i); stop(); });
    });

    // Pausa al pasar el cursor o al enfocar con teclado
    root.addEventListener('pointerenter', () => { isHovered = true; stop(); });
    root.addEventListener('pointerleave', () => { isHovered = false; start(); });
    root.addEventListener('focusin', () => { isHovered = true; stop(); });
    root.addEventListener('focusout', () => { isHovered = false; start(); });

    // Solo rota mientras la tarjeta está en pantalla
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        start();
      }, { threshold: 0.35 }).observe(root);
    }
  }

  /* ------------------------------------------------------------------ ARRANQUE */
  function init() {
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    initLanguage();
    initParticles();
    initHeader();
    initReveal();
    initPointerEffects();
    initShowcase();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
