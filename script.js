// Advanced Particle Animation System
class ParticleSystem {
  constructor() {
    this.particleCount = 80;
    this.particles = [];
    this.container = document.getElementById("particle-container");
    this.init();
  }

  init() {
    this.createParticles();
    this.generateCSS();
  }

  createParticles() {
    for (let i = 1; i <= this.particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "circle-container";

      const circle = document.createElement("div");
      circle.className = "circle";

      particle.appendChild(circle);
      this.container.appendChild(particle);

      // Generate random properties
      const size = Math.floor(Math.random() * 8) + 3; // 3-10px
      const duration = 28000 + Math.random() * 9000; // 28-37s
      const delay = Math.random() * 37000; // 0-37s
      const circleDelay = Math.random() * 4000; // 0-4s

      // Store particle data
      this.particles.push({
        element: particle,
        circle: circle,
        size: size,
        duration: duration,
        delay: delay,
        circleDelay: circleDelay,
        startX: Math.random() * 100,
        endX: Math.random() * 100,
        startY: 100 + Math.random() * 10,
        endY: -120 - Math.random() * 30,
      });
    }
  }

  generateCSS() {
    let css = "";

    this.particles.forEach((particle, index) => {
      const i = index + 1;

      // Set particle size and animation
      particle.element.style.width = `${particle.size}px`;
      particle.element.style.height = `${particle.size}px`;
      particle.element.style.animationName = `move-frames-${i}`;
      particle.element.style.animationDuration = `${particle.duration}ms`;
      particle.element.style.animationDelay = `${particle.delay}ms`;

      // Set circle animation delay
      particle.circle.style.animationDelay = `${particle.circleDelay}ms`;

      // Generate keyframes for this particle
      css += `
        @keyframes move-frames-${i} {
          from {
            transform: translate3d(${particle.startX}vw, ${particle.startY}vh, 0);
          }
          to {
            transform: translate3d(${particle.endX}vw, ${particle.endY}vh, 0);
          }
        }
      `;
    });

    // Inject CSS
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }
}

class BYDPortfolio {
  constructor() {
    this.currentSection = 0;
    this.sections = ["home", "atto3", "emax7", "seal", "sealion7"];
    this.isScrolling = false;
    this.touchStartY = 0;
    this.touchEndY = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateProgress();
    this.animateTitle();
  }

