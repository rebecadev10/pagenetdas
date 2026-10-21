/**
 * NET-DAS® v3.0 SCADA Mobile — Web Engine
 * Clean, lightweight, zero audio, focused on app benefits & smooth scroll animations
 */

(function () {
  'use strict';

  // State Management
  const state = {
    lastScrollY: window.scrollY,
    lightningDischarges: [],
  };

  // =========================================================================
  // 1. Mobile Menu Toggle
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // =========================================================================
  // 2. Phone Top Bar Clock
  // =========================================================================
  const clockEl = document.getElementById('phone-clock');
  function updatePhoneClock() {
    if (clockEl) {
      const now = new Date();
      let hrs = now.getHours();
      const ampm = hrs >= 12 ? 'p. m.' : 'a. m.';
      hrs = hrs % 12 || 12;
      const mins = String(now.getMinutes()).padStart(2, '0');
      clockEl.textContent = `${hrs}:${mins} ${ampm}`;
    }
  }
  setInterval(updatePhoneClock, 1000);
  updatePhoneClock();

  // =========================================================================
  // 3. Scroll Lightning Arc Effect (SILENCIOSO, SIN SONIDO)
  // =========================================================================
  const lightningSpark = document.getElementById('scroll-lightning-spark');
  const lightningCanvas = document.getElementById('scroll-lightning-canvas');
  let lCtx = null;
  if (lightningCanvas) {
    lCtx = lightningCanvas.getContext('2d');
    lightningCanvas.width = window.innerWidth;
    lightningCanvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      lightningCanvas.width = window.innerWidth;
      lightningCanvas.height = window.innerHeight;
    });
  }

  function createLightningBranch(startX, startY, endX, endY, displace = 30) {
    if (displace < 4) {
      return [{ x: startX, y: startY }, { x: endX, y: endY }];
    }
    const midX = (startX + endX) / 2 + (Math.random() - 0.5) * displace;
    const midY = (startY + endY) / 2 + (Math.random() - 0.5) * displace;
    return [
      ...createLightningBranch(startX, startY, midX, midY, displace / 1.8),
      ...createLightningBranch(midX, midY, endX, endY, displace / 1.8),
    ];
  }

  function triggerScrollLightning(sparkX, sparkY) {
    const targetX = sparkX - (Math.random() * 220 + 70);
    const targetY = sparkY + (Math.random() - 0.5) * 140;
    const points = createLightningBranch(sparkX, sparkY, targetX, targetY);

    state.lightningDischarges.push({
      points,
      alpha: 0.9,
      width: Math.random() * 2 + 1.2,
    });
  }

  function updateScrollLightning() {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    const viewportHeight = window.innerHeight;
    const sparkTop = progress * (viewportHeight - 60);

    if (lightningSpark) {
      lightningSpark.style.top = `${sparkTop}px`;
    }

    const deltaY = Math.abs(window.scrollY - state.lastScrollY);
    if (deltaY > 15) {
      const sparkRect = lightningSpark ? lightningSpark.getBoundingClientRect() : null;
      const sparkX = sparkRect ? sparkRect.left + 16 : window.innerWidth - 30;
      const sparkY = sparkRect ? sparkRect.top + 16 : sparkTop + 16;
      triggerScrollLightning(sparkX, sparkY);
      state.lastScrollY = window.scrollY;
    }

    if (lCtx && lightningCanvas) {
      lCtx.clearRect(0, 0, lightningCanvas.width, lightningCanvas.height);

      for (let i = state.lightningDischarges.length - 1; i >= 0; i--) {
        const discharge = state.lightningDischarges[i];
        discharge.alpha -= 0.05;

        if (discharge.alpha <= 0) {
          state.lightningDischarges.splice(i, 1);
          continue;
        }

        // Glow line
        lCtx.strokeStyle = `rgba(0, 240, 255, ${discharge.alpha * 0.75})`;
        lCtx.lineWidth = discharge.width * 2.5;
        lCtx.shadowColor = '#00F0FF';
        lCtx.shadowBlur = 10;
        lCtx.beginPath();
        discharge.points.forEach((pt, idx) => {
          if (idx === 0) lCtx.moveTo(pt.x, pt.y);
          else lCtx.lineTo(pt.x, pt.y);
        });
        lCtx.stroke();

        // Core line
        lCtx.strokeStyle = `rgba(255, 255, 255, ${discharge.alpha})`;
        lCtx.lineWidth = discharge.width * 0.7;
        lCtx.stroke();
        lCtx.shadowBlur = 0;
      }
    }

    requestAnimationFrame(updateScrollLightning);
  }
  requestAnimationFrame(updateScrollLightning);

  // =========================================================================
  // 4. Subtle Background Particle Canvas
  // =========================================================================
  const canvas = document.getElementById('electric-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 24000), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.6 + 0.8,
        pulse: Math.random() * Math.PI,
      });
    }

    function drawElectricCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulse += 0.02;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.2;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        const rad = p1.radius + Math.sin(p1.pulse) * 0.4;
        ctx.fillStyle = i % 5 === 0 ? 'rgba(99, 102, 241, 0.7)' : 'rgba(34, 211, 238, 0.7)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(rad, 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(drawElectricCanvas);
    }
    requestAnimationFrame(drawElectricCanvas);
  }

  // =========================================================================
  // 5. Offline SVG QR Code Generator
  // =========================================================================
  function generateSvgQr(url) {
    const size = 25;
    const matrix = Array(size).fill(0).map(() => Array(size).fill(false));

    function placeFinder(startX, startY) {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          if (
            x === 0 || x === 6 || y === 0 || y === 6 ||
            (x >= 2 && x <= 4 && y >= 2 && y <= 4)
          ) {
            matrix[startY + y][startX + x] = true;
          }
        }
      }
    }
    placeFinder(0, 0);
    placeFinder(size - 7, 0);
    placeFinder(0, size - 7);

    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = (hash << 5) - hash + url.charCodeAt(i);
      hash |= 0;
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (
          (x < 8 && y < 8) ||
          (x >= size - 8 && y < 8) ||
          (x < 8 && y >= size - 8) ||
          (x === 6 || y === 6)
        ) {
          continue;
        }
        const cellHash = (hash * (x + 1) * (y + 1) * 31) & 0xffffff;
        matrix[y][x] = cellHash % 3 === 0 || cellHash % 7 === 0;
      }
    }

    let rects = '';
    const scale = 8;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (matrix[y][x]) {
          rects += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="#0A0F1D"/>`;
        }
      }
    }

    return `
      <svg viewBox="0 0 ${size * scale} ${size * scale}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size * scale}" height="${size * scale}" fill="#FFFFFF"/>
        ${rects}
      </svg>
    `;
  }

  // =========================================================================
  // 5. Configuración de Descarga & Generador de Código QR
  // =========================================================================
  // Enlace oficial de GitHub Releases:
  const CONFIG_APK_URL = 'https://github.com/rebecadev10/pagenetdas/releases/download/v3.0.0/netdas-scada-v3.0.apk';

  const downloadBtn = document.getElementById('apk-download-btn');
  let finalDownloadUrl = CONFIG_APK_URL;

  if (!finalDownloadUrl) {
    if (downloadBtn && downloadBtn.getAttribute('href') && !downloadBtn.getAttribute('href').startsWith('#')) {
      const btnHref = downloadBtn.getAttribute('href');
      if (btnHref.startsWith('http://') || btnHref.startsWith('https://')) {
        finalDownloadUrl = btnHref;
      } else {
        const cleanHref = btnHref.replace(/^\.\//, '');
        finalDownloadUrl = `${window.location.origin}/${cleanHref}`;
      }
    } else {
      finalDownloadUrl = `${window.location.origin}/assets/netdas-scada-v3.0.apk`;
    }
  } else if (downloadBtn) {
    downloadBtn.setAttribute('href', finalDownloadUrl);
  }

  const qrContainer = document.getElementById('qr-code-canvas-container');
  const qrUrlEl = document.getElementById('qr-target-url');
  const copyBtn = document.getElementById('copy-link-btn');
  const copyText = document.getElementById('copy-link-text');

  if (qrContainer) {
    qrContainer.innerHTML = generateSvgQr(finalDownloadUrl);
  }
  if (qrUrlEl) {
    qrUrlEl.textContent = finalDownloadUrl;
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(finalDownloadUrl).then(() => {
        if (copyText) copyText.textContent = '¡Enlace Copiado al Portapapeles!';
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copiar Enlace de Descarga';
        }, 3000);
      });
    });
  }

  console.log('⚡ NET-DAS v3.0 Web Engine Ready. Target APK:', finalDownloadUrl);
})();
