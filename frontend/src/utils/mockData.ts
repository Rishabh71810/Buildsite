import { ExecutionStep, FileStructure, GeneratedWebsite } from '../types';

// Mock execution steps
export const generateMockSteps = (prompt: string): ExecutionStep[] => {
  return [
    {
      id: '1',
      title: 'Analyzing Prompt',
      description: `Analyzing: "${prompt}" - Understanding requirements and context`,
      status: 'completed',
      progress: 100,
    },
    {
      id: '2',
      title: 'Planning Architecture',
      description: 'Determining optimal project structure and technology stack',
      status: 'completed',
      progress: 100,
    },
    {
      id: '3',
      title: 'Setting Up Project',
      description: 'Initializing project with required dependencies',
      status: 'completed',
      progress: 100,
    },
    {
      id: '4',
      title: 'Creating HTML Structure',
      description: 'Building semantic HTML layout and components',
      status: 'completed',
      progress: 100,
    },
    {
      id: '5',
      title: 'Implementing Styles',
      description: 'Applying modern CSS styling and animations',
      status: 'completed',
      progress: 100,
    },
    {
      id: '6',
      title: 'Adding Functionality',
      description: 'Implementing interactive features and business logic',
      status: 'processing',
      progress: 65,
    },
    {
      id: '7',
      title: 'Optimizing Assets',
      description: 'Compressing images and optimizing resource loading',
      status: 'pending',
      progress: 0,
    },
    {
      id: '8',
      title: 'Implementing SEO',
      description: 'Adding meta tags and optimizing for search engines',
      status: 'pending',
      progress: 0,
    },
    {
      id: '9',
      title: 'Testing Responsiveness',
      description: 'Ensuring proper display across all device sizes',
      status: 'pending',
      progress: 0,
    },
    {
      id: '10',
      title: 'Final Testing',
      description: 'Performing cross-browser testing and validation',
      status: 'pending',
      progress: 0,
    }
  ];
};

// Mock file structure
export const generateMockFileStructure = (): FileStructure[] => {
  return [
    {
      name: 'src',
      path: '/src',
      type: 'directory',
      children: [
        {
          name: 'index.html',
          path: '/src/index.html',
          type: 'file',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Portfolio</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/animations.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">John Doe</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#work">Work</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <h1>Creative Developer & Designer</h1>
            <p>Building beautiful digital experiences</p>
            <button class="cta">View My Work</button>
        </section>

        <section id="work" class="portfolio">
            <h2>Featured Projects</h2>
            <div class="project-grid">
                <!-- Project cards will be dynamically added -->
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 John Doe. All rights reserved.</p>
    </footer>

    <script type="module" src="js/main.js"></script>
</body>
</html>`,
        },
        {
          name: 'css',
          path: '/src/css',
          type: 'directory',
          children: [
            {
              name: 'style.css',
              path: '/src/css/style.css',
              type: 'file',
              language: 'css',
              content: `/* Modern Portfolio Styles */
:root {
  --primary: #2563eb;
  --secondary: #4f46e5;
  --text: #1f2937;
  --background: #ffffff;
  --accent: #f472b6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--background);
}

.header {
  position: fixed;
  width: 100%;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary);
}

.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f6f7 0%, #e9edf2 100%);
}

.hero h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  color: transparent;
}

.cta {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: var(--primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
}`,
            },
            {
              name: 'animations.css',
              path: '/src/css/animations.css',
              type: 'file',
              language: 'css',
              content: `/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.slide-in {
  animation: slideIn 0.6s ease-out forwards;
}

/* Hover Effects */
.project-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}`,
            }
          ]
        },
        {
          name: 'js',
          path: '/src/js',
          type: 'directory',
          children: [
            {
              name: 'main.js',
              path: '/src/js/main.js',
              type: 'file',
              language: 'javascript',
              content: `// Main JavaScript
import { initializeProjects } from './projects.js';
import { setupAnimations } from './animations.js';
import { handleFormSubmission } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initializeProjects();
  setupAnimations();
  
  // Setup event listeners
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmission);
  }
  
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});`,
            },
            {
              name: 'projects.js',
              path: '/src/js/projects.js',
              type: 'file',
              language: 'javascript',
              content: `// Projects data and initialization
export const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Modern e-commerce solution built with React and Node.js',
    image: 'project1.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management',
    image: 'project2.jpg',
    tags: ['Vue.js', 'D3.js', 'Firebase'],
    link: '#'
  },
  {
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking application',
    image: 'project3.jpg',
    tags: ['React Native', 'GraphQL', 'AWS'],
    link: '#'
  }
];

