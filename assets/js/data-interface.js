/**
 * Simple Data Interface for Portfolio
 * Easy-to-use functions for adding content without technical complexity
 */

import { PortfolioDataManager } from './data-manager.js';

// Initialize the data manager
const dataManager = new PortfolioDataManager();

// Simple functions for adding different types of content
window.addContent = {
  
  // Add a LinkedIn post
  linkedinPost: function(title, content, type = 'achievement') {
    console.log('Adding LinkedIn post:', title);
    const post = dataManager.addLinkedInPost(title, content, type);
    
    // If Live component exists, add the post to it
    if (window.liveComponent && window.liveComponent.linkedinData) {
      window.liveComponent.linkedinData.unshift(post);
      window.liveComponent.renderFeed();
      console.log('✓ LinkedIn post added successfully');
    }
    
    return post;
  },

  // Add a new project
  project: function(title, description, category = 'ai-research', technologies = []) {
    console.log('Adding project:', title);
    const project = dataManager.addNewProject(title, description, category, technologies);
    
    // If Projects component exists, add the project to it
    if (window.projectsComponent && window.projectsComponent.projects) {
      window.projectsComponent.projects.unshift(project);
      window.projectsComponent.renderProjects();
      console.log('✓ Project added successfully');
    }
    
    return project;
  },

  // Add a blog post
  blogPost: function(title, content, category = 'tech-insights') {
    console.log('Adding blog post:', title);
    const post = dataManager.addBlogPost(title, content, category);
    
    // If Wander component exists, add the post to it
    if (window.wanderComponent && window.wanderComponent.wanderPosts) {
      window.wanderComponent.wanderPosts.unshift(post);
      window.wanderComponent.renderWander();
      console.log('✓ Blog post added successfully');
    }
    
    return post;
  },

  // Add work experience
  experience: function(role, organization, description, duration, skills = []) {
    console.log('Adding experience:', role, 'at', organization);
    const experience = dataManager.addWorkExperience(role, organization, description, duration, skills);
    
    // If Experience component exists, add the experience to it
    if (window.experienceComponent && window.experienceComponent.experiences) {
      window.experienceComponent.experiences.unshift(experience);
      window.experienceComponent.renderExperience();
      console.log('✓ Experience added successfully');
    }
    
    return experience;
  },

  // Update metrics
  metrics: function(metricName, current, growth, period) {
    console.log('Updating metric:', metricName);
    const metric = dataManager.metrics.updateMetric(metricName, { current, growth, period });
    
    // If Live component exists, update the metric
    if (window.liveComponent && window.liveComponent.liveMetrics) {
      window.liveComponent.liveMetrics[metricName] = metric;
      window.liveComponent.renderMetrics();
      console.log('✓ Metric updated successfully');
    }
    
    return metric;
  }
};

// Helper function to show examples in console
window.showExamples = function() {
  console.log(`
📝 EASY PORTFOLIO CONTENT EXAMPLES:

🔗 Add LinkedIn Post:
addContent.linkedinPost(
  "New Certification Achieved",
  "Just earned my Machine Learning certification from Stanford. Excited to apply these skills in real projects!",
  "achievement"
);

💼 Add Project:
addContent.project(
  "Smart City Dashboard",
  "Real-time data visualization for urban planning using IoT sensors and AI analytics.",
  "web-development",
  ["React", "Node.js", "IoT", "D3.js"]
);

📖 Add Blog Post:
addContent.blogPost(
  "Why Code Reviews Matter",
  "Code reviews are more than bug catching - they're about knowledge sharing, mentorship, and building better software together..."
);

💼 Add Experience:
addContent.experience(
  "AI Research Assistant",
  "University Research Lab",
  "Assisted in developing neural networks for medical image analysis and contributed to 2 research papers.",
  "Jan 2025 - Present",
  ["Python", "TensorFlow", "Medical Imaging", "Research"]
);

📊 Update Metrics:
addContent.metrics("followers", 1900, "+86", "this month");

Type any of these commands in the console to add content instantly!
  `);
};

// Auto-save functionality
window.savePortfolioData = function() {
  const data = {
    timestamp: new Date().toISOString(),
    linkedin: window.liveComponent?.linkedinData || [],
    projects: window.projectsComponent?.projects || [],
    blog: window.wanderComponent?.wanderPosts || [],
    experience: window.experienceComponent?.experiences || [],
    metrics: window.liveComponent?.liveMetrics || {}
  };
  
  localStorage.setItem('portfolio-backup', JSON.stringify(data));
  console.log('✓ Portfolio data saved to localStorage');
  return data;
};

// Load saved data
window.loadPortfolioData = function() {
  const saved = localStorage.getItem('portfolio-backup');
  if (saved) {
    const data = JSON.parse(saved);
    console.log('Portfolio backup found from:', data.timestamp);
    return data;
  }
  console.log('No portfolio backup found');
  return null;
};

// Quick templates for common content
window.quickAdd = {
  
  achievement: function(title, description) {
    return addContent.linkedinPost(title, description, 'achievement');
  },
  
  learning: function(title, description) {
    return addContent.linkedinPost(title, description, 'learning');
  },
  
  aiProject: function(title, description) {
    return addContent.project(title, description, 'ai-research', ['Python', 'TensorFlow', 'Machine Learning']);
  },
  
  webProject: function(title, description) {
    return addContent.project(title, description, 'web-development', ['HTML', 'CSS', 'JavaScript', 'React']);
  },
  
  techInsight: function(title, content) {
    return addContent.blogPost(title, content, 'tech-insights');
  },
  
  personalGrowth: function(title, content) {
    return addContent.blogPost(title, content, 'personal-growth');
  }
};

console.log('📊 Portfolio Data Interface Ready!');
console.log('💡 Type showExamples() to see usage examples');
console.log('🚀 Use addContent.linkedinPost(), addContent.project(), addContent.blogPost(), addContent.experience()');
console.log('⚡ Quick templates: quickAdd.achievement(), quickAdd.aiProject(), quickAdd.techInsight()');