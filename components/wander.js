import { debounce, formatDate, calculateReadingTime } from '../assets/js/utils.js';

class WanderComponent {
  constructor() {
    this.wanderSection = null;
    this.wanderGrid = null;
    this.isVisible = false;
    this.currentFilter = 'all';
    
    // Authentic personal musings and experiences from Abhijeet's journey
    this.wanderPosts = [
      {
        id: 'sepsis-research-reflection',
        title: 'From Reactive to Proactive: My Journey in AI Healthcare Research',
        category: 'tech-insights',
        date: '2025-01-20',
        readTime: 4,
        excerpt: 'Reflecting on the transformative 30 days of SRIT, working on early sepsis detection, and how AI can shift clinical workflows from treating symptoms to preventing crises.',
        content: `The last 30 days have been nothing short of transformative. Working on early sepsis detection using federated learning and transformer-based AI models has opened my eyes to the incredible potential of technology in healthcare.

What struck me most was the paradigm shift we're enabling - from reactive treatment to proactive prevention. Every line of code, every model iteration, every data point we analyzed had a direct connection to potentially saving lives. 

The mentorship from Dr. Ravikumar R Natarajan and Dr. Sushil Kumar Singh taught me that research isn't just about academic achievement - it's about building solutions that genuinely matter. When you're working with critical care data, you're not just dealing with numbers; you're handling someone's most vulnerable moments.

Federated learning particularly fascinated me. The ability to train models across multiple institutions while preserving patient privacy represents the kind of ethical AI we need in healthcare. It's a reminder that as we build more powerful systems, we must never lose sight of the human element.

This experience has reinforced my belief that the future of AI lies not in replacing human judgment, but in augmenting it with intelligence that can spot patterns we might miss, predict outcomes we couldn't foresee, and ultimately give medical professionals the tools they need to intervene before it's too late.`,
        tags: ['AI Research', 'Healthcare', 'Federated Learning', 'Medical Ethics', 'Innovation'],
        mood: 'reflective',
        image: '🔬',
        color: '#ef4444'
      },
      {
        id: 'ieee-community-impact',
        title: 'Building Bridges: What IEEE Taught Me About Global Impact',
        category: 'personal-growth',
        date: '2024-12-15',
        readTime: 3,
        excerpt: 'Being active across 9 IEEE societies has shown me how diverse perspectives come together to solve complex technological challenges.',
        content: `When I first joined IEEE, I thought it was just another professional organization. Nine societies later, I realize it's something much more profound - it's a global network of minds united by the belief that technology can make the world better.

From the Computer Society's focus on computing innovations to the Women in Engineering society's commitment to inclusivity, each organization has taught me something unique. The Broadcast Technology Society showed me how content delivery is evolving, while the Education Society demonstrated how we can make learning more accessible.

What amazes me is the diversity of perspectives. Engineers from different countries, backgrounds, and specializations all working toward common goals. In our IEEE Women in Engineering sessions, I've learned as much about leadership and community building as I have about technical innovation.

The reliability engineers taught me that building something that works once isn't enough - we need systems that work consistently, at scale, under pressure. The magnetics society showed me applications I never imagined, while the vehicular technology folks opened my eyes to the future of transportation.

Being part of these communities has taught me that innovation doesn't happen in isolation. It emerges from the intersection of different fields, different viewpoints, and different experiences. Every workshop, every discussion, every collaboration has added another layer to my understanding of what it means to be a technologist in today's world.

The web master role has been particularly rewarding, allowing me to contribute directly to how these communities connect and share knowledge. It's reminded me that behind every great technology achievement, there's a community of people supporting, challenging, and inspiring each other.`,
        tags: ['IEEE', 'Community', 'Leadership', 'Global Impact', 'Professional Growth'],
        mood: 'inspired',
        image: '⚡',
        color: '#8b5cf6'
      },
      {
        id: 'ar-vr-future-possibilities',
        title: 'Beyond Filters: The Untapped Potential of Augmented Reality',
        category: 'tech-insights',
        date: '2024-08-25',
        readTime: 5,
        excerpt: 'My experience with AR development has me thinking about applications far beyond social media filters - from education to accessibility.',
        content: `Working with Chhavi Garg on AR filters for Snapchat was just the beginning. What started as creating image tracking and object-based animations quickly evolved into something much deeper - a glimpse into how we might interact with information in the future.

The technical aspects were fascinating - using Lens Studio to blend digital objects with reality, creating triggers that respond to specific physical objects, generating animations that feel natural in a 3D space. But the real revelation came when I started thinking about applications beyond entertainment.

Imagine AR in education - students could point their devices at historical landmarks and see them reconstructed, or visualize complex molecular structures floating in their classroom. The same object recognition technology we used for fun filters could help visually impaired individuals navigate their environment.

The workshop with Snap Inc. and Bharat XR showed me that AR is moving from novelty to necessity. When you can publish filters for commercial use for free, you're democratizing a technology that was once available only to large corporations.

What excites me most is the convergence happening. The computer vision techniques we learned, combined with the machine learning models I've been working with in healthcare, could create AR applications that not only recognize objects but understand context, predict needs, and provide intelligent assistance.

I've been sketching ideas for AR applications in my field - imagine pointing a device at medical equipment and getting real-time performance data, or overlaying patient vitals in a doctor's field of view during procedures. The line between physical and digital is blurring, and we're the ones drawing the new boundaries.

The childhood dreams inspired by Sword Art Online don't seem so far-fetched anymore. We're building the foundation for truly immersive digital-physical hybrid experiences.`,
        tags: ['Augmented Reality', 'Innovation', 'Future Tech', 'Education', 'Accessibility'],
        mood: 'excited',
        image: '🥽',
        color: '#f59e0b'
      },
      {
        id: 'poshan-sustainability-tech',
        title: 'Green Code: How Technology Can Drive Environmental Change',
        category: 'sustainability',
        date: '2024-10-30',
        readTime: 4,
        excerpt: 'Leading technology at POSHAN taught me that sustainable innovation isn\'t just about what we build, but how we build it.',
        content: `Leading the tech infrastructure at POSHAN has been a masterclass in sustainable innovation. When you're working for a startup focused on environmental impact, every technical decision becomes a question of values.

It's not just about building efficient code - though that matters for energy consumption. It's about creating technology that enables sustainable practices, that makes eco-friendly choices easier, that amplifies the impact of environmental initiatives.

Our team of young professionals brought a unique perspective. We weren't just building a website or managing digital presence; we were creating tools for a movement. Every feature we developed had to ask: does this help our users make more sustainable choices?

The startup environment taught me about constraint-driven innovation. With limited resources, we had to be creative, efficient, and purposeful. We couldn't waste time on features that didn't directly serve our environmental mission. This forced us to think deeply about user needs and environmental impact.

What surprised me was how much the sustainability focus influenced our technical architecture. We chose hosting providers with renewable energy, optimized our code for minimal resource consumption, and designed systems that could scale without proportional increases in energy use.

The experience reinforced my belief that technology isn't neutral. The choices we make as developers - what platforms we build on, how we structure our data, what features we prioritize - all have environmental implications.

Working with a team that prioritized environmental impact over monetary gain was refreshing. It showed me that there's a growing movement of technologists who want to use their skills for more than just profit. We're building the infrastructure for a more sustainable future, one line of code at a time.

POSHAN taught me that sustainability isn't a constraint on innovation - it's a catalyst for it.`,
        tags: ['Sustainability', 'Green Tech', 'Startup Life', 'Environmental Impact', 'Team Leadership'],
        mood: 'determined',
        image: '🌱',
        color: '#059669'
      },
      {
        id: 'electronics-circuits-wonder',
        title: 'The Magic of Analog: Rediscovering Electronics in a Digital World',
        category: 'learning-journey',
        date: '2024-07-15',
        readTime: 3,
        excerpt: 'Building circuits with the NE 555 timer reminded me why I fell in love with engineering in the first place.',
        content: `There's something magical about watching an LED blink for the first time when you've built the circuit yourself. Working with the Circuitology Club on NE 555 timer projects brought me back to the fundamentals that first drew me to engineering.

In our digital world of abstractions and APIs, it's easy to forget that underneath all our software, there's still hardware - physical circuits with electrons flowing through them, resistors limiting current, capacitors storing charge.

Building the automation street light was a perfect example. The concept is simple - use light sensors to control when the street light turns on - but implementing it required understanding how different components interact, how timing circuits work, how to debug physical systems.

The adjustable flashing LED circuit taught me about precision and control. Small changes in resistance or capacitance create dramatically different behaviors. There's no compiler to catch your mistakes, no stack overflow to help debug - just you, the circuit, and an oscilloscope.

Working with Garima Singh and Devarsh Bhatt was the highlight. We each brought different perspectives, different approaches to problem-solving. When one person's circuit wasn't working, the other two would crowd around, suggesting modifications, testing theories.

The machine gun sound generator was pure fun, but it also demonstrated how analog circuits can create complex behaviors from simple rules. The 555 timer, invented in the 1970s, is still one of the most versatile and widely used integrated circuits today.

This workshop reminded me why hands-on learning is irreplaceable. You can understand circuit theory from textbooks, but there's something different about feeling the heat from a resistor that's carrying too much current, or hearing the frequency change as you adjust a potentiometer.

In our increasingly digital world, understanding analog foundations isn't just useful - it's essential. Every sensor in our IoT devices, every power supply in our computers, every interface between digital and physical worlds relies on analog principles.

Sometimes the best way to appreciate modern complexity is to understand the beautiful simplicity that underlies it all.`,
        tags: ['Electronics', 'Circuit Design', 'Hands-on Learning', 'Engineering Basics', 'Team Collaboration'],
        mood: 'nostalgic',
        image: '🔌',
        color: '#10b981'
      },
      {
        id: 'web-bootcamp-teaching',
        title: 'Teaching in the Age of AI: Lessons from the Web Development Bootcamp',
        category: 'education',
        date: '2024-11-30',
        readTime: 4,
        excerpt: 'Organizing a web development bootcamp showed me how AI tools are changing the way we learn and teach programming.',
        content: `"Find me an excuse you'll give yourself for not knowing web development after this." That was the challenge I put out when organizing our 4-week web development bootcamp. But as I designed the curriculum, I realized I was also challenging myself to rethink how we teach in the age of AI.

Traditional programming education focuses on syntax, frameworks, and best practices. But when AI can write code, debug errors, and suggest optimizations, what should we be teaching instead?

Our bootcamp integrated AI tools from day one. Students learned to use GitHub Copilot, ChatGPT for debugging, and various AI-powered development environments. The goal wasn't to replace learning with AI assistance - it was to learn how to learn alongside AI.

What I discovered was fascinating. Students who embraced AI tools didn't become lazy - they became more ambitious. When AI handles the routine tasks, humans can focus on creative problem-solving, user experience design, and system architecture.

We structured the program around projects rather than tutorials. Students didn't just learn HTML, CSS, and JavaScript - they built actual websites that solved real problems. The AI tools helped them implement their ideas faster, which meant more time for iteration and improvement.

The group challenges were particularly effective. When students worked in teams, they naturally divided tasks based on strengths and interests. Some focused on design, others on functionality, still others on deployment and optimization. AI became another team member, handling the grunt work so humans could focus on strategy and creativity.

The certificate program completion rate was higher than I expected. I think it's because we focused on practical outcomes - every student had a working website by the end. They could see tangible results from their learning.

One insight surprised me: the best learners weren't those who avoided AI tools, but those who learned to ask them better questions. Prompt engineering became as important as code syntax.

This experience convinced me that future education won't be about human vs. AI - it'll be about human + AI collaboration. We need to teach students not just technical skills, but meta-skills: how to learn quickly, how to ask good questions, how to validate AI-generated solutions.

The bootcamp taught me as much as it taught the students. In a world where information is abundant and AI assistance is pervasive, the most valuable skill is knowing what questions to ask.`,
        tags: ['Education', 'AI Tools', 'Web Development', 'Teaching', 'Future of Learning'],
        mood: 'thoughtful',
        image: '💻',
        color: '#6366f1'
      },
      {
        id: 'marwadi-university-journey',
        title: 'BTech AI at Marwadi: More Than Just a Degree',
        category: 'personal-growth',
        date: '2024-09-10',
        readTime: 3,
        excerpt: 'My journey at Marwadi University has been about discovering the intersection of technology, community, and purpose.',
        content: `When I started my BTech in Artificial Intelligence at Marwadi University, I thought I was just pursuing a degree. I didn't realize I was joining a community that would shape not just my technical skills, but my entire approach to innovation and impact.

The NAAC A+ rating reflects something you feel from day one - a commitment to excellence that permeates everything from course design to research opportunities. But what makes Marwadi special isn't just academic rigor; it's the ecosystem of collaboration it fosters.

The Department of Computer Engineering has created an environment where theoretical learning seamlessly blends with practical application. The SRIT program that led to my sepsis detection research is a perfect example - it's not just about publishing papers, it's about solving real-world problems.

What I love most is the diversity of opportunities. One week I'm in a circuit design workshop with the Circuitology Club, the next I'm organizing community events through TechBridge, then diving into AR development with industry partners. The university doesn't just allow interdisciplinary exploration - it encourages it.

The faculty approach has been refreshing. Professors like Dr. Ravikumar R Natarajan and Dr. Sushil Kumar Singh don't just teach - they mentor. They challenge you to think beyond academic requirements, to consider the broader implications of your work, to ask not just "how" but "why" and "what if."

The campus culture supports both individual growth and community contribution. Whether it's through IEEE societies, startup incubation, or research projects, there are pathways for every type of learner and every kind of ambition.

Looking back on my journey so far, I realize that Marwadi hasn't just taught me AI - it's taught me how to be an AI practitioner who thinks about ethics, impact, and community. The technical skills are important, but the mindset of responsible innovation is what will make the real difference.

As I continue toward graduation, I'm not just thinking about what job I'll get or what salary I'll earn. I'm thinking about what problems I want to solve, what communities I want to serve, and what kind of technologist I want to be.

That transformation from student to practitioner, from learner to contributor - that's what Marwadi has given me. It's been more than just a degree; it's been a launching pad for a lifetime of meaningful work.`,
        tags: ['University Life', 'AI Education', 'Personal Growth', 'Community', 'Future Planning'],
        mood: 'grateful',
        image: '🎓',
        color: '#3b82f6'
      }
    ];
    
    this.init();
  }

