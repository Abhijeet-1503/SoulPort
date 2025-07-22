import { debounce, formatDate } from '../assets/js/utils.js';

class ProjectsComponent {
  constructor() {
    this.projectsSection = null;
    this.projectsGrid = null;
    this.projects = [];
    this.filteredProjects = [];
    this.currentFilter = 'all';
    this.isVisible = false;
    
    // Authentic project data based on Abhijeet's research and experience
    this.projectData = [
      {
        id: 'sepsis-detection-ai',
        title: 'Early Sepsis Detection using Federated Learning',
        category: 'research',
        type: 'AI Research',
        period: 'Jan 2025',
        description: 'Transformer-based AI models for early sepsis detection in critical care using federated learning techniques. Part of SRIT program at Marwadi University.',
        longDescription: 'Developed advanced machine learning models to predict sepsis onset in critical care patients, shifting from reactive treatment to proactive prevention. Utilized federated learning to maintain data privacy while improving model accuracy across multiple healthcare institutions.',
        technologies: ['Python', 'TensorFlow', 'Transformers', 'Federated Learning', 'Healthcare AI', 'Critical Care Data'],
        features: [
          'Real-time sepsis risk assessment',
          'Federated learning implementation for data privacy',
          'Transformer architecture for sequence modeling',
          'Clinical workflow integration',
          'Multi-institutional validation'
        ],
        impact: 'Potential to revolutionize critical care by enabling early intervention and reducing sepsis mortality rates',
        status: 'completed',
        github: null, // Research project, may not be public
        demo: null,
        paper: 'In preparation for publication',
        mentors: ['Dr. Ravikumar R Natarajan', 'Dr. Sushil Kumar Singh'],
        institution: 'Marwadi University - Computer Engineering Department',
        image: '🏥',
        color: '#ef4444'
      },
      {
        id: 'ar-filters-snapchat',
        title: 'Interactive AR Filters & Object Detection',
        category: 'ar-vr',
        type: 'Augmented Reality',
        period: 'Aug 2024',
        description: 'Created multiple AR filters for Snapchat including image tracking and object-based animations using Lens Studio and generative AI tools.',
        longDescription: 'Developed sophisticated AR experiences combining computer vision, animation, and creative design. Explored commercial applications of AR technology and learned advanced techniques for filter creation.',
        technologies: ['Lens Studio', 'Easy Lens', 'Computer Vision', 'Generative AI', 'AR Development', 'Animation'],
        features: [
          'Image tracking filter with AI-generated animations',
          'Object-based filter with trigger animations',
          'Real-time computer vision processing',
          'Commercial-ready filter deployment',
          'Creative animation integration'
        ],
        impact: 'Gained hands-on experience with commercial AR development and published filters on Snapchat platform',
        status: 'completed',
        github: null, // AR filters are platform-specific
        demo: 'Published on Snapchat',
        collaboration: 'Snap Inc. & Bharat XR Partnership',
        mentor: 'Chhavi Garg (Arexa co-founder)',
        image: '🥽',
        color: '#f59e0b'
      },
      {
        id: 'circuit-automation-projects',
        title: 'NE 555 Timer IC Circuit Projects',
        category: 'hardware',
        type: 'Electronics & Hardware',
        period: 'Jul 2024',
        description: 'Built multiple circuit projects including automation street light, adjustable LED circuits, and sound generator using NE 555 Timer IC.',
        longDescription: 'Hands-on electronics workshop where I designed and built practical circuits demonstrating embedded systems concepts. Collaborated with team members to create innovative solutions using fundamental electronic components.',
        technologies: ['NE 555 Timer IC', 'Circuit Design', 'Electronics Prototyping', 'Embedded Systems', 'Hardware Design'],
        features: [
          'Automation street light with light sensor',
          'Adjustable flashing LED circuits with variable timing',
          'Machine gun sound generator with audio output',
          'Team-based collaborative development',
          'Real-world circuit testing and debugging'
        ],
        impact: 'Strengthened foundation in electronics and circuit design, enabling future embedded systems projects',
        status: 'completed',
        github: null, // Hardware project
        demo: 'Physical prototypes demonstrated',
        collaborators: ['Garima Singh', 'Devarsh Bhatt'],
        organization: 'Circuitology Club - Marwadi University',
        image: '🔌',
        color: '#10b981'
      },
      {
        id: 'web-development-bootcamp',
        title: '4-Week Web Development Bootcamp',
        category: 'web',
        type: 'Web Development',
        period: 'Nov 2024',
        description: 'Organized and promoted comprehensive web development bootcamp covering modern web technologies, AI tools, and deployment strategies.',
        longDescription: 'Led community initiative to teach web development from scratch, incorporating modern practices like AI-assisted development, GitHub workflows, and live portfolio hosting. Focused on practical, project-based learning.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GitHub', 'AI Development Tools', 'Web Hosting', 'Community Building'],
        features: [
          'Beginner-friendly curriculum design',
          'Integration of AI tools for faster learning',
          'Live portfolio development and hosting',
          'GitHub Student Pack utilization',
          'Community-driven learning environment',
          'Certificate program completion'
        ],
        impact: 'Enabled multiple students to build their first websites and join the web development community',
        status: 'completed',
        github: 'https://classroom.google.com',
        demo: 'Google Classroom: xsuopfco',
        organizer: 'Joshua Olugotun',
        participants: '50+ students',
        image: '💻',
        color: '#6366f1'
      },
      {
        id: 'techbridge-community',
        title: 'TechBridge Community Events',
        category: 'community',
        type: 'Community Building',
        period: 'Feb 2025',
        description: 'Co-organized TechBridge events focusing on Generative AI, Open Source contributions, GSOC preparation, and Agentic AI development.',
        longDescription: 'Built and managed tech community at Marwadi University, organizing events that bridge academic learning with industry practices. Focused on emerging technologies and career development for engineering students.',
        technologies: ['Event Management', 'Community Building', 'Generative AI', 'Open Source', 'GSOC Mentoring', 'Agentic AI'],
        features: [
          'Multi-speaker technical events',
          'Open source contribution workshops',
          'GSOC preparation and mentoring',
          'Generative AI practical sessions',
          'Career roadmap guidance',
          'WhatsApp community management'
        ],
        impact: 'Created lasting tech community connecting students with industry opportunities and open source projects',
        status: 'ongoing',
        github: null,
        demo: 'WhatsApp Channel: TechBridge',
        coordinators: ['Joshua Olugotun', 'Kshitij Varma', 'Parv Pareek'],
        venue: 'Marwadi University - PG Building',
        image: '🌉',
        color: '#8b5cf6'
      },
      {
        id: 'poshan-tech-infrastructure',
        title: 'POSHAN Startup Technology Infrastructure',
        category: 'startup',
        type: 'Full-Stack Development',
        period: 'Sep 2024 - Jan 2025',
        description: 'Designed and implemented complete technology infrastructure for sustainability-focused startup, including website development and digital presence management.',
        longDescription: 'Led technology development for innovative startup focused on environmental sustainability. Managed all aspects from initial design concepts to full-scale implementation, balancing technical excellence with sustainability goals.',
        technologies: ['Full-Stack Development', 'Web Technologies', 'Digital Marketing', 'Startup Operations', 'Sustainability Tech'],
        features: [
          'Complete website design and development',
          'Digital presence strategy and implementation',
          'Technology infrastructure planning',
          'Team leadership and coordination',
          'Sustainability-focused tech solutions'
        ],
        impact: 'Enabled startup to establish strong digital foundation and technical capabilities for scaling environmental impact',
        status: 'completed',
        github: null, // Proprietary startup code
        demo: null,
        role: 'Tech Lead & Technical Specialist',
        team: 'Dynamic group of young professionals',
        focus: 'Environmental sustainability',
        image: '🌱',
        color: '#059669'
      }
    ];
    
