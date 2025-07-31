// Mobile Menu Script
// ------------------
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  menuButton.addEventListener('click', function() {
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
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      menuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
    });
  });

  // Portfolio Filter Script
  // ----------------------
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
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
      alert('Project link not found.');
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
  document.querySelectorAll('section, .project-card, .value-card').forEach(el => {
    el.classList.add('section-fade');
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
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
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
    form.addEventListener('submit', function(e) {
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

  // Download Script
  // ---------------
  // Since :contains is not a valid CSS selector, we'll find buttons by their text content
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button => {
    if (button.textContent.includes('Download PDF')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        // Determine which document to download based on parent content
        const parentText = this.closest('.flex').querySelector('h4').textContent;
        let filename = '';
        let message = '';
        if (parentText.includes('Resume')) {
          filename = 'Resume.pdf';
          message = 'Resume download started...';
        } else if (parentText.includes('Media Kit')) {
          filename = 'Mediakit.pdf';
          message = 'Media Kit download started...';
        }

         // Trigger actual download
        const link = document.createElement('a');
        link.href = filename; // Assumes file is in the same directory or accessible path
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show download feedback
        const originalText = this.textContent;
        this.textContent = 'Downloading...';
        this.disabled = true;
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
        notification.textContent = message;
        document.body.appendChild(notification);
        // Animate notification in
        setTimeout(() => {
          notification.classList.remove('translate-x-full');
        }, 100);
        // Simulate download process
        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
          // Animate notification out
          notification.classList.add('translate-x-full');
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
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
    step.addEventListener('mouseenter', function() {
      // Remove active class from all steps
      processSteps.forEach(s => s.classList.remove('active'));
      // Add active class to hovered step
      this.classList.add('active');
    });
  });
  // Reset animation on window resize
  window.addEventListener('resize', function() {
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
    button.addEventListener('click', function() {
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
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // In a real implementation, this would open the full article
      const title = this.closest('.insight-card').querySelector('h3').textContent;
      alert(`Opening full article: "${title}"`);
    });
  });
  // Load More functionality
  const loadMoreInsightsButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Load More Insights'));
  if (loadMoreInsightsButton) {
    loadMoreInsightsButton.addEventListener('click', function() {
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
    button.addEventListener('click', function() {
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
    loadMoreMoodboardButton.addEventListener('click', function() {
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
    homeButton.addEventListener('click', function(e) {
      e.preventDefault();
      hide404Page();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (workButton) {
    workButton.addEventListener('click', function(e) {
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
});
