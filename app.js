document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const header = document.querySelector('.header');
  const themeToggle = document.getElementById('theme-toggle');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contact-form');
  const roleText = document.getElementById('role-text');

  // --- 1. Theme Manager (Dark/Light) ---
  // Get initial theme (from localStorage or system preference)
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Apply theme
  document.documentElement.setAttribute('data-theme', initialTheme);

  // Toggle Theme Handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Smooth transition styling helper
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- 2. Header Scroll Effect ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 3. Active Link State on Scroll ---
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100; // Adding offset for accuracy

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    }
  });

  // --- 4. Mobile Menu Navigation Slider ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu on clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // --- 5. Typing Text Animation Effect ---
  const roles = [
    'Software Engineer',
    'Competitive Programmer',
    'Full-Stack Developer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Deleting content
      roleText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Typing content
      roleText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Checking typing status
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2000; // Hold for 2 seconds
    } else if (isDeleting && charIndex === 0) {
      // Move to next word after delete
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Brief pause before typing next
    }

    setTimeout(typeRole, typingSpeed);
  }

  // Start typing loop
  if (roleText) {
    typeRole();
  }

  // --- 6. Scroll Reveal Animation (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- 7. Contact Form Simulation Notification ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Simulate sending status
      submitBtn.textContent = 'Sending Message...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      // Simulate completion delay
      setTimeout(() => {
        // Aesthetic checkmark notification
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitBtn.style.borderColor = '#10b981';
        submitBtn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)';
        
        contactForm.reset();

        // Restore button state after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.boxShadow = '';
          submitBtn.style.opacity = '1';
          submitBtn.disabled = false;
        }, 3500);
      }, 1500);
    });
  }
});
