// ===== 1. Menu mobile =====
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

function closeMenu() {
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

// ===== 2. Lien de la page active =====
const currentPage = (location.pathname.split('/').pop() || 'index').replace('.html', '');

menu.querySelectorAll('a').forEach(link => {
  const target = link.getAttribute('href').replace('.html', '');
  if (target === currentPage) link.classList.add('active');
});

// ===== 3. Thème sombre / clair =====
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

setTheme(localStorage.getItem('theme') || 'dark');

toggle.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ===== 4. Effet machine à écrire (page d'accueil uniquement) =====
const typing = document.getElementById('typing');

if (typing) {
  const words = ['Développeur web', 'Futur analyste SOC', 'Artiste & créatif'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = words[wordIndex];
    typing.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex++;
      setTimeout(type, 90);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, 1500);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 45);
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    }
  }
  type();
}

// ===== 5. Barre de progression =====
const progress = document.getElementById('progress');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = total > 0 ? (window.scrollY / total) * 100 + '%' : '0%';
});

// ===== 6. Apparition au scroll =====
const items = document.querySelectorAll('main section > *');

items.forEach(el => {
  const index = [...el.parentElement.children].indexOf(el);
  el.classList.add('reveal');
  el.style.transitionDelay = (index % 5) * 90 + 'ms';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('visible');
      observer.unobserve(el);

      // Une fois l'animation finie, on nettoie pour ne pas gêner le hover
      setTimeout(() => {
        el.classList.remove('reveal', 'visible');
        el.style.transitionDelay = '';
      }, 1500);
    }
  });
}, { threshold: 0.15 });

items.forEach(el => observer.observe(el));

// ===== 7. Lueur qui suit la souris =====
window.addEventListener('mousemove', e => {
  document.body.style.setProperty('--mx', e.clientX + 'px');
  document.body.style.setProperty('--my', e.clientY + 'px');
});

// ===== 8. Effet 3D sur les cartes projets =====
document.querySelectorAll('article').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform =
      `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});