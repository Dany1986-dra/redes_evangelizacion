document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const shareBtn = document.getElementById('shareBtn');
  const qrBtn = document.getElementById('qrBtn');
  const qrModal = document.getElementById('qrModal');
  const closeQrBtn = document.getElementById('closeQrBtn');
  const qrImage = document.getElementById('qrImage');

  // Lógica de cambio de tema Claro / Oscuro
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.className = 'bi bi-sun-fill';
      themeText.textContent = 'Modo Claro';
      themeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
      themeBtn.setAttribute('title', 'Modo Claro');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.className = 'bi bi-moon-fill';
      themeText.textContent = 'Modo Oscuro';
      themeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      themeBtn.setAttribute('title', 'Modo Oscuro');
      localStorage.setItem('theme', 'light');
    }
  }

  // Lógica para el botón Compartir
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Evangelización Digital | FSAR',
            text: 'Encuentra las redes sociales y recursos de la Fraternidad Seglar Agustina Recoleta.',
            url: window.location.href
          });
        } catch (err) {
          console.log('Compartir cancelado');
        }
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('¡Enlace copiado al portapapeles!');
      }
    });
  }

  // Generación y apertura del Código QR dinámico
  if (qrBtn && qrModal) {
    qrBtn.addEventListener('click', () => {
      const currentUrl = encodeURIComponent(window.location.href);
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${currentUrl}`;
      qrModal.classList.add('active');
    });

    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.remove('active');
    });

    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) qrModal.classList.remove('active');
    });
  }
});