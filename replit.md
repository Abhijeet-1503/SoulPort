# Abhijeet Kumar Bhagat Portfolio - Personal Website

## Overview

This is a modern, interactive personal portfolio website for Abhijeet Kumar Bhagat, an AI researcher and IEEE active member studying BTech Artificial Intelligence at Marwadi University. The portfolio showcases his research work, projects, experiences, and personal reflections through an immersive web experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Vanilla JavaScript**: Component-based architecture without frameworks
- **Modern CSS**: Custom properties (CSS variables), CSS Grid, Flexbox for responsive layouts
- **Three.js Integration**: Interactive 3D particle background effects
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features

### Component System
- **Modular Components**: Each section (Hero, Experience, Projects, Live, Wander, Navbar) is implemented as a JavaScript class
- **Event-Driven**: Components communicate through custom events and shared utility functions
- **Intersection Observer**: Used for scroll-triggered animations and lazy loading

### Theming System
- **CSS Custom Properties**: Centralized theme management with light/dark mode support
- **System Preference Detection**: Automatically detects user's preferred color scheme
- **Local Storage**: Persists theme preference across sessions
- **Smooth Transitions**: Animated theme switching with reduced motion support

## Key Components

### Navigation (`components/navbar.js`)
- Fixed navigation with glass morphism effect
- Smooth scrolling between sections
- Active section highlighting
- Mobile-responsive hamburger menu
- Scroll-based appearance changes

### Hero Section (`components/hero.js`)
- Animated typewriter effect displaying multiple taglines
- Parallax scrolling effects
- Animated statistics counters
- Three.js particle background integration

### Experience Timeline (`components/experience.js`)
- Interactive timeline showcasing professional experience
- Real data from IEEE memberships and research internships
- Skills and achievements display
- Responsive card-based layout

### Projects Showcase (`components/projects.js`)
- Filterable project grid
- Real projects including AI research and AR development
- Detailed project modals with technologies and impact
- GitHub integration capabilities

### Live Activity Feed (`components/live.js`)
- Real LinkedIn activity integration
- Engagement metrics display
- Live updating capabilities
- Professional achievement showcase

### Personal Blog (`components/wander.js`)
- Personal reflections and technical insights
- Reading time estimation
- Category-based filtering
- Responsive card layout

## Data Flow

### Static Data Architecture
- **Embedded Data**: All content is embedded directly in component files
- **No External APIs**: Self-contained data structure for reliability
- **Real Content**: Authentic data from Abhijeet's actual profiles and experiences

### Content Structure
```
Personal Data → Component Classes → DOM Rendering → User Interaction
```

### Animation Pipeline
```
Intersection Observer → Animation Triggers → CSS/JS Animations → Performance Monitoring
```

## External Dependencies

### CDN Resources
- **Three.js (r128)**: 3D graphics and particle systems
- **Google Fonts**: Inter and JetBrains Mono font families
- **Preloaded Resources**: Critical CSS and JavaScript for performance

### Browser APIs
- **Intersection Observer**: Scroll-triggered animations
- **Local Storage**: Theme persistence and data backup
- **Media Queries**: Responsive design and motion preferences
- **Web Performance APIs**: Loading optimization

## Content Management System

### Data Manager Architecture (`assets/js/data-manager.js`)
- **LinkedInDataManager**: Easy LinkedIn post creation with engagement metrics
- **ExperienceDataManager**: Work experience and IEEE society management
- **ProjectsDataManager**: Project portfolio with categories and technologies
- **WanderDataManager**: Blog post creation with reading time calculation
- **MetricsDataManager**: Live statistics updates and growth tracking

### Data Interface (`assets/js/data-interface.js`)
- **Browser Console Functions**: Simple functions accessible via browser console
- **Global Component Access**: Components are globally accessible for real-time updates
- **Auto-save Functionality**: Automatic backup to localStorage
- **Quick Templates**: Pre-configured templates for common content types

### Usage (via Browser Console)
```javascript
// Add LinkedIn posts
addContent.linkedinPost(title, content, type);

// Add projects
addContent.project(title, description, category, technologies);

// Add blog posts
addContent.blogPost(title, content, category);

// Add experience
addContent.experience(role, organization, description, duration, skills);

// Update metrics
addContent.metrics(metricName, current, growth, period);
```

## Deployment Strategy

### Static Hosting Compatible
- **No Build Process**: Direct deployment of source files
- **CDN Friendly**: Optimized for content delivery networks
- **Progressive Loading**: Critical resources preloaded, non-critical lazy-loaded

### Performance Optimizations
- **Resource Preloading**: Fonts and critical scripts preloaded
- **Debounced Events**: Scroll and resize event optimization
- **Intersection Observer**: Efficient scroll-based animations
- **Reduced Motion Support**: Accessibility-first animation approach

### Browser Compatibility
- **Modern Browser Target**: ES6+ features used
- **Progressive Enhancement**: Core functionality without JavaScript
- **Fallback Support**: Graceful degradation for older browsers

### Security Considerations
- **No Server-Side Code**: Static files only, minimal attack surface
- **CSP Ready**: Content Security Policy compatible
- **XSS Protection**: No dynamic content injection

## Technical Highlights

### Animation System
- Custom animation manager with intersection observer
- Reduced motion preference support
- Smooth scroll implementation
- Parallax effects with Three.js integration

### Theme Management
- Comprehensive light/dark mode system
- System preference detection
- Smooth theme transitions
- Persistent user preferences

### Performance Features
- Debounced scroll handlers
- Efficient DOM manipulation
- Lazy loading strategies
- Resource optimization

This portfolio represents a modern, performance-focused approach to personal branding websites, combining technical sophistication with authentic personal content and professional achievements.