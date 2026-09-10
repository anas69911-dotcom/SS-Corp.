// Sticky header shadow on scroll
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const onScroll = () => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// One-time reveal for major sections as they enter the viewport
const revealTargets = document.querySelectorAll('main > section');
if ('IntersectionObserver' in window && revealTargets.length) {
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form
// NOTE: this form has no backend attached. It currently opens the visitor's
// email client with the message pre-filled, which works everywhere with no
// setup. For submissions to land directly in an inbox without the visitor
// needing an email client, connect a form service (e.g. Formspree, Web3Forms)
// or a small serverless function, and replace the submit handler below with
// a fetch() call to that endpoint.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in every field before sending.';
      return;
    }

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:anas.69911@iqra.edu.pk?subject=${subject}&body=${body}`;

    formNote.textContent = 'Opening your email app to send this message...';
  });
}
