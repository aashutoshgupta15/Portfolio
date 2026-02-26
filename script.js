// Mobile Menu Script
// ------------------
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  menuButton.addEventListener('click', function () {
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      menuButton.innerHTML = '<i class="ri-close-line ri-lg"></i>';
    } else {
      mobileMenu.classList.add('hidden');
      menuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
    }
  });
  // Close menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      menuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
    });
  });

  // Portfolio Filter Script
  // ----------------------
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  // Project modal functionality
  // const viewProjectButtons = document.querySelectorAll('.view-project');
  // viewProjectButtons.forEach(button => {
  //   button.addEventListener('click', function(e) {
  //     // e.preventDefault();
  //     // In a real implementation, this would open a modal with project details
  //     alert('Project details modal would open here');
  //   });
  // });
  const viewProjectButtons = document.querySelectorAll('.view-project');

  viewProjectButtons.forEach(button => {
    button.addEventListener('click', function () {
      const link = this.getAttribute('data-link');
      if (link) {
        window.open(link, '_blank'); // Opens in new tab
      } else {
        alert('Project link coming soon.');
      }
    });
  });


  // Animation Script (Intersection Observer)
  // ----------------------------------------
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  // Observe all sections and elements that need animation
  document.querySelectorAll('section').forEach(el => {
    el.classList.add('section-fade');
    observer.observe(el);
  });

  // Staggered slideups for grid items
  document.querySelectorAll('.project-card, .moodboard-item, .value-card').forEach(el => {
    // calculate a stagger delay based on DOM index position within its parent
    const index = Array.from(el.parentNode.children).indexOf(el);
    el.style.transitionDelay = `${(index % 4) * 100}ms`;
    el.classList.add('fade-in-up');
    observer.observe(el);
  });

  // Scale ups for insights
  document.querySelectorAll('.insight-card').forEach(el => {
    const index = Array.from(el.parentNode.children).indexOf(el);
    el.style.transitionDelay = `${(index % 3) * 150}ms`;
    el.classList.add('scale-in');
    observer.observe(el);
  });
  // Add hover classes to interactive elements
  document.querySelectorAll('button, .nav-link, .social-icon').forEach(el => {
    el.classList.add('button-hover');
  });
  document.querySelectorAll('.ri-heart-line, .ri-focus-3-line, .ri-empathize-line, .ri-seedling-line, .ri-creativity-line').forEach(el => {
    el.classList.add('icon-hover');
  });

  // Smooth Scroll Script
  // -------------------
  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length === 1) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        const yOffset = -80; // adjust this to match your fixed nav height
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // Set initial state

  // Form Script
  // -----------
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          // Show your success message
          successMessage.classList.remove('hidden');
          successMessage.style.transform = 'translateY(0)';
          setTimeout(() => {
            successMessage.style.transform = 'translateY(-100%)';
          }, 3000);
          form.reset();
        } else {
          response.json().then(data => {
            alert(data.error || 'Oops! There was a problem submitting your form');
          });
        }
      }).catch(error => {
        alert('Oops! There was a problem submitting your form');
      });
    });
  }

  // View & Download Script
  // ---------------
  // Since :contains is not a valid CSS selector, we'll find buttons by their text content
  document.querySelectorAll('button').forEach(button => {
    const label = button.textContent.trim();

    if (label === 'Download PDF' || label === 'View PDF') {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        // Find parent card and section name
        const section = this.closest('.card');
        const heading = section.querySelector('h4')?.textContent.trim();

        // Determine filename and message
        let filename = '';
        let message = '';
        if (heading === 'Resume') {
          filename = 'Resume.pdf';
          message = 'Resume download started...';
        } else if (heading === 'Media Kit') {
          filename = 'Mediakit.pdf';
          message = 'Media Kit download started...';
        } else {
          console.warn('Unrecognized section:', heading);
          return;
        }

        if (label === 'View PDF') {
          // Open PDF in a new tab
          window.open(filename, '_blank');
        } else if (label === 'Download PDF') {
          // Download the PDF
          const link = document.createElement('a');
          link.href = filename;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Button feedback
          const originalText = this.textContent;
          this.textContent = 'Downloading...';
          this.disabled = true;

          // Show notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
          notification.textContent = message;
          document.body.appendChild(notification);

          // Animate in
          setTimeout(() => {
            notification.classList.remove('translate-x-full');
          }, 50);

          // Reset button and remove notification
          setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;

            notification.classList.add('translate-x-full');
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 300);
          }, 2000);
        }
      });
    }
  });


  // Process Animation Script
  // -----------------------
  const processSteps = document.querySelectorAll('.process-step');
  const processStepsMobile = document.querySelectorAll('.process-step-mobile');
  const processLine = document.querySelector('.process-line');
  let currentStep = 0;
  // Intersection Observer for process section
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProcess();
        processObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const processSection = document.getElementById('process');
  if (processSection) {
    processObserver.observe(processSection);
  }
  function animateProcess() {
    // Desktop animation
    if (window.innerWidth >= 1024) {
      animateDesktopProcess();
    } else {
      // Mobile animation
      animateMobileProcess();
    }
  }
  function animateDesktopProcess() {
    const totalSteps = processSteps.length;
    function animateStep() {
      if (currentStep < totalSteps) {
        // Animate current step
        processSteps[currentStep].classList.add('animate', 'active');
        // Update progress line
        const progressWidth = ((currentStep + 1) / totalSteps) * 100;
        if (processLine) {
          processLine.style.width = progressWidth + '%';
        }
        currentStep++;
        setTimeout(animateStep, 400);
      }
    }
    animateStep();
  }
  function animateMobileProcess() {
    processStepsMobile.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add('animate');
      }, index * 200);
    });
  }
  // Hover effects for desktop
  processSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', function () {
      // Remove active class from all steps
      processSteps.forEach(s => s.classList.remove('active'));
      // Add active class to hovered step
      this.classList.add('active');
    });
  });
  // Reset animation on window resize
  window.addEventListener('resize', function () {
    currentStep = 0;
    processSteps.forEach(step => {
      step.classList.remove('animate', 'active');
    });
    processStepsMobile.forEach(step => {
      step.classList.remove('animate');
    });
    if (processLine) {
      processLine.style.width = '0%';
    }
  });

  // Insights Filter Script
  // ---------------------
  const insightFilterButtons = document.querySelectorAll('.insight-filter');
  const insightCards = document.querySelectorAll('.insight-card');
  insightFilterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      insightFilterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('bg-gray-100', 'text-gray-700');
        btn.classList.remove('bg-primary', 'text-white');
      });
      // Add active class to clicked button
      this.classList.add('active');
      this.classList.remove('bg-gray-100', 'text-gray-700');
      this.classList.add('bg-primary', 'text-white');
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      // Filter insights
      insightCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  // Read More functionality
  const readMoreButtons = document.querySelectorAll('.insight-card button');
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Get the article title for optional tracking or logging
      const card = this.closest('.insight-card');
      const title = card.querySelector('h3')?.textContent.trim();

      // Get the URL from the data attribute
      const articleUrl = this.getAttribute('data-url');

      if (articleUrl) {
        // Open the article in a new tab
        window.open(articleUrl, '_blank');
      } else {
        // Fallback if no URL is provided
        alert(`Full article unavailable: "${title}"`);
      }
    });
  });

  // Load More functionality
  const loadMoreInsightsButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Load More Insights'));
  if (loadMoreInsightsButton) {
    loadMoreInsightsButton.addEventListener('click', function () {
      this.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Loading...';
      setTimeout(() => {
        this.innerHTML = 'Load More Insights';
        alert('More insights would be loaded here');
      }, 1500);
    });
  }

  // Moodboard Filter Script
  // ----------------------
  const moodboardFilterButtons = document.querySelectorAll('.moodboard-filter');
  const moodboardItems = document.querySelectorAll('.moodboard-item');
  moodboardFilterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      moodboardFilterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('bg-gray-100', 'text-gray-700');
        btn.classList.remove('bg-primary', 'text-white');
      });
      // Add active class to clicked button
      this.classList.add('active');
      this.classList.remove('bg-gray-100', 'text-gray-700');
      this.classList.add('bg-primary', 'text-white');
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      // Filter moodboard items
      moodboardItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  // Load More Moodboard functionality
  const loadMoreMoodboardButton = document.getElementById('loadMoreMoodboard');
  if (loadMoreMoodboardButton) {
    loadMoreMoodboardButton.addEventListener('click', function () {
      this.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i>Loading more inspiration...';
      setTimeout(() => {
        this.innerHTML = 'Discover More Inspiration';
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
        notification.textContent = 'New inspiration items added!';
        document.body.appendChild(notification);
        // Animate notification in
        setTimeout(() => {
          notification.classList.remove('translate-x-full');
        }, 100);
        // Animate notification out
        setTimeout(() => {
          notification.classList.add('translate-x-full');
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);
      }, 1500);
    });
  }

  // 404 Page Script
  // ---------------
  // Function to show 404 page
  function show404Page() {
    // Hide all sections
    document.querySelectorAll('section:not(#page404)').forEach(section => {
      section.style.display = 'none';
    });
    document.querySelector('nav').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    // Show 404 page
    document.getElementById('page404').classList.remove('hidden');
    // Animate SVG elements
    setTimeout(() => {
      const sketchLines = document.querySelectorAll('.sketch-line');
      sketchLines.forEach((line, index) => {
        setTimeout(() => {
          line.style.animation = 'draw 1s ease-in-out forwards';
        }, index * 200);
      });
    }, 500);
  }
  // Function to hide 404 page and show normal content
  function hide404Page() {
    // Show all sections
    document.querySelectorAll('section:not(#page404)').forEach(section => {
      section.style.display = 'block';
    });
    document.querySelector('nav').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    // Hide 404 page
    document.getElementById('page404').classList.add('hidden');
  }
  // Handle 404 page navigation
  const homeButton = document.querySelector('#page404 a[href="#hero"]');
  const workButton = document.querySelector('#page404 a[href="#work"]');
  if (homeButton) {
    homeButton.addEventListener('click', function (e) {
      e.preventDefault();
      hide404Page();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (workButton) {
    workButton.addEventListener('click', function (e) {
      e.preventDefault();
      hide404Page();
      const workSection = document.getElementById('work');
      if (workSection) {
        window.scrollTo({
          top: workSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  }
  // For demonstration purposes, you can trigger 404 page by adding ?404 to URL
  // In a real implementation, this would be handled by the server
  if (window.location.search.includes('404')) {
    show404Page();
  }

  // Hero Canvas Animation
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.alphaChange = (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1);

        // Pick a star color
        const colors = [
          '255, 255, 255', // White
          '200, 220, 255', // Light Blue
          '255, 240, 200', // Light Yellow
          '180, 200, 255'  // Deep Blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Sparkling effect
        this.alpha += this.alphaChange;
        if (this.alpha <= 0.1 || this.alpha >= 1) {
          this.alphaChange = -this.alphaChange;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Create particles
    for (let i = 0; i < 300; i++) {
      particles.push(new Particle());
    }

    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.2 - distance / 800})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse connection
        if (mouse.x != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(249, 168, 38, ${0.8 - distance / 222})`;
            ctx.lineWidth = 1.0;
            ctx.lineCap = "round";
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Custom Cursor Logic
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (cursor && follower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;
    let isVisible = false;

    document.addEventListener('mousemove', (e) => {
      if (!isVisible) {
        if (window.innerWidth >= 768) {
          document.body.classList.add('custom-cursor-enabled');
          cursor.style.opacity = '1';
          follower.style.opacity = '1';
        }
        isVisible = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateCursor() {
      if (followerX === 0 && followerY === 0) {
        followerX = mouseX;
        followerY = mouseY;
      } else {
        followerX += (mouseX - followerX) * 0.2;
        followerY += (mouseY - followerY) * 0.2;
      }
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const textInputs = document.querySelectorAll('input, textarea');

    textInputs.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
      });
    });

    // Parallax Effect for Cards
    const parallaxCards = document.querySelectorAll('.project-card, .insight-card, .testimonial-card, .value-card');

    parallaxCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt: max 8 degrees
        const tiltX = ((y - centerY) / centerY) * -8;
        const tiltY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease-out';
      });
    });
  }
});
