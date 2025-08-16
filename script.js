// Wait till the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const loaderBg = document.getElementById('loader-bg');
  const typingEl = document.getElementById('typing');
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  const scrollProgress = document.getElementById('scroll-progress');
  const fadeSections = document.querySelectorAll('.fade-in-section');

  // Loading Screen fades out after the page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      loaderBg.classList.add('fade-out');
      setTimeout(() => loaderBg.style.display = 'none', 600);
    }, 1000);
  });

  // Typing effect for hero headline
  if (typingEl) {
    const text = typingEl.getAttribute('data-text');
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        typingEl.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 90);
      } else {
        typingEl.style.borderRight = 'none'; // remove cursor after complete
      }
    }

    // Start typing with a slight delay
    setTimeout(typeWriter, 700);
  }

  // Toggle mobile menu
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('open');
      }
    });
  });

  // Scroll Progress Bar Update
  function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / docHeight) * 100;

    scrollProgress.style.width = scrolled + '%';
  }

  window.addEventListener('scroll', () => {
    updateProgressBar();
    revealOnScroll();
  });

  updateProgressBar();

  // Intersection Observer polyfill fallback
  // Reveal sections on scroll
  function revealOnScroll() {
    fadeSections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('is-visible');
      }
    });
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  }

  // Initial reveal check
  revealOnScroll();
});
