import { debounce, formatDate } from '../assets/js/utils.js';

class ExperienceComponent {
  constructor() {
    this.experienceSection = null;
    this.timeline = null;
    this.timelineItems = [];
    this.isVisible = false;
    
    // Authentic experience data from Abhijeet's profile
    this.experiences = [
      {
        id: 'srit-2025',
        title: 'Student Research Internship Training (SRIT)',
        organization: 'Marwadi University - Computer Engineering Dept',
        period: 'Jan 2025 (30 days)',
        type: 'research',
        description: 'Completed intensive research internship focused on critical care data analysis and early sepsis detection using federated learning and transformer-based AI models.',
        skills: ['Federated Learning', 'Transformers', 'AI in Healthcare', 'Sepsis Prediction', 'Research Methodology'],
        achievements: [
          'Developed transformer-based AI models for early sepsis detection',
          'Worked with critical care datasets and federated learning techniques',
          'Contributed to shifting clinical workflows from reactive to proactive care',
          'Received mentorship from Dr. Ravikumar R Natarajan and Dr. Sushil Kumar Singh'
        ],
        icon: '🔬'
      },
      {
        id: 'ieee-member-2024',
        title: 'Student Member - Multiple IEEE Societies',
        organization: 'IEEE (Institute of Electrical and Electronics Engineers)',
        period: 'Sep 2024 - Present',
        type: 'leadership',
        description: 'Active member across 9 IEEE societies, contributing to scientific and technological advancement through various specialized domains.',
        skills: ['Leadership', 'Technical Communication', 'Community Building', 'Event Management'],
        achievements: [
          'IEEE Computer Society member',
          'IEEE Broadcast Technology Society member',
          'IEEE Education Society (EdSoc) member',
          'IEEE Electronics Packaging Society member',
          'IEEE Magnetics Society member',
          'IEEE Reliability Society member',
          'IEEE Vehicular Technology Society member',
          'IEEE Women in Engineering member',
          'Web Master role in IEEE activities'
        ],
        societies: [
          'Computer Society', 'Broadcast Technology Society', 'Education Society',
          'Electronics Packaging Society', 'Magnetics Society', 'Reliability Society',
          'Vehicular Technology Society', 'Women in Engineering'
        ],
        icon: '⚡'
      },
      {
        id: 'poshan-tech-lead',
        title: 'Technical Specialist & Tech Lead',
        organization: 'POSHAN',
        period: 'Sep 2024 - Jan 2025',
        type: 'work',
        description: 'Led all technology infrastructure aspects for sustainability-focused startup. Managed everything from digital presence to implementing tech solutions aligned with environmental mission.',
        skills: ['Technical Leadership', 'Web Development', 'Project Management', 'Sustainability Tech', 'Team Management'],
        achievements: [
          'Designed and developed complete technology infrastructure',
          'Managed website development and digital presence',
          'Led dynamic team of young professionals',
          'Implemented tech solutions for environmental impact',
          'Balanced innovation with sustainability goals'
        ],
        icon: '🌱'
      },
      {
        id: 'ar-vr-workshop',
        title: 'AR/VR Workshop Participant',
        organization: 'Snap Inc. & Bharat XR Partnership',
        period: 'Aug 2024',
        type: 'learning',
        description: 'Participated in comprehensive AR workshop led by Chhavi Garg (Arexa co-founder). Developed skills in Snapchat filter creation and object-based AR applications.',
        skills: ['Augmented Reality', 'Lens Studio', 'Snapchat Filters', 'Computer Vision', 'Creative Development'],
        achievements: [
          'Created image tracking filters on Snapchat',
          'Developed object-based filter with animation triggers',
          'Learned commercial AR development techniques',
          'Gained hands-on experience with Lens Studio and Easy Lens tools'
        ],
        icon: '🥽'
      },
      {
        id: 'circuitology-workshop',
        title: 'NE 555 Timer IC Workshop',
        organization: 'Circuitology Club - Marwadi University',
        period: 'Jul 2024',
        type: 'learning',
        description: 'Hands-on electronics workshop focusing on 555 Timer IC applications. Built multiple projects demonstrating circuit design and embedded systems concepts.',
        skills: ['Circuit Design', 'Electronics', 'Embedded Systems', 'Hardware Prototyping', 'Team Collaboration'],
        achievements: [
          'Built automation street light system',
          'Created adjustable flashing LED circuits',
          'Developed machine gun sound generator',
          'Collaborated effectively in team-based projects'
        ],
        icon: '🔌'
      }
    ];
    
    this.init();
  }

  init() {
    this.experienceSection = document.getElementById('experience');
    if (!this.experienceSection) {
      console.error('Experience section not found');
      return;
    }

    this.timeline = this.experienceSection.querySelector('#experience-timeline');
    if (!this.timeline) {
      console.error('Experience timeline not found');
      return;
    }

    this.renderTimeline();
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupInteractiveElements();
  }

