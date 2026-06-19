const observer = new IntersectionObserver((visible) => {
    if (visible[0]) {
      const id = '#' + visible[0].target.id;
      setActive(id);
    }
  }, { root: null, threshold: [0.25, 0.45, 0.65] });

  sections.forEach((sec) => observer.observe(sec));
 // Enquiries: show a friendly client-side hint for email
  const form = document.querySelector('#enquiries form');
  const email = document.querySelector('#email');

  if (form && email) {
    form.addEventListener('submit', (e) => {
      // Basic email format check (browser will still validate)
      const value = (email.value || '').trim();
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        e.preventDefault();
        email.focus();
        email.style.borderBottomColor = 'var(--brown-light)';

        let hint = document.getElementById('email-hint');
        if (!hint) {
          hint = document.createElement('p');
          hint.id = 'email-hint';
          hint.style.color = 'var(--brown-light)';
          hint.style.marginTop = '6px';
          hint.style.fontWeight = '700';
          hint.textContent = 'Please enter a valid email address.';
          email.parentElement.appendChild(hint);
        } else {
          hint.textContent = 'Please enter a valid email address.';
        }
      }
    });

    email.addEventListener('input', () => {
      const hint = document.getElementById('email-hint');
      if (hint) hint.remove();
      email.style.borderBottomColor = 'var(--gold)';
    });
  }