export function initializeProjects() {
  const projectGrid = document.querySelector('.project-grid');
  if (!projectGrid) return;

  projects.forEach(project => {
    const card = createProjectCard(project);
    projectGrid.appendChild(card);
  });
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card fade-in';
  
  card.innerHTML = \`
    <img src="/images/\${project.image}" alt="\${project.title}">
    <h3>\${project.title}</h3>
    <p>\${project.description}</p>
    <div class="tags">
      \${project.tags.map(tag => \`<span class="tag">\${tag}</span>\`).join('')}
    </div>
    <a href="\${project.link}" class="project-link">View Project</a>
  \`;
  
  return card;
}`,
            },
            {
              name: 'animations.js',
              path: '/src/js/animations.js',
              type: 'file',
              language: 'javascript',
              content: `// Animation utilities and observers
export function setupAnimations() {
  // Intersection Observer for fade-in animations
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '50px'
    }
  );

  // Observe all animated elements
  document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
    element.classList.add('invisible');
    fadeObserver.observe(element);
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
    });
  }
}`,
            },
            {
              name: 'contact.js',
              path: '/src/js/contact.js',
              type: 'file',
              language: 'javascript',
              content: `// Contact form handling
export async function handleFormSubmission(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  
  try {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success message
    showNotification('Message sent successfully!', 'success');
    form.reset();
  } catch (error) {
    showNotification('Failed to send message. Please try again.', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = \`notification \${type}\`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}`,
            }
          ]
        },
        {
          name: 'assets',
          path: '/src/assets',
          type: 'directory',
          children: [
            {
              name: 'images',
              path: '/src/assets/images',
              type: 'directory',
              children: [
                {
                  name: 'project1.jpg',
                  path: '/src/assets/images/project1.jpg',
                  type: 'file',
                  content: '(Binary content not shown)',
                },
                {
                  name: 'project2.jpg',
                  path: '/src/assets/images/project2.jpg',
                  type: 'file',
                  content: '(Binary content not shown)',
                },
                {
                  name: 'project3.jpg',
                  path: '/src/assets/images/project3.jpg',
                  type: 'file',
                  content: '(Binary content not shown)',
                }
              ]
            }
          ]
        }
      ]
    }
  ];
};

// Generate mock website data based on a prompt
export const generateMockWebsite = (prompt: string): GeneratedWebsite => {
  return {
    prompt,
    files: generateMockFileStructure(),
    steps: generateMockSteps(prompt),
  };
};

// Simulate generating a website with a delay
export const simulateWebsiteGeneration = (
  prompt: string,
  onStepUpdate: (steps: ExecutionStep[]) => void,
  onComplete: (website: GeneratedWebsite) => void
): void => {
  const steps = generateMockSteps(prompt);
  const files = generateMockFileStructure();

  // Start with all steps pending except the first
  const initialSteps = steps.map((step, index) => ({
    ...step,
    status: index === 0 ? 'processing' : 'pending',
    progress: index === 0 ? 10 : 0,
  }));

  onStepUpdate([...initialSteps]);

  // Simulate progress for each step
  let currentStepIndex = 0;

  const updateStep = () => {
    if (currentStepIndex >= steps.length) {
      // All steps complete
      onComplete({
        prompt,
        files,
        steps: steps.map(step => ({ ...step, status: 'completed', progress: 100 })),
      });
      return;
    }

    const updatedSteps = [...steps];
    const currentStep = updatedSteps[currentStepIndex];

    // Update progress of current step
    if (currentStep.progress === undefined) currentStep.progress = 0;
    if (currentStep.progress < 100) {
      currentStep.status = 'processing';
      currentStep.progress += Math.floor(Math.random() * 15) + 5; // Random progress increase

      if (currentStep.progress >= 100) {
        currentStep.progress = 100;
        currentStep.status = 'completed';
        
        // Move to the next step
        currentStepIndex++;
        if (currentStepIndex < steps.length) {
          updatedSteps[currentStepIndex].status = 'processing';
          updatedSteps[currentStepIndex].progress = 5; // Start with a small progress
        }
      }
    }

    onStepUpdate([...updatedSteps]);
    
    // Continue updating with random delays between 300ms and 800ms
    setTimeout(updateStep, Math.floor(Math.random() * 500) + 300);
  };

  // Start the simulation
  setTimeout(updateStep, 1000);
};