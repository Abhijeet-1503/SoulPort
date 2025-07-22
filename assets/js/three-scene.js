let scene, camera, renderer, particles, animationId;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

export function initThreeScene() {
  return new Promise((resolve, reject) => {
    try {
      // Check if Three.js is available
      if (typeof THREE === 'undefined') {
        throw new Error('Three.js not loaded');
      }

      const canvas = document.getElementById('three-canvas');
      if (!canvas) {
        throw new Error('Three.js canvas not found');
      }

      // Initialize scene
      scene = new THREE.Scene();

      // Initialize camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 5;

      // Initialize renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create particle system
      createParticleSystem();

      // Add ambient lighting
      const ambientLight = new THREE.AmbientLight(0x6366f1, 0.5);
      scene.add(ambientLight);

      // Setup event listeners
      setupEventListeners();

      // Start animation loop
      animate();

      console.log('Three.js scene initialized');
      resolve();
      
    } catch (error) {
      console.error('Failed to initialize Three.js scene:', error);
      reject(error);
    }
  });
}

function createParticleSystem() {
  const particleCount = window.innerWidth < 768 ? 800 : 1500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  // Get current theme
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const baseColor = theme === 'dark' 
    ? new THREE.Color(0x6366f1) 
    : new THREE.Color(0x8b5cf6);

  for (let i = 0; i < particleCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    // Color with slight variation
    const colorVariation = 0.3;
    colors[i * 3] = baseColor.r + (Math.random() - 0.5) * colorVariation;
    colors[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * colorVariation;
    colors[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * colorVariation;

    // Size
    sizes[i] = Math.random() * 2 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Create material
  const material = new THREE.ShaderMaterial({
    transparent: true,
    vertexColors: true,
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        gl_FragColor = vec4(vColor, alpha * 0.6);
      }
    `
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function setupEventListeners() {
  // Mouse movement
  document.addEventListener('mousemove', onMouseMove, false);
  
  // Window resize
  window.addEventListener('resize', onWindowResize, false);
  
  // Scroll handling
  window.addEventListener('scroll', onScroll, false);
  
  // Theme change
  document.addEventListener('themechange', updateParticleColors);
}

function onMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.001;
  mouseY = (event.clientY - windowHalfY) * 0.001;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  camera.position.z = 5 + scrollPercent * 2;
}

function updateParticleColors() {
  if (!particles) return;

  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const baseColor = theme === 'dark' 
    ? new THREE.Color(0x6366f1) 
    : new THREE.Color(0x8b5cf6);

  const colors = particles.geometry.attributes.color.array;
  const particleCount = colors.length / 3;

  for (let i = 0; i < particleCount; i++) {
    const colorVariation = 0.3;
    colors[i * 3] = baseColor.r + (Math.random() - 0.5) * colorVariation;
    colors[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * colorVariation;
    colors[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * colorVariation;
  }

  particles.geometry.attributes.color.needsUpdate = true;
}

function animate() {
  animationId = requestAnimationFrame(animate);

  if (particles) {
    // Rotate particle system based on mouse position
    particles.rotation.x += (mouseY - particles.rotation.x) * 0.02;
    particles.rotation.y += (mouseX - particles.rotation.y) * 0.02;

    // Add gentle floating animation
    const time = Date.now() * 0.0005;
    particles.position.y = Math.sin(time) * 0.1;
    particles.position.x = Math.cos(time * 0.7) * 0.05;

    // Update individual particle positions for subtle movement
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
}

// Cleanup function
export function destroyThreeScene() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer) {
    renderer.dispose();
  }
  
  if (particles) {
    scene.remove(particles);
    particles.geometry.dispose();
    particles.material.dispose();
  }
}

// Performance optimization for mobile
if (window.innerWidth < 768) {
  // Reduce particle count and quality for mobile devices
  const canvas = document.getElementById('three-canvas');
  if (canvas) {
    canvas.style.opacity = '0.4';
  }
}