    this.init();
  }

  init() {
    this.projectsSection = document.getElementById('projects');
    if (!this.projectsSection) {
      console.error('Projects section not found');
      return;
    }

    this.projectsGrid = this.projectsSection.querySelector('#projects-grid');
    if (!this.projectsGrid) {
      console.error('Projects grid not found');
      return;
    }

    this.projects = [...this.projectData];
    this.filteredProjects = [...this.projects];
    
    this.setupFilterSystem();
    this.renderProjects();
    this.setupIntersectionObserver();
    this.setupInteractiveElements();
    this.setupModalSystem();
  }

  setupFilterSystem() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'projects-filters';
    
    const filters = [
      { id: 'all', label: 'All Projects', count: this.projects.length },
      { id: 'research', label: 'Research', count: this.projects.filter(p => p.category === 'research').length },
      { id: 'ar-vr', label: 'AR/VR', count: this.projects.filter(p => p.category === 'ar-vr').length },
      { id: 'web', label: 'Web Dev', count: this.projects.filter(p => p.category === 'web').length },
      { id: 'hardware', label: 'Hardware', count: this.projects.filter(p => p.category === 'hardware').length },
      { id: 'community', label: 'Community', count: this.projects.filter(p => p.category === 'community').length },
      { id: 'startup', label: 'Startup', count: this.projects.filter(p => p.category === 'startup').length }
    ];

    filtersContainer.innerHTML = `
      <div class="filter-buttons">
        ${filters.map(filter => `
          <button class="filter-btn ${filter.id === 'all' ? 'active' : ''}" 
                  data-filter="${filter.id}">
            <span class="filter-label">${filter.label}</span>
            <span class="filter-count">${filter.count}</span>
          </button>
        `).join('')}
      </div>
    `;

    // Insert filters before projects grid
    this.projectsGrid.parentNode.insertBefore(filtersContainer, this.projectsGrid);

    // Setup filter event listeners
    filtersContainer.addEventListener('click', (e) => {
      if (e.target.closest('.filter-btn')) {
        const filterBtn = e.target.closest('.filter-btn');
        const filterId = filterBtn.dataset.filter;
        this.setActiveFilter(filterId);
      }
    });
  }

  renderProjects() {
    this.projectsGrid.innerHTML = '';
    
    this.filteredProjects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project, index);
      this.projectsGrid.appendChild(projectCard);
    });

    // Setup intersection observer for new cards
    this.observeProjectCards();
  }

  createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = `project-card ${project.category} fade-in`;
    card.dataset.index = index;
    card.dataset.category = project.category;
    card.dataset.projectId = project.id;
    
    card.innerHTML = `
      <div class="project-visual">
        <div class="project-icon" style="background: ${project.color}">
          ${project.image}
        </div>
        <div class="project-status ${project.status}">
          ${project.status === 'completed' ? '✅' : '🔄'}
        </div>
      </div>
      
      <div class="project-content">
        <div class="project-header">
          <div class="project-type">${project.type}</div>
          <div class="project-period">${project.period}</div>
        </div>
        
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        
        <div class="project-tech">
          ${project.technologies.slice(0, 4).map(tech => 
            `<span class="tech-tag">${tech}</span>`
          ).join('')}
          ${project.technologies.length > 4 ? 
            `<span class="tech-more">+${project.technologies.length - 4}</span>` : ''
          }
        </div>
        
        <div class="project-impact">
          <span class="impact-label">Impact:</span>
          <span class="impact-text">${project.impact}</span>
        </div>
      </div>
      
      <div class="project-actions">
        ${project.github ? 
          `<a href="${project.github}" target="_blank" class="project-link github" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>` : ''
        }
        ${project.demo ? 
          `<a href="${project.demo}" target="_blank" class="project-link demo" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10,8 16,12 10,16 10,8"></polygon>
            </svg>
          </a>` : ''
        }
        <button class="project-details" data-project-id="${project.id}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
          </svg>
        </button>
      </div>
    `;

    return card;
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.projectsSection);
  }

  observeProjectCards() {
    const cards = this.projectsGrid.querySelectorAll('.project-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
            this.animateProjectCard(entry.target);
          }, index * 100);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => {
      cardObserver.observe(card);
    });
  }

  setupInteractiveElements() {
    // Project card hover effects
    this.projectsGrid.addEventListener('mouseenter', (e) => {
      if (e.target.closest('.project-card')) {
        this.animateCardHover(e.target.closest('.project-card'), true);
      }
    }, true);

    this.projectsGrid.addEventListener('mouseleave', (e) => {
      if (e.target.closest('.project-card')) {
        this.animateCardHover(e.target.closest('.project-card'), false);
      }
    }, true);

    // Project details click
    this.projectsGrid.addEventListener('click', (e) => {
      if (e.target.closest('.project-details')) {
        const projectId = e.target.closest('.project-details').dataset.projectId;
        this.showProjectModal(projectId);
      }
    });

    // Link tracking
    this.projectsGrid.addEventListener('click', (e) => {
      if (e.target.closest('.project-link')) {
        const linkType = e.target.closest('.project-link').classList.contains('github') ? 'github' : 'demo';
        const projectId = e.target.closest('.project-card').dataset.projectId;
        this.trackLinkClick(projectId, linkType);
      }
    });
  }

  setupModalSystem() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="modal-body">
          <!-- Dynamic content will be inserted here -->
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);

    // Modal event listeners
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') || 
          e.target.closest('.modal-close')) {
        this.closeProjectModal();
      }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeProjectModal();
      }
    });

    this.modal = modal;
  }

  setActiveFilter(filterId) {
    this.currentFilter = filterId;
    
    // Update filter button states
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterId);
    });

    // Filter projects
    if (filterId === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => 
        project.category === filterId
      );
    }

    // Animate filter transition
    this.animateFilterTransition();
  }

  animateFilterTransition() {
    const cards = Array.from(this.projectsGrid.children);
    
    // Fade out current cards
    cards.forEach((card, index) => {
      card.style.animation = `slideOut 0.3s ease-in-out ${index * 0.05}s forwards`;
    });

    // Render new cards after animation
    setTimeout(() => {
      this.renderProjects();
    }, 400);
  }

  animateProjectCard(card) {
    const elements = [
      card.querySelector('.project-visual'),
      card.querySelector('.project-content'),
      card.querySelector('.project-actions')
    ];

    elements.forEach((element, index) => {
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 50);
      }
    });
  }

  animateCardHover(card, isHovering) {
    const visual = card.querySelector('.project-visual');
    const content = card.querySelector('.project-content');
    const actions = card.querySelector('.project-actions');

    if (isHovering) {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      
      if (visual) {
        visual.querySelector('.project-icon').style.transform = 'scale(1.1) rotate(5deg)';
      }
      
      if (actions) {
        actions.style.opacity = '1';
        actions.style.transform = 'translateY(0)';
      }
    } else {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
      
      if (visual) {
        visual.querySelector('.project-icon').style.transform = 'scale(1) rotate(0deg)';
      }
      
      if (actions) {
        actions.style.opacity = '0.7';
        actions.style.transform = 'translateY(5px)';
      }
    }
  }

  showProjectModal(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    const modalBody = this.modal.querySelector('.modal-body');
    modalBody.innerHTML = `
      <div class="modal-header">
        <div class="modal-icon" style="background: ${project.color}">
          ${project.image}
        </div>
        <div class="modal-title-section">
          <h2 class="modal-title">${project.title}</h2>
          <div class="modal-meta">
            <span class="modal-type">${project.type}</span>
            <span class="modal-period">${project.period}</span>
            <span class="modal-status ${project.status}">${project.status}</span>
          </div>
        </div>
      </div>

      <div class="modal-description">
        <p>${project.longDescription}</p>
      </div>

      <div class="modal-technologies">
        <h3>Technologies Used</h3>
        <div class="tech-grid">
          ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>

      <div class="modal-features">
        <h3>Key Features</h3>
        <ul class="features-list">
          ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>

      ${project.mentors ? `
        <div class="modal-mentors">
          <h3>Mentors & Guidance</h3>
          <div class="mentors-list">
            ${project.mentors.map(mentor => `<span class="mentor-tag">${mentor}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${project.collaborators ? `
        <div class="modal-collaborators">
          <h3>Collaborators</h3>
          <div class="collaborators-list">
            ${project.collaborators.map(collab => `<span class="collaborator-tag">${collab}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <div class="modal-impact">
        <h3>Impact & Outcomes</h3>
        <p class="impact-description">${project.impact}</p>
      </div>

      <div class="modal-actions">
        ${project.github ? 
          `<a href="${project.github}" target="_blank" class="modal-btn github" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View Code
          </a>` : ''
        }
        ${project.demo ? 
          `<a href="${project.demo}" target="_blank" class="modal-btn demo" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10,8 16,12 10,16 10,8"></polygon>
            </svg>
            View Demo
          </a>` : ''
        }
        ${project.paper ? 
          `<div class="modal-paper">
            <span class="paper-status">${project.paper}</span>
          </div>` : ''
        }
      </div>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Track modal view
    this.trackModalView(projectId);
  }

  closeProjectModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  trackLinkClick(projectId, linkType) {
    console.log(`Link clicked: ${projectId} - ${linkType}`);
    // Add analytics tracking here
  }

  trackModalView(projectId) {
    console.log(`Modal viewed: ${projectId}`);
    // Add analytics tracking here
  }

  // Public API methods
  filterProjects(category) {
    this.setActiveFilter(category);
  }

  addProject(project) {
    this.projects.unshift(project);
    if (this.currentFilter === 'all' || this.currentFilter === project.category) {
      this.filteredProjects.unshift(project);
      this.renderProjects();
    }
  }

  updateProject(projectId, updates) {
    const projectIndex = this.projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      this.projects[projectIndex] = { ...this.projects[projectIndex], ...updates };
      this.renderProjects();
    }
  }

  getProjects() {
    return this.projects;
  }

  handleResize() {
    // Recalculate grid layout if needed
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
  }
}

// Add project-specific CSS
const projectsStyles = document.createElement('style');
projectsStyles.textContent = `
  .projects-filters {
    margin-bottom: 3rem;
  }

  .filter-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-full);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .filter-btn:hover,
  .filter-btn.active {
    background: var(--color-primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  }

  .filter-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(40px);
  }

  .project-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .project-visual {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .project-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    transition: all 0.3s ease;
  }

  .project-status {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .project-status.completed {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .project-status.ongoing {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .project-type {
    font-size: 0.875rem;
    color: var(--color-primary);
    font-weight: 600;
  }

  .project-period {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }

  .project-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
    line-height: 1.3;
  }

  .project-description {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tech-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: rgba(99, 102, 241, 0.1);
    color: var(--color-primary);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: var(--radius-sm);
    font-weight: 500;
  }

  .tech-more {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: var(--color-text-muted);
    color: white;
    border-radius: var(--radius-sm);
    font-weight: 500;
  }

  .project-impact {
    margin-bottom: 1.5rem;
  }

  .impact-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .impact-text {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin-top: 0.25rem;
    display: block;
  }

  .project-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    opacity: 0.7;
    transform: translateY(5px);
    transition: all 0.3s ease;
  }

  .project-link,
  .project-details {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .project-link.github {
    background: #333;
    color: white;
  }

  .project-link.demo {
    background: var(--color-secondary);
    color: white;
  }

  .project-details {
    background: var(--color-primary);
    color: white;
  }

  .project-link:hover,
  .project-details:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  /* Modal Styles */
  .project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .project-modal.active {
    opacity: 1;
    visibility: visible;
  }

  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
  }

  .modal-content {
    position: relative;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2xl);
    max-width: 800px;
    max-height: 90vh;
    width: 90%;
    overflow-y: auto;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    color: var(--color-text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .modal-close:hover {
    background: var(--color-primary);
    color: white;
    transform: scale(1.1);
  }

  .modal-body {
    padding: 2rem;
  }

  .modal-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .modal-icon {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    flex-shrink: 0;
  }

  .modal-title-section {
    flex: 1;
  }

  .modal-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
  }

  .modal-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .modal-type,
  .modal-period,
  .modal-status {
    font-size: 0.875rem;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-weight: 500;
  }

  .modal-type {
    background: rgba(99, 102, 241, 0.1);
    color: var(--color-primary);
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .modal-period {
    background: var(--color-surface);
    color: var(--color-text-secondary);
  }

  .modal-description {
    margin-bottom: 2rem;
  }

  .modal-description p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
  }

  .modal-technologies,
  .modal-features,
  .modal-mentors,
  .modal-collaborators,
  .modal-impact {
    margin-bottom: 2rem;
  }

  .modal-technologies h3,
  .modal-features h3,
  .modal-mentors h3,
  .modal-collaborators h3,
  .modal-impact h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
  }

  .tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-badge {
    padding: 0.375rem 0.75rem;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .features-list {
    list-style: none;
    padding: 0;
  }

  .features-list li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: var(--color-text-secondary);
  }

  .features-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-weight: bold;
  }

  .mentors-list,
  .collaborators-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .mentor-tag,
  .collaborator-tag {
    padding: 0.375rem 0.75rem;
    background: var(--color-secondary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .impact-description {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    font-style: italic;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .modal-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .modal-btn.github {
    background: #333;
    color: white;
  }

  .modal-btn.demo {
    background: var(--color-secondary);
    color: white;
  }

  .modal-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  .modal-paper {
    flex: 1;
  }

  .paper-status {
    font-style: italic;
    color: var(--color-text-secondary);
  }

  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateY(-20px) scale(0.9);
    }
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .modal-content {
      width: 95%;
      max-height: 95vh;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-header {
      flex-direction: column;
      text-align: center;
    }

    .filter-buttons {
      gap: 0.5rem;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  }
`;

document.head.appendChild(projectsStyles);

// Initialize projects component
export function initProjects() {
  return new Promise((resolve) => {
    const projects = new ProjectsComponent();
    resolve(projects);
  });
}

export default ProjectsComponent;