  setupEventListeners() {
    // Wheel event for desktop
    window.addEventListener("wheel", (e) => {
      if (this.isScrolling) return;

      this.isScrolling = true;

      if (e.deltaY > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }

      setTimeout(() => {
        this.isScrolling = false;
      }, 800);
    });

    // Touch events for mobile
    window.addEventListener("touchstart", (e) => {
      this.touchStartY = e.touches[0].clientY;
    });

    window.addEventListener("touchend", (e) => {
      if (this.isScrolling) return;

      this.touchEndY = e.changedTouches[0].clientY;
      const touchDiff = this.touchStartY - this.touchEndY;

      if (Math.abs(touchDiff) > 50) {
        this.isScrolling = true;

        if (touchDiff > 0) {
          this.nextSection();
        } else {
          this.previousSection();
        }

        setTimeout(() => {
          this.isScrolling = false;
        }, 800);
      }
    });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (this.isScrolling) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        this.isScrolling = true;
        this.nextSection();
        setTimeout(() => {
          this.isScrolling = false;
        }, 800);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        this.isScrolling = true;
        this.previousSection();
        setTimeout(() => {
          this.isScrolling = false;
        }, 800);
      }
    });

    // Progress dots click
    document.querySelectorAll(".progress-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (this.isScrolling) return;
        this.goToSection(index);
      });
    });

    // CTA button click
    document.querySelector(".cta-button").addEventListener("click", () => {
      this.goToSection(1);
    });

    // Navigation links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href").substring(1);
        const sectionIndex = this.sections.indexOf(href);
        if (sectionIndex !== -1) {
          this.goToSection(sectionIndex);
        }
      });
    });
  }

  nextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.updateView();
    }
  }

  previousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.updateView();
    }
  }

  goToSection(index) {
    if (index >= 0 && index < this.sections.length && index !== this.currentSection) {
      this.currentSection = index;
      this.updateView();
    }
  }

  updateView() {
    // Hide all sections
    document.querySelectorAll(".hero-section, .car-section").forEach((section) => {
      section.classList.remove("active");
    });

    // Show current section
    const currentSectionElement = document.getElementById(this.sections[this.currentSection]);
    if (currentSectionElement) {
      setTimeout(() => {
        currentSectionElement.classList.add("active");
        this.animateCarImage();
      }, 100);
    }

    this.updateProgress();
    this.updateNavigation();
    this.updateCarShowcase();
    this.updateBackgroundVisibility();
  }

  updateBackgroundVisibility() {
    const animatedBackground = document.querySelector('.animated-background');
    const currentSection = this.sections[this.currentSection];
    
    if (currentSection === 'seal') {
      // Hide main background elements for SEAL section
      animatedBackground.style.opacity = '0';
    } else {
      // Show main background elements for other sections
      animatedBackground.style.opacity = '1';
    }
  }

  updateProgress() {
    document.querySelectorAll(".progress-dot").forEach((dot, index) => {
      if (index === this.currentSection) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  updateNavigation() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1);
      if (href === this.sections[this.currentSection]) {
        link.classList.add("active");
      }
    });
  }

  updateCarShowcase() {
    const heroCarImage = document.querySelector(".hero-section .car-image");
    const carImages = [
      "images/byd-atto-3.png",
      "images/byd-atto-3.png",
      "images/byd-emax-7.webp",
      "images/byd-seal.png",
      "images/byd-sealion-7.webp",
    ];

    if (heroCarImage && this.currentSection === 0) {
      heroCarImage.style.opacity = "0";
      setTimeout(() => {
        heroCarImage.src = carImages[this.currentSection];
        heroCarImage.style.opacity = "1";
      }, 300);
    }
  }

  animateCarImage() {
    const currentSection = document.getElementById(this.sections[this.currentSection]);
    const carImage = currentSection?.querySelector(".car-image");

    if (carImage) {
      carImage.style.transform = "scale(0.8) rotateY(-10deg)";
      carImage.style.opacity = "0";

      setTimeout(() => {
        carImage.style.transform = "scale(1) rotateY(0deg)";
        carImage.style.opacity = "1";
      }, 200);
    }
  }

  animateTitle() {
    const titleLines = document.querySelectorAll(".title-line");
    titleLines.forEach((line, index) => {
      line.style.animationDelay = `${index * 0.5}s`;
    });
  }
}

// Enhanced grass animation
class GrasslandAnimator {
  constructor() {
    this.createAdditionalGrass();
    this.createButterflies();
    this.animateWind();
  }

  createAdditionalGrass() {
    const grassField = document.querySelector(".grass-field");

    // Create more grass elements for a fuller look
    for (let i = 0; i < 50; i++) {
      const grass = document.createElement("div");
      grass.className = "grass";
      grass.style.setProperty("--delay", `${Math.random() * 4}s`);
      grass.style.setProperty("--x", `${Math.random() * 100}%`);
      grass.style.height = `${40 + Math.random() * 40}px`;
      grass.style.animationDuration = `${2 + Math.random() * 2}s`;
      grassField.appendChild(grass);
    }
  }

