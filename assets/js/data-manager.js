/**
 * Portfolio Data Manager
 * Easy functions to add content to different sections
 */

// LinkedIn Activity Data Manager
export class LinkedInDataManager {
  static addPost(data) {
    const requiredFields = ['id', 'type', 'title', 'content', 'timestamp'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return null;
    }

    return {
      id: data.id,
      type: data.type, // 'achievement', 'community', 'event', 'learning'
      title: data.title,
      content: data.content,
      timestamp: data.timestamp, // ISO format: '2025-01-15T10:00:00Z'
      engagement: {
        likes: data.likes || 0,
        comments: data.comments || 0,
        impressions: data.impressions || 0,
        reposts: data.reposts || 0
      },
      tags: data.tags || []
    };
  }

  static addMultiplePosts(postsArray) {
    return postsArray.map(post => this.addPost(post)).filter(post => post !== null);
  }

  // Example usage:
  static example() {
    return this.addPost({
      id: 'new-achievement-2025',
      type: 'achievement',
      title: 'New Research Paper Published',
      content: 'Excited to announce my latest research on AI-driven healthcare diagnostics has been accepted for publication.',
      timestamp: '2025-01-22T14:30:00Z',
      likes: 45,
      comments: 5,
      impressions: 1200,
      tags: ['Research', 'AI', 'Healthcare', 'Publication']
    });
  }
}

// Experience Data Manager
export class ExperienceDataManager {
  static addExperience(data) {
    const requiredFields = ['id', 'role', 'organization', 'duration', 'description'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return null;
    }

    return {
      id: data.id,
      role: data.role,
      organization: data.organization,
      duration: data.duration,
      startDate: data.startDate,
      endDate: data.endDate,
      current: data.current || false,
      description: data.description,
      achievements: data.achievements || [],
      skills: data.skills || [],
      technologies: data.technologies || [],
      image: data.image || '🔹',
      color: data.color || '#8b5cf6',
      type: data.type || 'professional' // 'professional', 'research', 'volunteer'
    };
  }

  static addIEEESociety(data) {
    return this.addExperience({
      ...data,
      type: 'ieee',
      organization: data.society || data.organization,
      color: '#0066cc'
    });
  }

  // Example usage:
  static example() {
    return this.addExperience({
      id: 'new-role-2025',
      role: 'AI Research Intern',
      organization: 'Tech Innovations Lab',
      duration: 'Jan 2025 - Present',
      startDate: '2025-01-01',
      current: true,
      description: 'Working on cutting-edge AI models for real-world applications.',
      achievements: [
        'Developed novel neural architecture',
        'Published research findings'
      ],
      skills: ['Machine Learning', 'Python', 'Research'],
      technologies: ['TensorFlow', 'PyTorch', 'CUDA'],
      image: '🧠',
      color: '#f59e0b'
    });
  }
}

// Projects Data Manager
export class ProjectsDataManager {
  static addProject(data) {
    const requiredFields = ['id', 'title', 'description', 'category'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category, // 'ai-research', 'web-development', 'ar-vr', 'mobile-app'
      technologies: data.technologies || [],
      github: data.github || null,
      demo: data.demo || null,
      image: data.image || '💻',
      status: data.status || 'completed', // 'completed', 'in-progress', 'planning'
      startDate: data.startDate,
      endDate: data.endDate,
      featured: data.featured || false,
      impact: data.impact || '',
      collaborators: data.collaborators || [],
      awards: data.awards || [],
      publications: data.publications || []
    };
  }

  // Example usage:
  static example() {
    return this.addProject({
      id: 'new-ai-project-2025',
      title: 'Smart Health Monitor',
      description: 'AI-powered health monitoring system using wearable sensors.',
      category: 'ai-research',
      technologies: ['Python', 'TensorFlow', 'IoT', 'React'],
      github: 'https://github.com/username/smart-health-monitor',
      demo: 'https://demo.smarthealth.com',
      image: '⚕️',
      status: 'in-progress',
      startDate: '2025-01-01',
      featured: true,
      impact: 'Potential to improve early disease detection by 40%',
      collaborators: ['Dr. Smith', 'Jane Doe'],
      awards: ['Best Innovation Award 2025']
    });
  }
}

// Blog/Wander Data Manager
export class WanderDataManager {
  static addPost(data) {
    const requiredFields = ['id', 'title', 'content', 'category'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return null;
    }

    // Calculate reading time (approximately 200 words per minute)
    const wordCount = data.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    return {
      id: data.id,
      title: data.title,
      category: data.category, // 'tech-insights', 'personal-growth', 'learning-journey', 'sustainability', 'education'
      date: data.date || new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      readTime: data.readTime || readTime,
      excerpt: data.excerpt || data.content.substring(0, 150) + '...',
      content: data.content,
      tags: data.tags || [],
      mood: data.mood || 'thoughtful', // 'reflective', 'inspired', 'excited', 'determined', 'nostalgic', 'thoughtful'
      image: data.image || '💭',
      color: data.color || '#6366f1'
    };
  }

