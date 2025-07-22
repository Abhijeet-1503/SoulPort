import { debounce, formatNumber, formatDate } from '../assets/js/utils.js';

class LiveComponent {
  constructor() {
    this.liveSection = null;
    this.metricsContainer = null;
    this.feedContainer = null;
    this.isVisible = false;
    this.updateInterval = null;
    this.animationFrameId = null;
    
    // Real LinkedIn activity data from Abhijeet's profile
    this.linkedinData = [
      {
        id: 'srit-completion-2025',
        type: 'achievement',
        title: 'SRIT Completion - Early Sepsis Detection Research',
        content: 'Successfully completed the Student Research Internship Training (SRIT) organized by the Department of Computer Engineering at Marwadi University. Worked on critical care data analysis and early sepsis detection using federated learning and transformer-based AI models.',
        timestamp: '2025-01-15T10:00:00Z',
        engagement: {
          likes: 63,
          comments: 3,
          impressions: 1462
        },
        tags: ['Research', 'FederatedLearning', 'Transformers', 'AIinHealthcare', 'SepsisPrediction', 'MarwadiUniversity', 'SRIT2025']
      },
      {
        id: 'web-bootcamp-2024',
        type: 'community',
        title: '4-Week Web Development Bootcamp',
        content: 'Organizing a comprehensive web development bootcamp starting Monday! 🚀 Build websites from scratch, use AI tools to learn faster, host your live portfolio. Join Google Classroom with code: xsuopfco',
        timestamp: '2024-11-20T14:30:00Z',
        engagement: {
          likes: 20,
          comments: 0,
          impressions: 876
        },
        tags: ['WebDevelopment', 'AI', 'Learning', 'Community', 'Bootcamp']
      },
      {
        id: 'techbridge-launch',
        type: 'event',
        title: 'TechBridge: Open Source & Agentic AI Event',
        content: 'Launching TechBridge with an explosive first session on Generative AI, Open Source, and GSOC! 🔥 February 1st, 2025 at Outer Seminar Hall, PG Building, Marwadi University.',
        timestamp: '2024-08-15T09:00:00Z',
        engagement: {
          likes: 41,
          comments: 1,
          impressions: 1223
        },
        tags: ['TechBridge', 'GenerativeAI', 'OpenSource', 'GSOC', 'AgenticAI']
      },
      {
        id: 'circuitology-workshop',
        type: 'learning',
        title: 'NE 555 Timer IC Workshop Experience',
        content: 'Amazing workshop with the Circuitology Club! Built automation street light, adjustable flashing LED circuits, and machine gun sound generator. Great teamwork with Garima Singh and Devarsh Bhatt! 🔌',
        timestamp: '2024-07-10T16:45:00Z',
        engagement: {
          likes: 112,
          comments: 3,
          impressions: 3576
        },
        tags: ['CircuitologyClub', 'ElectronicsWorkshop', 'Innovation', 'EngineeringExperience']
      },
      {
        id: 'ar-workshop-experience',
        type: 'learning',
        title: 'AR Workshop with Chhavi Garg',
        content: 'Incredible AR workshop with Chhavi Garg from Arexa! 🥽 Created image tracking filters and object-based animations on Snapchat using Lens Studio. Partnership with Snap Inc. and Bharat XR was amazing!',
        timestamp: '2024-06-20T11:20:00Z',
        engagement: {
          likes: 250,
          comments: 6,
          impressions: 7351,
          reposts: 2
        },
        tags: ['AR', 'VR', 'SnapAR', 'BharatXR', 'Innovation', 'Workshop']
      }
    ];

    // Live metrics based on actual profile data
    this.liveMetrics = {
      followers: { current: 1814, growth: '+47', period: 'this month' },
      ieee_societies: { current: 9, growth: '+2', period: 'this year' },
      projects: { current: 6, growth: '+3', period: 'this quarter' },
      impressions: { current: 14488, growth: '+23%', period: 'last 30 days' },
      engagement: { current: 489, growth: '+15%', period: 'last week' },
      research_days: { current: 30, growth: 'SRIT', period: 'completed' }
    };

    this.init();
  }