  createButterflies() {
    const background = document.querySelector(".animated-background");

    for (let i = 0; i < 3; i++) {
      const butterfly = document.createElement("div");
      butterfly.className = "butterfly";
      butterfly.style.cssText = `
                position: absolute;
                width: 20px;
                height: 15px;
                left: ${Math.random() * 100}%;
                top: ${20 + Math.random() * 60}%;
                animation: butterfly-flight ${8 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                z-index: 10;
            `;

      butterfly.innerHTML = `
                <div style="
                    width: 8px;
                    height: 8px;
                    background: #ff6b9d;
                    border-radius: 50% 50% 0 50%;
                    position: absolute;
                    left: 0;
                    animation: wing-flap 0.3s ease-in-out infinite;
                "></div>
                <div style="
                    width: 8px;
                    height: 8px;
                    background: #ff8cc8;
                    border-radius: 50% 50% 50% 0;
                    position: absolute;
                    right: 0;
                    animation: wing-flap 0.3s ease-in-out infinite reverse;
                "></div>
            `;

      background.appendChild(butterfly);
    }

    // Add butterfly animation styles
    const style = document.createElement("style");
    style.textContent = `
            @keyframes butterfly-flight {
                0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
                25% { transform: translateX(100px) translateY(-20px) rotate(5deg); }
                50% { transform: translateX(200px) translateY(10px) rotate(-3deg); }
                75% { transform: translateX(150px) translateY(-15px) rotate(2deg); }
            }
            
            @keyframes wing-flap {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(0.3); }
            }
        `;
    document.head.appendChild(style);
  }

  animateWind() {
    setInterval(() => {
      const grasses = document.querySelectorAll(".grass");
      grasses.forEach((grass) => {
        const randomDelay = Math.random() * 2;
        grass.style.animationDelay = `${randomDelay}s`;
      });
    }, 10000);
  }
}

// Weather effects
class WeatherEffects {
  constructor() {
    this.createClouds();
    this.createSunRays();
  }

  createClouds() {
    const background = document.querySelector(".animated-background");

    for (let i = 0; i < 4; i++) {
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.style.cssText = `
                position: absolute;
                width: ${80 + Math.random() * 60}px;
                height: ${40 + Math.random() * 20}px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50px;
                top: ${10 + Math.random() * 30}%;
                left: ${Math.random() * 100}%;
                animation: cloud-drift ${20 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
                z-index: 5;
            `;

      cloud.innerHTML = `
                <div style="
                    position: absolute;
                    width: 60%;
                    height: 60%;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50px;
                    top: -30%;
                    left: 20%;
                "></div>
                <div style="
                    position: absolute;
                    width: 40%;
                    height: 40%;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 50px;
                    top: -20%;
                    right: 10%;
                "></div>
            `;

      background.appendChild(cloud);
    }

    // Add cloud animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes cloud-drift {
                from { transform: translateX(-100px); }
                to { transform: translateX(calc(100vw + 100px)); }
            }
        `;
    document.head.appendChild(style);
  }

  createSunRays() {
    const background = document.querySelector(".animated-background");
    const sunRays = document.createElement("div");
    sunRays.style.cssText = `
            position: absolute;
            top: 10%;
            right: 15%;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(255, 255, 0, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            animation: sun-glow 4s ease-in-out infinite;
            z-index: 1;
        `;

    background.appendChild(sunRays);

    // Add sun animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes sun-glow {
                0%, 100% { 
                    transform: scale(1);
                    opacity: 0.6;
                }
                50% { 
                    transform: scale(1.1);
                    opacity: 0.8;
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Performance optimization
class PerformanceOptimizer {
  constructor() {
    this.optimizeAnimations();
    this.addIntersectionObserver();
  }

  optimizeAnimations() {
    // Pause animations when tab is not visible
    document.addEventListener("visibilitychange", () => {
      const animatedElements = document.querySelectorAll(
        ".grass, .flower, .particle, .butterfly, .cloud"
      );
      if (document.hidden) {
        animatedElements.forEach((el) => {
          el.style.animationPlayState = "paused";
        });
      } else {
        animatedElements.forEach((el) => {
          el.style.animationPlayState = "running";
        });
      }
    });
  }

  addIntersectionObserver() {
    // Optimize car image loading
    const carImages = document.querySelectorAll(".car-image");
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.willChange = "transform";
        } else {
          entry.target.style.willChange = "auto";
        }
      });
    });

    carImages.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ParticleSystem(); // Initialize the particle system first
  new BYDPortfolio();
  new GrasslandAnimator();
  new WeatherEffects();
  new PerformanceOptimizer();
});

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js";
  document.head.appendChild(script);
}