  renderTimeline() {
    this.timeline.innerHTML = '';
    
    this.experiences.forEach((experience, index) => {
      const timelineItem = this.createTimelineItem(experience, index);
      this.timeline.appendChild(timelineItem);
      this.timelineItems.push(timelineItem);
    });

    // Add timeline connector line
    const connector = document.createElement('div');
    connector.className = 'timeline-connector';
    connector.innerHTML = `
      <div class="timeline-line"></div>
      <div class="timeline-progress"></div>
    `;
    this.timeline.appendChild(connector);
  }

  createTimelineItem(experience, index) {
    const item = document.createElement('div');
    item.className = `timeline-item ${experience.type} fade-in`;
    item.dataset.index = index;
    item.dataset.delay = index * 0.2;
    
    const typeColors = {
      research: 'var(--color-primary)',
      leadership: 'var(--color-secondary)',
      work: 'var(--color-accent)',
      learning: '#10b981'
    };

    item.innerHTML = `
      <div class="timeline-marker">
        <div class="timeline-icon" style="background: ${typeColors[experience.type]}">
          ${experience.icon}
        </div>
        <div class="timeline-pulse"></div>
      </div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h3 class="timeline-title">${experience.title}</h3>
          <span class="timeline-period">${experience.period}</span>
        </div>
        <div class="timeline-organization">${experience.organization}</div>
        <div class="timeline-description">${experience.description}</div>
        
        ${experience.societies ? `
          <div class="timeline-societies">
            <h4>IEEE Societies:</h4>
            <div class="society-tags">
              ${experience.societies.map(society => 
                `<span class="society-tag">${society}</span>`
              ).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="timeline-skills">
          ${experience.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
          ).join('')}
        </div>
        
        <div class="timeline-achievements">
          <h4>Key Achievements:</h4>
          <ul>
            ${experience.achievements.map(achievement => 
              `<li>${achievement}</li>`
            ).join('')}
          </ul>
        </div>
        
        <button class="timeline-expand" aria-label="Expand details">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    `;

    return item;
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.animateTimeline();
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.experienceSection);

    // Individual timeline items observer
    this.itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            entry.target.classList.add('visible');
            this.animateTimelineItem(entry.target, index);
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    this.timelineItems.forEach(item => {
      this.itemObserver.observe(item);
    });
  }

  setupScrollAnimations() {
    const handleScroll = debounce(() => {
      if (!this.isVisible) return;
      
      this.updateTimelineProgress();
      this.updateParallaxEffects();
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  setupInteractiveElements() {
    // Expand/collapse functionality
    this.timeline.addEventListener('click', (e) => {
      if (e.target.closest('.timeline-expand')) {
        const timelineItem = e.target.closest('.timeline-item');
        this.toggleTimelineItem(timelineItem);
      }
    });

    // Hover effects for timeline items
    this.timelineItems.forEach(item => {
      const marker = item.querySelector('.timeline-marker');
      const content = item.querySelector('.timeline-content');
      
      item.addEventListener('mouseenter', () => {
        marker.classList.add('hover');
        content.style.transform = 'translateX(10px)';
        this.createHoverEffect(marker);
      });

      item.addEventListener('mouseleave', () => {
        marker.classList.remove('hover');
        content.style.transform = 'translateX(0)';
      });
    });
  }

  animateTimeline() {
    // Animate timeline connector
    const connector = this.timeline.querySelector('.timeline-line');
    if (connector) {
      connector.style.height = '0';
      connector.style.transition = 'height 2s ease-in-out 0.5s';
      
      setTimeout(() => {
        connector.style.height = '100%';
      }, 100);
    }

    // Animate section header
    const sectionHeader = this.experienceSection.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.classList.add('visible');
    }
  }

  animateTimelineItem(item, index) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    const icon = item.querySelector('.timeline-icon');
    
    // Animate marker
    if (marker) {
      marker.style.transform = 'scale(0) rotate(180deg)';
      marker.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        marker.style.transform = 'scale(1) rotate(0deg)';
        
        // Add pulse animation
        setTimeout(() => {
          marker.classList.add('pulse');
        }, 300);
      }, 100);
    }

    // Animate content
    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateX(-30px)';
      content.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
      
      setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
      }, 200);
    }

    // Animate skills with stagger
    const skillTags = item.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, tagIndex) => {
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0)';
      
      setTimeout(() => {
        tag.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
      }, 800 + (tagIndex * 100));
    });
  }

  toggleTimelineItem(item) {
    const achievements = item.querySelector('.timeline-achievements');
    const expandBtn = item.querySelector('.timeline-expand');
    const isExpanded = item.classList.contains('expanded');

    if (isExpanded) {
      // Collapse
      item.classList.remove('expanded');
      achievements.style.maxHeight = '0';
      achievements.style.opacity = '0';
      expandBtn.style.transform = 'rotate(0deg)';
    } else {
      // Expand
      item.classList.add('expanded');
      achievements.style.maxHeight = achievements.scrollHeight + 'px';
      achievements.style.opacity = '1';
      expandBtn.style.transform = 'rotate(180deg)';
    }

    // Add expand animation
    this.createExpandAnimation(item);
  }

  updateTimelineProgress() {
    const progress = this.timeline.querySelector('.timeline-progress');
    if (!progress) return;

    const timelineRect = this.timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate visible portion of timeline
    const visibleTop = Math.max(0, -timelineRect.top);
    const visibleBottom = Math.min(timelineRect.height, windowHeight - timelineRect.top);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    
    const progressPercent = (visibleHeight / timelineRect.height) * 100;
    progress.style.height = `${Math.min(progressPercent, 100)}%`;
  }

  updateParallaxEffects() {
    const scrolled = window.pageYOffset;
    
    this.timelineItems.forEach((item, index) => {
      const rate = (index % 2 === 0 ? 0.1 : -0.1) * scrolled * 0.5;
      item.style.transform = `translateY(${rate}px)`;
    });
  }

  createHoverEffect(marker) {
    const ripple = document.createElement('div');
    ripple.className = 'timeline-ripple';
    marker.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  createExpandAnimation(item) {
    const content = item.querySelector('.timeline-content');
    content.style.animation = 'expandPulse 0.4s ease-out';
    
    setTimeout(() => {
      content.style.animation = '';
    }, 400);
  }

  // Public API methods
  highlightExperience(id) {
    const item = this.timeline.querySelector(`[data-id="${id}"]`);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      item.classList.add('highlight');
      
      setTimeout(() => {
        item.classList.remove('highlight');
      }, 3000);
    }
  }

  addExperience(experience) {
    this.experiences.unshift(experience);
    this.renderTimeline();
  }

  getExperiences() {
    return this.experiences;
  }

  handleResize() {
    this.updateTimelineProgress();
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.itemObserver) {
      this.itemObserver.disconnect();
    }

    window.removeEventListener('scroll', this.updateTimelineProgress);
  }
}

// Add experience-specific CSS
const experienceStyles = document.createElement('style');
experienceStyles.textContent = `
  .timeline-item {
    display: flex;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .timeline-marker {
    position: relative;
    flex-shrink: 0;
    margin-right: 2rem;
    z-index: 2;
  }

  .timeline-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .timeline-marker.hover .timeline-icon {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }

  .timeline-pulse {
    position: absolute;
    inset: -10px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    opacity: 0;
  }

  .timeline-marker.pulse .timeline-pulse {
    animation: timelinePulse 2s ease-out;
  }

  .timeline-content {
    flex: 1;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .timeline-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: var(--color-text-primary);
  }

  .timeline-period {
    font-size: 0.875rem;
    color: var(--color-primary);
    font-weight: 500;
    background: rgba(99, 102, 241, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
  }

  .timeline-organization {
    font-weight: 500;
    color: var(--color-secondary);
    margin-bottom: 1rem;
  }

  .timeline-description {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
  }

  .timeline-societies {
    margin-bottom: 1rem;
  }

  .timeline-societies h4 {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
  }

  .society-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .society-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: var(--color-secondary);
    color: white;
    border-radius: var(--radius-sm);
    font-weight: 500;
  }

  .timeline-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .skill-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: rgba(99, 102, 241, 0.1);
    color: var(--color-primary);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: var(--radius-sm);
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .skill-tag:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-1px);
  }