  init() {
    this.liveSection = document.getElementById('live');
    if (!this.liveSection) {
      console.error('Live section not found');
      return;
    }

    this.metricsContainer = this.liveSection.querySelector('#live-metrics');
    this.feedContainer = this.liveSection.querySelector('#live-feed');

    if (!this.metricsContainer || !this.feedContainer) {
      console.error('Live containers not found');
      return;
    }

    this.renderMetrics();
    this.renderFeed();
    this.setupIntersectionObserver();
    this.setupRealTimeUpdates();
    this.setupInteractiveElements();
  }

  renderMetrics() {
    const metricsHTML = `
      <div class="metrics-grid">
        <div class="metric-card followers" data-metric="followers">
          <div class="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div class="metric-content">
            <div class="metric-value">${formatNumber(this.liveMetrics.followers.current)}</div>
            <div class="metric-label">LinkedIn Followers</div>
            <div class="metric-change positive">
              <span class="change-value">${this.liveMetrics.followers.growth}</span>
              <span class="change-period">${this.liveMetrics.followers.period}</span>
            </div>
          </div>
          <div class="metric-sparkline" data-metric="followers"></div>
        </div>

        <div class="metric-card societies" data-metric="ieee_societies">
          <div class="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <div class="metric-content">
            <div class="metric-value">${this.liveMetrics.ieee_societies.current}</div>
            <div class="metric-label">IEEE Societies</div>
            <div class="metric-change positive">
              <span class="change-value">${this.liveMetrics.ieee_societies.growth}</span>
              <span class="change-period">${this.liveMetrics.ieee_societies.period}</span>
            </div>
          </div>
          <div class="metric-sparkline" data-metric="ieee_societies"></div>
        </div>

        <div class="metric-card projects" data-metric="projects">
          <div class="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <div class="metric-content">
            <div class="metric-value">${this.liveMetrics.projects.current}</div>
            <div class="metric-label">Active Projects</div>
            <div class="metric-change positive">
              <span class="change-value">${this.liveMetrics.projects.growth}</span>
              <span class="change-period">${this.liveMetrics.projects.period}</span>
            </div>
          </div>
          <div class="metric-sparkline" data-metric="projects"></div>
        </div>

        <div class="metric-card impressions" data-metric="impressions">
          <div class="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <div class="metric-content">
            <div class="metric-value">${formatNumber(this.liveMetrics.impressions.current)}</div>
            <div class="metric-label">Post Impressions</div>
            <div class="metric-change positive">
              <span class="change-value">${this.liveMetrics.impressions.growth}</span>
              <span class="change-period">${this.liveMetrics.impressions.period}</span>
            </div>
          </div>
          <div class="metric-sparkline" data-metric="impressions"></div>
        </div>

        <div class="metric-card engagement" data-metric="engagement">
          <div class="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div class="metric-content">
            <div class="metric-value">${formatNumber(this.liveMetrics.engagement.current)}</div>
            <div class="metric-label">Total Engagement</div>
            <div class="metric-change positive">
              <span class="change-value">${this.liveMetrics.engagement.growth}</span>
              <span class="change-period">${this.liveMetrics.engagement.period}</span>
            </div>
          </div>
          <div class="metric-sparkline" data-metric="engagement"></div>
        </div>

        <div class="metric-card research" data-metric="research_days">
          <div class="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <div class="metric-content">
            <div class="metric-value">${this.liveMetrics.research_days.current}</div>
            <div class="metric-label">Research Days</div>
            <div class="metric-change positive">
              <span class="change-value">${this.liveMetrics.research_days.growth}</span>
              <span class="change-period">${this.liveMetrics.research_days.period}</span>
            </div>
          </div>
          <div class="metric-sparkline" data-metric="research_days"></div>
        </div>
      </div>

      <div class="live-status">
        <div class="status-indicator">
          <div class="status-dot online"></div>
          <span class="status-text">Live Activity</span>
        </div>
        <div class="last-updated">
          Last updated: <span id="last-update-time">${formatDate(new Date(), { includeTime: true })}</span>
        </div>
      </div>
    `;

    this.metricsContainer.innerHTML = metricsHTML;
  }