  // Example usage:
  static example() {
    return this.addPost({
      id: 'new-reflection-2025',
      title: 'The Future of Human-AI Collaboration',
      category: 'tech-insights',
      date: '2025-01-22',
      excerpt: 'Exploring how AI and humans can work together to solve complex problems.',
      content: `As we advance into 2025, the relationship between humans and AI continues to evolve. Rather than replacement, we're seeing a beautiful dance of collaboration.

In my recent research, I've observed how AI can handle the computational heavy lifting while humans provide creativity, empathy, and ethical oversight. This partnership model is revolutionizing fields from healthcare to education.

The key insight is that AI doesn't diminish human value - it amplifies human potential. When we stop seeing AI as competition and start seeing it as a powerful tool for augmentation, we unlock unprecedented possibilities.

My experience working with AI models in healthcare research has shown me that the best outcomes come when human intuition guides AI capabilities, and AI insights inform human decisions. It's a symbiotic relationship that's reshaping how we approach complex challenges.`,
      tags: ['AI', 'Future of Work', 'Human-AI Collaboration', 'Technology Philosophy'],
      mood: 'inspired',
      image: '🤖',
      color: '#8b5cf6'
    });
  }
}

// Metrics Data Manager
export class MetricsDataManager {
  static updateMetric(metricName, data) {
    const validMetrics = ['followers', 'ieee_societies', 'projects', 'impressions', 'engagement', 'research_days'];
    
    if (!validMetrics.includes(metricName)) {
      console.error('Invalid metric name. Valid options:', validMetrics);
      return null;
    }

    return {
      current: data.current,
      growth: data.growth,
      period: data.period
    };
  }

  static updateMultipleMetrics(metricsObject) {
    const updatedMetrics = {};
    
    Object.entries(metricsObject).forEach(([metricName, data]) => {
      const metric = this.updateMetric(metricName, data);
      if (metric) {
        updatedMetrics[metricName] = metric;
      }
    });
    
    return updatedMetrics;
  }

  // Example usage:
  static example() {
    return this.updateMultipleMetrics({
      followers: { current: 1850, growth: '+83', period: 'this month' },
      projects: { current: 8, growth: '+5', period: 'this quarter' },
      impressions: { current: 16200, growth: '+35%', period: 'last 30 days' }
    });
  }
}

// Main Data Manager - combines all managers
export class PortfolioDataManager {
  constructor() {
    this.linkedin = LinkedInDataManager;
    this.experience = ExperienceDataManager;
    this.projects = ProjectsDataManager;
    this.wander = WanderDataManager;
    this.metrics = MetricsDataManager;
  }

  // Quick add functions for common use cases
  addLinkedInPost(title, content, type = 'achievement', tags = []) {
    const timestamp = new Date().toISOString();
    const id = `post-${Date.now()}`;
    
    return this.linkedin.addPost({
      id,
      type,
      title,
      content,
      timestamp,
      tags
    });
  }

  addNewProject(title, description, category, technologies = []) {
    const id = `project-${Date.now()}`;
    const startDate = new Date().toISOString().split('T')[0];
    
    return this.projects.addProject({
      id,
      title,
      description,
      category,
      technologies,
      startDate,
      status: 'in-progress'
    });
  }

  addBlogPost(title, content, category = 'tech-insights') {
    const id = `blog-${Date.now()}`;
    
    return this.wander.addPost({
      id,
      title,
      content,
      category
    });
  }

  addWorkExperience(role, organization, description, duration, skills = []) {
    const id = `exp-${Date.now()}`;
    
    return this.experience.addExperience({
      id,
      role,
      organization,
      description,
      duration,
      skills,
      startDate: new Date().toISOString().split('T')[0]
    });
  }

  // Validation helpers
  validateData(data, requiredFields) {
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return false;
    }
    return true;
  }

  // Export current data for backup
  exportData(componentInstance) {
    if (!componentInstance) return null;
    
    return {
      timestamp: new Date().toISOString(),
      data: componentInstance.data || componentInstance.linkedinData || componentInstance.wanderPosts || componentInstance.experiences || componentInstance.projects
    };
  }
}

// Global instance for easy access
window.PortfolioDataManager = new PortfolioDataManager();

// Usage examples and documentation
export const USAGE_EXAMPLES = {
  linkedin: `
// Add a new LinkedIn post
const newPost = window.PortfolioDataManager.addLinkedInPost(
  "Completed Advanced AI Course",
  "Just finished an intensive course on transformer architectures and their applications in NLP.",
  "learning",
  ["AI", "Machine Learning", "Education"]
);
  `,
  
  project: `
// Add a new project
const newProject = window.PortfolioDataManager.addNewProject(
  "Voice Assistant AI",
  "Building a voice-controlled AI assistant using natural language processing.",
  "ai-research",
  ["Python", "NLP", "Speech Recognition", "TensorFlow"]
);
  `,
  
  blog: `
// Add a blog post
const newBlog = window.PortfolioDataManager.addBlogPost(
  "Lessons from Building AI Models",
  "Sharing insights from my journey in developing production-ready AI systems...",
  "tech-insights"
);
  `,
  
  experience: `
// Add work experience
const newExp = window.PortfolioDataManager.addWorkExperience(
  "Machine Learning Engineer Intern",
  "TechCorp Solutions",
  "Developed and deployed ML models for customer analytics and prediction systems.",
  "Jun 2025 - Aug 2025",
  ["Python", "Scikit-learn", "AWS", "Docker"]
);
  `
};

console.log('Portfolio Data Manager loaded. Access via window.PortfolioDataManager');
console.log('Usage examples available in USAGE_EXAMPLES object');