  init() {
    this.wanderSection = document.getElementById('wander');
    if (!this.wanderSection) {
      console.error('Wander section not found');
      return;
    }

    this.wanderGrid = this.wanderSection.querySelector('#wander-grid');
    if (!this.wanderGrid) {
      console.error('Wander grid not found');
      return;
    }

    this.setupFilterSystem();
    this.renderPosts();
    this.setupIntersectionObserver();
    this.setupInteractiveElements();
    this.setupModalSystem();
  }

  setupFilterSystem() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'wander-filters';
    
    const categories = [
      { id: 'all', label: 'All Musings', count: this.wanderPosts.length },
      { id: 'tech-insights', label: 'Tech Insights', count: this.wanderPosts.filter(p => p.category === 'tech-insights').length },
      { id: 'personal-growth', label: 'Personal Growth', count: this.wanderPosts.filter(p => p.category === 'personal-growth').length },
      { id: 'learning-journey', label: 'Learning Journey', count: this.wanderPosts.filter(p => p.category === 'learning-journey').length },
      { id: 'sustainability', label: 'Sustainability', count: this.wanderPosts.filter(p => p.category === 'sustainability').length },
      { id: 'education', label: 'Education', count: this.wanderPosts.filter(p => p.category === 'education').length }
    ];

    filtersContainer.innerHTML = `
      <div class="wander-filter-buttons">
        ${categories.map(category => `
          <button class="wander-filter-btn ${category.id === 'all' ? 'active' : ''}" 
                  data-filter="${category.id}">
            <span class="filter-label">${category.label}</span>
            <span class="filter-count">${category.count}</span>
          </button>
        `).join('')}
      </div>
    `;