  renderFeed() {
    const feedHTML = `
      <div class="feed-header">
        <h3>Recent LinkedIn Activity</h3>
        <div class="feed-filter">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="achievement">Achievements</button>
          <button class="filter-btn" data-filter="community">Community</button>
          <button class="filter-btn" data-filter="learning">Learning</button>
        </div>
      </div>

      <div class="feed-timeline">
        ${this.linkedinData.map((post, index) => this.createFeedItem(post, index)).join('')}
      </div>

      <div class="feed-stats">
        <div class="stat-item">
          <span class="stat-value">${this.linkedinData.reduce((sum, post) => sum + post.engagement.likes, 0)}</span>
          <span class="stat-label">Total Likes</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${this.linkedinData.reduce((sum, post) => sum + post.engagement.impressions, 0)}</span>
          <span class="stat-label">Total Impressions</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${this.linkedinData.length}</span>
          <span class="stat-label">Recent Posts</span>
        </div>
      </div>
    `;

    this.feedContainer.innerHTML = feedHTML;
  }

  createFeedItem(post, index) {
    const timeAgo = this.getTimeAgo(post.timestamp);
    const typeColors = {
      achievement: '#f59e0b',
      community: '#8b5cf6',
      event: '#06b6d4',
      learning: '#10b981'
    };

    return `
      <div class="feed-item ${post.type} fade-in" data-index="${index}" data-type="${post.type}">
        <div class="feed-marker">
          <div class="marker-dot" style="background: ${typeColors[post.type]}"></div>
          <div class="marker-line"></div>
        </div>
        
        <div class="feed-content">
          <div class="feed-header">
            <div class="feed-type" style="color: ${typeColors[post.type]}">${post.type.toUpperCase()}</div>
            <div class="feed-time">${timeAgo}</div>
          </div>
          
          <h4 class="feed-title">${post.title}</h4>
          <p class="feed-text">${post.content}</p>
          
          <div class="feed-tags">
            ${post.tags.map(tag => `<span class="feed-tag">#${tag}</span>`).join('')}
          </div>
          
          <div class="feed-engagement">
            <div class="engagement-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>${post.engagement.likes}</span>
            </div>
            <div class="engagement-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>${post.engagement.comments}</span>
            </div>
            <div class="engagement-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>${formatNumber(post.engagement.impressions)}</span>
            </div>
            ${post.engagement.reposts ? `
              <div class="engagement-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 1l4 4-4 4"></path>
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                  <path d="M7 23l-4-4 4-4"></path>
                  <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                </svg>
                <span>${post.engagement.reposts}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
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
          this.animateLiveSection();
          this.startRealTimeUpdates();
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.liveSection);

    // Animate individual feed items
    this.feedItemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
            this.animateFeedItem(entry.target);
          }, index * 150);
        }
      });
    }, { threshold: 0.3 });

    // Observe feed items after they're rendered
    setTimeout(() => {
      const feedItems = this.feedContainer.querySelectorAll('.feed-item');
      feedItems.forEach(item => {
        this.feedItemObserver.observe(item);
      });
    }, 100);
  }

  setupRealTimeUpdates() {
    // Update metrics periodically
    this.updateInterval = setInterval(() => {
      if (this.isVisible) {
        this.updateMetrics();
        this.updateLastUpdateTime();
      }
    }, 30000); // Update every 30 seconds

    // Animate sparklines
    this.animateSparklines();
  }

  setupInteractiveElements() {
    // Feed filter functionality
    this.feedContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        this.handleFeedFilter(e.target);
      }
    });

    // Metric card hover effects
    this.metricsContainer.addEventListener('mouseenter', (e) => {
      if (e.target.closest('.metric-card')) {
        this.animateMetricHover(e.target.closest('.metric-card'), true);
      }
    }, true);

    this.metricsContainer.addEventListener('mouseleave', (e) => {
      if (e.target.closest('.metric-card')) {
        this.animateMetricHover(e.target.closest('.metric-card'), false);
      }
    }, true);

    // Feed item hover effects
    this.feedContainer.addEventListener('mouseenter', (e) => {
      if (e.target.closest('.feed-item')) {
        this.animateFeedItemHover(e.target.closest('.feed-item'), true);
      }
    }, true);

    this.feedContainer.addEventListener('mouseleave', (e) => {
      if (e.target.closest('.feed-item')) {
        this.animateFeedItemHover(e.target.closest('.feed-item'), false);
      }
    }, true);
  }

  animateLiveSection() {
    // Animate metrics cards with stagger
    const metricCards = this.metricsContainer.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px) scale(0.9)';
      card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        
        // Animate metric values
        setTimeout(() => {
          this.animateMetricValue(card);
        }, 300);
      }, index * 100);
    });

    // Animate live status
    const liveStatus = this.metricsContainer.querySelector('.live-status');
    if (liveStatus) {
      liveStatus.style.opacity = '0';
      liveStatus.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        liveStatus.style.transition = 'all 0.6s ease';
        liveStatus.style.opacity = '1';
        liveStatus.style.transform = 'translateY(0)';
      }, 800);
    }
  }

  animateFeedItem(item) {
    const marker = item.querySelector('.feed-marker');
    const content = item.querySelector('.feed-content');

    if (marker) {
      const dot = marker.querySelector('.marker-dot');
      dot.style.transform = 'scale(0)';
      dot.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        dot.style.transform = 'scale(1)';
        
        // Add pulse animation
        setTimeout(() => {
          dot.style.animation = 'pulse 2s ease-in-out';
        }, 300);
      }, 200);
    }

    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateX(-20px)';
      content.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
      
      setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
      }, 100);
    }
  }

  animateMetricValue(card) {
    const valueElement = card.querySelector('.metric-value');
    const metricType = card.dataset.metric;
    const targetValue = this.liveMetrics[metricType].current;
    
    let currentValue = 0;
    const increment = targetValue / 60;
    const duration = 2000;
    const stepTime = duration / 60;
    
    const animate = () => {
      currentValue += increment;
      if (currentValue < targetValue) {
        valueElement.textContent = formatNumber(Math.floor(currentValue));
        setTimeout(animate, stepTime);
      } else {
        valueElement.textContent = formatNumber(targetValue);
      }
    };
    
    animate();
  }

  animateMetricHover(card, isHovering) {
    const sparkline = card.querySelector('.metric-sparkline');
    
    if (isHovering) {
      card.style.transform = 'translateY(-5px) scale(1.02)';
      card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
      
      if (sparkline) {
        this.generateSparklineAnimation(sparkline);
      }
    } else {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
    }
  }

  animateFeedItemHover(item, isHovering) {
    const content = item.querySelector('.feed-content');
    const marker = item.querySelector('.feed-marker .marker-dot');
    
    if (isHovering) {
      content.style.transform = 'translateX(10px)';
      content.style.background = 'var(--glass-bg)';
      
      if (marker) {
        marker.style.transform = 'scale(1.2)';
      }
    } else {
      content.style.transform = 'translateX(0)';
      content.style.background = '';
      
      if (marker) {
        marker.style.transform = 'scale(1)';
      }
    }
  }

  handleFeedFilter(filterBtn) {
    const filter = filterBtn.dataset.filter;
    
    // Update active filter
    this.feedContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    filterBtn.classList.add('active');
    
    // Filter feed items
    const feedItems = this.feedContainer.querySelectorAll('.feed-item');
    feedItems.forEach((item, index) => {
      const itemType = item.dataset.type;
      const shouldShow = filter === 'all' || itemType === filter;
      
      if (shouldShow) {
        item.style.display = 'flex';
        item.style.animation = `slideInUp 0.5s ease ${index * 0.1}s both`;
      } else {
        item.style.animation = 'slideOutDown 0.3s ease both';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  generateSparklineAnimation(sparkline) {
    // Generate simple sparkline animation
    sparkline.innerHTML = '<canvas width="60" height="20"></canvas>';
    const canvas = sparkline.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    
    // Generate sample data points
    const points = Array.from({length: 10}, (_, i) => ({
      x: (i / 9) * 60,
      y: 10 + Math.random() * 10
    }));
    
    // Draw sparkline
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    
    ctx.stroke();
    
    // Add gradient fill
    ctx.lineTo(60, 20);
    ctx.lineTo(0, 20);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 20);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  animateSparklines() {
    const sparklines = this.metricsContainer.querySelectorAll('.metric-sparkline');
    sparklines.forEach(sparkline => {
      this.generateSparklineAnimation(sparkline);
    });
  }

  updateMetrics() {
    // Simulate small random updates to metrics
    Object.keys(this.liveMetrics).forEach(key => {
      const metric = this.liveMetrics[key];
      if (typeof metric.current === 'number') {
        // Small random fluctuation
        const change = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
        if (change > 0) {
          metric.current += change;
          
          // Update the display
          const card = this.metricsContainer.querySelector(`[data-metric="${key}"]`);
          if (card) {
            const valueElement = card.querySelector('.metric-value');
            valueElement.textContent = formatNumber(metric.current);
            
            // Add update animation
            valueElement.style.animation = 'metricUpdate 0.5s ease';
            setTimeout(() => {
              valueElement.style.animation = '';
            }, 500);
          }
        }
      }
    });
  }

  updateLastUpdateTime() {
    const timeElement = document.getElementById('last-update-time');
    if (timeElement) {
      timeElement.textContent = formatDate(new Date(), { includeTime: true });
    }
  }

  getTimeAgo(timestamp) {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffMs = now - postDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return '1 week ago';
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    if (diffMonths === 1) return '1 month ago';
    return `${diffMonths} months ago`;
  }

  startRealTimeUpdates() {
    if (!this.updateInterval) {
      this.setupRealTimeUpdates();
    }
  }

  // Public API methods
  updateMetricValue(metric, newValue) {
    if (this.liveMetrics[metric]) {
      this.liveMetrics[metric].current = newValue;
      this.renderMetrics();
    }
  }

  addLinkedInPost(post) {
    this.linkedinData.unshift(post);
    this.renderFeed();
  }

  getMetrics() {
    return this.liveMetrics;
  }

  handleResize() {
    // Regenerate sparklines for new dimensions
    this.animateSparklines();
  }

  pause() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resume() {
    if (this.isVisible && !this.updateInterval) {
      this.setupRealTimeUpdates();
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.feedItemObserver) {
      this.feedItemObserver.disconnect();
    }
    
    this.pause();
  }
}

// Add live-specific CSS
const liveStyles = document.createElement('style');
liveStyles.textContent = `
  .live-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .metric-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .metric-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  .metric-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    background: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
  }

  .metric-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: 0.75rem;
  }