  .timeline-achievements {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .timeline-item.expanded .timeline-achievements {
    max-height: 300px;
    opacity: 1;
  }

  .timeline-achievements h4 {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
  }

  .timeline-achievements ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .timeline-achievements li {
    padding: 0.25rem 0;
    padding-left: 1rem;
    position: relative;
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }

  .timeline-achievements li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-weight: bold;
  }

  .timeline-expand {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--color-primary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .timeline-expand:hover {
    background: var(--color-primary);
    color: white;
    transform: scale(1.1);
  }

  .timeline-connector {
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    z-index: 1;
  }

  .timeline-line {
    width: 100%;
    background: var(--color-border);
    height: 100%;
    position: relative;
  }

  .timeline-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
    height: 0%;
    transition: height 0.3s ease;
  }

  .timeline-ripple {
    position: absolute;
    inset: -15px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    opacity: 0.7;
    animation: rippleEffect 0.6s ease-out;
  }

  .timeline-item.highlight {
    animation: highlight 2s ease-in-out;
  }

  @keyframes timelinePulse {
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.2); opacity: 0.3; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  @keyframes rippleEffect {
    from { transform: scale(0); opacity: 0.7; }
    to { transform: scale(1.5); opacity: 0; }
  }

  @keyframes expandPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  @keyframes highlight {
    0%, 100% { background: transparent; }
    50% { background: rgba(99, 102, 241, 0.1); }
  }

  @media (max-width: 768px) {
    .timeline-item {
      flex-direction: column;
      margin-bottom: 2rem;
    }

    .timeline-marker {
      margin-right: 0;
      margin-bottom: 1rem;
      align-self: flex-start;
    }

    .timeline-connector {
      display: none;
    }

    .timeline-header {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

document.head.appendChild(experienceStyles);

// Initialize experience component
export function initExperience() {
  return new Promise((resolve) => {
    const experience = new ExperienceComponent();
    resolve(experience);
  });
}

export default ExperienceComponent;