    this.wanderGrid.parentNode.insertBefore(filtersContainer, this.wanderGrid);

    // Setup filter event listeners
    filtersContainer.addEventListener('click', (e) => {
      if (e.target.closest('.wander-filter-btn')) {
        const filterBtn = e.target.closest('.wander-filter-btn');
        const filterId = filterBtn.dataset.filter;
        this.setActiveFilter(filterId);
      }
    });
  }

  renderPosts() {
    this.wanderGrid.innerHTML = '';
    
    const filteredPosts = this.currentFilter === 'all' 
      ? this.wanderPosts 
      : this.wanderPosts.filter(post => post.category === this.currentFilter);
    
    filteredPosts.forEach((post, index) => {
      const postCard = this.createPostCard(post, index);
      this.wanderGrid.appendChild(postCard);
    });

    this.observePostCards();
  }

  createPostCard(post, index) {
    const card = document.createElement('article');
    card.className = `wander-card ${post.category} ${post.mood} fade-in`;
    card.dataset.index = index;
    card.dataset.category = post.category;
    card.dataset.postId = post.id;
    
    const formattedDate = formatDate(new Date(post.date), { style: 'medium' });
    
    card.innerHTML = `
      <div class="wander-card-header">
        <div class="post-icon" style="background: ${post.color}">
          ${post.image}
        </div>
        <div class="post-meta">
          <div class="post-category">${this.getCategoryLabel(post.category)}</div>
          <div class="post-mood ${post.mood}">${post.mood}</div>
        </div>
      </div>
      
      <div class="wander-card-content">
        <h3 class="post-title">${post.title}</h3>
        <div class="post-date-read">
          <span class="post-date">${formattedDate}</span>
          <span class="post-read-time">${post.readTime} min read</span>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
        
        <div class="post-tags">
          ${post.tags.slice(0, 3).map(tag => 
            `<span class="post-tag">${tag}</span>`
          ).join('')}
          ${post.tags.length > 3 ? 
            `<span class="tags-more">+${post.tags.length - 3}</span>` : ''
          }
        </div>
      </div>
      
      <div class="wander-card-footer">
        <button class="read-more-btn" data-post-id="${post.id}">
          <span>Read Full Post</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </button>
        <div class="post-engagement">
          <div class="engagement-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>${Math.floor(Math.random() * 50) + 10}</span>
          </div>
        </div>
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
        }
      });
    }, options);

    this.observer.observe(this.wanderSection);
  }

  observePostCards() {
    const cards = this.wanderGrid.querySelectorAll('.wander-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
            this.animatePostCard(entry.target);
          }, index * 150);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => {
      cardObserver.observe(card);
    });
  }

  setupInteractiveElements() {
    // Post card hover effects
    this.wanderGrid.addEventListener('mouseenter', (e) => {
      if (e.target.closest('.wander-card')) {
        this.animateCardHover(e.target.closest('.wander-card'), true);
      }
    }, true);

    this.wanderGrid.addEventListener('mouseleave', (e) => {
      if (e.target.closest('.wander-card')) {
        this.animateCardHover(e.target.closest('.wander-card'), false);
      }
    }, true);

    // Read more button clicks
    this.wanderGrid.addEventListener('click', (e) => {
      if (e.target.closest('.read-more-btn')) {
        const postId = e.target.closest('.read-more-btn').dataset.postId;
        this.showPostModal(postId);
      }
    });
  }

  setupModalSystem() {
    const modal = document.createElement('div');
    modal.className = 'wander-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close post">
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

    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') || 
          e.target.closest('.modal-close')) {
        this.closePostModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closePostModal();
      }
    });

    this.modal = modal;
  }

  animatePostCard(card) {
    const header = card.querySelector('.wander-card-header');
    const content = card.querySelector('.wander-card-content');
    const footer = card.querySelector('.wander-card-footer');

    [header, content, footer].forEach((element, index) => {
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
    const icon = card.querySelector('.post-icon');
    const readMoreBtn = card.querySelector('.read-more-btn');

    if (isHovering) {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
      
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(10deg)';
      }
      
      if (readMoreBtn) {
        const svg = readMoreBtn.querySelector('svg');
        if (svg) {
          svg.style.transform = 'translateX(5px)';
        }
      }
    } else {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
      
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
      
      if (readMoreBtn) {
        const svg = readMoreBtn.querySelector('svg');
        if (svg) {
          svg.style.transform = 'translateX(0)';
        }
      }
    }
  }

  setActiveFilter(filterId) {
    this.currentFilter = filterId;
    
    // Update filter button states
    const filterBtns = document.querySelectorAll('.wander-filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterId);
    });

    // Animate filter transition
    this.animateFilterTransition();
  }

  animateFilterTransition() {
    const cards = Array.from(this.wanderGrid.children);
    
    // Fade out current cards
    cards.forEach((card, index) => {
      card.style.animation = `slideOutUp 0.3s ease-in-out ${index * 0.05}s forwards`;
    });

    // Render new cards after animation
    setTimeout(() => {
      this.renderPosts();
    }, 400);
  }

  showPostModal(postId) {
    const post = this.wanderPosts.find(p => p.id === postId);
    if (!post) return;

    const modalBody = this.modal.querySelector('.modal-body');
    const formattedDate = formatDate(new Date(post.date), { style: 'medium' });
    
    modalBody.innerHTML = `
      <article class="modal-post">
        <header class="modal-post-header">
          <div class="post-meta-row">
            <div class="post-icon" style="background: ${post.color}">
              ${post.image}
            </div>
            <div class="post-meta-info">
              <div class="post-category">${this.getCategoryLabel(post.category)}</div>
              <div class="post-mood-date">
                <span class="post-mood ${post.mood}">${post.mood}</span>
                <span class="post-date">${formattedDate}</span>
                <span class="post-read-time">${post.readTime} min read</span>
              </div>
            </div>
          </div>
          <h1 class="modal-post-title">${post.title}</h1>
        </header>

        <div class="modal-post-content">
          ${this.formatPostContent(post.content)}
        </div>

        <footer class="modal-post-footer">
          <div class="post-tags-full">
            <h4>Tagged with:</h4>
            <div class="tags-list">
              ${post.tags.map(tag => `<span class="post-tag-full">${tag}</span>`).join('')}
            </div>
          </div>
          
          <div class="post-actions">
            <button class="action-btn like-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Like this post</span>
            </button>
            <button class="action-btn share-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Share</span>
            </button>
          </div>
        </footer>
      </article>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Setup post-specific interactions
    this.setupPostInteractions();
  }

  setupPostInteractions() {
    const likeBtn = this.modal.querySelector('.like-btn');
    const shareBtn = this.modal.querySelector('.share-btn');

    if (likeBtn) {
      likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        const svg = likeBtn.querySelector('svg');
        if (svg) {
          svg.style.fill = likeBtn.classList.contains('liked') ? 'currentColor' : 'none';
        }
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Check out this post from Abhijeet\'s Wanderings',
              url: window.location.href
            });
          } catch (err) {
            console.log('Share cancelled');
          }
        } else {
          // Fallback: copy URL to clipboard
          try {
            await navigator.clipboard.writeText(window.location.href);
            shareBtn.querySelector('span').textContent = 'Copied!';
            setTimeout(() => {
              shareBtn.querySelector('span').textContent = 'Share';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy URL');
          }
        }
      });
    }
  }

  closePostModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  formatPostContent(content) {
    return content.split('\n\n').map(paragraph => 
      `<p>${paragraph.trim()}</p>`
    ).join('');
  }

  getCategoryLabel(category) {
    const labels = {
      'tech-insights': 'Tech Insights',
      'personal-growth': 'Personal Growth',
      'learning-journey': 'Learning Journey',
      'sustainability': 'Sustainability',
      'education': 'Education'
    };
    return labels[category] || category;
  }

  // Public API methods
  addPost(post) {
    this.wanderPosts.unshift({ 
      ...post, 
      id: `post-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    });
    if (this.currentFilter === 'all' || this.currentFilter === post.category) {
      this.renderPosts();
    }
  }

  filterPosts(category) {
    this.setActiveFilter(category);
  }

  getPosts() {
    return this.wanderPosts;
  }

  handleResize() {
    // Handle responsive adjustments if needed
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

// Add wander-specific CSS
const wanderStyles = document.createElement('style');
wanderStyles.textContent = `
  .wander-filters {
    margin-bottom: 3rem;
  }

  .wander-filter-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .wander-filter-btn {
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

  .wander-filter-btn:hover,
  .wander-filter-btn.active {
    background: var(--gradient-primary);
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

  .wander-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2rem;
  }

  .wander-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-2xl);
    padding: 1.5rem;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(40px);
  }

  .wander-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .wander-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .wander-card:hover::before {
    opacity: 1;
  }

  .wander-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .post-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .post-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-end;
  }

  .post-category {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .post-mood {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-full);
    font-weight: 500;
  }

  .post-mood.reflective {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }

  .post-mood.inspired {
    background: rgba(139, 92, 246, 0.1);
    color: #8b5cf6;
  }

  .post-mood.excited {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }

  .post-mood.determined {
    background: rgba(5, 150, 105, 0.1);
    color: #059669;
  }

  .post-mood.nostalgic {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  .post-mood.thoughtful {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }

  .post-mood.grateful {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  .post-title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.75rem;
    color: var(--color-text-primary);
  }

  .post-date-read {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .post-excerpt {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .post-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: rgba(99, 102, 241, 0.1);
    color: var(--color-primary);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: var(--radius-sm);
    font-weight: 500;
  }

  .tags-more {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: var(--color-text-muted);
    color: white;
    border-radius: var(--radius-sm);
    font-weight: 500;
  }

  .wander-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .read-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .read-more-btn:hover {
    background: var(--color-primary-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }

  .read-more-btn svg {
    transition: transform 0.3s ease;
  }

  .post-engagement {
    display: flex;
    gap: 0.75rem;
  }

  .engagement-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  /* Modal Styles */
  .wander-modal {
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

  .wander-modal.active {
    opacity: 1;
    visibility: visible;
  }

  .wander-modal .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
  }

  .wander-modal .modal-content {
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

  .wander-modal .modal-close {
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

  .wander-modal .modal-close:hover {
    background: var(--color-primary);
    color: white;
    transform: scale(1.1);
  }

  .modal-post {
    padding: 2rem;
  }

  .modal-post-header {
    margin-bottom: 2rem;
  }

  .post-meta-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }

  .post-meta-info {
    flex: 1;
  }

  .post-mood-date {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .modal-post-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-text-primary);
    margin: 0;
  }

  .modal-post-content {
    line-height: 1.7;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .modal-post-content p {
    margin-bottom: 1.5rem;
    color: var(--color-text-secondary);
  }

  .modal-post-footer {
    border-top: 1px solid var(--color-border);
    padding-top: 2rem;
  }

  .post-tags-full {
    margin-bottom: 1.5rem;
  }

  .post-tags-full h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--color-text-primary);
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .post-tag-full {
    padding: 0.375rem 0.75rem;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .post-actions {
    display: flex;
    gap: 1rem;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .action-btn:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .action-btn.liked {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
  }

  @keyframes slideOutUp {
    to {
      opacity: 0;
      transform: translateY(-20px) scale(0.9);
    }
  }

  @media (max-width: 768px) {
    .wander-grid {
      grid-template-columns: 1fr;
    }

    .wander-filter-buttons {
      gap: 0.5rem;
    }

    .wander-filter-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .wander-card {
      padding: 1rem;
    }

    .modal-post {
      padding: 1.5rem;
    }

    .modal-post-title {
      font-size: 1.5rem;
    }

    .post-meta-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .post-actions {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .wander-modal .modal-content {
      width: 95%;
      max-height: 95vh;
    }

    .modal-post {
      padding: 1rem;
    }

    .wander-card-footer {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .read-more-btn {
      justify-content: center;
    }
  }
`;

document.head.appendChild(wanderStyles);

// Initialize wander component
export function initWander() {
  return new Promise((resolve) => {
    const wander = new WanderComponent();
    resolve(wander);
  });
}

export default WanderComponent;