  .metric-change {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
  }

  .metric-change.positive {
    color: #10b981;
  }

  .change-value {
    font-weight: 600;
  }

  .change-period {
    color: var(--color-text-muted);
  }

  .metric-sparkline {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 60px;
    height: 20px;
  }

  .live-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  .status-dot.online {
    background: #10b981;
  }

  .status-text {
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .last-updated {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .feed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .feed-header h3 {
    margin: 0;
    color: var(--color-text-primary);
  }

  .feed-filter {
    display: flex;
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--glass-bg);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .filter-btn.active,
  .filter-btn:hover {
    background: var(--color-primary);
    color: white;
  }

  .feed-timeline {
    position: relative;
  }

  .feed-timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
  }

  .feed-item {
    display: flex;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  .feed-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .feed-marker {
    position: relative;
    flex-shrink: 0;
    margin-right: 1.5rem;
  }

  .marker-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }

  .feed-content {
    flex: 1;
    background: transparent;
    border-radius: var(--radius-lg);
    padding: 1rem 0;
    transition: all 0.3s ease;
  }

  .feed-item:hover .feed-content {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    padding: 1rem;
  }

  .feed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .feed-type {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .feed-time {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .feed-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
  }

  .feed-text {
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .feed-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }

  .feed-tag {
    font-size: 0.75rem;
    color: var(--color-primary);
    text-decoration: none;
  }

  .feed-tag:hover {
    text-decoration: underline;
  }

  .feed-engagement {
    display: flex;
    gap: 1rem;
  }

  .engagement-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .engagement-item svg {
    width: 14px;
    height: 14px;
  }

  .feed-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
  }

  .stat-item {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }

  @keyframes metricUpdate {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideOutDown {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }

  @media (max-width: 768px) {
    .live-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .metric-card {
      padding: 1rem;
    }

    .metric-value {
      font-size: 1.5rem;
    }

    .feed-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .feed-filter {
      justify-content: center;
    }

    .feed-stats {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }

    .feed-item {
      flex-direction: column;
    }

    .feed-marker {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }

    .feed-timeline::before {
      display: none;
    }
  }
`;

document.head.appendChild(liveStyles);

// Initialize live component
export function initLive() {
  return new Promise((resolve) => {
    const live = new LiveComponent();
    resolve(live);
  });
}

export default LiveComponent;
